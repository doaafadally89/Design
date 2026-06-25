import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// One-off build of the Opportunities prototype for GitHub Pages.
export default defineConfig({
  base: "/Design/opportunities/",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: {
    outDir: "opp-dist",
    emptyOutDir: true,
    rollupOptions: { input: path.resolve(__dirname, "opportunities.html") },
  },
})
