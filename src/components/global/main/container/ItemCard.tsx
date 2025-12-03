/* ItemCard Component */

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

const badgeVariants = {
  default: "bg-muted text-muted-foreground",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  error: "bg-red-500/10 text-red-600 dark:text-red-400",
  info: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

const cardGradients = {
  purple: "from-violet-500/10 via-transparent to-transparent",
  blue: "from-blue-500/10 via-transparent to-transparent",
  orange: "from-orange-500/10 via-transparent to-transparent",
  green: "from-emerald-500/10 via-transparent to-transparent",
  none: "",
};

const iconGradients = {
  purple: "from-violet-500 to-purple-600",
  blue: "from-blue-500 to-cyan-600",
  orange: "from-orange-500 to-amber-600",
  green: "from-emerald-500 to-teal-600",
  none: "from-muted to-muted",
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
      {/* Background gradient */}
      {gradient !== "none" && (
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            cardGradients[gradient]
          )}
        />
      )}

      {/* Hover border glow */}
      {isInteractive && (
        <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ring-1 ring-primary/20" />
      )}

      {/* Content */}
      <div className="relative flex flex-col h-full p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          {/* Icon */}
          {icon && (
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-lg",
                gradient !== "none"
                  ? cn(
                      "bg-linear-to-br text-white shadow-md",
                      iconGradients[gradient]
                    )
                  : "bg-muted text-muted-foreground"
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
          <h3 className="font-semibold leading-tight line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          {description && (
            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
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
        "group relative overflow-hidden rounded-xl border border-border/50 bg-card text-left",
        "transition-all duration-300",
        isInteractive && [
          "cursor-pointer",
          "hover:border-border hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20",
          "hover:-translate-y-0.5",
          "active:translate-y-0 active:shadow-md",
        ],
        className
      )}
    >
      {cardContent}
    </CardWrapper>
  );
};
