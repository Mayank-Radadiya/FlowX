/**
 * PageHeader Component
 * -------------------
 * Renders a rich, themed page header used across major application pages.
 *
 * Responsibilities:
 *  - Display page title with animation
 *  - Show optional subtitle, badge, and description
 *  - Render a themed background and icon based on selected gradient
 *  - Provide a dedicated area for page-level actions (buttons, controls)
 *
 * This component focuses on visual hierarchy, branding, and context-setting
 * for high-level pages such as dashboards, workflows, or editors.
 */

import { memo } from "react";
import { cn } from "@/lib/utils";
import { TextAnimation } from "../animation/TextAnimation";
import { pageHeaderTheme } from "./PageHeaderTheme";
import { PageHeaderBackground } from "./PageHeaderBackground";
import { PageHeaderIcon } from "./PageHeaderIcon";
import { PageHeaderAction } from "./PageHeaderAction";
import type { PageHeaderProps } from "./PageHeader.types";

export const PageHeader = memo(
  ({
    title,
    subtitle,
    description,
    icon,
    badge,
    gradient = "purple",
    action,
  }: PageHeaderProps) => {
    /**
     * Resolve the visual theme based on the selected gradient.
     * Each theme defines colors for:
     *  - Background glow layers
     *  - Icon accent and glow
     *  - Badge styling
     */
    const theme = pageHeaderTheme[gradient];

    return (
      <div className="relative">
        <div
          className={cn(
            // Base container styling
            "relative overflow-hidden rounded-2xl border border-white/10",
            "backdrop-blur-sm shadow-xl"
          )}
        >
          {/* Decorative animated background layers */}
          <PageHeaderBackground {...theme} />

          <div className="relative px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Left content section */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  {/* Page icon with glow and accent */}
                  <PageHeaderIcon
                    icon={icon}
                    accent={theme.accent}
                    glow={theme.glow1}
                  />

                  <div className="space-y-2 pt-1">
                    {/* Badge and subtitle row */}
                    <div className="flex flex-wrap items-center gap-2">
                      {badge && (
                        <span
                          className={cn(
                            "rounded-full border px-3 py-1 text-xs font-semibold",
                            theme.badge
                          )}
                        >
                          {badge}
                        </span>
                      )}

                      {subtitle && (
                        <span className="rounded-full bg-foreground/5 px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">
                          {subtitle}
                        </span>
                      )}
                    </div>

                    {/* Animated page title */}
                    <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                      <TextAnimation text={title} />
                    </h1>
                  </div>
                </div>

                {/* Optional description */}
                {description && (
                  <p className="max-w-2xl text-muted-foreground sm:text-lg">
                    {description}
                  </p>
                )}
              </div>

              {/* Right-side action area */}
              <PageHeaderAction>{action}</PageHeaderAction>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
