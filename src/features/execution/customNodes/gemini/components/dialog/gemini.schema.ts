/**
 * Gemini Form Schema
 * ------------------
 * Zod validation schema for the Gemini AI node configuration form.
 */

import { z } from "zod";
import { AVAILABLE_MODELS } from "./gemini.constants";

/** Extract model values for enum validation */
const modelValues = AVAILABLE_MODELS.map((m) => m.value) as [
  string,
  ...string[],
];

export const geminiSchema = z.object({
  /** Unique variable name to store the AI response for use in subsequent nodes */
  variableName: z
    .string()
    .min(1, "Variable name is required")
    .regex(/^[a-zA-Z_][a-zA-Z0-9_$]*$/, {
      message:
        "Must start with a letter or underscore, containing only letters, numbers, and underscores",
    }),

  /** Selected Gemini model */
  model: z.enum(modelValues),

  /** Optional system instructions for the AI */
  systemPrompt: z.string().optional(),

  /** Required user prompt/question for the AI */
  userPrompt: z.string().min(1, "User prompt is required"),

  /** Optional credential ID from the Credentials vault */
  credentialId: z.string().optional(),
});

export type GeminiFormValues = z.infer<typeof geminiSchema>;
