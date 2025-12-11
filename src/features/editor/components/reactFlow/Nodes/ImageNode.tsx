"use client";

import { memo, useState, type ReactNode, type ComponentType } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import Image from "next/image";
import { Settings, Trash2, Plus, type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import { BaseHandle } from "@/components/ui/react-flow/base-handle";
import { BaseNode } from "@/components/ui/react-flow/base-node";

// ============================================================================
// Variant Configurations
// ============================================================================

const variants = {
  default: {
    border: "border-neutral-300 dark:border-neutral-600",
    borderSelected: "border-neutral-500 dark:border-neutral-400",
    bg: "bg-neutral-50/50 dark:bg-neutral-800/50",
    bgHover: "hover:bg-neutral-100/50 dark:hover:bg-neutral-700/50",
    bgSelected: "bg-neutral-100/80 dark:bg-neutral-700/50",
    icon: "text-neutral-400 dark:text-neutral-500",
    iconSelected: "text-neutral-600 dark:text-neutral-300",
    handle: "border-neutral-400! dark:border-neutral-500!",
    handleSelected: "border-neutral-500! dark:border-neutral-400!",
    title: "text-neutral-700 dark:text-neutral-300",
    titleSelected: "text-neutral-900 dark:text-neutral-100",
  },
  primary: {
    border: "border-violet-300 dark:border-violet-500/50",
    borderSelected: "border-violet-500 dark:border-violet-400",
    bg: "bg-violet-50/50 dark:bg-violet-500/10",
    bgHover: "hover:bg-violet-100/50 dark:hover:bg-violet-500/20",
    bgSelected: "bg-violet-100/80 dark:bg-violet-500/20",
    icon: "text-violet-400 dark:text-violet-500",
    iconSelected: "text-violet-600 dark:text-violet-400",
    handle: "border-violet-400! dark:border-violet-500!",
    handleSelected: "border-violet-500! dark:border-violet-400!",
    title: "text-violet-700 dark:text-violet-300",
    titleSelected: "text-violet-900 dark:text-violet-100",
  },
  success: {
    border: "border-emerald-300 dark:border-emerald-500/50",
    borderSelected: "border-emerald-500 dark:border-emerald-400",
    bg: "bg-emerald-50/50 dark:bg-emerald-500/10",
    bgHover: "hover:bg-emerald-100/50 dark:hover:bg-emerald-500/20",
    bgSelected: "bg-emerald-100/80 dark:bg-emerald-500/20",
    icon: "text-emerald-400 dark:text-emerald-500",
    iconSelected: "text-emerald-600 dark:text-emerald-400",
    handle: "border-emerald-400! dark:border-emerald-500!",
    handleSelected: "border-emerald-500! dark:border-emerald-400!",
    title: "text-emerald-700 dark:text-emerald-300",
    titleSelected: "text-emerald-900 dark:text-emerald-100",
  },
  warning: {
    border: "border-amber-300 dark:border-amber-500/50",
    borderSelected: "border-amber-500 dark:border-amber-400",
    bg: "bg-amber-50/50 dark:bg-amber-500/10",
    bgHover: "hover:bg-amber-100/50 dark:hover:bg-amber-500/20",
    bgSelected: "bg-amber-100/80 dark:bg-amber-500/20",
    icon: "text-amber-400 dark:text-amber-500",
    iconSelected: "text-amber-600 dark:text-amber-400",
    handle: "border-amber-400! dark:border-amber-500!",
    handleSelected: "border-amber-500! dark:border-amber-400!",
    title: "text-amber-700 dark:text-amber-300",
    titleSelected: "text-amber-900 dark:text-amber-100",
  },
  danger: {
    border: "border-red-300 dark:border-red-500/50",
    borderSelected: "border-red-500 dark:border-red-400",
    bg: "bg-red-50/50 dark:bg-red-500/10",
    bgHover: "hover:bg-red-100/50 dark:hover:bg-red-500/20",
    bgSelected: "bg-red-100/80 dark:bg-red-500/20",
    icon: "text-red-400 dark:text-red-500",
    iconSelected: "text-red-600 dark:text-red-400",
    handle: "border-red-400! dark:border-red-500!",
    handleSelected: "border-red-500! dark:border-red-400!",
    title: "text-red-700 dark:text-red-300",
    titleSelected: "text-red-900 dark:text-red-100",
  },
  info: {
    border: "border-sky-300 dark:border-sky-500/50",
    borderSelected: "border-sky-500 dark:border-sky-400",
    bg: "bg-sky-50/50 dark:bg-sky-500/10",
    bgHover: "hover:bg-sky-100/50 dark:hover:bg-sky-500/20",
    bgSelected: "bg-sky-100/80 dark:bg-sky-500/20",
    icon: "text-sky-400 dark:text-sky-500",
    iconSelected: "text-sky-600 dark:text-sky-400",
    handle: "border-sky-400! dark:border-sky-500!",
    handleSelected: "border-sky-500! dark:border-sky-400!",
    title: "text-sky-700 dark:text-sky-300",
    titleSelected: "text-sky-900 dark:text-sky-100",
  },
  // Additional color variants
  indigo: {
    border: "border-indigo-300 dark:border-indigo-500/50",
    borderSelected: "border-indigo-500 dark:border-indigo-400",
    bg: "bg-indigo-50/50 dark:bg-indigo-500/10",
    bgHover: "hover:bg-indigo-100/50 dark:hover:bg-indigo-500/20",
    bgSelected: "bg-indigo-100/80 dark:bg-indigo-500/20",
    icon: "text-indigo-400 dark:text-indigo-500",
    iconSelected: "text-indigo-600 dark:text-indigo-400",
    handle: "border-indigo-400! dark:border-indigo-500!",
    handleSelected: "border-indigo-500! dark:border-indigo-400!",
    title: "text-indigo-700 dark:text-indigo-300",
    titleSelected: "text-indigo-900 dark:text-indigo-100",
  },
  pink: {
    border: "border-pink-300 dark:border-pink-500/50",
    borderSelected: "border-pink-500 dark:border-pink-400",
    bg: "bg-pink-50/50 dark:bg-pink-500/10",
    bgHover: "hover:bg-pink-100/50 dark:hover:bg-pink-500/20",
    bgSelected: "bg-pink-100/80 dark:bg-pink-500/20",
    icon: "text-pink-400 dark:text-pink-500",
    iconSelected: "text-pink-600 dark:text-pink-400",
    handle: "border-pink-400! dark:border-pink-500!",
    handleSelected: "border-pink-500! dark:border-pink-400!",
    title: "text-pink-700 dark:text-pink-300",
    titleSelected: "text-pink-900 dark:text-pink-100",
  },
  rose: {
    border: "border-rose-300 dark:border-rose-500/50",
    borderSelected: "border-rose-500 dark:border-rose-400",
    bg: "bg-rose-50/50 dark:bg-rose-500/10",
    bgHover: "hover:bg-rose-100/50 dark:hover:bg-rose-500/20",
    bgSelected: "bg-rose-100/80 dark:bg-rose-500/20",
    icon: "text-rose-400 dark:text-rose-500",
    iconSelected: "text-rose-600 dark:text-rose-400",
    handle: "border-rose-400! dark:border-rose-500!",
    handleSelected: "border-rose-500! dark:border-rose-400!",
    title: "text-rose-700 dark:text-rose-300",
    titleSelected: "text-rose-900 dark:text-rose-100",
  },
  teal: {
    border: "border-teal-300 dark:border-teal-500/50",
    borderSelected: "border-teal-500 dark:border-teal-400",
    bg: "bg-teal-50/50 dark:bg-teal-500/10",
    bgHover: "hover:bg-teal-100/50 dark:hover:bg-teal-500/20",
    bgSelected: "bg-teal-100/80 dark:bg-teal-500/20",
    icon: "text-teal-400 dark:text-teal-500",
    iconSelected: "text-teal-600 dark:text-teal-400",
    handle: "border-teal-400! dark:border-teal-500!",
    handleSelected: "border-teal-500! dark:border-teal-400!",
    title: "text-teal-700 dark:text-teal-300",
    titleSelected: "text-teal-900 dark:text-teal-100",
  },
  cyan: {
    border: "border-cyan-300 dark:border-cyan-500/50",
    borderSelected: "border-cyan-500 dark:border-cyan-400",
    bg: "bg-cyan-50/50 dark:bg-cyan-500/10",
    bgHover: "hover:bg-cyan-100/50 dark:hover:bg-cyan-500/20",
    bgSelected: "bg-cyan-100/80 dark:bg-cyan-500/20",
    icon: "text-cyan-400 dark:text-cyan-500",
    iconSelected: "text-cyan-600 dark:text-cyan-400",
    handle: "border-cyan-400! dark:border-cyan-500!",
    handleSelected: "border-cyan-500! dark:border-cyan-400!",
    title: "text-cyan-700 dark:text-cyan-300",
    titleSelected: "text-cyan-900 dark:text-cyan-100",
  },
  orange: {
    border: "border-orange-300 dark:border-orange-500/50",
    borderSelected: "border-orange-500 dark:border-orange-400",
    bg: "bg-orange-50/50 dark:bg-orange-500/10",
    bgHover: "hover:bg-orange-100/50 dark:hover:bg-orange-500/20",
    bgSelected: "bg-orange-100/80 dark:bg-orange-500/20",
    icon: "text-orange-400 dark:text-orange-500",
    iconSelected: "text-orange-600 dark:text-orange-400",
    handle: "border-orange-400! dark:border-orange-500!",
    handleSelected: "border-orange-500! dark:border-orange-400!",
    title: "text-orange-700 dark:text-orange-300",
    titleSelected: "text-orange-900 dark:text-orange-100",
  },
  lime: {
    border: "border-lime-300 dark:border-lime-500/50",
    borderSelected: "border-lime-500 dark:border-lime-400",
    bg: "bg-lime-50/50 dark:bg-lime-500/10",
    bgHover: "hover:bg-lime-100/50 dark:hover:bg-lime-500/20",
    bgSelected: "bg-lime-100/80 dark:bg-lime-500/20",
    icon: "text-lime-500 dark:text-lime-500",
    iconSelected: "text-lime-600 dark:text-lime-400",
    handle: "border-lime-400! dark:border-lime-500!",
    handleSelected: "border-lime-500! dark:border-lime-400!",
    title: "text-lime-700 dark:text-lime-300",
    titleSelected: "text-lime-900 dark:text-lime-100",
  },
  fuchsia: {
    border: "border-fuchsia-300 dark:border-fuchsia-500/50",
    borderSelected: "border-fuchsia-500 dark:border-fuchsia-400",
    bg: "bg-fuchsia-50/50 dark:bg-fuchsia-500/10",
    bgHover: "hover:bg-fuchsia-100/50 dark:hover:bg-fuchsia-500/20",
    bgSelected: "bg-fuchsia-100/80 dark:bg-fuchsia-500/20",
    icon: "text-fuchsia-400 dark:text-fuchsia-500",
    iconSelected: "text-fuchsia-600 dark:text-fuchsia-400",
    handle: "border-fuchsia-400! dark:border-fuchsia-500!",
    handleSelected: "border-fuchsia-500! dark:border-fuchsia-400!",
    title: "text-fuchsia-700 dark:text-fuchsia-300",
    titleSelected: "text-fuchsia-900 dark:text-fuchsia-100",
  },
  purple: {
    border: "border-purple-300 dark:border-purple-500/50",
    borderSelected: "border-purple-500 dark:border-purple-400",
    bg: "bg-purple-50/50 dark:bg-purple-500/10",
    bgHover: "hover:bg-purple-100/50 dark:hover:bg-purple-500/20",
    bgSelected: "bg-purple-100/80 dark:bg-purple-500/20",
    icon: "text-purple-400 dark:text-purple-500",
    iconSelected: "text-purple-600 dark:text-purple-400",
    handle: "border-purple-400! dark:border-purple-500!",
    handleSelected: "border-purple-500! dark:border-purple-400!",
    title: "text-purple-700 dark:text-purple-300",
    titleSelected: "text-purple-900 dark:text-purple-100",
  },
  blue: {
    border: "border-blue-300 dark:border-blue-500/50",
    borderSelected: "border-blue-500 dark:border-blue-400",
    bg: "bg-blue-50/50 dark:bg-blue-500/10",
    bgHover: "hover:bg-blue-100/50 dark:hover:bg-blue-500/20",
    bgSelected: "bg-blue-100/80 dark:bg-blue-500/20",
    icon: "text-blue-400 dark:text-blue-500",
    iconSelected: "text-blue-600 dark:text-blue-400",
    handle: "border-blue-400! dark:border-blue-500!",
    handleSelected: "border-blue-500! dark:border-blue-400!",
    title: "text-blue-700 dark:text-blue-300",
    titleSelected: "text-blue-900 dark:text-blue-100",
  },
  green: {
    border: "border-green-300 dark:border-green-500/50",
    borderSelected: "border-green-500 dark:border-green-400",
    bg: "bg-green-50/50 dark:bg-green-500/10",
    bgHover: "hover:bg-green-100/50 dark:hover:bg-green-500/20",
    bgSelected: "bg-green-100/80 dark:bg-green-500/20",
    icon: "text-green-400 dark:text-green-500",
    iconSelected: "text-green-600 dark:text-green-400",
    handle: "border-green-400! dark:border-green-500!",
    handleSelected: "border-green-500! dark:border-green-400!",
    title: "text-green-700 dark:text-green-300",
    titleSelected: "text-green-900 dark:text-green-100",
  },
  yellow: {
    border: "border-yellow-300 dark:border-yellow-500/50",
    borderSelected: "border-yellow-500 dark:border-yellow-400",
    bg: "bg-yellow-50/50 dark:bg-yellow-500/10",
    bgHover: "hover:bg-yellow-100/50 dark:hover:bg-yellow-500/20",
    bgSelected: "bg-yellow-100/80 dark:bg-yellow-500/20",
    icon: "text-yellow-500 dark:text-yellow-500",
    iconSelected: "text-yellow-600 dark:text-yellow-400",
    handle: "border-yellow-400! dark:border-yellow-500!",
    handleSelected: "border-yellow-500! dark:border-yellow-400!",
    title: "text-yellow-700 dark:text-yellow-300",
    titleSelected: "text-yellow-900 dark:text-yellow-100",
  },
  slate: {
    border: "border-slate-300 dark:border-slate-500/50",
    borderSelected: "border-slate-500 dark:border-slate-400",
    bg: "bg-slate-50/50 dark:bg-slate-500/10",
    bgHover: "hover:bg-slate-100/50 dark:hover:bg-slate-500/20",
    bgSelected: "bg-slate-100/80 dark:bg-slate-500/20",
    icon: "text-slate-400 dark:text-slate-500",
    iconSelected: "text-slate-600 dark:text-slate-400",
    handle: "border-slate-400! dark:border-slate-500!",
    handleSelected: "border-slate-500! dark:border-slate-400!",
    title: "text-slate-700 dark:text-slate-300",
    titleSelected: "text-slate-900 dark:text-slate-100",
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
      "p-2 rounded-lg transition-all duration-200",
      "bg-white dark:bg-neutral-800",
      "border border-neutral-200 dark:border-neutral-700",
      "shadow-sm hover:shadow-md",
      variant === "default" && [
        "text-neutral-500 dark:text-neutral-400",
        "hover:bg-neutral-100 dark:hover:bg-neutral-700",
        "hover:text-neutral-700 dark:hover:text-neutral-200",
      ],
      variant === "danger" && [
        "text-neutral-500 dark:text-neutral-400",
        "hover:bg-red-50 dark:hover:bg-red-500/10",
        "hover:border-red-200 dark:hover:border-red-500/30",
        "hover:text-red-600 dark:hover:text-red-400",
      ]
    )}
  >
    <Icon className="size-4" />
  </button>
);

