/**
 * Anthropic Constants
 * -------------------
 * Configuration constants for the Anthropic AI node.
 */

/** Available Anthropic model options */
export const AVAILABLE_MODELS = [
  {
    value: "claude-3-5-sonnet-20241022",
    label: "Claude 3.5 Sonnet",
    description: "Most intelligent model",
  },
  {
    value: "claude-3-5-haiku-20241022",
    label: "Claude 3.5 Haiku",
    description: "Fastest and most compact",
  },
  {
    value: "claude-3-opus-20240229",
    label: "Claude 3 Opus",
    description: "Powerful model for complex tasks",
  },
  {
    value: "claude-3-sonnet-20240229",
    label: "Claude 3 Sonnet",
    description: "Balance of intelligence and speed",
  },
  {
    value: "claude-3-haiku-20240307",
    label: "Claude 3 Haiku",
    description: "Fast and cost-effective",
  },
] as const;

/** Model value type derived from AVAILABLE_MODELS */
export type AnthropicModel = (typeof AVAILABLE_MODELS)[number]["value"];

/** Default Anthropic API key from environment */
export const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";

/** Default model selection */
export const DEFAULT_MODEL: AnthropicModel = "claude-3-5-sonnet-20241022";
