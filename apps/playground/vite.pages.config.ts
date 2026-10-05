import { defineConfig, mergeConfig } from "vite";
import playgroundConfig from "./vite.config.ts";

export default mergeConfig(
  playgroundConfig,
  defineConfig({
    base: "/cortex-ui-proto/",
    build: {
      outDir: "../../docs",
      // docs contains only generated files. Developer guides live in guides/.
      emptyOutDir: true,
    },
  }),
);
