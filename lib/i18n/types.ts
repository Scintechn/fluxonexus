export type ServiceKey = "costs" | "operations" | "information" | "incidents";

export interface ServiceCopy {
  id: ServiceKey;
  title: string;
  hook: string;
  description: string;
  items: string[];
}

export interface Dictionary {
  meta: {
    siteTitle: string;
    siteDescription: string;
    home: { title: string; description: string };
    about: { title: string; description: string };
    services: { title: string; description: string };
    contact: { title: string; description: string };
  };
  nav: {
    home: string;
    services: string;
    about: string;
    contact: string;
    cta: string;
    skipToContent: string;
  };
  home: {
    eyebrow: string;
    h1Lead: string;
    h1Highlight: string;
    sub: string;
    primaryCta: string;
    secondaryCta: string;
    metrics: { label: string; value: string }[];
    pillarsTitle: string;
    pillarsSub: string;
    servicesTitle: string;
    servicesSub: string;
    casesTitle: string;
    casesSub: string;
    cases: { tag: string; company: string; headline: string; body: string; kpi: string }[];
    finalCtaTitle: string;
    finalCtaSub: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    mission: { title: string; body: string };
    vision: { title: string; body: string };
    valuesTitle: string;
    values: { title: string; body: string }[];
    teamTitle: string;
    teamSub: string;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    items: ServiceCopy[];
    ctaTitle: string;
    ctaBody: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    form: {
      name: string;
      email: string;
      company: string;
      message: string;
      consent: string;
      submit: string;
      submitting: string;
      success: string;
      errorGeneric: string;
      errorValidation: string;
      placeholderName: string;
      placeholderEmail: string;
      placeholderCompany: string;
      placeholderMessage: string;
    };
    sidebar: {
      emailTitle: string;
      phoneTitle: string;
      addressTitle: string;
      hoursTitle: string;
      hoursValue: string;
      hoursClosed: string;
      socialTitle: string;
    };
  };
  footer: {
    rights: string;
    description: string;
    nav: string;
    legal: string;
    privacy: string;
    terms: string;
  };
}
