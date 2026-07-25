import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    languageOptions: {
      globals: {
        React: "readonly",
        JSX: "readonly",
      },
    },
    settings: {
      react: { version: "detect" },
    },
  },
  {
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",

      // TypeScript rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/prefer-as-const": "error",

      // React rules
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/purity": "warn",
      "react/no-unescaped-entities": "warn",
      "react/display-name": "off",
      "react/prop-types": "off",

      // Next.js rules
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",

      // General JavaScript rules
      "prefer-const": "error",
      "no-unused-vars": "off",
      "no-console": "warn",
      "no-debugger": "error",
      "no-empty": "warn",
      "no-irregular-whitespace": "error",
      "no-case-declarations": "error",
      "no-fallthrough": "error",
      "no-mixed-spaces-and-tabs": "error",
      "no-redeclare": "error",
      "no-undef": "error",
      "no-unreachable": "error",
      "no-useless-escape": "warn",
    },
  },
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", "examples/**", "skills", "tests/python-runtime-*.sh", "tool-results/**"]
  }
];

export default eslintConfig;
