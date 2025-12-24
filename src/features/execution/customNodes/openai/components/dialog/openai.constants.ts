/**
 * OpenAI Constants
 * ----------------
 * Configuration constants for the OpenAI AI node.
 */

/** Available OpenAI model options */
export const AVAILABLE_MODELS = [
  {
    value: "gpt-4.1",
    label: "GPT-4.1",
    description: "Flagship multimodal model (text, vision, audio)",
  },
  {
    value: "gpt-4o",
    label: "GPT-4o",
    description: "Flagship multimodal model (text, vision, audio)",
  },
  {
    value: "gpt-4o-mini",
    label: "GPT-4o Mini",
    description: "Fast and affordable model for everyday tasks",
  },
  {
    value: "o1",
    label: "O1",
    description: "Advanced reasoning model for complex problems",
  },
  {
    value: "o1-mini",
    label: "O1 Mini",
    description: "Efficient reasoning model for coding and STEM",
  },
] as const;

/** Model value type derived from AVAILABLE_MODELS */
export type OpenAIModel = (typeof AVAILABLE_MODELS)[number]["value"];

/** Default OpenAI API key from environment */
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

/** Default model selection */
export const DEFAULT_MODEL: OpenAIModel = "gpt-4.1";
