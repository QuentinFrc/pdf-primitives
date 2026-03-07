import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/tw-entry.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  clean: true,
  external: ["react", "@react-pdf/renderer"],
});
