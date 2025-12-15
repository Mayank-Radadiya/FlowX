/**
 * useCreateWorkflowForm Hook
 * -------------------------
 * Encapsulates all logic required to manage the "Create Workflow" form.
 *
 * Responsibilities:
 *  - Manage uncontrolled form inputs using refs
 *  - Trigger workflow creation via mutation
 *  - Handle loading state during async submission
 *  - Provide helpers for submit, reset, and keyboard interactions
 *
 * This hook keeps form logic separate from UI components,
 * improving readability and reusability.
 */

import { useRef } from "react";
import { useCreateWorkflow } from "@/features/workflows/hooks/use-workflows";

export function useCreateWorkflowForm(onSuccess?: () => void) {
  /**
   * Input references
   * ----------------
   * Refs are used instead of state to:
   *  - Avoid unnecessary re-renders
   *  - Keep the form lightweight
   *  - Work well inside dialogs and modals
   */
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Workflow creation mutation
   * --------------------------
   * mutate    → triggers the API call
   * isPending → indicates submission/loading state
   */
  const { mutate, isPending } = useCreateWorkflow();

  /**
   * submit
   * ------
   * Reads values from refs, sanitizes input,
   * and triggers the workflow creation mutation.
   *
   * - Trims whitespace from inputs
   * - Converts empty strings to `undefined`
   *   so optional fields are omitted
   */
  const submit = () => {
    mutate(
      {
        name: nameRef.current?.value.trim() || undefined,
        description: descriptionRef.current?.value.trim() || undefined,
      },
      { onSuccess }
    );
  };

  /**
   * reset
   * -----
   * Clears all form inputs manually by
   * resetting the underlying DOM values.
   *
   * Useful after successful submission
   * or when the dialog is closed.
   */
  const reset = () => {
    if (nameRef.current) nameRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
  };

  /**
   * keydown
   * -------
   * Handles keyboard submission behavior.
   *
   * When the Enter key is pressed:
   *  - Prevents default form submission
   *  - Triggers the submit handler manually
   *
   * This provides consistent behavior across inputs
   * and avoids accidental multiline submissions.
   */
  const keydown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  return {
    nameRef,
    descriptionRef,
    submit,
    reset,
    isPending,
    keydown,
  };
}
