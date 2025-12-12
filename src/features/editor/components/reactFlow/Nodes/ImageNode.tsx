"use client";

import { memo, useState, type ReactNode, type ComponentType } from "react";
import { Position } from "@xyflow/react";
import Image from "next/image";
import {
  Settings,
  Trash2,
  Plus,
  CheckCircle2,
  AlertCircle,
  Loader2,
  type LucideProps,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BaseHandle } from "@/components/ui/react-flow/base-handle";
import { BaseNode } from "@/components/ui/react-flow/base-node";
import { NodeStatus } from "@/features/execution/types";

// Color design variants
const colorVariants = {
  default: {
    border: "border-neutral-300 dark:border-neutral-600",
    bg: "bg-neutral-50/50 dark:bg-neutral-800/50",
    bgHover: "hover:bg-neutral-100/50 dark:hover:bg-neutral-700/50",
    icon: "text-neutral-400 dark:text-neutral-500",
    iconSelected: "text-neutral-600 dark:text-neutral-300",
    handle: "border-neutral-400! dark:border-neutral-500!",
    handleSelected: "border-neutral-500! dark:border-neutral-400!",
    title: "text-neutral-700 dark:text-neutral-300",
    titleSelected: "text-neutral-900 dark:text-neutral-100",
  },
  blue: {
    border: "border-blue-300 dark:border-blue-500/50",
    bg: "bg-blue-50/50 dark:bg-blue-500/10",
    bgHover: "hover:bg-blue-100/50 dark:hover:bg-blue-500/20",
    icon: "text-blue-400 dark:text-blue-500",
    iconSelected: "text-blue-600 dark:text-blue-400",
    handle: "border-blue-400! dark:border-blue-500!",
    handleSelected: "border-blue-500! dark:border-blue-400!",
    title: "text-blue-700 dark:text-blue-300",
    titleSelected: "text-blue-900 dark:text-blue-100",
  },
  pink: {
    border: "border-pink-300 dark:border-pink-500/50",
    bg: "bg-pink-50/50 dark:bg-pink-500/10",
    bgHover: "hover:bg-pink-100/50 dark:hover:bg-pink-500/20",
    icon: "text-pink-400 dark:text-pink-500",
    iconSelected: "text-pink-600 dark:text-pink-400",
    handle: "border-pink-400! dark:border-pink-500!",
    handleSelected: "border-pink-500! dark:border-pink-400!",
    title: "text-pink-700 dark:text-pink-300",
    titleSelected: "text-pink-900 dark:text-pink-100",
  },
  indigo: {
    border: "border-indigo-300 dark:border-indigo-500/50",
    bg: "bg-indigo-50/50 dark:bg-indigo-500/10",
    bgHover: "hover:bg-indigo-100/50 dark:hover:bg-indigo-500/20",
    icon: "text-indigo-400 dark:text-indigo-500",
    iconSelected: "text-indigo-600 dark:text-indigo-400",
    handle: "border-indigo-400! dark:border-indigo-500!",
    handleSelected: "border-indigo-500! dark:border-indigo-400!",
    title: "text-indigo-700 dark:text-indigo-300",
    titleSelected: "text-indigo-900 dark:text-indigo-100",
  },
  // ...add more colors as needed
};

// Status variants
const statusVariants = {
  default: {
    border: undefined,
    icon: null as ReactNode,
    iconClass: "",
  },
  loading: {
    border: "border-blue-400 dark:border-blue-400",
    icon: <Loader2 className="size-5 text-blue-500 animate-spin" />,
    iconClass: "",
  },
  success: {
    border: "border-emerald-500 dark:border-emerald-400",
    icon: <CheckCircle2 className="size-5 text-emerald-500" />,
    iconClass: "",
  },
  error: {
    border: "border-red-500 dark:border-red-400",
    icon: <AlertCircle className="size-5 text-red-500" />,
    iconClass: "",
  },
};

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
    {" "}
    <Icon className="size-4" />{" "}
  </button>
);

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
  color?: keyof typeof colorVariants;
  status?: NodeStatus
  hasInput?: boolean;
  hasOutput?: boolean;
  selected?: boolean;
  onDoubleClick?: () => void;
  className?: string;
}

const ImageNode = memo((props: ImageNodeProps) => {
  const {
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
    color = "default",
    status = "default",
    hasInput,
    hasOutput,
    selected,
    onDoubleClick,
    className,
  } = props;
  const styles = colorVariants[color] || colorVariants.default;
  const statusStyle = statusVariants[status] || statusVariants.default;
  const [isHovered, setIsHovered] = useState(false);

  // Border color: status takes precedence, else color
  const borderClass = statusStyle.border || styles.border;

  return (
    <BaseNode id={id} className={className}>
      {/* Toolbar */}
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
          {" "}
          {onSetting && (
            <ToolbarButton
              onClick={onSetting}
              icon={Settings}
              label="Settings"
            />
          )}{" "}
          <ToolbarButton
            onClick={onDelete}
            icon={Trash2}
            label="Delete"
            variant="danger"
          />{" "}
        </div>
      )}

      {/* Main Node Content */}
      <div
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
            borderClass,
            selected ? styles.bg : styles.bg,
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
              id="input"
              type="target"
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
              id="output"
              type="source"
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

          {/* Status Icon/Loader at bottom-right with animation */}
          {status !== "default" && statusStyle.icon && (
            <div
              className={cn(
                "absolute z-20",
                "right-2 bottom-2",
                "bg-white dark:bg-neutral-900 rounded-full p-1 shadow-lg",
                "transition-all duration-300",
                "scale-100 opacity-100 animate-pop"
              )}
              style={{
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
                filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.10))",
              }}
            >
              {statusStyle.icon}
            </div>
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
});

export default ImageNode;
