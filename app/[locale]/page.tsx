import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Sparkles, Target, Layers, Activity } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Hero } from "@/components/Hero";
import { ServicesGrid } from "@/components/ServicesGrid";
import {
  defaultLocale,
  getDictionary,
  hreflangMap,
  isLocale,
  locales,
} from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [hreflangMap[l], `/${l}`])),
    },
  };
}

const pillars = [
  { icon: Sparkles, key: "costs",       title: "Custo",      body: "Estrutura ótima de transporte com KPIs por km e por entrega." },
  { icon: Target,   key: "operations",  title: "Operação",   body: "Planeamento inteligente, SLA cumpridos, tempos de ciclo reduzidos." },
  { icon: Layers,   key: "information", title: "Informação", body: "ERP, WMS e TMS integrados com rastreabilidade ponta a ponta." },
  { icon: Activity, key: "incidents",   title: "Qualidade",  body: "Causa raiz, OTIF e planos corretivos que reduzem reclamações." },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const t = getDictionary(locale).home;

  return (
    <>
      <Hero locale={locale} t={t} />

      <Section variant="default" id="pilares">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand-600)]">
                Pilares
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-balance text-[color:var(--color-brand-950)] sm:text-4xl lg:text-5xl">
                {t.pillarsTitle}
              </h2>
              <p className="mt-4 text-pretty text-[color:var(--color-muted)] sm:text-lg">
                {t.pillarsSub}
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.key} delay={i * 90}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-accent-400)] hover:shadow-lg">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--color-brand-50)] text-[color:var(--color-brand-700)] transition-colors group-hover:bg-[color:var(--color-brand-700)] group-hover:text-[color:var(--color-accent-300)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-[color:var(--color-brand-950)]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted)]">
                      {p.body}
                    </p>
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[color:var(--color-brand-500)] to-[color:var(--color-accent-400)] transition-all duration-500 group-hover:w-full"
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section variant="muted" id="servicos">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand-600)]">
                  Serviços
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-balance text-[color:var(--color-brand-950)] sm:text-4xl lg:text-5xl">
                  {t.servicesTitle}
                </h2>
                <p className="mt-4 text-pretty text-[color:var(--color-muted)] sm:text-lg">
                  {t.servicesSub}
                </p>
              </div>
              <Button href={`/${locale}/servicos`} variant="ghost" className="shrink-0">
                Todos os serviços <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>

          <div className="mt-12">
            <ServicesGrid
              locale={locale}
              items={getDictionary(locale).services.items}
              variant="compact"
            />
          </div>
        </Container>
      </Section>

      <Section variant="feature" id="casos">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-[0.05]" />
        <Container className="relative">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-accent-400)]">
                Casos de Sucesso
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-balance sm:text-4xl lg:text-5xl">
                {t.casesTitle}
              </h2>
              <p className="mt-4 text-pretty text-white/70 sm:text-lg">{t.casesSub}</p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {t.cases.map((c, i) => (
              <Reveal key={c.company} delay={i * 100}>
                <article className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-accent-400)] hover:bg-white/[0.07]">
                  <span className="self-start rounded-full bg-[color:var(--color-accent-500)]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[color:var(--color-accent-300)]">
                    {c.tag}
                  </span>
                  <div className="mt-5 font-display text-4xl font-extrabold tracking-tight text-[color:var(--color-accent-300)]">
                    {c.kpi}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold leading-snug">
                    {c.company} — {c.headline}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">{c.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="default" id="cta">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[color:var(--color-brand-900)] to-[color:var(--color-brand-700)] p-10 text-white sm:p-14 lg:p-20">
              <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-[0.08]" />
              <div
                aria-hidden="true"
                className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[color:var(--color-accent-500)] opacity-30 blur-3xl"
              />
              <div className="relative grid gap-8 lg:grid-cols-[2fr,1fr] lg:items-center">
                <div>
                  <h2 className="font-display text-3xl font-bold text-balance sm:text-4xl lg:text-5xl">
                    {t.finalCtaTitle}
                  </h2>
                  <p className="mt-4 max-w-xl text-pretty text-white/80 sm:text-lg">
                    {t.finalCtaSub}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Button href={`/${locale}/contactos`} size="lg" variant="secondary">
                    {t.primaryCta} <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button href={`/${locale}/servicos`} size="lg" variant="outline">
                    {t.secondaryCta}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
