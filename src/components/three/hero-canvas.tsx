"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function getCount() {
  if (typeof window === "undefined") return 1800;
  return window.innerWidth < 768 ? 800 : 1800;
}

const COUNT = getCount();

type Theme = "light" | "dark";

type Props = {
  progressRef: React.MutableRefObject<number>;
  theme: Theme;
};

function generateSeedData(count: number, mobile: boolean) {
  const chaos = new Float32Array(count * 3);
  const structure = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const seeds = new Float32Array(count);
  const R = mobile ? 3.6 : 4.3;
  const golden = Math.PI * (1.0 + Math.sqrt(5.0));
  for (let i = 0; i < count; i++) {
    const t = (i + 0.5) / count;
    const phi = Math.acos(1.0 - 2.0 * t);
    const theta = golden * (i + 0.5);
    structure[i * 3] = R * Math.sin(phi) * Math.cos(theta);
    structure[i * 3 + 1] = R * Math.cos(phi);
    structure[i * 3 + 2] = R * Math.sin(phi) * Math.sin(theta);
    const ct = Math.random() * Math.PI * 2;
    const cp = Math.acos(2.0 * Math.random() - 1.0);
    const cr = 1.6 + Math.pow(Math.random(), 0.6) * 4.8;
    chaos[i * 3] = cr * Math.sin(cp) * Math.cos(ct) * 1.25;
    chaos[i * 3 + 1] = cr * Math.cos(cp) * 1.5 - 0.3;
    chaos[i * 3 + 2] = cr * Math.sin(cp) * Math.sin(ct) * 1.25;
    sizes[i] = 3.0 + Math.random() * 5.0;
    seeds[i] = Math.random();
  }
  return { chaos, structure, sizes, seeds };
}

function ParticleField({ progressRef, theme }: Props) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const camTarget = useRef(new THREE.Vector2(0, 0));
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const { chaos, structure, sizes, seeds } = generateSeedData(COUNT, isMobile);
    geo.setAttribute("position", new THREE.BufferAttribute(chaos.slice(), 3));
    geo.setAttribute("aChaos", new THREE.BufferAttribute(chaos, 3));
    geo.setAttribute("aStructure", new THREE.BufferAttribute(structure, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return geo;
  }, [isMobile]);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  const material = useMemo(() => {
    const isLight = theme === "light";
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      uniforms: {
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uPixelRatio: {
          value:
            typeof window !== "undefined"
              ? Math.min(window.devicePixelRatio, 2)
              : 1,
        },
        uColorChaos: {
          value: new THREE.Color(isLight ? "#475569" : "#dbe4e6"),
        },
        uColorStructure: {
          value: new THREE.Color(isLight ? "#047857" : "#34d399"),
        },
        uLight: { value: isLight ? 1 : 0 },
      },
      vertexShader: /* glsl */ `
        attribute vec3 aChaos;
        attribute vec3 aStructure;
        attribute float aSize;
        attribute float aSeed;
        uniform float uProgress;
        uniform float uTime;
        uniform float uPixelRatio;
        varying float vProgress;
        varying float vSeed;

        float ease(float t) {
          return t * t * (3.0 - 2.0 * t);
        }

        void main() {
          vProgress = uProgress;
          vSeed = aSeed;

          float p = ease(clamp(uProgress, 0.0, 1.0));

          float drift = (1.0 - p);
          vec3 c = aChaos;
          float t = uTime * 0.45 + aSeed * 6.2831;
          c.x += sin(t + aChaos.z * 0.6) * 0.35 * drift;
          c.y += cos(t * 0.9 + aChaos.x * 0.5) * 0.35 * drift;
          c.z += sin(t * 0.7 + aChaos.y * 0.5) * 0.35 * drift;

          vec3 s = aStructure;
          float shimmer = sin(uTime * 1.6 + aSeed * 12.0) * 0.02 * p;
          s.y += shimmer;

          vec3 pos = mix(c, s, p);

          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mv;

          float dist = -mv.z;
          gl_PointSize = aSize * uPixelRatio * (12.0 / dist) * (0.75 + p * 0.45);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColorChaos;
        uniform vec3 uColorStructure;
        uniform float uLight;
        varying float vProgress;
        varying float vSeed;

        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, d);
          alpha = pow(alpha, 1.6);

          vec3 col = mix(uColorChaos, uColorStructure, vProgress);
          float hot = step(0.9, vSeed) * vProgress * (1.0 - uLight);
          col += hot * 0.7;

          float baseA = mix(0.5, 0.6, uLight);
          gl_FragColor = vec4(col, alpha * (baseA + vProgress * 0.4));
        }
      `,
    });
  }, [theme]);

  useEffect(() => {
    return () => material.dispose();
  }, [material]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const mat = pointsRef.current?.material as THREE.ShaderMaterial | undefined;
    if (!mat) return;
    mat.uniforms.uTime.value = t;

    const target = progressRef.current;
    const current = mat.uniforms.uProgress.value;
    mat.uniforms.uProgress.value = THREE.MathUtils.lerp(
      current,
      target,
      Math.min(1, delta * 4.5)
    );

    camTarget.current.x = THREE.MathUtils.lerp(
      camTarget.current.x,
      pointer.x * 0.4,
      0.04
    );
    camTarget.current.y = THREE.MathUtils.lerp(
      camTarget.current.y,
      pointer.y * 0.3,
      0.04
    );
    if (groupRef.current) {
      groupRef.current.rotation.y =
        camTarget.current.x * 0.4 + t * 0.03 * (1 - target * 0.7);
      groupRef.current.rotation.x = -camTarget.current.y * 0.3 - 0.18;
      groupRef.current.position.y =
        Math.sin(t * 0.5) * 0.06 - target * 0.4;
    }

    const camZ = isMobile ? 10.5 - target * 1.8 : 9.5 - target * 1.6;
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      camZ,
      0.03
    );
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={geometry} material={material} />
    </group>
  );
}

function Rig({ progressRef, theme }: Props) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <ParticleField progressRef={progressRef} theme={theme} />
    </>
  );
}

export function HeroCanvas({
  progressRef,
  theme,
}: {
  progressRef: React.MutableRefObject<number>;
  theme: Theme;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 9.5], fov: 55, near: 0.1, far: 100 }}
      style={{ background: "transparent" }}
    >
      <Rig progressRef={progressRef} theme={theme} />
    </Canvas>
  );
}
