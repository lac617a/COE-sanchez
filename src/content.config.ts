import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

import { guideSchema } from "@/lib/schemas";

/** Guías de cuidado (MDX). Se publican en /guias/[slug]. */
const guias = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/guias" }),
  schema: guideSchema,
});

export const collections = { guias };
