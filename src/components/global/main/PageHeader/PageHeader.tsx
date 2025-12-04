import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { TextAnimation } from "../../animation/TextAnimation";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  disabled?: boolean;
  isCreating?: boolean;
  icon?: React.ReactNode;
  badge?: string;
  gradient?: "purple" | "blue" | "orange" | "green";
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { newButtonHref?: never; onNew?: never }
);

const gradientMap = {
  purple: {
    bg: "from-violet-500/10 via-purple-500/5 to-fuchsia-500/10",
    glow1: "bg-violet-500/20",
    glow2: "bg-purple-500/15",
    accent: "from-violet-500 to-purple-600",
    badge:
      "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  },
  blue: {
    bg: "from-blue-500/10 via-cyan-500/5 to-sky-500/10",
    glow1: "bg-blue-500/20",
    glow2: "bg-cyan-500/15",
    accent: "from-blue-500 to-cyan-600",
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  orange: {
    bg: "from-orange-500/10 via-amber-500/5 to-yellow-500/10",
    glow1: "bg-orange-500/20",
    glow2: "bg-amber-500/15",
    accent: "from-orange-500 to-amber-600",
    badge:
      "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  },
  green: {
    bg: "from-emerald-500/10 via-green-500/5 to-teal-500/10",
    glow1: "bg-emerald-500/20",
    glow2: "bg-green-500/15",
    accent: "from-emerald-500 to-teal-600",
    badge:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
};

export const PageHeader = ({
  title,
  subtitle,
  description,
  buttonLabel,
  disabled,
  isCreating,
  icon,
  badge,
  gradient = "purple",
  onNew,
  newButtonHref,
}: PageHeaderProps) => {
  const theme = gradientMap[gradient];

  const renderButton = () => {
    if (!buttonLabel) return null;

    const buttonContent = (
      <>
        <span className="relative z-10">{buttonLabel}</span>
        {isCreating ? (
          <Loader2 className="relative z-10 size-4 animate-spin" />
        ) : (
          <ArrowRight className="relative z-10 size-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </>
    );

    const buttonClasses = cn(
      "group relative h-11 overflow-hidden rounded-xl px-6 font-medium text-white shadow-lg transition-all duration-300",
      "bg-linear-to-r",
      theme.accent,
      "hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
      "before:absolute before:inset-0 before:bg-white/20 before:opacity-0 before:transition-opacity hover:before:opacity-100"
    );

    if (newButtonHref) {
      return (
        <Button
          asChild
          disabled={disabled || isCreating}
          className={buttonClasses}
        >
          <Link href={newButtonHref}>{buttonContent}</Link>
        </Button>
      );
    }

    if (onNew) {
      return (
        <Button
          onClick={onNew}
          disabled={disabled || isCreating}
          className={buttonClasses}
        >
          {buttonContent}
        </Button>
      );
    }

    return null;
  };

  return (
    <div className="relative">
      {/* Main container */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/10 dark:border-white/5",
          "bg-linear-to-br backdrop-blur-sm",
          "shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.05)]",
          "dark:shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_2px_4px_rgba(0,0,0,0.2),0_12px_24px_rgba(0,0,0,0.2)]",
          theme.bg
        )}
      >
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              "absolute -top-1/2 -right-1/2 size-full rounded-full blur-3xl opacity-60 animate-pulse",
              theme.glow1
            )}
            style={{ animationDuration: "4s" }}
          />
          <div
            className={cn(
              "absolute -bottom-1/2 -left-1/2 size-full rounded-full blur-3xl opacity-40 animate-pulse",
              theme.glow2
            )}
            style={{ animationDuration: "6s", animationDelay: "1s" }}
          />
        </div>

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Content */}
        <div className="relative px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left side - Title and description */}
            <div className="space-y-4">
              {/* Icon and badges row */}
              <div className="flex items-start gap-4">
                {icon && (
                  <div className="relative">
                    {/* Icon glow */}
                    <div
                      className={cn(
                        "absolute inset-0 rounded-2xl blur-xl opacity-50",
                        theme.glow1
                      )}
                    />
                    {/* Icon container */}
                    <div
                      className={cn(
                        "relative flex size-14 items-center justify-center rounded-2xl",
                        "bg-linear-to-br shadow-lg",
                        "ring-1 ring-white/20",
                        theme.accent
                      )}
                    >
                      <div className="text-white">{icon}</div>
                    </div>
                  </div>
                )}

                <div className="space-y-2 pt-1">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    {badge && (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
                          theme.badge
                        )}
                      >
                        <Sparkles className="size-3" />
                        {badge}
                      </span>
                    )}
                    {subtitle && (
                      <span className="inline-flex items-center rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {subtitle}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                    <TextAnimation text={title} />
                  </h1>
                </div>
              </div>

              {/* Description */}
              {description && (
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {description}
                </p>
              )}
            </div>

            {/* Right side - Action button */}
            <div className="shrink-0 lg:self-center">{renderButton()}</div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-current to-transparent opacity-10"
          )}
        />
      </div>
    </div>
  );
};
