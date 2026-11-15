import { getCollection } from "astro:content";

import { clinicalParams } from "@/lib/content";

import type { CollectionEntry } from "astro:content";

export type Guide = CollectionEntry<"guias">;

/** Base de las URL de las guías. */
export const GUIDES_BASE = "/guias";

export function guideUrl(slug: string): string {
  return `${GUIDES_BASE}/${slug}`;
}

const requireClinicalReview = import.meta.env.REQUIRE_CLINICAL_REVIEW === "true";

let cache: Promise<Guide[]> | undefined;

/**
 * Guías ordenadas por `order`. Valida además lo que el esquema no puede ver solo:
 * que `related` apunte a guías que existen y, si REQUIRE_CLINICAL_REVIEW=true,
 * que todo esté revisado por la clínica.
 */
export function getGuides(): Promise<Guide[]> {
  cache ??= getCollection("guias").then((entries) => {
    const guides = entries.sort((a, b) => a.data.order - b.data.order);
    const slugs = new Set(guides.map((guide) => guide.data.slug));
    const errors: string[] = [];

    for (const guide of guides) {
      for (const related of guide.data.related) {
        if (!slugs.has(related)) errors.push(`${guide.data.slug}: related "${related}" no existe.`);
      }
      if (requireClinicalReview && guide.data.review.status !== "revisado") {
        errors.push(`${guide.data.slug}: falta revisión clínica (REQUIRE_CLINICAL_REVIEW=true).`);
      }
    }
    if (requireClinicalReview && clinicalParams.status !== "validado") {
      errors.push("clinical-params.json: los parámetros clínicos no están validados.");
    }
    if (errors.length > 0) throw new Error(`Contenido inválido:\n- ${errors.join("\n- ")}`);

    return guides;
  });
  return cache;
}
