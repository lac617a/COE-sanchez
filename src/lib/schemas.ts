import { z } from "astro/zod";

/**
 * Esquemas de contenido de la guía de ortodoncia (antes en velite.config.ts).
 * Reglas clínicas: CLAUDE.md → "Reglas de contenido clínico".
 */

export const MAX_REVIEW_MONTHS = 12;

export const treatment = z.enum([
  "metalicos",
  "esteticos",
  "autoligables",
  "alineadores",
  "retenedor",
]);

const reviewer = z.object({
  name: z.string().min(3),
  specialty: z.string().min(3),
  license: z.string().min(3), // tarjeta profesional
});

export const review = z
  .discriminatedUnion("status", [
    z.object({ status: z.literal("pendiente") }),
    z.object({
      status: z.literal("revisado"),
      reviewedBy: reviewer,
      reviewedAt: z.coerce.date(),
      nextReview: z.coerce.date(),
    }),
  ])
  .superRefine((value, ctx) => {
    if (value.status !== "revisado") return;
    const limit = new Date(value.reviewedAt);
    limit.setMonth(limit.getMonth() + MAX_REVIEW_MONTHS);
    if (value.nextReview <= value.reviewedAt || value.nextReview > limit) {
      ctx.addIssue({
        code: "custom",
        message: `nextReview debe ser posterior a reviewedAt y como máximo ${MAX_REVIEW_MONTHS} meses después.`,
      });
    }
  });

export const source = z.object({
  title: z.string().min(3),
  publisher: z.string().min(2),
  url: z.url(),
});

export const guideSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  /** h1 visible en la página */
  title: z.string().min(3).max(70),
  /** <title> para buscadores */
  seoTitle: z.string().min(10).max(60),
  description: z.string().min(120).max(155),
  /** Frase corta bajo el h1 */
  lead: z.string().max(200).optional(),
  order: z.number().int(),
  treatments: z.array(treatment).min(1),
  related: z.array(z.string()).max(3).default([]),
  ogImage: z.string().optional(),
  review,
  sources: z.array(source).min(1),
});

export type Review = z.infer<typeof review>;
export type Source = z.infer<typeof source>;

export const foodSchema = z.object({
  id: z.string(),
  name: z.string(),
  verdict: z.enum(["si", "cuidado", "evitar"]),
  reason: z.string(),
  tip: z.string().optional(),
  /** Mancha brackets estéticos o ligas claras */
  stains: z.boolean().default(false),
});

export const emergencySchema = z.object({
  id: z.string(),
  title: z.string(),
  urgency: z.enum(["puede-esperar", "llama-pronto", "urgencias"]),
  icon: z.enum(["wire", "bracket", "band", "ligature", "elastic", "appliance", "pain", "medical"]),
  steps: z.array(z.string()).min(1),
  note: z.string().optional(),
  /** Mensaje prellenado para WhatsApp. Nunca datos del paciente: él decide qué agregar. */
  whatsappMessage: z.string().optional(),
  treatments: z.array(treatment).min(1),
});

export const colorSchema = z.object({
  id: z.string(),
  name: z.string(),
  hex: z.string().regex(/^#[0-9a-f]{6}$/i),
  effect: z.enum(["aclara", "neutro", "amarillea", "se-mancha", "parece-comida"]),
});

export const clinicalParamsSchema = z.object({
  status: z.enum(["provisional", "validado"]),
  brushingFrequency: z.string(),
  fluorideRinseTiming: z.string(),
  chewingGum: z.string(),
  appointmentInterval: z.string(),
  bracesDuration: z.string(),
  alignerHoursPerDay: z.number().int().min(20).max(24),
  alignerChange: z.string(),
  elasticsHours: z.string(),
  elasticsWhileEating: z.string(),
  elasticsChange: z.string(),
  retainerWear: z.string(),
  waxAmount: z.string(),
});

/** Herramientas del kit de higiene. Los textos pueden incluir {parametro} de clinical-params.json. */
export const hygieneToolSchema = z.object({
  id: z.enum([
    "v-brush",
    "interdental-brush",
    "threader",
    "toothpaste",
    "single-tuft",
    "electric-brush",
    "stiff-floss",
    "water-flosser",
    "mouthwash",
    "disclosing-tablets",
  ]),
  name: z.string(),
  group: z.enum(["basico", "extra"]),
  purpose: z.string(),
  steps: z.array(z.string()).default([]),
  when: z.string().optional(),
  replace: z.string().optional(),
  note: z.string().optional(),
  /** Guía relacionada, p. ej. "/guias/cepillado". */
  guide: z.string().startsWith("/guias/").optional(),
});

export const clinicSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  /** Marca del logo, p. ej. "COE Dental". */
  brandMark: z.string(),
  tagline: z.string(),
  doctors: z.array(z.object({ name: z.string(), specialty: z.string() })),
  website: z.url().optional(),
  address: z.object({
    street: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    region: z.string(),
    country: z.string().length(2),
  }),
  phone: z.string().optional(),
  /** Solo dígitos con indicativo, p. ej. 573001234567 (para wa.me). */
  whatsapp: z
    .string()
    .regex(/^\d{10,15}$/)
    .optional(),
  instagram: z.string().optional(),
  hours: z.string().optional(),
  /** Enlace estable al perfil de Google Maps (por CID). */
  mapsUrl: z.url().optional(),
  /** Nombre exacto del perfil de Google Business. */
  googleBusinessName: z.string().optional(),
  geo: z.object({ latitude: z.number(), longitude: z.number() }).optional(),
});
