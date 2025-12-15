import { cn } from "@/lib/utils";

interface ContainerGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  withBackground?: boolean;
}

export function ContainerGrid({
  children,
  columns = 3,
  className,
  withBackground = false,
}: ContainerGridProps) {
  const columnStyles = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  if (withBackground) {
    return (
      <div className="relative rounded-2xl p-6 overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-linear-to-br from-violet-500/10 via-transparent to-blue-500/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

        {/* Content */}
        <div
          className={cn(
            "relative grid gap-5",
            columnStyles[columns],
            className
          )}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-5", columnStyles[columns], className)}>
      {children}
    </div>
  );
}
