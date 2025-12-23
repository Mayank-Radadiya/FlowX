import { z } from "zod";

export const httpRequestSchema = z.object({
  variableName: z
    .string()
    .min(1, "Variable name is required")
    .regex(/^[a-zA-Z_][a-zA-Z0-9_$]*$/, {
      message:
        "Variable name must start with a letter or underscore and can only contain letters, numbers, and underscores",
    }),
  endpointUrl: z.string(
    "Please enter a valid URL (example: https://api.example.com/users)"
  ),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  body: z.string().optional(),
});

export type HttpRequestFormValues = z.infer<typeof httpRequestSchema>;
