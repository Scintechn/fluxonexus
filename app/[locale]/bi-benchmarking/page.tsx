import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Database,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BIDashboard } from "@/components/bi/BIDashboard";
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
    title: dict.meta.bi.title,
    description: dict.meta.bi.description,
    alternates: {
      canonical: `/${locale}/bi-benchmarking`,
      languages: Object.fromEntries(
        locales.map((l) => [hreflangMap[l], `/${l}/bi-benchmarking`]),
      ),
    },
  };
}

const STEP_ICONS = [Database, BarChart3, RefreshCw] as const;

export default async function BIPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const t = getDictionary(locale).bi;

  return (
    <>
      {/* Hero */}
      <Section variant="feature" className="!pt-32 !pb-20">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-[0.06]" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[60%] bg-radial-fade" />
        <Container className="relative">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-accent-400)]">
                {t.eyebrow}
              </p>
              <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {t.title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/80">
                {t.subtitle}
              </p>
              <div className="mt-8 flex justify-center">
                <Button href={`/${locale}/contactos`} size="lg" variant="secondary">
                  {t.primaryCta} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-sm leading-relaxed text-white/60">
                {t.heroSupport}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Dashboard mockup */}
      <Section variant="dark" className="!pt-0 -mt-10 !pb-24">
        <Container>
          <Reveal>
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-accent-400)]">
                {t.dashboard.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-balance sm:text-4xl">
                {t.dashboard.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-white/70">
                {t.dashboard.sub}
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <BIDashboard />
          </Reveal>
        </Container>
      </Section>

      {/* Metodologia */}
      <Section variant="default">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-accent-600)]">
                {t.methodologyEyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-balance text-[color:var(--color-brand-950)] sm:text-4xl">
                {t.methodologyTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-[color:var(--color-muted)]">
                {t.methodologySub}
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:gap-6 md:grid-cols-3">
            {t.steps.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? Database;
              return (
                <Reveal key={step.number} delay={i * 80}>
                  <article className="group relative h-full overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-white p-7 shadow-[0_1px_2px_oklch(0.14_0.05_234/0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-brand-300)] hover:shadow-[0_24px_48px_-16px_oklch(0.40_0.180_226/0.25)] sm:p-8">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-[color:var(--color-accent-300)] to-transparent opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                    />
                    <div className="relative flex items-center justify-between">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--color-brand-700)] to-[color:var(--color-brand-900)] text-[color:var(--color-accent-300)] transition-transform group-hover:scale-110">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-display text-4xl font-extrabold leading-none text-[color:var(--color-brand-100)]">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="relative mt-6 font-display text-xl font-bold leading-tight text-[color:var(--color-brand-950)]">
                      {step.title}
                    </h3>
                    <p className="relative mt-3 text-[15px] leading-relaxed text-[color:var(--color-muted)]">
                      {step.body}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Benefícios */}
      <Section variant="muted">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-accent-600)]">
                {t.benefitsEyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-balance text-[color:var(--color-brand-950)] sm:text-4xl">
                {t.benefitsTitle}
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.benefits.map((benefit, i) => (
              <Reveal key={benefit} delay={i * 60}>
                <div className="flex h-full items-center gap-3.5 rounded-2xl border border-[color:var(--color-border)] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-16px_oklch(0.40_0.180_226/0.25)]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--color-kpi-500)]/12 text-[color:var(--color-kpi-600)]">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <span className="text-[15px] font-medium text-[color:var(--color-ink)]">
                    {benefit}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Casos de uso */}
      <Section variant="default">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-accent-600)]">
                {t.useCasesEyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-balance text-[color:var(--color-brand-950)] sm:text-4xl">
                {t.useCasesTitle}
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:gap-6 md:grid-cols-2">
            {t.useCases.map((useCase, i) => (
              <Reveal key={useCase} delay={i * 80}>
                <div className="group flex h-full items-start gap-4 rounded-3xl border border-[color:var(--color-border)] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-brand-300)] hover:shadow-[0_24px_48px_-16px_oklch(0.40_0.180_226/0.25)] sm:p-7">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--color-brand-700)] to-[color:var(--color-brand-900)] text-[color:var(--color-accent-300)] transition-transform group-hover:scale-110">
                    <TrendingUp className="h-5 w-5" />
                  </span>
                  <p className="pt-1.5 text-[15px] font-medium leading-relaxed text-[color:var(--color-ink)]">
                    {useCase}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA final */}
      <Section variant="muted" className="!pb-28">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[color:var(--color-brand-900)] to-[color:var(--color-brand-700)] p-10 text-white sm:p-14">
              <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-[0.08]" />
              <div
                aria-hidden="true"
                className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-[color:var(--color-kpi-500)] opacity-25 blur-3xl"
              />
              <div className="relative grid gap-8 lg:grid-cols-[2fr,1fr] lg:items-center">
                <div>
                  <h2 className="font-display text-3xl font-bold text-balance sm:text-4xl">
                    {t.ctaTitle}
                  </h2>
                  <p className="mt-4 max-w-2xl text-pretty text-white/80 sm:text-lg">
                    {t.ctaBody}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Button href={`/${locale}/contactos`} size="lg" variant="secondary">
                    {t.ctaButton} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="relative mt-10 border-t border-white/15 pt-6 text-sm text-white/60">
                {t.ctaFooter}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
