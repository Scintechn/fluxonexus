import Link from "next/link";
import { Linkedin, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";
import { business, addressOneLine } from "@/lib/business";
import type { Dictionary } from "@/lib/i18n/types";

export function Footer({ locale, t, nav }: { locale: string; t: Dictionary["footer"]; nav: Dictionary["nav"] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[color:var(--color-brand-950)] text-white/80">
      <Container className="grid gap-12 py-16 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo variant="dark" />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">{t.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={business.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-full border border-white/15 p-2.5 text-white/80 transition hover:border-[color:var(--color-accent-400)] hover:text-[color:var(--color-accent-400)]"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={business.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-white/15 p-2.5 text-white/80 transition hover:border-[color:var(--color-accent-400)] hover:text-[color:var(--color-accent-400)]"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={business.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-full border border-white/15 p-2.5 text-white/80 transition hover:border-[color:var(--color-accent-400)] hover:text-[color:var(--color-accent-400)]"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">
            {t.nav}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href={`/${locale}`} className="hover:text-white">{nav.home}</Link></li>
            <li><Link href={`/${locale}/servicos`} className="hover:text-white">{nav.services}</Link></li>
            <li><Link href={`/${locale}/sobre`} className="hover:text-white">{nav.about}</Link></li>
            <li><Link href={`/${locale}/contactos`} className="hover:text-white">{nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">
            Contactos
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-accent-400)]" />
              <a href={business.email.href} className="hover:text-white">{business.email.display}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-accent-400)]" />
              <a href={business.phone.href} className="hover:text-white">{business.phone.display}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-accent-400)]" />
              <span>{addressOneLine()}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} {business.legalName}. {t.rights}
          </p>
          <p>NIPC 00 000 000</p>
        </Container>
      </div>
    </footer>
  );
}
