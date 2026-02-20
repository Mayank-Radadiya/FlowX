/**
 * CredentialSelector Component
 * ----------------------------
 * Reusable credential dropdown for AI node dialogs.
 * Fetches saved credentials by provider type and lets the user select one.
 */

"use client";

import { Controller, FormState, type Control } from "react-hook-form";
import { Key, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { CredentialType } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useCredentialGetByType } from "@/features/credentials/hooks/use-credential";

const CREDENTIAL_LABELS: Record<CredentialType, string> = {
  OPENAI: "OpenAI",
  ANTHROPIC: "Anthropic",
  GEMINI: "Google Gemini",
};

interface CredentialSelectorProps {
  credentialType: CredentialType;
  formState: FormState<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  accentColor?: string;
}

export function CredentialSelector({
  credentialType,
  control,
  name,
  formState,
  accentColor = "indigo",
}: CredentialSelectorProps) {
  const { data: credentials, isLoading } =
    useCredentialGetByType(credentialType);

  const providerLabel = CREDENTIAL_LABELS[credentialType];

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-white/80">
        <Key className="size-3.5" />
        Credential
        <span className="text-xs font-normal text-neutral-400 dark:text-white/40">
          (required)
        </span>
      </Label>

      {isLoading ? (
        <div className="flex items-center gap-2 h-11 px-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/2 dark:bg-white/5">
          <Loader2 className="size-4 animate-spin text-neutral-400" />
          <span className="text-sm text-neutral-400">
            Loading credentials...
          </span>
        </div>
      ) : credentials && credentials.length > 0 ? (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Select
              value={field.value || ""}
              onValueChange={(val) =>
                field.onChange(val === "__none__" ? "" : val)
              }
            >
              <SelectTrigger
                className={cn(
                  "h-11 px-4 rounded-xl border-black/10 dark:border-white/10",
                  "bg-black/2 dark:bg-white/5",
                  `focus:border-${accentColor}-500/50 focus:ring-2 focus:ring-${accentColor}-500/20`,
                  "transition-all duration-200",
                )}
              >
                <SelectValue placeholder="Use environment key (default)" />
              </SelectTrigger>

              <SelectContent className="rounded-xl border-black/10 dark:border-white/10">
                <SelectItem
                  value="__none__"
                  className="cursor-pointer rounded-lg my-0.5"
                >
                  <span className="text-neutral-500 dark:text-white/50">
                    Use environment key (default)
                  </span>
                </SelectItem>

                {credentials.map((cred) => (
                  <SelectItem
                    key={cred.id}
                    value={cred.id}
                    className="cursor-pointer rounded-lg my-0.5"
                  >
                    <div className="flex flex-col gap-0.5 py-0.5">
                      <span className="font-medium">{cred.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ••••••{cred.value.slice(-4)}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      ) : (
        <div className="flex items-center gap-3 h-11 px-4 rounded-xl border border-dashed border-black/15 dark:border-white/15 bg-black/2 dark:bg-white/5">
          <span className="text-sm text-neutral-400 dark:text-white/40">
            No {providerLabel} credentials
          </span>
          <Link
            href="/credentials"
            className={cn(
              "ml-auto flex items-center gap-1.5 text-xs font-medium",
              `text-${accentColor}-500 hover:text-${accentColor}-600`,
              "transition-colors",
            )}
          >
            Add credential
            <ExternalLink className="size-3" />
          </Link>
        </div>
      )}
      {formState?.errors?.[name] && (
        <p className="text-xs text-red-500 dark:text-red-400">
          {formState.errors[name]?.message as string}
        </p>
      )}

      <p className="text-xs text-neutral-500 dark:text-white/40">
        Select a saved credential or leave empty to use the environment key.
      </p>
    </div>
  );
}
