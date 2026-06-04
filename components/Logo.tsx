import { cn } from "@/lib/cn";

export function Logo({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const fg = variant === "light" ? "text-[color:var(--color-brand-950)]" : "text-white";
  const accent = "text-[color:var(--color-accent-500)]";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--color-brand-700)] to-[color:var(--color-brand-950)] shadow-[inset_0_-2px_4px_oklch(0.14_0.05_234/0.4)]"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12c3-3 5-3 8 0s5 3 8 0" className="text-[color:var(--color-accent-400)]" />
          <path d="M4 17c3-3 5-3 8 0s5 3 8 0" className="text-white/80" />
        </svg>
      </span>
      <span className={cn("font-display text-lg font-bold leading-none", fg)}>
        Fluxo<span className={accent}>Nexus</span>
      </span>
    </span>
  );
}
