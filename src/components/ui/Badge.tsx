import { cn } from "@/lib/utils";

type BadgeVariant = "selling-fast" | "qanda" | "sold-out" | "featured";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  "selling-fast": "bg-brand-yellow text-charcoal",
  qanda: "border border-brand-yellow text-brand-yellow bg-transparent",
  "sold-out": "bg-burgundy text-white",
  featured: "bg-burgundy text-white",
};

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[4px] px-2 py-0.5 text-[13px] font-semibold uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
