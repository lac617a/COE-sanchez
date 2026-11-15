/**
 * Especialidades de la clínica (páginas /especialidades/[slug]).
 *
 * Fuente: la lista de servicios de odontosanchezquintero.com (noviembre 2026), reescrita.
 * BORRADOR: la clínica debe revisar cada texto antes de publicar.
 * Publicidad odontológica (Ley 35 de 1989, arts. 51 a 53): nada de precios, promociones,
 * "garantizado", antes y después, testimonios ni comparaciones con otros consultorios.
 */

export type ServiceCategory = "ortodoncia" | "estetica" | "integral";

export type Service = {
  slug: string;
  category: ServiceCategory;
  title: string;
  /** Frase corta para tarjetas (máx. ~110 caracteres). */
  summary: string;
  /** Párrafo de la portada de la especialidad. */
  intro: string;
  /** <meta description> (120 a 155 caracteres). */
  description: string;
  icon:
    "aligner" | "bracket" | "flow" | "metal" | "digital" | "detail" | "veneer" | "print" | "care";
  steps: Array<{ title: string; text: string }>;
  benefits: Array<{ title: string; text: string }>;
  faqs: Array<{ q: string; a: string }>;
  /** Guías de cuidado relacionadas (slugs de src/content/guias). */
  guides: string[];
};

export const CATEGORIES: Record<ServiceCategory, { title: string; lead: string }> = {
  ortodoncia: {
    title: "Ortodoncia",
    lead: "Alineadores y brackets para corregir la posición de los dientes y la mordida.",
  },
  estetica: {
    title: "Estética dental",
    lead: "Diseño de sonrisa y lentes dentales planificados con tecnología digital.",
  },
  integral: {
    title: "Odontología integral",
    lead: "Atención general y especializada para el cuidado de toda la boca.",
  },
};

/** Preguntas comunes a todas las especialidades. Sin datos que la clínica no haya confirmado. */
const COMMON_FAQS = [
  {
    q: "¿Necesito una valoración antes de empezar?",
    a: "Sí. En la primera cita el especialista revisa su caso, le explica las opciones que tiene y resuelve sus dudas antes de decidir un tratamiento.",
  },
  {
    q: "¿Cómo pido una cita?",
    a: "Escríbanos por WhatsApp o llámenos. Atendemos de lunes a sábado, solo con cita.",
  },
  {
    q: "¿Puedo pedir la cita para un familiar?",
    a: "Sí. Escríbanos con el nombre de la persona y le ayudamos a encontrar un horario.",
  },
];

const ORTHO_STEPS = [
  {
    title: "Valoración y diagnóstico",
    text: "Revisamos sus dientes, su mordida y los estudios necesarios para planear el tratamiento.",
  },
  {
    title: "Plan a su medida",
    text: "Le explicamos qué aparato conviene en su caso, cuánto tiempo puede tomar y cómo cuidarlo.",
  },
  {
    title: "Controles periódicos",
    text: "En cada cita de control revisamos el avance y hacemos los ajustes necesarios.",
  },
];

