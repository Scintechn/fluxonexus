import { cn } from "@/lib/cn";

type Variant = "default" | "muted" | "dark" | "feature";

export function Section({
  children,
  className,
  variant = "default",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  id?: string;
}) {
  const variants: Record<Variant, string> = {
    default: "bg-[color:var(--color-surface)] text-[color:var(--color-ink)]",
    muted:   "bg-[oklch(0.97_0.008_232)] text-[color:var(--color-ink)]",
    dark:    "bg-[color:var(--color-brand-950)] text-white",
    feature: "bg-gradient-to-b from-[color:var(--color-brand-950)] via-[color:var(--color-brand-900)] to-[color:var(--color-brand-950)] text-white",
  };

  return (
    <section
      id={id}
      className={cn("relative isolate py-20 sm:py-24 lg:py-28", variants[variant], className)}
    >
      {children}
    </section>
  );
}
