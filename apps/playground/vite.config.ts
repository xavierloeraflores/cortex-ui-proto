import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "charts",
              test: /node_modules.*(?:recharts|d3-|victory|decimal\.js)/,
              priority: 30,
            },
            {
              name: "react",
              test: /node_modules\/(?:react|react-dom|scheduler)\//,
              priority: 40,
            },
            {
              name: "primitives",
              test: /node_modules.*(?:@radix-ui|radix-ui|@floating-ui)/,
              priority: 20,
            },
            {
              name: "forms",
              test: /node_modules.*(?:@base-ui|react-hook-form|@tanstack|react-day-picker|date-fns)/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
});
