import { LucideProps, Plus, Settings, Trash2 } from "lucide-react";
import { ComponentType, ReactNode, useState } from "react";
import { colorVariants } from "./node-colors";
import { NodeStatus } from "@/features/execution/customNodes/types";
import { nodeStatusVariants } from "./node-status";
import { BaseNode } from "@/components/ui/react-flow/base-node";
import { cn } from "@/lib/utils";
import { BaseHandle } from "@/components/ui/react-flow/base-handle";
import Image from "next/image";
import { ToolbarButton } from "./NodeToolbar";
import { Position } from "@xyflow/react";

interface BaseVisualNodeProps {
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
  status?: NodeStatus;
  hasInput?: boolean;
  hasOutput?: boolean;
  selected?: boolean;
  onDoubleClick?: () => void;
  className?: string;
}

function BaseVisualNode({
  id,
  children,
  showToolbar = false,
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
  hasInput = false,
  hasOutput = true,
  selected,
  onDoubleClick,
  className,
}: BaseVisualNodeProps) {
  const styles = colorVariants[color] || colorVariants.default;
  const statusStyle = nodeStatusVariants[status] || nodeStatusVariants.default;
  const [isHovered, setIsHovered] = useState(false);

  // Border color: status takes precedence, else color
  const borderClass = statusStyle.border || styles.border;

  return (
    <>
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
    </>
  );
}

export default BaseVisualNode;
