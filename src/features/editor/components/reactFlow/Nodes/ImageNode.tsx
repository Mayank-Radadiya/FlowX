"use client";

import { memo, useState, type ReactNode, type ComponentType } from "react";
import { Handle, Position } from "@xyflow/react";
import Image from "next/image";
import { Settings, Trash2, Plus, type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageNodeProps {
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
  hasInput?: boolean;
  hasOutput?: boolean;
  selected?: boolean;
}

const ImageNode = memo(
  ({
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
    hasInput = true,
    hasOutput = true,
    selected = false,
  }: ImageNodeProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Toolbar - appears on hover */}
        {showToolbar && (
          <div
            className={cn(
              "absolute -top-10 left-1/2 -translate-x-1/2 z-10",
              "flex items-center gap-2",
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
                  "p-2 rounded-lg",
                  "bg-white dark:bg-neutral-800",
                  "border border-neutral-200 dark:border-neutral-700",
                  "text-neutral-500 dark:text-neutral-400",
                  "hover:bg-neutral-100 dark:hover:bg-neutral-700",
                  "hover:text-neutral-700 dark:hover:text-neutral-200",
                  "shadow-sm hover:shadow-md",
                  "transition-all duration-200"
                )}
              >
                <Settings className="size-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className={cn(
                  "p-2 rounded-lg",
                  "bg-white dark:bg-neutral-800",
                  "border border-neutral-200 dark:border-neutral-700",
                  "text-neutral-500 dark:text-neutral-400",
                  "hover:bg-red-50 dark:hover:bg-red-500/10",
                  "hover:border-red-200 dark:hover:border-red-500/30",
                  "hover:text-red-600 dark:hover:text-red-400",
                  "shadow-sm hover:shadow-md",
                  "transition-all duration-200"
                )}
              >
                <Trash2 className="size-4" />
              </button>
            )}
          </div>
        )}

        {/* Main Node Content */}
        <div
          onClick={onClick}
          className={cn(
            "flex flex-col items-center gap-4 cursor-pointer",
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
              selected
                ? "border-violet-400 dark:border-violet-500 bg-violet-50/50 dark:bg-violet-500/10"
                : "border-neutral-300 dark:border-neutral-600 bg-neutral-50/50 dark:bg-neutral-800/50",
              "hover:border-violet-400 dark:hover:border-violet-500",
              "hover:bg-violet-50/50 dark:hover:bg-violet-500/10"
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
                  selected
                    ? "text-violet-500 dark:text-violet-400"
                    : "text-neutral-400 dark:text-neutral-500",
                  "group-hover:text-violet-500 dark:group-hover:text-violet-400"
                )}
              />
            ) : (
              <Plus
                className={cn(
                  "size-8 transition-colors duration-200",
                  selected
                    ? "text-violet-500 dark:text-violet-400"
                    : "text-neutral-400 dark:text-neutral-500"
                )}
              />
            )}

            {/* Input Handle */}
            {hasInput && (
              <Handle
                type="source"
                position={Position.Left}
                className={cn(
                  "w-3! h-3! border-2! rounded-full!",
                  "bg-white! dark:bg-neutral-900!",
                  "-bottom-1.5!",
                  selected
                    ? "border-violet-400! dark:border-violet-500!"
                    : "border-neutral-300! dark:border-neutral-600!",
                  "hover:border-violet-400! dark:hover:border-violet-500!",
                  "hover:scale-125! transition-all!"
                )}
              />
            )}

            {/* Output Handle */}
            {hasOutput && (
              <Handle
                type="source"
                position={Position.Right}
                className={cn(
                  "w-3! h-3! border-2! rounded-full!",
                  "bg-white! dark:bg-neutral-900!",
                  "-bottom-1.5!",
                  selected
                    ? "border-violet-400! dark:border-violet-500!"
                    : "border-neutral-300! dark:border-neutral-600!",
                  "hover:border-violet-400! dark:hover:border-violet-500!",
                  "hover:scale-125! transition-all!"
                )}
              />
            )}
          </div>

          {/* Title & Description - only visible on hover or select */}
          <div
            className={cn(
              "flex flex-col items-center text-center gap-1",
              "transition-all duration-200",
              isHovered || selected
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            )}
          >
            <h3
              className={cn(
                "text-base font-semibold transition-colors duration-200",
                selected
                  ? "text-neutral-900 dark:text-neutral-100"
                  : "text-neutral-700 dark:text-neutral-300"
              )}
            >
              {name}
            </h3>

            {/* Description */}
            {description && (
              <p className="text-sm text-neutral-400 dark:text-neutral-500">
                {description}
              </p>
            )}
          </div>

          {/* Additional Children */}
          {children}
        </div>
      </div>
    );
  }
);

ImageNode.displayName = "Node";

export default ImageNode;
