/**
 * PageHeader Types
 * ----------------
 * Defines the TypeScript contracts used by the PageHeader component.
 *
 * Responsibilities:
 *  - Restrict allowed gradient themes
 *  - Describe the shape of props accepted by PageHeader
 *  - Provide strong typing for visual and compositional inputs
 *
 * This file acts as the single source of truth for PageHeader’s public API.
 */

import type { ReactNode } from "react";

/**
 * PageHeaderGradient
 * ------------------
 * Union type that limits the allowed visual themes
 * for the PageHeader component.
 *
 * Using a union instead of string ensures:
 *  - Compile-time safety
 *  - Autocomplete support
 *  - Consistent theming across the app
 */
export type PageHeaderGradient = "purple" | "blue" | "orange" | "green";

/**
 * PageHeaderProps
 * ---------------
 * Describes all configurable inputs for the PageHeader component.
 *
 * Each property is optional unless required for correct rendering.
 */
export type PageHeaderProps = {
  /**
   * Main heading text for the page.
   * This is the primary visual anchor of the header.
   */
  title: string;

  /**
   * Optional contextual label shown above or near the title.
   * Commonly used for section grouping or categorization.
   */
  subtitle?: string;

  /**
   * Optional descriptive text shown below the title.
   * Provides additional context or explanation for the page.
   */
  description?: string;

  /**
   * Optional icon rendered alongside the title.
   * Accepts any valid React node (SVG, component, image).
   */
  icon?: ReactNode;

  /**
   * Optional badge text.
   * Typically used for status indicators like "Beta", "New", or "Pro".
   */
  badge?: string;

  /**
   * Controls the visual theme of the header.
   * Defaults are handled by the consuming component.
   */
  gradient?: PageHeaderGradient;

  /**
   * Optional right-side action area.
   * Designed for buttons, links, or controls relevant to the page.
   */
  action?: ReactNode;
};
