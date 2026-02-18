/**
 * useOpenAIForm Hook
 * ------------------
 * Custom hook for managing OpenAI dialog form state and submission.
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OpenAIFormValues, openaiSchema } from "./openai.schema";
import { DEFAULT_MODEL } from "./openai.constants";

interface UseOpenAIFormProps {
  /** Existing form values for editing */
  defaultData?: Partial<OpenAIFormValues>;
  /** Callback when form is successfully submitted */
  onSubmit: (data: OpenAIFormValues) => void;
  /** Callback to close the dialog */
  onClose: () => void;
}

export function useOpenAIForm({
  defaultData = {},
  onSubmit,
  onClose,
}: UseOpenAIFormProps) {
  const form = useForm<OpenAIFormValues>({
    resolver: zodResolver(openaiSchema),
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
