"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import type { Dictionary } from "@/lib/i18n/types";
import { cn } from "@/lib/cn";

export function Header({ locale, t }: { locale: string; t: Dictionary["nav"] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const items = [
    { href: `/${locale}/servicos`, label: t.services },
    { href: `/${locale}/bi-benchmarking`, label: t.bi },
    { href: `/${locale}/sobre`, label: t.about },
    { href: `/${locale}/contactos`, label: t.contact },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-[color:var(--color-border)] bg-white/85 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          href={`/${locale}`}
          className="rounded-md focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent-500)] focus-visible:ring-offset-2"
        >
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[color:var(--color-brand-900)] transition hover:bg-[color:var(--color-brand-50)] hover:text-[color:var(--color-brand-700)]"
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-3">
            <Button href={`/${locale}/contactos`} size="sm" variant="primary">
              {t.cta}
            </Button>
          </div>
        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2 text-[color:var(--color-brand-900)] transition hover:bg-[color:var(--color-brand-50)] md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open && (
        <div className="md:hidden">
          <div className="border-t border-[color:var(--color-border)] bg-white">
            <Container className="flex flex-col gap-1 py-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-[color:var(--color-brand-900)] hover:bg-[color:var(--color-brand-50)]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <Button href={`/${locale}/contactos`} size="md" className="w-full">
                  {t.cta}
                </Button>
              </div>
            </Container>
          </div>
        </div>
      )}
    </header>
  );
}
