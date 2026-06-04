import type { Dictionary } from "./types";

export const pt: Dictionary = {
  meta: {
    siteTitle: "FluxoNexus — Logística Integrada",
    siteDescription:
      "Consultoria em logística integrada: otimização de transportes, redução de custos, fluxos de informação e gestão de incidentes.",
    home: {
      title: "FluxoNexus — Consultoria em Logística Integrada",
      description:
        "Soluções inteligentes para otimizar transportes, reduzir custos e elevar o desempenho da cadeia logística.",
    },
    about: {
      title: "Sobre nós — FluxoNexus",
      description:
        "Missão, visão, valores e equipa da FluxoNexus, consultora em logística integrada sediada em Viana do Castelo.",
    },
    services: {
      title: "Serviços — FluxoNexus",
      description:
        "Análise e redução de custos de transporte, otimização operacional, fluxos de informação e gestão de incidentes.",
    },
    contact: {
      title: "Contactos — FluxoNexus",
      description:
        "Fale com a equipa FluxoNexus em Viana do Castelo. Diagnóstico inicial gratuito para a sua operação logística.",
    },
  },

  nav: {
    home: "Início",
    services: "Serviços",
    about: "Sobre nós",
    contact: "Contactos",
    cta: "Falar com a equipa",
    skipToContent: "Saltar para o conteúdo",
  },

  home: {
    eyebrow: "Consultoria em Logística Integrada",
    h1Lead: "Conectamos cada elo da",
    h1Highlight: "sua cadeia logística",
    sub: "A FluxoNexus oferece soluções inteligentes para otimizar transportes, reduzir custos e elevar o desempenho da sua cadeia logística — do planeamento ao indicador de desempenho.",
    primaryCta: "Marcar diagnóstico",
    secondaryCta: "Ver serviços",
    metrics: [
      { value: "−18%", label: "custos de transporte" },
      { value: "+25%", label: "eficiência das entregas" },
      { value: "−40%", label: "reclamações operacionais" },
      { value: "4", label: "áreas de especialização" },
    ],
    pillarsTitle: "Quatro pilares, uma operação integrada",
    pillarsSub:
      "Cada serviço da FluxoNexus corresponde diretamente a um dos quatro aspetos fundamentais de uma cadeia logística moderna: custo, operação, informação e qualidade.",
    servicesTitle: "Onde podemos atuar",
    servicesSub:
      "Soluções modulares que se adaptam à sua maturidade logística — do diagnóstico inicial à implementação de tecnologia (TMS, WMS, ERP).",
    casesTitle: "Resultados em casos reais",
    casesSub:
      "Pequenas histórias, métricas claras. O impacto sentido pelas equipas de operações e pelos clientes finais.",
    cases: [
      {
        tag: "Redução de Custos",
        company: "Empresa X",
        headline: "Consolidação de cargas e otimização de rotas",
        body: "Redesenho de rotas e consolidação inteligente reduziram o custo unitário por entrega de forma transversal a três rotas críticas.",
        kpi: "−18% custos de transporte",
      },
      {
        tag: "Eficiência Operacional",
        company: "Empresa Y",
        headline: "TMS e monitorização em tempo real",
        body: "Implementação de um Transport Management System com visibilidade total da frota permitiu antecipar atrasos e reagir em minutos.",
        kpi: "+25% eficiência das entregas",
      },
      {
        tag: "Qualidade e Satisfação",
        company: "Empresa Z",
        headline: "Reestruturação do processo de incidentes",
        body: "Análise de causa raiz, planos de ação e KPIs de qualidade reduziram drasticamente o volume de reclamações de clientes.",
        kpi: "−40% reclamações",
      },
    ],
    finalCtaTitle: "Vamos transformar a sua operação?",
    finalCtaSub:
      "Marcamos uma conversa de 30 minutos para perceber o seu contexto e identificar oportunidades imediatas.",
  },

  about: {
    eyebrow: "Sobre Nós",
    title: "FluxoNexus Logística Integrada",
    intro:
      "Somos uma consultora portuguesa focada em transformar desafios operacionais em soluções estratégicas de alto impacto para a cadeia logística.",
    mission: {
      title: "Missão",
      body: "Apoiar organizações na coordenação e otimização da cadeia logística, garantindo operações mais eficientes, sustentáveis e orientadas para resultados.",
    },
    vision: {
      title: "Visão",
      body: "Ser referência nacional em consultoria logística, reconhecida pela capacidade de transformar desafios operacionais em soluções estratégicas de alto impacto.",
    },
    valuesTitle: "Os nossos valores",
    values: [
      { title: "Eficiência", body: "Cada decisão é orientada pelo seu impacto mensurável no desempenho operacional." },
      { title: "Transparência", body: "Comunicamos métricas, métodos e resultados com clareza e rigor." },
      { title: "Inovação", body: "Aplicamos tecnologia e melhores práticas — do TMS à análise de dados." },
      { title: "Sustentabilidade", body: "Otimizamos rotas, cargas e consumos para uma logística com menor pegada." },
      { title: "Foco no cliente", body: "Desenhamos soluções à medida do contexto e da maturidade de cada operação." },
    ],
    teamTitle: "A nossa equipa",
    teamSub:
      "Um grupo multidisciplinar com competências cruzadas em transporte, processos, sistemas e qualidade.",
  },

  services: {
    eyebrow: "Serviços",
    title: "Soluções para uma cadeia logística integrada",
    intro:
      "Cada serviço corresponde a um dos quatro pilares fundamentais da logística moderna. Pode contratar de forma isolada ou em pacote integrado.",
    items: [
      {
        id: "costs",
        title: "Análise e Redução de Custos de Transporte",
        hook: "Transformamos o transporte num centro de eficiência e não num centro de custos.",
        description:
          "Mapeamos a totalidade dos custos logísticos diretos e indiretos e desenhamos a estrutura ótima de transporte para o seu produto e mercado.",
        items: [
          "Estudo dos custos logísticos (diretos e indiretos)",
          "Comparação de modos de transporte",
          "Otimização de rotas e cargas",
          "Redução de custos através de tecnologia (TMS)",
          "Indicadores de desempenho (KPIs de custo por km, custo por entrega)",
        ],
      },
      {
        id: "operations",
        title: "Otimização Operacional e Planeamento de Transportes",
        hook: "Aumentamos a eficiência operacional e garantimos entregas mais rápidas e confiáveis.",
        description:
          "Estruturamos o planeamento tático e operacional, da gestão de frota à definição de SLAs realistas e cumpríveis.",
        items: [
          "Planeamento inteligente de rotas",
          "Monitorização em tempo real",
          "Gestão de frotas",
          "Redução de tempos de ciclo",
          "Melhoria dos níveis de serviço (SLA)",
          "Implementação de boas práticas operacionais",
        ],
      },
      {
        id: "information",
        title: "Gestão Integrada dos Fluxos de Informação",
        hook: "A informação certa, no momento certo, para as pessoas certas.",
        description:
          "Integramos sistemas e garantimos rastreabilidade ponta a ponta, eliminando ilhas de informação entre fornecedores, transportadores e clientes.",
        items: [
          "Integração de sistemas (ERP, WMS, TMS)",
          "Rastreabilidade ponta a ponta",
          "Comunicação entre fornecedores, transportadores e clientes",
          "Dashboards e relatórios inteligentes",
          "Redução de erros e falhas de comunicação",
        ],
      },
      {
        id: "incidents",
        title: "Gestão de Reclamações e Incidentes",
        hook: "Transformamos problemas em oportunidades de melhoria contínua.",
        description:
          "Implementamos processos estruturados de tratamento de incidentes com análise de causa raiz e indicadores de qualidade.",
        items: [
          "Tratamento estruturado de reclamações",
          "Análise de causa raiz (5 Porquês, Ishikawa)",
          "Indicadores de qualidade (OTIF, taxa de incidentes)",
          "Planos de ação corretiva e preventiva",
          "Aumento da satisfação do cliente",
        ],
      },
    ],
    ctaTitle: "Não sabe por onde começar?",
    ctaBody:
      "O diagnóstico inicial é gratuito. Em 60 minutos identificamos onde estão as maiores oportunidades de otimização da sua operação.",
  },

  contact: {
    eyebrow: "Contactos",
    title: "Vamos falar sobre a sua operação",
    intro:
      "Preencha o formulário e a nossa equipa responderá em até 24 horas úteis. Para questões urgentes, prefira o telefone ou o WhatsApp.",
    form: {
      name: "Nome",
      email: "Email",
      company: "Empresa",
      message: "Mensagem",
      consent:
        "Autorizo o tratamento dos meus dados para resposta a este contacto, conforme a política de privacidade.",
      submit: "Enviar mensagem",
      submitting: "A enviar…",
      success: "Mensagem enviada. Entraremos em contacto em breve.",
      errorGeneric: "Não foi possível enviar a mensagem. Tente novamente ou contacte-nos por email.",
      errorValidation: "Verifique os campos assinalados e tente novamente.",
      placeholderName: "O seu nome",
      placeholderEmail: "nome@empresa.pt",
      placeholderCompany: "Nome da sua organização",
      placeholderMessage: "Descreva brevemente o seu desafio logístico…",
    },
    sidebar: {
      emailTitle: "Email",
      phoneTitle: "Telefone",
      addressTitle: "Localização",
      hoursTitle: "Horário",
      hoursValue: "Seg. a Sex., 09:00 – 18:00",
      hoursClosed: "Fim de semana encerrado",
      socialTitle: "Redes sociais",
    },
  },

  footer: {
    rights: "Todos os direitos reservados.",
    description:
      "Consultoria portuguesa em logística integrada, sediada em Viana do Castelo. Otimização de transportes, fluxos de informação e qualidade operacional.",
    nav: "Navegação",
    legal: "Legal",
    privacy: "Política de privacidade",
    terms: "Termos e condições",
  },
};
