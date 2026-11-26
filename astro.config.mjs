import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://altair-bueno.github.io",
  integrations: [svelte()],
  vite: { plugins: [tailwindcss()] },
});
