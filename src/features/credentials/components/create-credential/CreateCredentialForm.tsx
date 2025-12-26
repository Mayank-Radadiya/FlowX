/**
 * CreateCredentialForm Component
 * ------------------------------
 * Renders the form used inside the "Create Credential" dialog.
 *
 * Responsibilities:
 * - Collect credential name, type, and API key
 * - Show type-specific icons and descriptions
 * - Provide visual feedback during submission
 */

"use client";

import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BadgePlus, Eye, EyeOff, KeyRound, Loader2, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreateCredentialForm } from "./useCreateCredentialForm";
import { CREDENTIAL_CONFIG } from "../lib/credential-utils";
import type { CredentialType } from "@prisma/client";
import { useState } from "react";

interface CreateCredentialFormProps {
  onDone: () => void;
}

const CREDENTIAL_TYPES: CredentialType[] = ["OPENAI", "ANTHROPIC", "GEMINI"];

export function CreateCredentialForm({ onDone }: CreateCredentialFormProps) {
  const { nameRef, valueRef, type, setType, submit, isPending, keydown } =
    useCreateCredentialForm(onDone);

  const [showSecret, setShowSecret] = useState(false);

  const selectedConfig = CREDENTIAL_CONFIG[type];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      onKeyDown={keydown}
    >
      <div className="space-y-5 px-6 py-4">
        {/* Credential Name Field */}
        <div className="space-y-2">
          <Label
            htmlFor="credential-name"
            className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-white/80"
          >
            <Type className="size-3.5" />
            Credential Name
          </Label>

          <Input
            id="credential-name"
            ref={nameRef}
            placeholder="My API Key..."
            disabled={isPending}
            className={cn(
              "h-11 rounded-xl border-black/10 dark:border-white/10",
              "bg-black/2 dark:bg-white/5",
              "placeholder:text-neutral-400 dark:placeholder:text-white/30",
              "focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20",
              "transition-all duration-200"
            )}
          />
          <p className="text-xs text-neutral-500 dark:text-white/40">
            A descriptive name to identify this credential
          </p>
        </div>

        {/* Credential Type Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-white/80">
            <KeyRound className="size-3.5" />
            Provider
          </Label>

          <div className="grid grid-cols-3 gap-2">
            {CREDENTIAL_TYPES.map((credType) => {
              const config = CREDENTIAL_CONFIG[credType];
              const Icon = config.icon;
              const isSelected = type === credType;

              return (
                <button
                  key={credType}
                  type="button"
                  onClick={() => setType(credType)}
                  disabled={isPending}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl p-3 border transition-all duration-200",
                    isSelected
                      ? "border-blue-500/50 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                      : "border-black/10 dark:border-white/10 bg-black/2 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10"
                  )}
                >
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-lg transition-all",
                      isSelected
                        ? "bg-linear-to-br from-blue-500 to-cyan-600 text-white shadow-lg"
                        : "bg-black/5 dark:bg-white/10 text-neutral-600 dark:text-white/60"
                    )}
                  >
                    <Icon className="size-5" />
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium transition-colors",
                      isSelected
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-neutral-600 dark:text-white/60"
                    )}
                  >
                    {config.label}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-neutral-500 dark:text-white/40">
            {selectedConfig.description}
          </p>
        </div>

        {/* API Key Field */}
        <div className="space-y-2">
          <Label
            htmlFor="credential-value"
            className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-white/80"
          >
            <KeyRound className="size-3.5" />
            API Key
          </Label>

          <div className="relative">
            <Input
              id="credential-value"
              ref={valueRef}
              type={showSecret ? "text" : "password"}
              placeholder="sk-..."
              disabled={isPending}
              className={cn(
                "h-11 rounded-xl border-black/10 dark:border-white/10 pr-10",
                "bg-black/2 dark:bg-white/5 font-mono text-sm",
                "placeholder:text-neutral-400 dark:placeholder:text-white/30",
                "focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20",
                "transition-all duration-200"
              )}
            />
            <button
              type="button"
              onClick={() => setShowSecret(!showSecret)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:text-white/40 dark:hover:text-white/60 transition-colors"
            >
              {showSecret ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          <p className="text-xs text-neutral-500 dark:text-white/40">
            Your API key is encrypted and stored securely
          </p>
        </div>
      </div>

      {/* Dialog Footer Actions */}
      <DialogFooter>
        <DialogClose
          disabled={isPending}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
        >
          Cancel
        </DialogClose>

        <Button
          type="submit"
          disabled={isPending}
          className="h-10 rounded-xl bg-linear-to-r from-blue-500 to-cyan-600 text-white hover:from-blue-600 hover:to-cyan-700 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-blue-500/25"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <BadgePlus className="mr-2 size-4" />
              Add Credential
            </>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
