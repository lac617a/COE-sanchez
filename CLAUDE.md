# CLAUDE.md — Sitio de la Clínica Odontológica Sánchez Quintero

@AGENTS.md

## Qué es este proyecto

Sitio web completo de la **Clínica Odontológica Sánchez Quintero** (marca del logo: COE Dental), Calle 33 # 28-18, La Aurora, Bucaramanga. Una sola web en Astro con:

- **Landing de la clínica:** `/`, `/quienes-somos`, `/especialidades` y `/especialidades/[slug]`.
- **Guía de ortodoncia para pacientes** (antes un proyecto Next.js aparte, en `../guia`): `/guias` y `/guias/[slug]`. El paciente llega escaneando un código QR en la clínica.

Las rutas antiguas de la guía (`/cepillado`, `/urgencias`…) redirigen a `/guias/…` (ver `redirects` en `astro.config.mjs`).

**Referencia visual:** [coedental.pe](https://coedental.pe/). Se toma solo el lenguaje visual y la estructura de secciones: portada negra con grano, títulos serif en cursiva, tarjetas grises redondeadas, botones píldora con flecha ↗ y bloques negros con cifras. **Nunca** se copian sus textos, fotos, cifras ni testimonios.

## Stack

| Capa      | Tecnología                                                                                                                                                                       |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework | Astro 7, salida estática. Node ≥ 22.23.4                                                                                                                                         |
| Estilos   | Tailwind CSS v4 (`@tailwindcss/vite`), tokens en `src/styles/global.css`                                                                                                         |
| Contenido | Guías en MDX (`src/content/guias`, colección `guias` en `src/content.config.ts`); datos en JSON (`src/data`) validados con Zod en `src/lib/content.ts`                           |
| Markdown  | Astro 7: los plugins de rehype van en `markdown.processor` (`unified` de `@astrojs/markdown-remark`), no en `mdx({...})`                                                         |
| Islas     | React solo donde hay interacción: buscador de alimentos (`client:visible`) y tamaño de letra (`client:idle`). El resto son componentes React o Astro renderizados sin JavaScript |
| Fuentes   | Autoalojadas con Fontsource: DM Serif Display (títulos) y Nunito Sans (texto)                                                                                                    |
| Iconos    | `lucide-react` (sin iconos de marca: Instagram está en `src/components/icons`)                                                                                                   |
| Paquetes  | pnpm 11                                                                                                                                                                          |

## Comandos

```bash
pnpm install
pnpm dev           # servidor de desarrollo (http://localhost:4321)
pnpm build         # valida el contenido y genera dist/
pnpm check         # astro check (requiere TypeScript 6; no admite TS 7)
pnpm format        # Prettier
```

Copie `.env.example` a `.env`. Variables: `PUBLIC_SITE_URL`, `PUBLIC_SITE_ENV` (solo `production` se indexa) y `REQUIRE_CLINICAL_REVIEW` (`true` hace fallar el build con contenido sin revisar).

## Estructura

```
src/
  content/guias/*.mdx      # guías (frontmatter validado por guideSchema)
  data/                    # clinic.json, foods.json, emergencies.json… y services.ts (especialidades)
  lib/                     # schemas (Zod), content (JSON validado), guides (colección), site, seo, nav
  components/
    content/               # piezas del MDX (Callout, Cards, Card, FoodGuide…) y avisos clínicos
    illustrations/         # SVG en React (sin JavaScript en el navegador)
    interactive/           # islas de React
    landing/               # PageHero, ServiceCard, PhotoSlot, ArrowLink…
    layout/                # SiteHeader (con menú del celular), SiteFooter, QuickAccessBar
  pages/                   # rutas
```

## Fotos

`PhotoSlot` muestra un hueco con el mismo marco mientras no haya foto; en desarrollo dice qué foto falta. Solo fotos reales de la clínica y con permiso de quien aparece. **No usar fotos de stock.** Las fotos van en `src/assets/` y se pasan con `src={...}`.

## Reglas de contenido (críticas)

1. **Guías:** se aplican todas las reglas de contenido clínico de `../guia/CLAUDE.md` (no inventar datos clínicos, valores discutidos con `<Param />`, nada de fármacos ni dosis, metadatos `review` y `sources` obligatorios, `ClinicalDisclaimer` y `ReviewStamp` en cada guía). Solo la Dra. Lorena Sánchez Lázaro marca una guía como `revisado`.
2. **Especialidades (`src/data/services.ts`):** son un **borrador** basado en los servicios que publica la clínica en odontosanchezquintero.com. La clínica debe revisarlos antes de publicar.
3. **Publicidad odontológica (Ley 35 de 1989, arts. 51 a 53):** nada de precios, promociones, "garantizado", antes y después, testimonios ni comparaciones con otros consultorios. Las cifras de la portada salen de los datos del sitio, no se inventan.
4. **Formularios:** no recoger datos personales. El contacto es por WhatsApp o teléfono; los mensajes prellenados nunca incluyen datos del paciente.

## Estilo de redacción

Español de Colombia, trato de **usted** en todo el sitio (también en la landing). Frases cortas, tono cálido y claro. Vocabulario y terminología: ver `../guia/CLAUDE.md`.
