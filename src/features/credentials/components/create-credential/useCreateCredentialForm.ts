/**
 * useCreateCredentialForm Hook
 * ----------------------------
 * Encapsulates all logic required to manage the "Create Credential" form.
 *
 * Responsibilities:
 * - Manage form inputs using refs
 * - Trigger credential creation via mutation
 * - Handle loading state during async submission
 */

import { useRef, useState } from "react";
import { useCreateCredential } from "@/features/credentials/hooks/use-credential";
import type { CredentialType } from "@prisma/client";

export function useCreateCredentialForm(onSuccess?: () => void) {
  /**
   * Input references for uncontrolled inputs
   */
  const nameRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);

  /**
   * Credential type selection (controlled)
   */
  const [type, setType] = useState<CredentialType>("OPENAI");

  /**
   * Credential creation mutation
   */
  const { mutate, isPending } = useCreateCredential();

  /**
   * Submit handler
   */
  const submit = () => {
    const name = nameRef.current?.value.trim();
    const value = valueRef.current?.value.trim();

    if (!name || !value) {
      return; // Basic validation
    }

    mutate(
      {
        name,
        type,
        value,
      },
      {
        onSuccess: () => {
          // Reset form first
          if (nameRef.current) nameRef.current.value = "";
          if (valueRef.current) valueRef.current.value = "";
          setType("OPENAI");
          // Then call the provided callback
          onSuccess?.();
        },
      }
    );
  };

  /**
   * Reset form inputs
   */
  const reset = () => {
    if (nameRef.current) nameRef.current.value = "";
    if (valueRef.current) valueRef.current.value = "";
    setType("OPENAI");
  };

  /**
   * Keyboard handler for Enter key submission
   */
  const keydown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  return {
    nameRef,
    valueRef,
    type,
    setType,
    submit,
    reset,
    isPending,
    keydown,
  };
}
