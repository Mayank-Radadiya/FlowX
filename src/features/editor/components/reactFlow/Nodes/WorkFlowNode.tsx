"use client";

import { memo, useState, type ReactNode, type ComponentType } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Settings, Trash2, Copy, type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

interface WorkFlowNodeProps {
  id?: string;
  children?: ReactNode;
  showToolbar?: boolean;
  onDelete?: () => void;
  onSetting?: () => void;
  onDuplicate?: () => void;
  name?: string;
  description?: string;
  icon?: ComponentType<LucideProps>;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  badge?: string;
  hasInput?: boolean;
  hasOutput?: boolean;
  selected?: boolean;
}

// ============================================================================
// Variant Configurations
// ============================================================================

const variants = {
  default: {
    card: "border-neutral-200 dark:border-neutral-700/80",
    cardSelected:
      "border-neutral-400 dark:border-neutral-500 shadow-lg shadow-neutral-200/50 dark:shadow-neutral-900/50",
    header: "bg-neutral-50 dark:bg-neutral-800/80",
    iconBg: "bg-neutral-100 dark:bg-neutral-700",
    iconText: "text-neutral-600 dark:text-neutral-300",
    title: "text-neutral-900 dark:text-neutral-100",
    badge:
      "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400",
    description: "text-neutral-500 dark:text-neutral-400",
    handle:
      "bg-neutral-400 dark:bg-neutral-500 border-white dark:border-neutral-900",
    handleHover: "hover:bg-neutral-500 dark:hover:bg-neutral-400",
  },
  primary: {
    card: "border-violet-200 dark:border-violet-500/40",
    cardSelected:
      "border-violet-400 dark:border-violet-400 shadow-lg shadow-violet-200/50 dark:shadow-violet-900/30",
    header: "bg-violet-50 dark:bg-violet-950/50",
    iconBg: "bg-violet-100 dark:bg-violet-500/20",
    iconText: "text-violet-600 dark:text-violet-400",
    title: "text-violet-900 dark:text-violet-100",
    badge:
      "bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400",
    description: "text-violet-600/80 dark:text-violet-300/80",
    handle:
      "bg-violet-500 dark:bg-violet-400 border-white dark:border-neutral-900",
    handleHover: "hover:bg-violet-600 dark:hover:bg-violet-300",
  },
  success: {
    card: "border-emerald-200 dark:border-emerald-500/40",
    cardSelected:
      "border-emerald-400 dark:border-emerald-400 shadow-lg shadow-emerald-200/50 dark:shadow-emerald-900/30",
    header: "bg-emerald-50 dark:bg-emerald-950/50",
    iconBg: "bg-emerald-100 dark:bg-emerald-500/20",
    iconText: "text-emerald-600 dark:text-emerald-400",
    title: "text-emerald-900 dark:text-emerald-100",
    badge:
      "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    description: "text-emerald-600/80 dark:text-emerald-300/80",
    handle:
      "bg-emerald-500 dark:bg-emerald-400 border-white dark:border-neutral-900",
    handleHover: "hover:bg-emerald-600 dark:hover:bg-emerald-300",
  },
  warning: {
    card: "border-amber-200 dark:border-amber-500/40",
    cardSelected:
      "border-amber-400 dark:border-amber-400 shadow-lg shadow-amber-200/50 dark:shadow-amber-900/30",
    header: "bg-amber-50 dark:bg-amber-950/50",
    iconBg: "bg-amber-100 dark:bg-amber-500/20",
    iconText: "text-amber-600 dark:text-amber-400",
    title: "text-amber-900 dark:text-amber-100",
    badge:
      "bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400",
    description: "text-amber-600/80 dark:text-amber-300/80",
    handle:
      "bg-amber-500 dark:bg-amber-400 border-white dark:border-neutral-900",
    handleHover: "hover:bg-amber-600 dark:hover:bg-amber-300",
  },
  danger: {
    card: "border-red-200 dark:border-red-500/40",
    cardSelected:
      "border-red-400 dark:border-red-400 shadow-lg shadow-red-200/50 dark:shadow-red-900/30",
    header: "bg-red-50 dark:bg-red-950/50",
    iconBg: "bg-red-100 dark:bg-red-500/20",
    iconText: "text-red-600 dark:text-red-400",
    title: "text-red-900 dark:text-red-100",
    badge: "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400",
    description: "text-red-600/80 dark:text-red-300/80",
    handle: "bg-red-500 dark:bg-red-400 border-white dark:border-neutral-900",
    handleHover: "hover:bg-red-600 dark:hover:bg-red-300",
  },
};

// ============================================================================
// Toolbar Button Component
// ============================================================================

