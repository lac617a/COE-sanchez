import type { APIRoute } from "astro";

/** Solo producción se indexa; previews y local bloquean todo. */
export const GET: APIRoute = ({ site }) => {
  const isProduction = import.meta.env.PUBLIC_SITE_ENV === "production";
  const body = isProduction
    ? `User-agent: *\nAllow: /\nDisallow: /q/\n\nSitemap: ${new URL("sitemap-index.xml", site).href}\n`
    : "User-agent: *\nDisallow: /\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
