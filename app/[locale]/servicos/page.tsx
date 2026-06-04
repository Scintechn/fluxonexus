import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
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
    title: dict.meta.services.title,
    description: dict.meta.services.description,
    alternates: {
      canonical: `/${locale}/servicos`,
      languages: Object.fromEntries(locales.map((l) => [hreflangMap[l], `/${l}/servicos`])),
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const t = getDictionary(locale).services;

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
          <ServicesGrid locale={locale} items={t.items} variant="detailed" />
        </Container>
      </Section>

      <Section variant="muted" className="!pb-28">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[color:var(--color-brand-900)] to-[color:var(--color-brand-700)] p-10 text-white sm:p-14">
              <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-[0.08]" />
              <div
                aria-hidden="true"
                className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-[color:var(--color-accent-500)] opacity-30 blur-3xl"
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
                    Marcar diagnóstico <ArrowRight className="h-4 w-4" />
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
