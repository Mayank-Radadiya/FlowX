import { Sparkles } from "lucide-react";

function EmptyWorkflowState() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-dashed border-border/50 bg-linear-to-br from-muted/50 via-muted/30 to-transparent p-12 sm:p-16">
      {/* Decorative elements */}
      <div className="absolute -right-20 -top-20 size-40 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 size-40 rounded-full bg-violet-500/5 blur-3xl" />

      {/* Floating dots decoration */}
      <div className="absolute left-1/4 top-8 size-2 animate-pulse rounded-full bg-primary/30" />
      <div className="absolute right-1/3 top-12 size-1.5 animate-pulse rounded-full bg-violet-500/30 [animation-delay:0.5s]" />
      <div className="absolute bottom-16 left-1/3 size-1 animate-pulse rounded-full bg-fuchsia-500/30 [animation-delay:1s]" />

      <div className="relative flex flex-col items-center text-center">
        <div className="relative">
          <div className="absolute -inset-4 animate-pulse rounded-full bg-primary/10 blur-xl" />
          <div className="relative flex size-20 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 to-purple-600 shadow-xl shadow-violet-500/25">
            <Sparkles className="size-10 text-white" />
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-bold">Create your first workflow</h3>
        <p className="mt-3 max-w-md text-muted-foreground">
          Automate your tasks with powerful workflows. Connect apps, trigger
          actions, and let FlowX handle the rest.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {["Triggers", "Actions", "Conditions", "Loops"].map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-border/50 bg-background/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmptyWorkflowState;