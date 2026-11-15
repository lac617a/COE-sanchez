import { clinic } from "@/lib/content";

export const site = {
  name: clinic.shortName,
  legalName: clinic.name,
  guideProduct: "Guía de ortodoncia",
  description: `${clinic.name}, en Bucaramanga: ortodoncia y estética dental con laboratorio propio y tecnología 3D. Incluye guías de cuidado para pacientes de ortodoncia.`,
  guideDescription: `Guía visual de ${clinic.name} para pacientes de ortodoncia: cómo cepillarse con brackets, qué comer y qué hacer si algo se rompe.`,
  url: (import.meta.env.SITE ?? "http://localhost:4321").replace(/\/$/, ""),
  locale: "es_CO",
  isProduction: import.meta.env.PUBLIC_SITE_ENV === "production",
} as const;

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path === "/" ? "" : path}`;
}

export function clinicAddressLine(): string {
  const { street, neighborhood, city } = clinic.address;
  return `${street}, ${neighborhood}, ${city}`;
}

/** Enlace de WhatsApp de la clínica. El mensaje nunca incluye datos del paciente. */
export function clinicWhatsappUrl(
  message = "Hola, quisiera información sobre una cita.",
): string | null {
  if (!clinic.whatsapp) return null;
  return `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function clinicPhoneUrl(): string | null {
  return clinic.phone ? `tel:${clinic.phone.replace(/\s/g, "")}` : null;
}

export function clinicInstagramUrl(): string | null {
  return clinic.instagram
    ? `https://www.instagram.com/${clinic.instagram.replace(/^@/, "")}/`
    : null;
}

/** Enlace "Cómo llegar": usa el de Google Business si existe; si no, busca la dirección. */
export function clinicMapsUrl(): string {
  if (clinic.mapsUrl) return clinic.mapsUrl;
  const { street, city, region } = clinic.address;
  const query = encodeURIComponent(`${clinic.name}, ${street}, ${city}, ${region}, Colombia`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
