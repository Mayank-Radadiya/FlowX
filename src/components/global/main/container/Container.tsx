import { cn } from "@/lib/utils";

/* ============================================
   Container - Main wrapper component
   ============================================ */

interface ContainerProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: "default" | "card" | "glass" | "transparent";
}

export const Container = ({
  children,
  header,
  search,
  pagination,
  className,
  contentClassName,
  variant = "default",
}: ContainerProps) => {
  const variantStyles = {
    default: "bg-card/80 border border-border/40 shadow-sm backdrop-blur-sm",
    card: "bg-card border border-border shadow-md",
    glass:
      "bg-background/60 border border-white/10 dark:border-white/5 backdrop-blur-xl shadow-xl",
    transparent: "bg-transparent border-none",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        variantStyles[variant],
        className
      )}
    >
      {/* Header section */}
      {(header || search) && (
        <div className="relative border-b border-border/40">
          <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
            {header && <div className="min-w-0 flex-1">{header}</div>}
            {search && <div className="shrink-0">{search}</div>}
          </div>
        </div>
      )}

      {/* Main content */}
      <div
        className={cn("relative px-5 py-5 sm:px-6 sm:py-6", contentClassName)}
      >
        {children}
      </div>

      {/* Pagination section */}
      {pagination && (
        <div className="relative border-t border-border/40 bg-muted/30">
          <div className="flex items-center justify-between px-5 py-4 sm:px-6">
            {pagination}
          </div>
        </div>
      )}
    </div>
  );
};