export const services: Service[] = [
  {
    slug: "ortodoncia-invisible",
    category: "ortodoncia",
    title: "Ortodoncia invisible AlineaPro",
    summary: "Alineadores transparentes y removibles, de AlineaPro, la marca propia de la clínica.",
    intro:
      "AlineaPro es nuestra propia marca de alineadores: placas transparentes, hechas a la medida, que mueven los dientes poco a poco sin brackets ni alambres.",
    description:
      "Ortodoncia invisible con AlineaPro, los alineadores transparentes de la Clínica Odontológica Sánchez Quintero en Bucaramanga, hechos a la medida.",
    icon: "aligner",
    steps: [
      ORTHO_STEPS[0],
      {
        title: "Escaneo y plan digital",
        text: "Con tecnología 3D planificamos el movimiento de los dientes y fabricamos sus alineadores en nuestro laboratorio.",
      },
      {
        title: "Cambio de alineadores",
        text: "Usted cambia de alineador según la indicación de su ortodoncista y viene a sus controles.",
      },
    ],
    benefits: [
      {
        title: "Casi no se notan",
        text: "Son transparentes y se adaptan a la forma de sus dientes.",
      },
      { title: "Se pueden retirar", text: "Se quitan para comer y para cepillarse." },
      {
        title: "Hechos en casa",
        text: "Se diseñan y fabrican en el laboratorio propio de la clínica.",
      },
      { title: "Plan digital", text: "Puede ver el plan de movimiento antes de empezar." },
    ],
    faqs: [
      {
        q: "¿Cuántas horas al día debo usarlos?",
        a: "Su ortodoncista le indicará cuántas horas al día usarlos. Para que funcionen, hay que llevarlos puestos casi todo el día.",
      },
      ...COMMON_FAQS,
    ],
    guides: [],
  },
  {
    slug: "ortodoncia-autoligado",
    category: "ortodoncia",
    title: "Ortodoncia de autoligado",
    summary: "Brackets con un cierre propio que sujeta el arco, sin necesidad de ligas.",
    intro:
      "Los brackets de autoligado tienen una pequeña compuerta que sujeta el arco. Como no usan ligas, se acumula menos comida a su alrededor.",
    description:
      "Ortodoncia de autoligado en Bucaramanga: brackets que sujetan el arco con su propio cierre, sin ligas. Valoración en la Clínica Sánchez Quintero.",
    icon: "bracket",
    steps: ORTHO_STEPS,
    benefits: [
      { title: "Sin ligas", text: "El arco queda sujeto por el cierre del bracket." },
      { title: "Más fácil de limpiar", text: "Hay menos lugares donde se esconde la comida." },
      { title: "Menos fricción", text: "El arco se desliza con menos roce dentro del bracket." },
      { title: "Controles a su medida", text: "Su ortodoncista define cada cuánto debe venir." },
    ],
    faqs: COMMON_FAQS,
    guides: ["primeros-dias", "cepillado", "alimentos"],
  },
  {
    slug: "flow-jac-system",
    category: "ortodoncia",
    title: "Flow Jac System",
    summary:
      "Sistema de ortodoncia que busca movimientos dentales controlados, con estética y comodidad.",
    intro:
      "Flow Jac es un sistema de ortodoncia pensado para mover los dientes de forma controlada, cuidando la estética y la comodidad durante el tratamiento.",
    description:
      "Flow Jac System en Bucaramanga: sistema de ortodoncia para movimientos dentales controlados. Valoración en la Clínica Odontológica Sánchez Quintero.",
    icon: "flow",
    steps: ORTHO_STEPS,
    benefits: [
      { title: "Movimientos controlados", text: "El plan define cómo se mueve cada diente." },
      { title: "Estética", text: "Pensado para que el tratamiento se note poco." },
      { title: "Comodidad", text: "Busca que el día a día con el aparato sea más llevadero." },
      { title: "Seguimiento cercano", text: "Revisamos el avance en cada cita de control." },
    ],
    faqs: COMMON_FAQS,
    guides: ["primeros-dias", "cepillado", "alimentos"],
  },
  {
    slug: "ortodoncia-convencional",
    category: "ortodoncia",
    title: "Ortodoncia convencional",
    summary:
      "Brackets metálicos: la opción clásica para alinear los dientes y corregir la mordida.",
    intro:
      "Los brackets metálicos se pegan a cada diente y se unen con un arco. Con controles periódicos, el arco guía los dientes hasta su nueva posición.",
    description:
      "Ortodoncia convencional con brackets metálicos en Bucaramanga. Valoración, plan de tratamiento y controles en la Clínica Odontológica Sánchez Quintero.",
    icon: "metal",
    steps: ORTHO_STEPS,
    benefits: [
      { title: "Opción clásica", text: "Es el tipo de brackets más usado en ortodoncia." },
      { title: "Resistentes", text: "El metal soporta bien el uso diario." },
      { title: "Ligas de colores", text: "Puede elegir el color de sus ligas en cada control." },
      {
        title: "Guías de cuidado",
        text: "Le acompañamos con guías para cuidar sus brackets en casa.",
      },
    ],
    faqs: COMMON_FAQS,
    guides: ["primeros-dias", "cepillado", "urgencias"],
  },
  {
    slug: "diseno-de-sonrisa-digital",
    category: "estetica",
    title: "Diseño de sonrisa digital",
    summary: "Planificamos su sonrisa en la computadora para que pueda verla antes de empezar.",
    intro:
      "Con fotos, escaneo y programas de diseño, planificamos los cambios de su sonrisa y le mostramos una simulación antes de iniciar el tratamiento.",
    description:
      "Diseño de sonrisa digital en Bucaramanga: planificación con fotos y escaneo 3D para ver una simulación antes de empezar. Clínica Sánchez Quintero.",
    icon: "digital",
    steps: [
      {
        title: "Fotos y escaneo",
        text: "Tomamos fotos de su cara y un escaneo 3D de sus dientes.",
      },
      {
        title: "Diseño digital",
        text: "Planificamos forma, tamaño y proporción de los dientes en la computadora.",
      },
      {
        title: "Prueba y ajustes",
        text: "Revisamos el diseño con usted y lo ajustamos antes de empezar.",
      },
    ],
    benefits: [
      { title: "Ver antes de empezar", text: "Una simulación le ayuda a decidir con calma." },
      { title: "A su medida", text: "El diseño parte de su cara y de sus dientes." },
      { title: "Precisión", text: "El escaneo 3D reduce los moldes tradicionales." },
      { title: "Laboratorio propio", text: "El diseño pasa directo a nuestro laboratorio." },
    ],
    faqs: COMMON_FAQS,
    guides: [],
  },
  {
    slug: "microdiseno-de-sonrisa",
    category: "estetica",
    title: "Microdiseño de sonrisa",
    summary:
      "Corrección de pequeños detalles de forma y tamaño con técnicas mínimamente invasivas.",
    intro:
      "El microdiseño corrige detalles pequeños, como bordes desgastados, espacios o diferencias de tamaño, cuidando al máximo el diente natural.",
    description:
      "Microdiseño de sonrisa en Bucaramanga: corrección de pequeños detalles de forma y tamaño con técnicas mínimamente invasivas. Clínica Sánchez Quintero.",
    icon: "detail",
    steps: [
      {
        title: "Valoración",
        text: "Revisamos qué detalles le gustaría cambiar y si es posible hacerlo.",
      },
      { title: "Plan", text: "Le explicamos la técnica indicada y qué esperar." },
      { title: "Tratamiento", text: "Hacemos los ajustes cuidando el diente natural." },
    ],
    benefits: [
      { title: "Mínimamente invasivo", text: "Se busca conservar la mayor parte del diente." },
      { title: "Detalles finos", text: "Para cambios pequeños en forma y tamaño." },
      { title: "Planificado", text: "Puede combinarse con el diseño de sonrisa digital." },
      { title: "Natural", text: "El objetivo es una sonrisa que se vea propia." },
    ],
    faqs: COMMON_FAQS,
    guides: [],
  },
  {
    slug: "lentes-ceramicos",
    category: "estetica",
    title: "Lentes cerámicos",
    summary: "Carillas delgadas de cerámica que cubren la cara visible del diente.",
    intro:
      "Los lentes cerámicos son láminas delgadas de cerámica que se adhieren a la cara visible del diente para cambiar su color, forma o tamaño.",
    description:
      "Lentes cerámicos (carillas de cerámica) en Bucaramanga, planificados con diseño digital y laboratorio propio. Clínica Odontológica Sánchez Quintero.",
    icon: "veneer",
    steps: [
      {
        title: "Valoración y diseño",
        text: "Revisamos sus dientes y planificamos el resultado con usted.",
      },
      { title: "Preparación", text: "Preparamos los dientes según el plan y tomamos un escaneo." },
      { title: "Colocación", text: "Adherimos los lentes y revisamos la mordida." },
    ],
    benefits: [
      { title: "Material estable", text: "La cerámica mantiene bien su color con el tiempo." },
      { title: "Aspecto natural", text: "Imita la translucidez del esmalte." },
      { title: "Planificados", text: "Se diseñan antes de fabricarse." },
      { title: "Cuidado sencillo", text: "Se cepillan y se limpian como los dientes naturales." },
    ],
    faqs: COMMON_FAQS,
    guides: [],
  },
  {
    slug: "lentes-ceromeros-impresos-3d",
    category: "estetica",
    title: "Lentes de cerómero impresos en 3D",
    summary: "Carillas de cerómero diseñadas digitalmente e impresas en 3D en nuestro laboratorio.",
    intro:
      "Los lentes de cerómero se diseñan en la computadora y se imprimen en 3D en el laboratorio de la clínica, a partir del escaneo de sus dientes.",
    description:
      "Lentes de cerómero impresos en 3D en Bucaramanga, diseñados digitalmente y fabricados en laboratorio propio. Clínica Odontológica Sánchez Quintero.",
    icon: "print",
    steps: [
      { title: "Escaneo 3D", text: "Registramos la forma exacta de sus dientes." },
      {
        title: "Diseño e impresión",
        text: "Diseñamos los lentes y los imprimimos en nuestro laboratorio.",
      },
      { title: "Colocación", text: "Los adherimos y revisamos la mordida." },
    ],
    benefits: [
      { title: "Impresión 3D", text: "Fabricados a partir de un diseño digital." },
      { title: "Laboratorio propio", text: "Todo el proceso ocurre en la clínica." },
      { title: "A la medida", text: "Parten del escaneo de sus propios dientes." },
      { title: "Planificados", text: "Puede ver el diseño antes de fabricarlos." },
    ],
    faqs: COMMON_FAQS,
    guides: [],
  },
  {
    slug: "odontologia-especializada",
    category: "integral",
    title: "Odontología especializada",
    summary: "Odontología general y especializada: endodoncia, implantes, estética y más.",
    intro:
      "Además de ortodoncia y estética, atendemos las necesidades generales y especializadas de su boca, como endodoncia e implantes.",
    description:
      "Odontología general y especializada en Bucaramanga: endodoncia, implantes, estética y más, en la Clínica Odontológica Sánchez Quintero.",
    icon: "care",
    steps: [
      { title: "Valoración", text: "Revisamos su boca y le explicamos qué necesita." },
      { title: "Plan de tratamiento", text: "Ordenamos los tratamientos según lo más urgente." },
      { title: "Seguimiento", text: "Le acompañamos con controles para mantener su salud oral." },
    ],
    benefits: [
      { title: "Todo en un lugar", text: "Varias especialidades en la misma clínica." },
      { title: "Diagnóstico completo", text: "Vemos su boca como un todo." },
      { title: "Tecnología 3D", text: "Apoyo digital en diagnóstico y planificación." },
      { title: "Acompañamiento", text: "Le explicamos cada paso con calma." },
    ],
    faqs: COMMON_FAQS,
    guides: [],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function servicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((service) => service.category === category);
}
