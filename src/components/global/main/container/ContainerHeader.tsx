/* ============================================
   ContainerHeader - Section header
   ============================================ */

interface ContainerHeaderProps {
  title: string;
  icon?: React.ReactNode;
}

export function ContainerHeader({ title, icon }: ContainerHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-mono">
      <div className="flex min-w-0 items-center gap-3">
        {icon && (
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold tracking-tight">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}