// ============================================================================
// Types
// ============================================================================

interface ImageNodeProps {
  id?: string;
  children?: ReactNode;
  showToolbar?: boolean;
  onDelete?: () => void;
  onSetting?: () => void;
  onClick?: () => void;
  name?: string;
  description?: string;
  icon?: ComponentType<LucideProps>;
  imageUrl?: string;
  imageAlt?: string;
  variant?: keyof typeof variants;
  hasInput?: boolean;
  hasOutput?: boolean;
  selected?: boolean;
  onDoubleClick?: () => void;
  className?: string;
}

// ============================================================================
// Main Component
// ============================================================================

const ImageNode = memo(
  ({
    id,
    children,
    showToolbar = true,
    onDelete,
    onSetting,
    onClick,
    name = "Node",
    description,
    icon: Icon,
    imageUrl,
    imageAlt = "Node image",
    variant = "default",
    hasInput = false,
    hasOutput = false,
    selected = false,
    onDoubleClick,
    className,
  }: ImageNodeProps) => {
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
      <BaseNode
        onDoubleClick={onDoubleClick}
        className={cn("relative group", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating Toolbar */}
        {showToolbar && (
          <div
            className={cn(
              "absolute -top-12 left-1/2 -translate-x-1/2 z-20",
              "flex items-center gap-1.5",
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
            <ToolbarButton
              onClick={handleDelete}
              icon={Trash2}
              label="Delete"
              variant="danger"
            />
          </div>
        )}

        {/* Main Node Content */}
        <div
          onClick={onClick}
          className={cn(
            "flex flex-col items-center gap-3 cursor-pointer",
            "transition-all duration-200"
          )}
        >
          {/* Dashed Border Box with Icon/Image */}
          <div
            className={cn(
              "relative flex items-center justify-center",
              "w-36 h-28 rounded-2xl",
              "border-2 border-dashed",
              "transition-all duration-200",
              selected ? styles.borderSelected : styles.border,
              selected ? styles.bgSelected : styles.bg,
              !selected && styles.bgHover,
              !selected && `hover:${styles.border}`
            )}
          >
            {imageUrl ? (
              <div className="relative size-12 overflow-hidden rounded-xl">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
            ) : Icon ? (
              <Icon
                className={cn(
                  "size-8 transition-colors duration-200",
                  selected ? styles.iconSelected : styles.icon
                )}
              />
            ) : (
              <Plus
                className={cn(
                  "size-8 transition-colors duration-200",
                  selected ? styles.iconSelected : styles.icon
                )}
              />
            )}

            {/* Input Handle */}
            {hasInput && (
              <BaseHandle
                type="target"
                id="input"
                position={Position.Left}
                className={cn(
                  "w-3! h-3! border-2! rounded-full!",
                  "bg-white! dark:bg-neutral-900!",
                  "transition-all duration-200",
                  selected ? styles.handleSelected : styles.handle,
                  "hover:scale-125!"
                )}
              />
            )}

            {/* Output Handle */}
            {hasOutput && (
              <BaseHandle
                type="source"
                id="output"
                position={Position.Right}
                className={cn(
                  "w-3! h-3! border-2! rounded-full!",
                  "bg-white! dark:bg-neutral-900!",
                  "transition-all duration-200",
                  selected ? styles.handleSelected : styles.handle,
                  "hover:scale-125!"
                )}
              />
            )}
          </div>

          {/* Title & Description */}
          <div
            className={cn(
              "flex flex-col items-center text-center gap-0.5",
              "transition-all duration-200",
              isHovered || selected
                ? "opacity-100 translate-y-0"
                : "opacity-70 -translate-y-1"
            )}
          >
            <h3
              className={cn(
                "text-sm font-semibold transition-colors duration-200",
                selected ? styles.titleSelected : styles.title
              )}
            >
              {name}
            </h3>

            {description && (
              <p className="text-xs text-neutral-400 dark:text-neutral-500 max-w-[140px] line-clamp-2">
                {description}
              </p>
            )}
          </div>

          {/* Additional Children */}
          {children}
        </div>
      </BaseNode>
    );
  }
);

ImageNode.displayName = "ImageNode";

export default ImageNode;
