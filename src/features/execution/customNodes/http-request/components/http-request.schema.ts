import { z } from "zod";

export const httpRequestSchema = z.object({
  endpointUrl: z.url(
    "Please enter a valid URL (example: https://api.example.com/users)"
  ),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  body: z.string().optional(),
});

export type HttpRequestFormValues = z.infer<typeof httpRequestSchema>;