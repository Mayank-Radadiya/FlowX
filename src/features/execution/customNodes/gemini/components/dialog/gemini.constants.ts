/**
 * Gemini Constants
 * ----------------
 * Configuration constants for the Gemini AI node.
 */

/** Available Gemini model options */
export const AVAILABLE_MODELS = [
  {
    value: "gemini-2.5-flash",
    label: "Gemini 2.5 Flash",
    description: "Fast and efficient",
  },
  {
    value: "gemini-2.5-pro",
    label: "Gemini 2.5 Pro",
    description: "Advanced reasoning",
  },
  {
    value: "gemini-2.5-flash-exp",
    label: "Gemini 2.5 Flash (Exp)",
    description: "Experimental features",
  },
  {
    value: "gemini-2.5-pro-exp",
    label: "Gemini 2.5 Pro (Exp)",
    description: "Cutting-edge capabilities",
  },
  {
    value: "gemini-1.5-flash",
    label: "Gemini 1.5 Flash",
    description: "Stable and fast",
  },
  {
    value: "gemini-1.5-pro",
    label: "Gemini 1.5 Pro",
    description: "Production ready",
  },
] as const;

/** Model value type derived from AVAILABLE_MODELS */
export type GeminiModel = (typeof AVAILABLE_MODELS)[number]["value"];

/** Default model selection */
export const DEFAULT_MODEL: GeminiModel = "gemini-2.5-flash";
