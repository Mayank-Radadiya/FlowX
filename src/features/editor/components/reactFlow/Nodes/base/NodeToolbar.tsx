import { cn } from "@/lib/utils";
import { ComponentType } from "react";

interface ToolbarButtonProps {
  onClick?: () => void;
  icon: ComponentType<{ className?: string }>;
  label: string;
  variant?: "default" | "danger";
}
export function ToolbarButton({
  onClick,
  icon: Icon,
  label,
  variant = "default",
}: ToolbarButtonProps) {
  return (
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
        ],
      )}
    >
      {" "}
      <Icon className="size-4" />{" "}
    </button>
  );
}
