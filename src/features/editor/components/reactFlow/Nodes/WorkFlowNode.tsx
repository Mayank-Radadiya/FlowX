"use client";

import { memo, useState, type ReactNode, type ComponentType } from "react";
import { Handle, Position } from "@xyflow/react";
import {
  Settings,
  Trash2,
  MoreHorizontal,
  type LucideProps,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BaseNode,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
  BaseNodeIcon,
  BaseNodeContent,
  BaseNodeBadge,
} from "@/components/ui/react-flow/base-node";

interface WorkFlowNodeProps {
  children?: ReactNode;
  showToolbar?: boolean;
  onDelete?: () => void;
  onSetting?: () => void;
  name?: string;
  description?: string;
  icon?: ComponentType<LucideProps>;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  badge?: string;
  badgeVariant?: "default" | "success" | "warning" | "error";
  hasInput?: boolean;
  hasOutput?: boolean;
  selected?: boolean;
}

// Variant color configurations
const variantStyles = {
  default: {
    border: "border-neutral-200/60 dark:border-neutral-700/60",
    bg: "bg-white/95 dark:bg-neutral-900/95",
    header:
      "bg-neutral-50/80 dark:bg-neutral-800/50 border-neutral-200/60 dark:border-neutral-700/60",
    icon: "bg-neutral-100 dark:bg-neutral-700/50 text-neutral-600 dark:text-neutral-400",
    title: "text-neutral-800 dark:text-neutral-100",
    description: "text-neutral-500 dark:text-neutral-400",
    handle: "border-neutral-400! dark:border-neutral-500!",
    selected:
      "border-neutral-500 dark:border-neutral-400 ring-2 ring-neutral-500/20 shadow-xl shadow-neutral-500/10",
  },
  primary: {
    border: "border-violet-200/60 dark:border-violet-500/30",
    bg: "bg-linear-to-br from-white/95 to-violet-50/30 dark:from-neutral-900/95 dark:to-violet-950/20",
    header:
      "bg-violet-50/80 dark:bg-violet-950/50 border-violet-200/60 dark:border-violet-500/20",
    icon: "bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400",
    title: "text-violet-800 dark:text-violet-200",
    description: "text-violet-600/70 dark:text-violet-400/70",
    handle: "border-violet-400! dark:border-violet-500!",
    selected:
      "border-violet-500 dark:border-violet-400 ring-2 ring-violet-500/20 shadow-xl shadow-violet-500/20",
  },
  success: {
    border: "border-emerald-200/60 dark:border-emerald-500/30",
    bg: "bg-linear-to-br from-white/95 to-emerald-50/30 dark:from-neutral-900/95 dark:to-emerald-950/20",
    header:
      "bg-emerald-50/80 dark:bg-emerald-950/50 border-emerald-200/60 dark:border-emerald-500/20",
    icon: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    title: "text-emerald-800 dark:text-emerald-200",
    description: "text-emerald-600/70 dark:text-emerald-400/70",
    handle: "border-emerald-400! dark:border-emerald-500!",
    selected:
      "border-emerald-500 dark:border-emerald-400 ring-2 ring-emerald-500/20 shadow-xl shadow-emerald-500/20",
  },
  warning: {
    border: "border-amber-200/60 dark:border-amber-500/30",
    bg: "bg-linear-to-br from-white/95 to-amber-50/30 dark:from-neutral-900/95 dark:to-amber-950/20",
    header:
      "bg-amber-50/80 dark:bg-amber-950/50 border-amber-200/60 dark:border-amber-500/20",
    icon: "bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400",
    title: "text-amber-800 dark:text-amber-200",
    description: "text-amber-600/70 dark:text-amber-400/70",
    handle: "border-amber-400! dark:border-amber-500!",
    selected:
      "border-amber-500 dark:border-amber-400 ring-2 ring-amber-500/20 shadow-xl shadow-amber-500/20",
  },
  danger: {
    border: "border-red-200/60 dark:border-red-500/30",
    bg: "bg-linear-to-br from-white/95 to-red-50/30 dark:from-neutral-900/95 dark:to-red-950/20",
    header:
      "bg-red-50/80 dark:bg-red-950/50 border-red-200/60 dark:border-red-500/20",
    icon: "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400",
    title: "text-red-800 dark:text-red-200",
    description: "text-red-600/70 dark:text-red-400/70",
    handle: "border-red-400! dark:border-red-500!",
    selected:
      "border-red-500 dark:border-red-400 ring-2 ring-red-500/20 shadow-xl shadow-red-500/20",
  },
};

