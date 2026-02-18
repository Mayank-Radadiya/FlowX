/**
 * CredentialItems Component
 * -------------------------
 * Premium bento-style layout with stats widgets and credential cards.
 * Includes pagination inside Suspense boundary to prevent hydration mismatch.
 */

"use client";

import { useSuspenseCredentials } from "@/features/credentials/hooks/use-credential";
import { EmptyCredentialState } from "./ui/EmptyCredentialState";
import { CredentialCard } from "./CredentialCard";
import { Lock, Sparkles, Bot, Brain } from "lucide-react";
import { StatCard } from "./ui/StatCard";
import PaginationUi from "@/components/global/pagination/PaginationUi";

export function CredentialItems() {
  const { data } = useSuspenseCredentials();

  if (!data.items.length) {
    return <EmptyCredentialState />;
  }

  // Count by type (current page only - for overall counts, backend would need to aggregate)
  const counts = {
    OPENAI: data.items.filter((c) => c.type === "OPENAI").length,
    ANTHROPIC: data.items.filter((c) => c.type === "ANTHROPIC").length,
    GEMINI: data.items.filter((c) => c.type === "GEMINI").length,
  };

  return (
    <div className="space-y-6">
      {/* Bento Stats Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {/* Total Count - Larger */}
        <div className="col-span-2 relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-white/[0.02] p-5 backdrop-blur-xl">
          <div className="absolute -top-8 -right-8 size-24 rounded-full bg-linear-to-br from-violet-500/20 to-purple-500/20 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <Lock className="size-4" />
              Total Secured
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">
                {data.totalCount}
              </span>
              <span className="text-white/40 text-sm">credentials</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400">
              <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All encrypted & active
            </div>
          </div>
        </div>

        {/* Provider Stats */}
        <StatCard
          icon={Sparkles}
          label="OpenAI"
          count={counts.OPENAI}
          gradient="from-emerald-500/20 to-green-500/20"
          color="text-emerald-400"
        />
        <StatCard
          icon={Brain}
          label="Gemini"
          count={counts.GEMINI}
          gradient="from-blue-500/20 to-blue-500/20"
          color="text-blue-400"
        />
        <StatCard
          icon={Bot}
          label="Anthropic"
          count={counts.ANTHROPIC}
          gradient="from-orange-500/20 to-amber-500/20"
          color="text-orange-400"
        />
      </div>

      {/* Credential Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((credential) => (
          <CredentialCard
            key={credential.id}
            id={credential.id}
            name={credential.name}
            type={credential.type}
            createdAt={credential.createdAt}
          />
        ))}
      </div>

      {/* Pagination - Inside Suspense boundary to avoid hydration mismatch */}
      {data.totalPages > 1 && (
        <div className="flex items-center justify-end pt-4 border-t border-white/10">
          <PaginationUi currentPage={data.page} totalPages={data.totalPages} />
        </div>
      )}
    </div>
  );
}
