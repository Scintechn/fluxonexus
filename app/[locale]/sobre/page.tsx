import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Compass, Target, Gem, Leaf, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  defaultLocale,
  getDictionary,
  hreflangMap,
  isLocale,
  locales,
} from "@/lib/i18n";
import { business } from "@/lib/business";

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
    title: dict.meta.about.title,
    description: dict.meta.about.description,
    alternates: {
      canonical: `/${locale}/sobre`,
      languages: Object.fromEntries(locales.map((l) => [hreflangMap[l], `/${l}/sobre`])),
    },
  };
}

const valueIcons = [Target, Compass, Gem, Leaf, Heart];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const t = getDictionary(locale).about;

  return (
    <>
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
                {t.intro}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section variant="default">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-white p-8 transition-all hover:border-[color:var(--color-brand-300)] hover:shadow-xl sm:p-10">
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[color:var(--color-brand-50)] transition-transform group-hover:scale-150"
                />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--color-brand-900)] text-[color:var(--color-accent-300)]">
                    <Target className="h-6 w-6" />
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-bold text-[color:var(--color-brand-950)] sm:text-3xl">
                    {t.mission.title}
                  </h2>
                  <p className="mt-4 text-pretty leading-relaxed text-[color:var(--color-muted)]">
                    {t.mission.body}
                  </p>
                </div>
              </article>
            </Reveal>
            <Reveal delay={100}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-white p-8 transition-all hover:border-[color:var(--color-brand-300)] hover:shadow-xl sm:p-10">
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[color:var(--color-accent-300)]/30 transition-transform group-hover:scale-150"
                />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--color-brand-900)] text-[color:var(--color-accent-300)]">
                    <Compass className="h-6 w-6" />
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-bold text-[color:var(--color-brand-950)] sm:text-3xl">
                    {t.vision.title}
                  </h2>
                  <p className="mt-4 text-pretty leading-relaxed text-[color:var(--color-muted)]">
                    {t.vision.body}
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section variant="muted">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand-600)]">
                Valores
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-balance text-[color:var(--color-brand-950)] sm:text-4xl">
                {t.valuesTitle}
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {t.values.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <Reveal key={v.title} delay={i * 70}>
                  <div className="h-full rounded-2xl border border-[color:var(--color-border)] bg-white p-6 transition-all hover:-translate-y-1 hover:border-[color:var(--color-brand-300)] hover:shadow-lg">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--color-brand-50)] text-[color:var(--color-brand-700)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display font-bold text-[color:var(--color-brand-950)]">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted)]">{v.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section variant="default">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand-600)]">
                Equipa
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-balance text-[color:var(--color-brand-950)] sm:text-4xl">
                {t.teamTitle}
              </h2>
              <p className="mt-4 text-pretty text-[color:var(--color-muted)] sm:text-lg">{t.teamSub}</p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {business.team.map((m, i) => (
              <Reveal key={m.name} delay={i * 80}>
                <article className="group h-full overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-white p-7 transition-all hover:-translate-y-1 hover:border-[color:var(--color-brand-300)] hover:shadow-xl">
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--color-brand-700)] to-[color:var(--color-brand-950)] font-display text-3xl font-extrabold text-[color:var(--color-accent-300)] shadow-inner transition-transform group-hover:scale-105">
                    {m.initials}
                  </div>
                  <h3 className="mt-6 font-display text-lg font-bold text-[color:var(--color-brand-950)]">{m.name}</h3>
                  <p className="mt-1 text-sm font-medium text-[color:var(--color-brand-700)]">{m.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">{m.bio}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="muted" className="!pt-16 !pb-24">
        <Container>
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-[color:var(--color-border)] bg-white p-8 text-center sm:p-12 lg:flex-row lg:text-left">
              <div>
                <h3 className="font-display text-2xl font-bold text-[color:var(--color-brand-950)]">
                  Pronto para integrar a sua cadeia logística?
                </h3>
                <p className="mt-2 text-[color:var(--color-muted)]">
                  Fale com a nossa equipa em Viana do Castelo.
                </p>
              </div>
              <Button href={`/${locale}/contactos`} size="lg" variant="primary">
                Falar com a equipa <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
