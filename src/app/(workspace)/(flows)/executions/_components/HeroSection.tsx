import {
  Activity,
  BarChart3,
  Clock,
  Zap,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Timer,
  Layers,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    label: "Total Executions",
    value: "0",
    change: "+0%",
    trend: "neutral",
    icon: Zap,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    label: "Success Rate",
    value: "—",
    change: "No data",
    trend: "neutral",
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-green-600",
  },
  {
    label: "Avg. Duration",
    value: "—",
    change: "No data",
    trend: "neutral",
    icon: Timer,
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    label: "Active Workflows",
    value: "0",
    change: "Ready",
    trend: "neutral",
    icon: Layers,
    gradient: "from-orange-500 to-amber-600",
  },
];

export const HeroSection = () => {
  return (
    <>
      {/* Stats Grid - Premium Design */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-border hover:shadow-lg"
          >
            {/* Subtle hover effect */}
            <div className="absolute -right-8 -top-8 size-24 rounded-full bg-linear-to-br from-primary/5 to-transparent opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div
                  className={`flex size-10 items-center justify-center rounded-xl bg-linear-to-br ${stat.gradient} shadow-lg`}
                >
                  <stat.icon className="size-5 text-white" />
                </div>
                {stat.trend === "up" && (
                  <div className="flex items-center gap-1 text-xs text-emerald-500">
                    <TrendingUp className="size-3" />
                    {stat.change}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold tracking-tight">
                  {stat.value}
                </p>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State - Premium */}
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-border/50">
        {/* Animated background */}
        <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 via-amber-500/5 to-yellow-500/5" />
        <div className="absolute -left-32 -top-32 size-64 animate-pulse rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 size-64 animate-pulse rounded-full bg-amber-500/10 blur-3xl [animation-delay:1s]" />

        {/* Dotted grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[20px_20px]" />

        <div className="relative px-6 py-20 sm:px-12">
          <div className="flex flex-col items-center text-center">
            {/* Animated icon */}
            <div className="relative">
              <div className="absolute -inset-8 animate-ping rounded-full bg-orange-500/20 duration-[3s]" />
              <div className="absolute -inset-4 animate-pulse rounded-full bg-linear-to-r from-orange-500/20 to-amber-500/20 blur-xl" />
              <div className="relative flex size-24 items-center justify-center rounded-3xl bg-linear-to-br from-orange-500 to-amber-600 shadow-2xl shadow-orange-500/30">
                <Activity className="size-12 text-white" />
              </div>
            </div>

            <h3 className="mt-10 text-2xl font-bold sm:text-3xl">
              No executions yet
            </h3>
            <p className="mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
              When your workflows run, execution history and detailed logs will
              appear here. Create and trigger a workflow to see your first
              execution.
            </p>

            {/* Feature pills */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {[
                { icon: Clock, label: "Real-time logs" },
                { icon: BarChart3, label: "Performance metrics" },
                { icon: CheckCircle2, label: "Success tracking" },
                { icon: XCircle, label: "Error debugging" },
              ].map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-2 text-sm backdrop-blur-sm"
                >
                  <feature.icon className="size-4 text-muted-foreground" />
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Executions Table - Premium */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Recent Executions</h2>
            <p className="text-sm text-muted-foreground">
              Your latest workflow runs
            </p>
          </div>
          <button className="group flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            View all
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-border/50 bg-card">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 border-b border-border/50 bg-muted/30 px-6 py-3 text-sm font-medium text-muted-foreground">
            <div>Workflow</div>
            <div>Status</div>
            <div>Duration</div>
            <div>Started</div>
            <div className="text-right">Actions</div>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-16">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Activity className="size-6 text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              No executions to display
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