const WorkFlowNode = memo(
  ({
    children,
    showToolbar = true,
    onDelete,
    onSetting,
    name = "Workflow Node",
    description,
    icon: Icon,
    variant = "default",
    badge,
    badgeVariant = "default",
    hasInput = true,
    hasOutput = true,
    selected = false,
  }: WorkFlowNodeProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const styles = variantStyles[variant];

    return (
      <BaseNode
        className={cn(
          "w-60 transition-all duration-200",
          styles.border,
          styles.bg,
          selected && styles.selected,
          "hover:shadow-lg"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Toolbar - appears on hover */}
        {showToolbar && (
          <div
            className={cn(
              "absolute -top-9 left-1/2 -translate-x-1/2",
              "flex items-center gap-1 px-2 py-1.5",
              "bg-white dark:bg-neutral-800",
              "border border-neutral-200 dark:border-neutral-700",
              "rounded-lg shadow-lg",
              "transition-all duration-200",
              isHovered || selected
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none"
            )}
          >
            {onSetting && (
              <button
                onClick={onSetting}
                className={cn(
                  "p-1.5 rounded-md",
                  "text-neutral-500 dark:text-neutral-400",
                  "hover:bg-neutral-100 dark:hover:bg-neutral-700",
                  "hover:text-neutral-700 dark:hover:text-neutral-200",
                  "transition-colors"
                )}
              >
                <Settings className="size-3.5" />
              </button>
            )}
            <button
              className={cn(
                "p-1.5 rounded-md",
                "text-neutral-500 dark:text-neutral-400",
                "hover:bg-neutral-100 dark:hover:bg-neutral-700",
                "hover:text-neutral-700 dark:hover:text-neutral-200",
                "transition-colors"
              )}
            >
              <MoreHorizontal className="size-3.5" />
            </button>
            {onDelete && (
              <button
                onClick={onDelete}
                className={cn(
                  "p-1.5 rounded-md",
                  "text-neutral-500 dark:text-neutral-400",
                  "hover:bg-red-100 dark:hover:bg-red-500/20",
                  "hover:text-red-600 dark:hover:text-red-400",
                  "transition-colors"
                )}
              >
                <Trash2 className="size-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Header */}
        <BaseNodeHeader className={styles.header}>
          {Icon && (
            <BaseNodeIcon className={styles.icon}>
              <Icon className="size-3.5" />
            </BaseNodeIcon>
          )}
          <BaseNodeHeaderTitle className={styles.title}>
            {name}
          </BaseNodeHeaderTitle>
          {badge && (
            <BaseNodeBadge variant={badgeVariant}>{badge}</BaseNodeBadge>
          )}
        </BaseNodeHeader>

        {/* Content */}
        <BaseNodeContent>
          {description && (
            <p className={cn("text-xs", styles.description)}>{description}</p>
          )}
          {children}
        </BaseNodeContent>

        {/* Input Handle */}
        {hasInput && (
          <Handle
            type="target"
            position={Position.Top}
            className={cn(
              "w-3! h-3! border-2! rounded-full!",
              styles.handle,
              "bg-white! dark:bg-neutral-900!",
              "-top-1.5!",
              "hover:scale-125! transition-transform!"
            )}
          />
        )}

        {/* Output Handle */}
        {hasOutput && (
          <Handle
            type="source"
            position={Position.Bottom}
            className={cn(
              "w-3! h-3! border-2! rounded-full!",
              styles.handle,
              "bg-white! dark:bg-neutral-900!",
              "-bottom-1.5!",
              "hover:scale-125! transition-transform!"
            )}
          />
        )}
      </BaseNode>
    );
  }
);

WorkFlowNode.displayName = "WorkFlowNode";

export default WorkFlowNode;
