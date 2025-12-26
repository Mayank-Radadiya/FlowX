/**
 * EmptyCredentialState Component
 * ------------------------------
 * Compact box design for empty state (not full-size).
 */

"use client";

import {
  KeyRound,
  Plus,
  Shield,
  Lock,
  Fingerprint,
  Sparkles,
  Bot,
  Brain,
} from "lucide-react";
import { CreateCredentialDialog } from "../../create-credential/CreateCredentialDialog";
import { cn } from "@/lib/utils";

const providers = [
  { icon: Sparkles, name: "OpenAI", color: "from-emerald-500 to-green-600" },
  { icon: Bot, name: "Anthropic", color: "from-orange-500 to-amber-600" },
  { icon: Brain, name: "Gemini", color: "from-blue-500 to-indigo-600" },
];

export function EmptyCredentialState() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Compact Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-xl">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-32 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="relative flex flex-col items-center text-center">
          {/* Animated Vault Icon */}
          <div className="relative mb-6">
            <div className="absolute inset-0 size-20 rounded-2xl bg-linear-to-br from-violet-500/30 to-blue-500/30 blur-xl animate-pulse" />
            <div className="relative flex size-20 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 via-purple-500 to-blue-600 shadow-xl shadow-violet-500/30">
              <KeyRound className="size-10 text-white" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-white">Your vault is empty</h2>
          <p className="mt-2 text-sm text-white/50 max-w-xs">
            Add API credentials for your AI providers. All secrets are
            encrypted.
          </p>

          {/* CTA */}
          <div className="mt-6">
            <CreateCredentialDialog>
              <span className="flex items-center gap-2">
                <Plus className="size-4" />
                Add First Credential
              </span>
            </CreateCredentialDialog>
          </div>

          {/* Provider Icons */}
          <div className="mt-6 flex items-center gap-2">
            {providers.map((provider) => (
              <div
                key={provider.name}
                className={cn(
                  "flex size-8 items-center justify-center rounded-lg",
                  "bg-linear-to-br text-white/80 shadow",
                  provider.color
                )}
              >
                <provider.icon className="size-4" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security badges - compact row */}
      <div className="mt-6 flex items-center gap-4 text-xs text-white/30">
        <div className="flex items-center gap-1.5">
          <Shield className="size-3" />
          AES-256
        </div>
        <div className="flex items-center gap-1.5">
          <Lock className="size-3" />
          Zero-Knowledge
        </div>
        <div className="flex items-center gap-1.5">
          <Fingerprint className="size-3" />
          Secure Vault
        </div>
      </div>
    </div>
  );
}
