/**
 * CredentialProfileCard Component
 * Main profile card showing credential info and stats.
 */

import { cn } from "@/lib/utils";
import { Shield, Activity, Calendar, Clock } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { StatCard } from "./StatCard";
import { SecretKeyCard } from "./SecretKeyCard";
import type { ProviderTheme } from "../constants";
import type { LucideIcon } from "lucide-react";

interface CredentialProfileCardProps {
  credential: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
  Icon: LucideIcon;
  label: string;
  theme: ProviderTheme;
  onRequestReveal: () => void;
}

export function CredentialProfileCard({
  credential,
  Icon,
  label,
  theme,
  onRequestReveal,
}: CredentialProfileCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm">
      {/* Gradient Header */}
      <div className={cn("h-24 bg-linear-to-r", theme.gradient)} />

      {/* Profile Section */}
      <div className="relative px-6 pb-6">
        {/* Icon */}
        <div
          className={cn(
            "absolute -top-10 left-6 flex size-20 items-center justify-center rounded-2xl",
            "bg-linear-to-br text-white shadow-2xl border-4 border-white dark:border-neutral-900",
            theme.gradient,
            theme.glow
          )}
        >
          <Icon className="size-10" />
        </div>

        {/* Content */}
        <div className="pt-14">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            {credential.name}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium",
                theme.bg,
                theme.text
              )}
            >
              <Shield className="size-3" />
              {label}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
              <Activity className="size-3" />
              Active
            </span>
          </div>

          {/* Stats Grid */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <SecretKeyCard
              credentialId={credential.id}
              onRequestReveal={onRequestReveal}
            />
            <StatCard
              icon={Calendar}
              value={format(new Date(credential.createdAt), "MMM d, yyyy")}
              sublabel="Created"
            />
            <StatCard
              icon={Clock}
              value={formatDistanceToNow(new Date(credential.updatedAt), {
                addSuffix: false,
              })}
              sublabel="Last updated"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
