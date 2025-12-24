/**
 * useAnthropicForm Hook
 * ---------------------
 * Custom hook for managing Anthropic dialog form state and submission.
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnthropicFormValues, anthropicSchema } from "./anthropic.schema";
import { DEFAULT_MODEL, ANTHROPIC_API_KEY } from "./anthropic.constants";

interface UseAnthropicFormProps {
  /** Existing form values for editing */
  defaultData?: Partial<AnthropicFormValues>;
  /** Callback when form is successfully submitted */
  onSubmit: (data: AnthropicFormValues) => void;
  /** Callback to close the dialog */
  onClose: () => void;
}

export function useAnthropicForm({
  defaultData = {},
  onSubmit,
  onClose,
}: UseAnthropicFormProps) {
  const form = useForm<AnthropicFormValues>({
    resolver: zodResolver(anthropicSchema),
    defaultValues: {
      variableName: defaultData.variableName || "",
      model: defaultData.model || DEFAULT_MODEL,
      systemPrompt: defaultData.systemPrompt || "",
      userPrompt: defaultData.userPrompt || "",
      anthropicApiKey: defaultData.anthropicApiKey || ANTHROPIC_API_KEY,
    },
  });

  const submit = form.handleSubmit((data) => {
    onSubmit(data);
    onClose();
  });

  return { form, submit };
}
