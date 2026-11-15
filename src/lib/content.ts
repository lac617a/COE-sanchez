import { z } from "astro/zod";

import clinicJson from "@/data/clinic.json";
import clinicalParamsJson from "@/data/clinical-params.json";
import colorsJson from "@/data/colors.json";
import emergenciesJson from "@/data/emergencies.json";
import foodsJson from "@/data/foods.json";
import hygieneToolsJson from "@/data/hygiene-tools.json";
import {
  clinicalParamsSchema,
  clinicSchema,
  colorSchema,
  emergencySchema,
  foodSchema,
  hygieneToolSchema,
} from "@/lib/schemas";

/**
 * Datos de la clínica y de la guía (src/data/*.json), validados con Zod al compilar:
 * un error de esquema hace fallar `astro build`. Este módulo no usa astro:content,
 * así que lo pueden importar también los componentes de React.
 */

/** Lista con ids únicos (antes s.unique de Velite). */
function uniqueList<T extends z.ZodType<{ id: string }>>(schema: T, name: string) {
  return z.array(schema).superRefine((items, ctx) => {
    const seen = new Set<string>();
    for (const item of items) {
      if (seen.has(item.id))
        ctx.addIssue({ code: "custom", message: `${name}: id repetido "${item.id}"` });
      seen.add(item.id);
    }
  });
}

function parse<T extends z.ZodType>(schema: T, data: unknown, file: string): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Contenido inválido en src/data/${file}:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const clinic = parse(clinicSchema, clinicJson, "clinic.json");
export const clinicalParams = parse(
  clinicalParamsSchema,
  clinicalParamsJson,
  "clinical-params.json",
);
export const colors = parse(uniqueList(colorSchema, "colors"), colorsJson, "colors.json");
export const emergencies = parse(
  uniqueList(emergencySchema, "emergencies"),
  emergenciesJson,
  "emergencies.json",
);
export const foods = parse(uniqueList(foodSchema, "foods"), foodsJson, "foods.json");
export const hygieneTools = parse(
  z.array(hygieneToolSchema),
  hygieneToolsJson,
  "hygiene-tools.json",
);

export type Clinic = typeof clinic;
export type ClinicalParams = typeof clinicalParams;
export type LigatureColor = (typeof colors)[number];
export type Emergency = (typeof emergencies)[number];
export type Food = (typeof foods)[number];
export type HygieneTool = (typeof hygieneTools)[number];

/** Reemplaza {parametro} por su valor en clinical-params.json. */
export function fillParams(text: string): string {
  return text.replace(/\{(\w+)\}/g, (_, name: string) => {
    if (!(name in clinicalParams)) throw new Error(`Parámetro clínico desconocido: {${name}}`);
    return String(clinicalParams[name as keyof ClinicalParams]);
  });
}

// Los marcadores {parametro} de hygiene-tools.json deben existir en clinical-params.json.
for (const tool of hygieneTools) {
  [tool.purpose, tool.when, tool.replace, tool.note, ...tool.steps]
    .filter((text): text is string => Boolean(text))
    .forEach(fillParams);
}
