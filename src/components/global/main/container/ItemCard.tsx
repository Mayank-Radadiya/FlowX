import { cn } from "@/lib/utils";

interface ItemCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: {
    label: string;
    variant?: "default" | "success" | "warning" | "error" | "info";
  };
  href?: string;
  onClick?: () => void;
  className?: string;
  gradient?: "purple" | "blue" | "orange" | "green" | "none";
}

// Glassmorphism badge variants
const badgeVariants = {
  default:
    "bg-black/5 dark:bg-white/10 text-neutral-700 dark:text-white/80 backdrop-blur-sm border border-black/10 dark:border-white/10",
  success:
    "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 backdrop-blur-sm border border-emerald-500/20",
  warning:
    "bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 backdrop-blur-sm border border-amber-500/20",
  error:
    "bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 backdrop-blur-sm border border-red-500/20",
  info: "bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 backdrop-blur-sm border border-blue-500/20",
};

// Subtle gradient overlay colors
const cardGradients = {
  purple: "from-violet-500/15 via-purple-500/5 to-transparent",
  blue: "from-blue-500/15 via-cyan-500/5 to-transparent",
  orange: "from-orange-500/15 via-amber-500/5 to-transparent",
  green: "from-emerald-500/15 via-teal-500/5 to-transparent",
  none: "",
};

// Glow colors for hover effect
const glowColors = {
  purple: "group-hover:shadow-violet-500/25 group-hover:border-violet-500/40",
  blue: "group-hover:shadow-blue-500/25 group-hover:border-blue-500/40",
  orange: "group-hover:shadow-orange-500/25 group-hover:border-orange-500/40",
  green: "group-hover:shadow-emerald-500/25 group-hover:border-emerald-500/40",
  none: "group-hover:shadow-black/10 dark:group-hover:shadow-white/10 group-hover:border-black/20 dark:group-hover:border-white/30",
};

const iconGradients = {
  purple: "from-violet-500 to-purple-600",
  blue: "from-blue-500 to-cyan-600",
  orange: "from-orange-500 to-amber-600",
  green: "from-emerald-500 to-teal-600",
  none: "from-black/10 to-black/5 dark:from-white/20 dark:to-white/10",
};

export const ItemCard = ({
  title,
  description,
  icon,
  badge,
  href,
  onClick,
  className,
  gradient = "none",
}: ItemCardProps) => {
  const CardWrapper = href ? "a" : onClick ? "button" : "div";
  const isInteractive = !!(href || onClick);

  const cardContent = (
    <>
      {/* Glassmorphism noise texture overlay */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* Background gradient */}
      {gradient !== "none" && (
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-br opacity-60 transition-opacity duration-500 group-hover:opacity-100",
            cardGradients[gradient]
          )}
        />
      )}

      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-xl bg-linear-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative flex flex-col h-full p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          {/* Icon */}
          {icon && (
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-lg",
                "shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl",
                gradient !== "none"
                  ? cn("bg-linear-to-br text-white", iconGradients[gradient])
                  : "bg-black/5 dark:bg-white/10 backdrop-blur-sm text-neutral-600 dark:text-white/80 border border-black/10 dark:border-white/10"
              )}
            >
              {icon}
            </div>
          )}

          {/* Badge */}
          {badge && (
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                badgeVariants[badge.variant || "default"]
              )}
            >
              {badge.label}
            </span>
          )}
        </div>

        {/* Title and description */}
        <div className="mt-4 flex-1">
          <h3 className="font-semibold leading-tight line-clamp-1 text-neutral-800 dark:text-white/90 transition-colors duration-300 group-hover:text-neutral-950 dark:group-hover:text-white">
            {title}
          </h3>
          {description && (
            <p className="mt-1.5 text-sm text-neutral-500 dark:text-white/50 line-clamp-2 transition-colors duration-300 group-hover:text-neutral-700 dark:group-hover:text-white/70">
              {description}
            </p>
          )}
        </div>
      </div>
    </>
  );

  return (
    <CardWrapper
      href={href}
      onClick={onClick}
      className={cn(
        // Base glassmorphism styles
        "group relative overflow-hidden rounded-xl text-left",
        "bg-black/2 dark:bg-white/5 backdrop-blur-xl",
        "border border-black/10 dark:border-white/10",
        // Shadow and transitions
        "shadow-lg shadow-black/5",
        "transition-all duration-300 ease-out",
        // Interactive states
        isInteractive && [
          "cursor-pointer",
          "hover:-translate-y-1",
          "hover:shadow-2xl",
          glowColors[gradient],
          "active:translate-y-0 active:scale-[0.98]",
        ],
        className
      )}
    >
      {cardContent}
    </CardWrapper>
  );
};
