/**
 * Provider theme configurations for credential cards.
 * Centralized styling for consistent appearance across components.
 */

import type { CredentialType } from "@prisma/client";

export interface ProviderTheme {
  gradient: string;
  glow: string;
  bg: string;
  text: string;
}

export const PROVIDER_THEMES: Record<CredentialType, ProviderTheme> = {
  OPENAI: {
    gradient: "from-emerald-500 to-green-600",
    glow: "shadow-emerald-500/40",
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  ANTHROPIC: {
    gradient: "from-orange-500 to-amber-600",
    glow: "shadow-orange-500/40",
    bg: "bg-orange-500/10",
    text: "text-orange-600 dark:text-orange-400",
  },
  GEMINI: {
    gradient: "from-blue-500 to-indigo-600",
    glow: "shadow-blue-500/40",
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
  },
};
