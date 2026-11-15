import bracesPhoto from "@/assets/brand/ortodoncia-brackets.jpg";
import drJose from "@/assets/fotos/dr-jose-david-quintero.jpg";
import draLorena from "@/assets/fotos/dra-lorena-sanchez.jpg";
import pacienteEstetica from "@/assets/fotos/paciente-estetica.jpg";
import pacienteOrtodoncia from "@/assets/fotos/paciente-ortodoncia.jpg";
import sonrisaEstetica from "@/assets/fotos/sonrisa-estetica.jpg";
import sonrisaIntraoral from "@/assets/fotos/sonrisa-intraoral.jpg";

import type { ImageMetadata } from "astro";

/**
 * Fotos de la clínica (del Instagram @od.sanchezquintero, entregadas por la clínica).
 * Recortadas para quitar el disfraz de Halloween y las fotos comparativas de antes y después
 * (Ley 35 de 1989). Las de pacientes requieren su autorización escrita para usarse en la web.
 */
export type Photo = { src: ImageMetadata; alt: string; position?: string };

export const PHOTOS = {
  drJose: {
    src: drJose,
    alt: "El Dr. José David Quintero atiende a una paciente en el consultorio.",
    position: "50% 35%",
  },
  draLorena: {
    src: draLorena,
    alt: "La Dra. Lorena Sánchez Lázaro atiende a una paciente en el consultorio.",
    position: "50% 30%",
  },
  pacienteOrtodoncia: {
    src: pacienteOrtodoncia,
    alt: "Paciente de la clínica sonriendo con brackets.",
    position: "50% 55%",
  },
  pacienteEstetica: {
    src: pacienteEstetica,
    alt: "Paciente de la clínica sonriendo después de su tratamiento de estética dental.",
    position: "50% 60%",
  },
  sonrisaEstetica: {
    src: sonrisaEstetica,
    alt: "Primer plano de una sonrisa tratada en la clínica.",
  },
  sonrisaIntraoral: {
    src: sonrisaIntraoral,
    alt: "Vista de cerca de los dientes superiores de un paciente de estética dental.",
  },
  brackets: {
    src: bracesPhoto,
    alt: "Brackets metálicos con arco y ligas de color.",
  },
} satisfies Record<string, Photo>;

/** Foto de cada especialidad (si no hay, se ve el hueco con marco). */
export const SERVICE_PHOTOS: Partial<Record<string, Photo>> = {
  "ortodoncia-autoligado": PHOTOS.pacienteOrtodoncia,
  "flow-jac-system": PHOTOS.pacienteOrtodoncia,
  "ortodoncia-convencional": PHOTOS.brackets,
  "diseno-de-sonrisa-digital": PHOTOS.pacienteEstetica,
  "microdiseno-de-sonrisa": PHOTOS.sonrisaEstetica,
  "lentes-ceramicos": PHOTOS.sonrisaIntraoral,
  "lentes-ceromeros-impresos-3d": PHOTOS.sonrisaEstetica,
  "odontologia-especializada": PHOTOS.drJose,
};