interface ToolbarButtonProps {
  onClick?: () => void;
  icon: ComponentType<{ className?: string }>;
  label: string;
  variant?: "default" | "danger";
}

const ToolbarButton = ({
  onClick,
  icon: Icon,
  label,
  variant = "default",
}: ToolbarButtonProps) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={cn(
      "p-1.5 rounded-md transition-colors",
      "text-neutral-500 dark:text-neutral-400",
      variant === "default" && [
        "hover:bg-neutral-100 dark:hover:bg-neutral-700",
        "hover:text-neutral-700 dark:hover:text-neutral-200",
      ],
      variant === "danger" && [
        "hover:bg-red-50 dark:hover:bg-red-500/10",
        "hover:text-red-600 dark:hover:text-red-400",
      ]
    )}
  >
    <Icon className="size-3.5" />
  </button>
);

// ============================================================================
// Main Component
// ============================================================================

const WorkFlowNode = memo(
  ({
    id,
    children,
    showToolbar = true,
    onDelete,
    onSetting,
    onDuplicate,
    name = "Node",
    description,
    icon: Icon,
    variant = "default",
    badge,
    hasInput = true,
    hasOutput = true,
    selected = false,
  }: WorkFlowNodeProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const { deleteElements } = useReactFlow();
    const styles = variants[variant];

    const handleDelete = () => {
      if (onDelete) {
        onDelete();
      } else if (id) {
        deleteElements({ nodes: [{ id }] });
      }
    };

    return (
      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating Toolbar */}
        {showToolbar && (
          <div
            className={cn(
              "absolute -top-10 left-1/2 -translate-x-1/2 z-20",
              "flex items-center gap-0.5 px-1.5 py-1",
              "bg-white dark:bg-neutral-800",
              "border border-neutral-200 dark:border-neutral-700",
              "rounded-lg shadow-xl shadow-black/10 dark:shadow-black/30",
              "transition-all duration-200 ease-out",
              isHovered || selected
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-1 scale-95 pointer-events-none"
            )}
          >
            {onSetting && (
              <ToolbarButton
                onClick={onSetting}
                icon={Settings}
                label="Settings"
              />
            )}
            {onDuplicate && (
              <ToolbarButton
                onClick={onDuplicate}
                icon={Copy}
                label="Duplicate"
              />
            )}
            <ToolbarButton
              onClick={handleDelete}
              icon={Trash2}
              label="Delete"
              variant="danger"
            />
          </div>
        )}

        {/* Card Container */}
        <div
          className={cn(
            "w-64 overflow-hidden",
            "bg-white dark:bg-neutral-900",
            "border rounded-xl",
            "transition-all duration-200 ease-out",
            styles.card,
            selected && styles.cardSelected,
            !selected && "hover:shadow-md"
          )}
        >
          {/* Header */}
          <div
            className={cn(
              "flex items-center gap-3 px-3.5 py-3",
              "border-b border-neutral-100 dark:border-neutral-800",
              styles.header
            )}
          >
            {/* Icon */}
            {Icon && (
              <div
                className={cn(
                  "flex items-center justify-center",
                  "size-8 rounded-lg shrink-0",
                  "transition-transform duration-200",
                  styles.iconBg,
                  styles.iconText,
                  "group-hover:scale-105"
                )}
              >
                <Icon className="size-4" />
              </div>
            )}

            {/* Title & Badge */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3
                  className={cn("text-sm font-semibold truncate", styles.title)}
                >
                  {name}
                </h3>
                {badge && (
                  <span
                    className={cn(
                      "inline-flex items-center px-1.5 py-0.5",
                      "text-[10px] font-medium uppercase tracking-wide",
                      "rounded-md shrink-0",
                      styles.badge
                    )}
                  >
                    {badge}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-3.5 py-3">
            {description && (
              <p className={cn("text-xs leading-relaxed", styles.description)}>
                {description}
              </p>
            )}
            {children}
          </div>
        </div>

        {/* Input Handle (Left) */}
        {hasInput && (
          <Handle
            type="target"
            position={Position.Left}
            className={cn(
              "w-3! h-3! border-2! rounded-full!",
              "-left-1.5!",
              "transition-all duration-200",
              styles.handle,
              styles.handleHover,
              "hover:scale-125!"
            )}
          />
        )}

        {/* Output Handle (Right) */}
        {hasOutput && (
          <Handle
            type="source"
            position={Position.Right}
            className={cn(
              "w-3! h-3! border-2! rounded-full!",
              "-right-1.5!",
              "transition-all duration-200",
              styles.handle,
              styles.handleHover,
              "hover:scale-125!"
            )}
          />
        )}
      </div>
    );
  }
);

WorkFlowNode.displayName = "WorkFlowNode";

export default WorkFlowNode;
