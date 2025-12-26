import { cn } from "@/lib/utils";

// Stat Card Component
export function StatCard({
  icon: Icon,
  label,
  count,
  gradient,
  color,
}: {
  icon: React.ElementType;
  label: string;
  count: number;
  gradient: string;
  color: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-white/[0.02] p-4 backdrop-blur-xl">
      <div
        className={cn(
          "absolute -top-6 -right-6 size-16 rounded-full blur-2xl bg-linear-to-br",
          gradient
        )}
      />
      <div className="relative">
        <Icon className={cn("size-5", color)} />
        <div className="mt-2 text-2xl font-bold text-white">{count}</div>
        <div className="text-xs text-white/40">{label}</div>
      </div>
    </div>
  );
}
