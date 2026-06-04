import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-brand-700)] text-white shadow-[0_8px_24px_-8px_oklch(0.40_0.180_226/0.6)] hover:bg-[color:var(--color-brand-800)] hover:shadow-[0_12px_32px_-8px_oklch(0.40_0.180_226/0.8)] hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-[color:var(--color-accent-500)] text-[color:var(--color-brand-950)] shadow-[0_8px_24px_-8px_oklch(0.70_0.170_190/0.5)] hover:bg-[color:var(--color-accent-400)] hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border border-white/30 bg-white/5 text-white backdrop-blur hover:bg-white/15 hover:border-white/50",
  ghost:
    "text-[color:var(--color-brand-800)] hover:bg-[color:var(--color-brand-50)]",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type AsButton = Common & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

type AsLink = Common & {
  href: string;
  target?: "_blank";
  rel?: string;
};

export function Button(props: AsButton | AsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const cls = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const isExternal = props.href.startsWith("http") || props.href.startsWith("mailto:") || props.href.startsWith("tel:") || props.href.startsWith("https://wa.me");
    if (isExternal) {
      return (
        <a className={cls} href={props.href} target={props.target} rel={props.rel ?? (props.target === "_blank" ? "noopener noreferrer" : undefined)}>
          {children}
        </a>
      );
    }
    return (
      <Link className={cls} href={props.href}>
        {children}
      </Link>
    );
  }

  const { type = "button", disabled, onClick } = props as AsButton;
  return (
    <button className={cls} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
