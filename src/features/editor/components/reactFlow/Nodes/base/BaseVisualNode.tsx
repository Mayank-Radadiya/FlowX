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

  // Border color: status takes precedence, then selected state, else normal color
  const borderClass =
    statusStyle.border ||
    (selected
      ? `border-2 ${styles.border}`
      : `border border-black/5 dark:border-white/5`);

  return (
    <>
      <BaseNode id={id} className={cn("relative outline-none", className)}>
        {/* Toolbar */}
        {showToolbar && (
          <div
            className={cn(
              "absolute -top-12 left-1/2 -translate-x-1/2 z-20",
              "flex items-center gap-1.5",
              "transition-all duration-200 ease-out",
              isHovered || selected
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-1 scale-95 pointer-events-none",
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
              onClick={onDelete}
              icon={Trash2}
              label="Delete"
              variant="danger"
            />
          </div>
        )}

        {/* Unified Glass Layer Node (Option A) */}
        <div
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "relative flex flex-col justify-center min-w-[240px] max-w-[320px] rounded-2xl",
            "transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
            "cursor-pointer shadow-sm hover:shadow-md",
            borderClass,
            styles.bg,
            !selected && styles.bgHover,
            selected &&
              "shadow-[0_0_0_2px_rgba(0,0,0,0.05)] dark:shadow-[0_0_0_2px_rgba(255,255,255,0.05)] scale-[1.02]",
          )}
        >
          {/* Main Horizontal Content */}
          <div className="flex items-center gap-4 p-4">
            {/* Left: Icon Container */}
            <div
              className={cn(
                "shrink-0 flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-200",
                styles.iconContainer,
              )}
            >
              {imageUrl ? (
                <div className="relative size-10 overflow-hidden rounded-lg">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              ) : Icon ? (
                <Icon
                  className={cn("size-6", selected && styles.iconSelected)}
                />
              ) : (
                <Plus
                  className={cn("size-6", selected && styles.iconSelected)}
                />
              )}
            </div>

            {/* Right: Text Content */}
            <div className="flex-1 min-w-0 pr-2">
              <h3
                className={cn(
                  "text-sm font-semibold truncate transition-colors duration-200",
                  selected ? styles.titleSelected : styles.title,
                )}
              >
                {name}
              </h3>
              {description && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                  {description}
                </p>
              )}
            </div>

            {/* Status Icon/Loader */}
            {status !== "default" && statusStyle.icon && (
              <div
                className={cn(
                  "shrink-0 flex items-center justify-center",
                  "w-6 h-6 rounded-full bg-white dark:bg-neutral-900 shadow-sm border border-black/5 dark:border-white/5",
                  "animate-in zoom-in-50 duration-300",
                )}
              >
                {statusStyle.icon}
              </div>
            )}
          </div>

          {/* Additional Children (e.g. nested inputs, though horizontal prefers less data here) */}
          {children && (
            <div className="px-4 pb-4 pt-1 border-t border-black/5 dark:border-white/5 mx-4 mt-2">
              {children}
            </div>
          )}

          {/* Input Handle */}
          {hasInput && (
            <BaseHandle
              id="input"
              type="target"
              position={Position.Left}
              className={cn(
                "w-3! h-3! -left-1.5! border-2! rounded-full! transition-all duration-200",
                selected ? styles.handleSelected : styles.handle,
                "hover:scale-150! hover:border-black/20 dark:hover:border-white/20",
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
                "w-3! h-3! -right-1.5! border-2! rounded-full! transition-all duration-200",
                selected ? styles.handleSelected : styles.handle,
                "hover:scale-150! hover:border-black/20 dark:hover:border-white/20",
              )}
            />
          )}
        </div>
      </BaseNode>
    </>
  );
}

export default BaseVisualNode;
