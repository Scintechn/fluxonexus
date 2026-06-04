export const business = {
  legalName: "FluxoNexus Logística Integrada, Lda.",
  brandName: "FluxoNexus",
  tagline: "Logística Integrada",
  siteUrl: "https://fluxonexus.pt",
  foundedYear: 2024,

  address: {
    street: "Avenida 25 de Abril",
    locality: "Viana do Castelo",
    region: "Viana do Castelo",
    postalCode: "4900-194",
    country: "PT",
  },

  email: {
    display: "consultoria@fluxonexus.pt",
    href: "mailto:consultoria@fluxonexus.pt",
  },

  phone: {
    display: "+351 258 000 000",
    href: "tel:+351258000000",
  },

  whatsapp: {
    display: "+351 910 000 000",
    number: "351910000000",
  },

  hours: {
    weekdays: { open: "09:00", close: "18:00" },
    weekendClosed: true,
  },

  geo: { lat: 41.6932, lng: -8.8312 },
  mapDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Viana+do+Castelo,+Portugal",
  mapEmbedSrc:
    "https://www.openstreetmap.org/export/embed.html?bbox=-8.8512%2C41.6832%2C-8.8112%2C41.7032&layer=mapnik&marker=41.6932%2C-8.8312",

  social: {
    linkedin: "https://www.linkedin.com/company/fluxonexus",
    instagram: "https://www.instagram.com/fluxonexus",
    facebook: "https://www.facebook.com/fluxonexus",
  },

  team: [
    {
      name: "Carlos A.",
      role: "Especialista em Transportes",
      bio: "Lidera o desenho de soluções de transporte multimodal e a otimização de rotas e cargas.",
      initials: "CA",
    },
    {
      name: "Melissa A.",
      role: "Analista de Processos Logísticos",
      bio: "Mapeia processos ponta a ponta e identifica oportunidades de eficiência operacional.",
      initials: "MA",
    },
    {
      name: "Paloma S.",
      role: "Consultora de Fluxos de Informação",
      bio: "Integra ERP, WMS e TMS para garantir rastreabilidade e visibilidade em tempo real.",
      initials: "PS",
    },
    {
      name: "Daniela M.",
      role: "Gestora de Qualidade e Incidentes",
      bio: "Estrutura tratamento de reclamações, análise de causa raiz e planos de ação corretiva.",
      initials: "DM",
    },
  ],
} as const;

export type Business = typeof business;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${business.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function addressOneLine() {
  const a = business.address;
  return `${a.street}, ${a.postalCode} ${a.locality}, ${a.country}`;
}
