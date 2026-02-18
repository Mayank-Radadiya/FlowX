/**
 * useGeminiForm Hook
 * ------------------
 * Custom hook for managing Gemini dialog form state and submission.
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GeminiFormValues, geminiSchema } from "./gemini.schema";
import { DEFAULT_MODEL } from "./gemini.constants";

interface UseGeminiFormProps {
  /** Existing form values for editing */
  defaultData?: Partial<GeminiFormValues>;
  /** Callback when form is successfully submitted */
  onSubmit: (data: GeminiFormValues) => void;
  /** Callback to close the dialog */
  onClose: () => void;
}

export function useGeminiForm({
  defaultData = {},
  onSubmit,
  onClose,
}: UseGeminiFormProps) {
  const form = useForm<GeminiFormValues>({
    resolver: zodResolver(geminiSchema),
    defaultValues: {
      variableName: defaultData.variableName || "",
      model: defaultData.model || DEFAULT_MODEL,
      systemPrompt: defaultData.systemPrompt || "",
      userPrompt: defaultData.userPrompt || "",
      credentialId: defaultData.credentialId || "",
    },
  });

  const submit = form.handleSubmit((data) => {
    onSubmit(data);
    onClose();
  });

  return { form, submit };
}
