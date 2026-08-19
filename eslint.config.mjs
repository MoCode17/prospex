import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Claude Code's installed skills and plugins — third-party JS that isn't
    // part of the app and doesn't follow its rules. Listing it here rather than
    // relying on the default ignores because it sits at the repo root.
    ".claude/**",
  ]),
]);

export default eslintConfig;
