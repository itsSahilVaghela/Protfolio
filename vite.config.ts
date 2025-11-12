import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
export default defineConfig(({ mode }) => ({
  // 👇 this must match your GitHub repo name
  base: "/Protfolio/",
  server: {
    host: "::",
    port: 8088,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
