// @ts-check
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import { rehypeSections } from "./src/lib/rehype-sections.mjs";

// astro.config no lee .env por sí solo: se carga aquí (ver .env.example).
// Las variables ya definidas en el entorno (CI, hosting) tienen prioridad.
try {
  process.loadEnvFile(".env");
} catch {
  // Sin .env: se usan las variables del entorno.
}
const env = process.env;

export default defineConfig({
  site: (env.PUBLIC_SITE_URL ?? "http://localhost:4321").replace(/\/$/, ""),
  integrations: [react(), mdx(), sitemap({ filter: (page) => !page.includes("/q/") })],
  // Astro 7: los plugins de rehype van en el procesador; el MDX lo hereda.
  markdown: { processor: unified({ rehypePlugins: [rehypeSections] }) },
  vite: { plugins: [tailwindcss()] },
  // Rutas antiguas de la guía (cuando vivía en la raíz) → /guias. Los QR impresos siguen sirviendo.
  redirects: {
    "/primeros-dias": "/guias/primeros-dias",
    "/cepillado": "/guias/cepillado",
    "/kit-de-higiene": "/guias/kit-de-higiene",
    "/alimentos": "/guias/alimentos",
    "/urgencias": "/guias/urgencias",
  },
});
