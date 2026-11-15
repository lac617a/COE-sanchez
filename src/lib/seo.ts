import { clinic } from "@/lib/content";
import { guideUrl } from "@/lib/guides";
import { absoluteUrl, site } from "@/lib/site";

import type { Service } from "@/data/services";
import type { Guide } from "@/lib/guides";

type JsonLd = Record<string, unknown>;

export function medicalWebPageJsonLd(guide: Guide): JsonLd {
  const { data } = guide;
  const reviewed =
    data.review.status === "revisado"
      ? {
          lastReviewed: data.review.reviewedAt.toISOString().slice(0, 10),
          reviewedBy: {
            "@type": "Person",
            name: data.review.reviewedBy.name,
            jobTitle: data.review.reviewedBy.specialty,
          },
        }
      : {};

  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: data.title,
    headline: data.title,
    description: data.description,
    url: absoluteUrl(guideUrl(data.slug)),
    inLanguage: "es",
    audience: { "@type": "PeopleAudience", audienceType: "Pacientes de ortodoncia" },
    isPartOf: { "@type": "WebSite", name: site.name, url: absoluteUrl() },
    citation: data.sources.map((source) => source.url),
    ...reviewed,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** SEO local: consultorio dental (subtipo de LocalBusiness). */
export function dentistJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: clinic.name,
    alternateName: clinic.brandMark,
    url: absoluteUrl(),
    ...(clinic.website ? { sameAs: [clinic.website] } : {}),
    ...(clinic.phone ? { telephone: clinic.phone.replace(/\s/g, "") } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.street,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.region,
      addressCountry: clinic.address.country,
    },
    ...(clinic.geo
      ? { geo: { "@type": "GeoCoordinates", ...clinic.geo }, hasMap: clinic.mapsUrl }
      : {}),
    ...(clinic.hours ? { description: `Atención: ${clinic.hours}` } : {}),
  };
}

export function serviceJsonLd(service: Service, path: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.title,
    description: service.description,
    url: absoluteUrl(path),
    provider: { "@type": "Dentist", name: clinic.name, url: absoluteUrl() },
  };
}

export function faqJsonLd(faqs: Array<{ q: string; a: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: absoluteUrl(),
    description: site.description,
    inLanguage: "es",
  };
}
