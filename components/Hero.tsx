import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/lib/i18n/types";
import { business } from "@/lib/business";

export function Hero({ locale, t }: { locale: string; t: Dictionary["home"] }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[color:var(--color-brand-950)] via-[color:var(--color-brand-900)] to-[color:var(--color-brand-800)] text-white">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-[0.07]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[60%] bg-radial-fade" />
      <div
        aria-hidden="true"
        className="absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[color:var(--color-accent-500)] opacity-20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[color:var(--color-brand-500)] opacity-30 blur-3xl"
      />

      <Container className="relative pt-20 pb-24 sm:pt-28 sm:pb-32 lg:pt-32 lg:pb-40">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/80 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-accent-400)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent-400)]" />
            </span>
            {t.eyebrow}
          </div>

          <h1 className="mt-7 text-balance font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {t.h1Lead}{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[color:var(--color-accent-400)] via-[color:var(--color-accent-300)] to-white bg-clip-text text-transparent">
                {t.h1Highlight}
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-1 h-1 bg-gradient-to-r from-transparent via-[color:var(--color-accent-400)] to-transparent"
              />
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-white/75 sm:text-xl">
            {t.sub}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={`/${locale}/contactos`} size="lg" variant="secondary">
              {t.primaryCta} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href={`/${locale}/servicos`} size="lg" variant="outline">
              {t.secondaryCta}
            </Button>
          </div>

          <Link
            href={business.phone.href}
            className="mt-8 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
          >
            <Phone className="h-4 w-4" /> {business.phone.display}
          </Link>
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-10 sm:mt-24 sm:grid-cols-4">
          {t.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="font-display text-3xl font-bold tracking-tight text-[color:var(--color-accent-300)] sm:text-4xl">
                {m.value}
              </div>
              <div className="mt-1.5 text-xs uppercase tracking-widest text-white/55">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </Container>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}
