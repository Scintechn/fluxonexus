import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, Phone, MapPin, Clock, Linkedin, Instagram, Facebook } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm";
import {
  defaultLocale,
  getDictionary,
  hreflangMap,
  isLocale,
  locales,
} from "@/lib/i18n";
import { business, addressOneLine } from "@/lib/business";

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
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    alternates: {
      canonical: `/${locale}/contactos`,
      languages: Object.fromEntries(locales.map((l) => [hreflangMap[l], `/${l}/contactos`])),
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const t = getDictionary(locale).contact;

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

      <Section variant="default" className="!pb-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr,1fr]">
            <Reveal>
              <div className="rounded-3xl border border-[color:var(--color-border)] bg-white p-7 shadow-[0_1px_2px_oklch(0.14_0.05_234/0.05)] sm:p-10">
                <ContactForm t={t.form} />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <aside className="space-y-5">
                <div className="rounded-3xl border border-[color:var(--color-border)] bg-gradient-to-br from-[color:var(--color-brand-950)] to-[color:var(--color-brand-800)] p-7 text-white sm:p-8">
                  <h2 className="font-display text-xl font-bold">Fale connosco diretamente</h2>
                  <p className="mt-1 text-sm text-white/70">Resposta em até 24h úteis.</p>

                  <ul className="mt-6 space-y-5">
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[color:var(--color-accent-300)]">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-white/50">{t.sidebar.emailTitle}</div>
                        <a href={business.email.href} className="text-sm font-medium hover:text-[color:var(--color-accent-300)]">
                          {business.email.display}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[color:var(--color-accent-300)]">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-white/50">{t.sidebar.phoneTitle}</div>
                        <a href={business.phone.href} className="text-sm font-medium hover:text-[color:var(--color-accent-300)]">
                          {business.phone.display}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[color:var(--color-accent-300)]">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-white/50">{t.sidebar.addressTitle}</div>
                        <a
                          href={business.mapDirectionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium hover:text-[color:var(--color-accent-300)]"
                        >
                          {addressOneLine()}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[color:var(--color-accent-300)]">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-white/50">{t.sidebar.hoursTitle}</div>
                        <div className="text-sm font-medium">{t.sidebar.hoursValue}</div>
                        <div className="text-xs text-white/55">{t.sidebar.hoursClosed}</div>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-7 border-t border-white/10 pt-6">
                    <div className="text-xs uppercase tracking-widest text-white/50">{t.sidebar.socialTitle}</div>
                    <div className="mt-3 flex gap-2.5">
                      <a
                        href={business.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 transition hover:border-[color:var(--color-accent-400)] hover:bg-white/5 hover:text-[color:var(--color-accent-300)]"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href={business.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 transition hover:border-[color:var(--color-accent-400)] hover:bg-white/5 hover:text-[color:var(--color-accent-300)]"
                      >
                        <Instagram className="h-4 w-4" />
                      </a>
                      <a
                        href={business.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 transition hover:border-[color:var(--color-accent-400)] hover:bg-white/5 hover:text-[color:var(--color-accent-300)]"
                      >
                        <Facebook className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-white">
                  <iframe
                    title="Mapa — Viana do Castelo"
                    src={business.mapEmbedSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block h-64 w-full"
                  />
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
