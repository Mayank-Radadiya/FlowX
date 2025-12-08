import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function BaseNode({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground relative rounded-md border",
        "hover:ring-1",
        // React Flow displays node elements inside of a `NodeWrapper` component,
        // which compiles down to a div with the class `react-flow__node`.
        // When a node is selected, the class `selected` is added to the
        // `react-flow__node` element. This allows us to style the node when it
        // is selected, using Tailwind's `&` selector.
        "[.react-flow\\_\\_node.selected_&]:border-muted-foreground",
        "[.react-flow\\_\\_node.selected_&]:shadow-lg",
        className
      )}
      tabIndex={0}
      {...props}
    />
  );
}

/**
 * A container for a consistent header layout intended to be used inside the
 * `<BaseNode />` component.
 */
export function BaseNodeHeader({
  className,
  ...props
}: ComponentProps<"header">) {
  return (
    <header
      {...props}
      className={cn(
        "flex flex-row items-center justify-between gap-3 px-3 py-2.5",
        "border-b border-neutral-200/60 dark:border-neutral-700/60",
        "bg-neutral-50/50 dark:bg-neutral-800/50 rounded-t-xl",
        className
      )}
    />
  );
}

/**
 * The title text for the node. To maintain a native application feel, the title
 * text is not selectable.
 */
export function BaseNodeHeaderTitle({
  className,
  ...props
}: ComponentProps<"h3">) {
  return (
    <h3
      data-slot="base-node-title"
      className={cn(
        "select-none flex-1 font-semibold text-sm",
        "text-neutral-800 dark:text-neutral-100",
        className
      )}
      {...props}
    />
  );
}

export function BaseNodeContent({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="base-node-content"
      className={cn(
        "flex flex-col gap-y-2 px-3 py-3",
        "text-sm text-neutral-600 dark:text-neutral-300",
        className
      )}
      {...props}
    />
  );
}

export function BaseNodeFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="base-node-footer"
      className={cn(
        "flex flex-col items-center gap-y-2 px-3 pt-2 pb-3",
        "border-t border-neutral-200/60 dark:border-neutral-700/60",
        "bg-neutral-50/30 dark:bg-neutral-800/30 rounded-b-xl",
        className
      )}
      {...props}
    />
  );
}

/**
 * An icon container for node headers
 */
export function BaseNodeIcon({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="base-node-icon"
      className={cn(
        "flex items-center justify-center size-7 rounded-lg",
        "bg-violet-100 dark:bg-violet-500/20",
        "text-violet-600 dark:text-violet-400",
        className
      )}
      {...props}
    />
  );
}

/**
 * A badge/status indicator for nodes
 */
export function BaseNodeBadge({
  className,
  variant = "default",
  ...props
}: ComponentProps<"span"> & {
  variant?: "default" | "success" | "warning" | "error";
}) {
  return (
    <span
      data-slot="base-node-badge"
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        variant === "default" &&
          "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400",
        variant === "success" &&
          "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
        variant === "warning" &&
          "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400",
        variant === "error" &&
          "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400",
        className
      )}
      {...props}
    />
  );
}
