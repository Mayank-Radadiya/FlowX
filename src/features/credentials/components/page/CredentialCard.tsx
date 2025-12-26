/**
 * CredentialCard Component
 * ------------------------
 * Premium 3D card with glassmorphism, hover animations,
 * and provider-specific glow effects.
 */

"use client";

import { cn } from "@/lib/utils";
import { Shield, MoreVertical, Copy, Trash2, Check } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import type { CredentialType } from "@prisma/client";
import { useState } from "react";
import { getCredentialIcon, getCredentialLabel } from "../lib/credential-utils";

interface CredentialCardProps {
  id: string;
  name: string;
  type: CredentialType;
  createdAt: Date | string;
}

// Premium gradient configurations
const providerThemes = {
  OPENAI: {
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    glow: "shadow-emerald-500/50",
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/20 hover:border-emerald-500/50",
    ring: "ring-emerald-500/30",
    text: "text-emerald-400",
  },
  ANTHROPIC: {
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    glow: "shadow-orange-500/50",
    bg: "bg-orange-500/5",
    border: "border-orange-500/20 hover:border-orange-500/50",
    ring: "ring-orange-500/30",
    text: "text-orange-400",
  },
  GEMINI: {
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    glow: "shadow-blue-500/50",
    bg: "bg-blue-500/5",
    border: "border-blue-500/20 hover:border-blue-500/50",
    ring: "ring-blue-500/30",
    text: "text-blue-400",
  },
};

export function CredentialCard({
  id,
  name,
  type,
  createdAt,
}: CredentialCardProps) {
  const [copied, setCopied] = useState(false);
  const Icon = getCredentialIcon(type);
  const label = getCredentialLabel(type);
  const theme = providerThemes[type];

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Link
      href={`/credentials/${id}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl",
        "border backdrop-blur-xl transition-all duration-500",
        theme.border,
        "hover:shadow-2xl",
        theme.glow,
        "hover:-translate-y-1 hover:scale-[1.02]",
        "active:scale-[0.98]"
      )}
    >
      {/* Animated gradient background */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          "bg-linear-to-br",
          theme.bg
        )}
      />

      {/* Floating orb glow effect */}
      <div
        className={cn(
          "absolute -top-12 -right-12 size-32 rounded-full blur-3xl transition-all duration-700",
          "bg-linear-to-br opacity-0 group-hover:opacity-60",
          theme.gradient
        )}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          {/* Icon with animated ring */}
          <div className="relative">
            <div
              className={cn(
                "absolute inset-0 rounded-xl blur-md transition-all duration-500",
                "bg-linear-to-br opacity-0 group-hover:opacity-50",
                theme.gradient
              )}
            />
            <div
              className={cn(
                "relative flex size-12 items-center justify-center rounded-xl",
                "bg-linear-to-br text-white shadow-lg",
                theme.gradient,
                "ring-2 ring-offset-2 ring-offset-background/50",
                theme.ring,
                "transition-transform duration-300 group-hover:scale-110"
              )}
            >
              <Icon className="size-6" />
            </div>
          </div>

          {/* Actions */}
          <button
            onClick={handleCopy}
            className={cn(
              "flex size-8 items-center justify-center rounded-lg",
              "bg-white/5 hover:bg-white/10 transition-colors",
              "opacity-0 group-hover:opacity-100"
            )}
          >
            {copied ? (
              <Check className="size-4 text-emerald-400" />
            ) : (
              <Copy className="size-4 text-white/50" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="mt-4">
          <h3 className="font-semibold text-white truncate text-lg">{name}</h3>

          <div className="mt-2 flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                "bg-white/5 backdrop-blur-sm border border-white/10",
                theme.text
              )}
            >
              <Shield className="size-3" />
              {label}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/40">
              Added{" "}
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </span>
            <div className="flex items-center gap-1 text-emerald-400">
              <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Active</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
