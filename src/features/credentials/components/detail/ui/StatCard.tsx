/**
 * StatCard Component
 * Reusable stat display card for credential details.
 */

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  sublabel: string;
  className?: string;
}

export function StatCard({
  icon: Icon,
  value,
  sublabel,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-xl",
        "bg-neutral-50 dark:bg-white/5",
        "border border-neutral-200 dark:border-white/10",
        className
      )}
    >
      <Icon className="size-5 text-neutral-400 dark:text-white/40 mb-2" />
      <div className="text-base font-semibold text-neutral-900 dark:text-white">
        {value}
      </div>
      <div className="text-xs text-neutral-500 dark:text-white/40">
        {sublabel}
      </div>
    </div>
  );
}
