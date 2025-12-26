/**
 * useRevealSecret Hook
 * Manages the reveal secret state and copy functionality.
 * Separate hook to isolate re-renders from reveal actions.
 */

import { useState, useCallback } from "react";
import { useRevealCredentialSecret } from "@/features/credentials/hooks/use-credential";
import toast from "react-hot-toast";

export function useRevealSecret(credentialId: string) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const { data: secretData, isLoading } = useRevealCredentialSecret(
    credentialId,
    isRevealed
  );

  // Mask the key - show first 4 chars only when revealed
  const maskedKey = secretData?.value
    ? `${secretData.value.slice(0, 4)}${"•".repeat(16)}`
    : "sk-••••••••••••";

  const reveal = useCallback(() => {
    setIsRevealed(true);
  }, []);

  const hide = useCallback(() => {
    setIsRevealed(false);
  }, []);

  const copyToClipboard = useCallback(() => {
    if (secretData?.value) {
      navigator.clipboard.writeText(secretData.value);
      setCopied(true);
      toast.success("Key copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  }, [secretData?.value]);

  return {
    isRevealed,
    isLoading,
    maskedKey,
    copied,
    canCopy: isRevealed && !!secretData?.value,
    reveal,
    hide,
    copyToClipboard,
  };
}
