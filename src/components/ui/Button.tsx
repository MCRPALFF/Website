import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "disabled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-yellow text-charcoal hover:scale-[1.02] focus-visible:scale-[1.02]",
  secondary:
    "border border-brand-yellow bg-transparent text-brand-yellow hover:scale-[1.02] focus-visible:scale-[1.02]",
  ghost: "text-white hover:text-burgundy bg-transparent",
  disabled:
    "bg-card-slate text-white/40 cursor-not-allowed pointer-events-none",
};

export function Button({
  variant = "primary",
  href,
  external,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const resolvedVariant = disabled ? "disabled" : variant;
  const classes = cn(
    "inline-flex items-center justify-center rounded-[4px] px-6 py-3 font-body text-[15px] font-semibold uppercase tracking-[0.04em] transition-all duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow",
    variants[resolvedVariant],
    className
  );

  if (href && !disabled) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
