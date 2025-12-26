/**
 * Credential Visual Utilities
 * ---------------------------
 * Provides deterministic icon and gradient mappings for credential types.
 *
 * Since there are only 3 credential types (OPENAI, ANTHROPIC, GEMINI),
 * we map icons and gradients directly to each type for consistency.
 */

import type { CredentialType } from "@prisma/client";
import type { LucideIcon } from "lucide-react";
import { Sparkles, Bot, Brain } from "lucide-react";

/**
 * CredentialGradient
 * ------------------
 * Color gradients mapped to each credential provider.
 */
export type CredentialGradient = "green" | "orange" | "blue";

/**
 * CREDENTIAL_CONFIG
 * -----------------
 * Centralized configuration for each credential type.
 * Each provider has a distinct icon and color scheme.
 */
export const CREDENTIAL_CONFIG: Record<
  CredentialType,
  {
    icon: LucideIcon;
    gradient: CredentialGradient;
    label: string;
    description: string;
  }
> = {
  OPENAI: {
    icon: Sparkles,
    gradient: "green",
    label: "OpenAI",
    description: "GPT-4, GPT-3.5, DALL-E, and more",
  },
  ANTHROPIC: {
    icon: Bot,
    gradient: "orange",
    label: "Anthropic",
    description: "Claude 3, Claude 2, and Claude Instant",
  },
  GEMINI: {
    icon: Brain,
    gradient: "blue",
    label: "Google Gemini",
    description: "Gemini Pro, Gemini Ultra, and more",
  },
};

/**
 * getCredentialIcon
 * -----------------
 * Returns the icon component for a credential type.
 */
export function getCredentialIcon(type: CredentialType): LucideIcon {
  return CREDENTIAL_CONFIG[type].icon;
}

/**
 * getCredentialGradient
 * ---------------------
 * Returns the gradient key for a credential type.
 */
export function getCredentialGradient(
  type: CredentialType
): CredentialGradient {
  return CREDENTIAL_CONFIG[type].gradient;
}

/**
 * getCredentialLabel
 * ------------------
 * Returns the display label for a credential type.
 */
export function getCredentialLabel(type: CredentialType): string {
  return CREDENTIAL_CONFIG[type].label;
}

/**
 * getCredentialDescription
 * ------------------------
 * Returns a brief description for a credential type.
 */
export function getCredentialDescription(type: CredentialType): string {
  return CREDENTIAL_CONFIG[type].description;
}
