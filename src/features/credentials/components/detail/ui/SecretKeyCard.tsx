/**
 * SecretKeyCard Component
 * Displays the API key with reveal/copy functionality.
 * Uses useRevealSecret hook for isolated state management.
 */

"use client";

import { memo } from "react";
import { useRevealSecret } from "../hooks/useRevealSecret";
import { KeyRound, Eye, EyeOff, Copy, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SecretKeyCardProps {
  credentialId: string;
  onRequestReveal: () => void;
}

export const SecretKeyCard = memo(function SecretKeyCard({
  credentialId,
  onRequestReveal,
}: SecretKeyCardProps) {
  const {
    isRevealed,
    isLoading,
    maskedKey,
    copied,
    canCopy,
    hide,
    copyToClipboard,
  } = useRevealSecret(credentialId);

  return (
    <div className="col-span-2 p-4 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <KeyRound className="size-5 text-neutral-400 dark:text-white/40" />
          <div>
            <div className="text-xs text-neutral-500 dark:text-white/40">
              API Key
            </div>
            <div className="font-mono text-sm text-neutral-900 dark:text-white">
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                maskedKey
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {canCopy && (
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="h-8 px-2"
            >
              {copied ? (
                <Check className="size-4 text-emerald-500" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={isRevealed ? hide : onRequestReveal}
            className="h-8 px-2"
          >
            {isRevealed ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
});
