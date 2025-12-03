import { cn } from "@/lib/utils";

interface ContainerGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export const ContainerGrid = ({
  children,
  columns = 3,
  className,
}: ContainerGridProps) => {
  const columnStyles = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4", columnStyles[columns], className)}>
      {children}
    </div>
  );
};
