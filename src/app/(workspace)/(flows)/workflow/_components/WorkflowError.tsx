import { AlertCircle } from "lucide-react";

function WorkflowError() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-destructive/20 bg-linear-to-br from-destructive/10 via-destructive/5 to-transparent p-12">
      <div className="absolute -right-10 -top-10 size-32 rounded-full bg-destructive/10 blur-3xl" />

      <div className="relative flex flex-col items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-destructive to-destructive/80 shadow-lg shadow-destructive/25">
          <AlertCircle className="size-8 text-white" />
        </div>
        <h3 className="mt-6 text-xl font-semibold">Something went wrong</h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          We couldn&apos;t load your workflows. Please refresh the page or try
          again later.
        </p>
      </div>
    </div>
  );
}

export default WorkflowError;
