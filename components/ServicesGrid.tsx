import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";
import type { Dictionary } from "@/lib/i18n/types";

export function ServicesGrid({
  locale,
  items,
  variant = "compact",
}: {
  locale: string;
  items: Dictionary["services"]["items"];
  variant?: "compact" | "detailed";
}) {
  return (
    <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
      {items.map((s, i) => (
        <Reveal key={s.id} delay={i * 80}>
          <article className="group relative h-full overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-white p-7 shadow-[0_1px_2px_oklch(0.14_0.05_234/0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-brand-300)] hover:shadow-[0_24px_48px_-16px_oklch(0.40_0.180_226/0.25)] sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-[color:var(--color-accent-300)] to-transparent opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
            />
            <div className="relative flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--color-brand-700)] to-[color:var(--color-brand-900)] text-[color:var(--color-accent-300)] transition-transform group-hover:scale-110">
                <ServiceIcon id={s.id} className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold leading-tight text-[color:var(--color-brand-950)] sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-[color:var(--color-brand-700)]">
                  {s.hook}
                </p>
              </div>
            </div>

            {variant === "detailed" && (
              <>
                <p className="mt-5 text-[15px] leading-relaxed text-[color:var(--color-muted)]">
                  {s.description}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[color:var(--color-ink)]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-accent-600)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {variant === "compact" && (
              <ul className="mt-5 space-y-2 text-sm text-[color:var(--color-muted)]">
                {s.items.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-accent-500)]" />
                    <span>{item}</span>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/${locale}/servicos`}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--color-brand-700)] transition-colors hover:text-[color:var(--color-brand-900)]"
                  >
                    Ver detalhe <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              </ul>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}
