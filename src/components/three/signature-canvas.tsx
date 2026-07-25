"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Icosahedron, Sphere } from "@react-three/drei";
import * as THREE from "three";

/**
 * The Intelligence Core — the signature interaction.
 *
 * A distorted icosahedron (the "core") wrapped in a wireframe shell, ringed by
 * orbiting data nodes. Scroll drives:
 *   - camera dolly (in → through)
 *   - core distortion (calm → turbulent → resolved)
 *   - node orbital radius (spread → organized cluster)
 *   - overall rotation speed
 * Cursor adds parallax. The cluster literally reorganizes itself — motion,
 * math, and intent in one beat.
 */

type OrbitNode = {
  radius: [number, number]; // [spread radius, organized radius]
  speed: number;
  phase: number;
  incline: number;
  yaw: number;
  size: number;
  hot: boolean;
  tier: number;
};

function makeNodes(count: number): OrbitNode[] {
  const nodes: OrbitNode[] = [];
  for (let i = 0; i < count; i++) {
    const tier = i % 3;
    nodes.push({
      // wide spread (raw, reaches frame edges) → tight cluster hugging the
      // core (organized, central around the ring system)
      radius: [
        3.8 + tier * 0.7 + Math.random() * 0.4,
        2.0 + tier * 0.3,
      ],
      speed: (0.18 + Math.random() * 0.4) * (Math.random() > 0.5 ? 1 : -1),
      phase: Math.random() * Math.PI * 2,
      incline: (Math.random() - 0.5) * 1.4,
      yaw: Math.random() * Math.PI,
      size: 0.025 + Math.random() * 0.04,
      hot: Math.random() > 0.78,
      tier,
    });
  }
  return nodes;
}

type Theme = "light" | "dark";

function Core({
  progressRef,
  theme,
}: {
  progressRef: React.MutableRefObject<number>;
  theme: Theme;
}) {
  const distortMat = useRef<any>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const target = useRef(new THREE.Vector2(0, 0));

  const nodes = useMemo(() => makeNodes(54), []);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);

  // theme-tuned palette
  const isLight = theme === "light";
  // aligned with the refined dual-tone theme tokens
  const emerald = isLight ? "#047857" : "#34d399";
  const amber = isLight ? "#b45309" : "#fbbf24";
  const nodeCool = isLight ? "#475569" : "#cbd5e1";
  const nodeBlending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
  const nodeOpacity = isLight ? 0.78 : 0.55;
  const coreBlending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
  // second ring uses the warm co-accent for dual-tone depth
  const ring2Color = amber;

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = progressRef.current;

    // core distortion: calm at 0, turbulent mid, resolved at 1
    const distortTarget = 0.18 + Math.sin(p * Math.PI) * 0.34;
    if (distortMat.current) {
      distortMat.current.distort = THREE.MathUtils.lerp(
        distortMat.current.distort,
        distortTarget,
        delta * 3
      );
      distortMat.current.emissiveIntensity = 0.4 + p * 0.5 + Math.sin(t * 2) * 0.05;
    }

    // group rotation — speeds up as we organize
    if (groupRef.current) {
      const rotSpeed = 0.05 + p * 0.22;
      groupRef.current.rotation.y += delta * rotSpeed;
      groupRef.current.rotation.x = -0.2 + Math.sin(t * 0.2) * 0.05;
      // cursor parallax
      target.current.x = THREE.MathUtils.lerp(target.current.x, pointer.x * 0.3, 0.05);
      target.current.y = THREE.MathUtils.lerp(target.current.y, pointer.y * 0.25, 0.05);
      groupRef.current.rotation.y += target.current.x * delta * 0.6;
      groupRef.current.rotation.x += target.current.y * delta * 0.4;
    }

    // reorganize orbiting nodes: lerp radius spread→tight AND incline
    // chaotic→aligned so the swarm visibly settles onto clean ring planes.
    const r = THREE.MathUtils.lerp(0, 1, p);
    for (let i = 0; i < nodes.length; i++) {
      const mesh = nodeRefs.current[i];
      if (!mesh) continue;
      const n = nodes[i];
      const radius = THREE.MathUtils.lerp(n.radius[0], n.radius[1], r);
      // orbit slows as it settles (calm when structured)
      const angle = n.phase + t * n.speed * (1 - p * 0.45);
      // chaos incline = random per node; organized incline = tier-aligned ring
      const orgIncline = (n.tier - 1) * 0.5;
      const incline = THREE.MathUtils.lerp(n.incline, orgIncline, r);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle) * radius * Math.sin(incline);
      // yaw: full random in chaos → aligned in structure
      const yaw = THREE.MathUtils.lerp(n.yaw, 0, r);
      const xr = x * Math.cos(yaw) - z * Math.sin(yaw) * 0.3;
      const zr = x * Math.sin(yaw) * 0.3 + z * Math.cos(yaw);
      mesh.position.set(xr, y, zr);
      const s = n.size * (1 + p * 0.6) * (n.hot ? 1.7 : 1);
      mesh.scale.setScalar(s);
    }

    // camera dolly (gentle — keep the whole system comfortably framed)
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      11.0 - p * 1.5,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      {/* inner glowing core */}
      <Sphere args={[0.6, 32, 32]}>
        <meshBasicMaterial
          color={emerald}
          transparent
          opacity={isLight ? 0.35 : 0.28}
          blending={coreBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* distorted core surface */}
      <Icosahedron args={[1.25, 12]}>
        <MeshDistortMaterial
          ref={distortMat}
          color="#0c1011"
          emissive={emerald}
          emissiveIntensity={0.5}
          roughness={0.35}
          metalness={0.7}
          distort={0.2}
          speed={1.4}
        />
      </Icosahedron>

      {/* wireframe shell */}
      <Icosahedron args={[1.85, 1]}>
        <meshBasicMaterial
          color={emerald}
          wireframe
          transparent
          opacity={0.12}
        />
      </Icosahedron>

      {/* orbit rings (structure cues) */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.5, 0.004, 8, 128]} />
        <meshBasicMaterial color={emerald} transparent opacity={0.18} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.0, 0.003, 8, 128]} />
        <meshBasicMaterial color={ring2Color} transparent opacity={0.08} />
      </mesh>

      {/* orbiting data nodes */}
      {nodes.map((n, i) => (
        <mesh
          key={i}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial
            color={n.hot ? emerald : nodeCool}
            transparent
            opacity={n.hot ? 0.95 : nodeOpacity}
            blending={nodeBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export function SignatureCanvas({
  progressRef,
  theme,
}: {
  progressRef: React.MutableRefObject<number>;
  theme: Theme;
}) {
  const emerald = theme === "light" ? "#047857" : "#34d399";
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 11], fov: 50, near: 0.1, far: 100 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 4, 6]} intensity={2.2} color={emerald} />
      <pointLight position={[-6, -3, -4]} intensity={1.1} color="#fbbf24" />
      <Core progressRef={progressRef} theme={theme} />
    </Canvas>
  );
}
