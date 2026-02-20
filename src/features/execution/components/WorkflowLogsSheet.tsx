"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  History,
  Activity,
  AlertCircle,
  CheckCircle2,
  CircleDashed,
  TerminalSquare,
  Clock,
  ChevronRight,
  Code2,
  Loader2,
  X as XIcon,
} from "lucide-react";
import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface WorkflowLogsSheetProps {
  workflowId: string;
}

// Custom modern badge to avoid external dependencies
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    COMPLETED:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    FAILED:
      "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    RUNNING:
      "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    PENDING:
      "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase transition-colors",
        styles[status] || styles.PENDING,
      )}
    >
      {status}
    </span>
  );
};

export function WorkflowLogsSheet({ workflowId }: WorkflowLogsSheetProps) {
  const [selectedExecutionId, setSelectedExecutionId] = useState<string | null>(
    null,
  );
  const trpc = useTRPC();

  const { data: executions, isLoading: isLoadingExecutions } = useQuery({
    ...trpc.executionLogs.getExecutions.queryOptions({ workflowId }),
    refetchInterval: 5000,
  });

  const { data: logs, isLoading: isLoadingLogs } = useQuery({
    ...trpc.executionLogs.getExecutionLogs.queryOptions({
      executionId: selectedExecutionId!,
    }),
    enabled: !!selectedExecutionId,
    refetchInterval: selectedExecutionId ? 5000 : false,
  });

  const getStatusIcon = (status: string, className?: string) => {
    const baseClass = cn("w-4 h-4", className);
    switch (status) {
      case "COMPLETED":
        return <CheckCircle2 className={cn(baseClass, "text-emerald-500")} />;
      case "FAILED":
        return <AlertCircle className={cn(baseClass, "text-rose-500")} />;
      case "RUNNING":
        return (
          <Activity
            className={cn(baseClass, "text-indigo-500 animate-pulse")}
          />
        );
      default:
        return <CircleDashed className={cn(baseClass, "text-slate-400")} />;
    }
  };

  const CodeBlock = ({
    title,
    data,
    type,
  }: {
    title: string;
    data: any;
    type: "input" | "output" | "error";
  }) => {
    if (!data || (typeof data === "object" && Object.keys(data).length === 0))
      return null;

    return (
      <div className="mt-3 w-full max-w-full group rounded-xl overflow-hidden border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-950/50 border-b border-slate-200 dark:border-white/5">
          <Code2
            className={cn(
              "w-3.5 h-3.5",
              type === "output"
                ? "text-emerald-500 dark:text-emerald-400"
                : type === "error"
                  ? "text-rose-500 dark:text-rose-400"
                  : "text-slate-500 dark:text-slate-400",
            )}
          />
          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
            {title}
          </span>
        </div>
        <div className="p-3 w-full max-w-full overflow-x-auto">
          <pre
            className={cn(
              "text-[11px] leading-relaxed font-mono w-max min-w-full",
              type === "error"
                ? "text-rose-600 dark:text-rose-400"
                : "text-slate-700 dark:text-slate-300",
            )}
          >
            {typeof data === "string" ? data : JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-primary/10 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 border border-black/20 dark:border-white/20 hover:border-indigo-500/20 dark:hover:border-indigo-500/20">
          <TerminalSquare className="w-4 h-4" />
          <span>Logs</span>
        </div>
      </SheetTrigger>

      <SheetContent
        showCloseButton={false}
        className="w-full sm:w-[670px] sm:max-w-none p-0 border-l border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-20 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="flex items-center gap-2 text-lg">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <TerminalSquare className="w-4 h-4" />
                </div>
                Execution Logs
              </SheetTitle>
              <SheetDescription className="mt-1.5 ml-10">
                {selectedExecutionId
                  ? "Viewing detailed execution trace."
                  : "Recent workflow execution history."}
              </SheetDescription>
            </div>

            <div className="flex items-center gap-2">
              {/* Context Badge */}
              {selectedExecutionId && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    ID: {selectedExecutionId.slice(-6)}
                  </span>
                </div>
              )}

              {/* Close Button */}
              <SheetClose className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <XIcon className="size-4" />
                <span className="sr-only">Close</span>
              </SheetClose>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 min-h-0 w-full overflow-y-auto">
          {!selectedExecutionId ? (
            // LIST VIEW
            <div>
              <div className="space-y-4 p-6">
                {isLoadingExecutions && (
                  <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
                    <Loader2 className="w-6 h-6 animate-spin mb-4 opacity-50" />
                    <p className="text-sm">Fetching executions...</p>
                  </div>
                )}

                {!isLoadingExecutions &&
                  (!executions || executions.length === 0) && (
                    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-black/5 dark:border-white/5 rounded-2xl bg-white/50 dark:bg-slate-900/50">
                      <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-4">
                        <History className="w-6 h-6 text-muted-foreground opacity-50" />
                      </div>
                      <h3 className="text-sm font-medium text-foreground mb-1">
                        No execution history
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Trigger this workflow to see logs here.
                      </p>
                    </div>
                  )}

                {executions?.map((exec: any) => (
                  <div
                    key={exec.id}
                    onClick={() => setSelectedExecutionId(exec.id)}
                    className="group flex flex-col p-4 bg-white dark:bg-slate-900/80 border border-black/5 dark:border-white/5 rounded-xl cursor-pointer hover:border-indigo-500/30 hover:shadow-[0_4px_20px_-4px_rgba(99,102,241,0.1)] transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center border",
                            exec.status === "COMPLETED"
                              ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20"
                              : exec.status === "FAILED"
                                ? "bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20"
                                : "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20",
                          )}
                        >
                          {getStatusIcon(exec.status)}
                        </div>
                        <div>
                          <div className="font-medium text-sm flex items-center gap-2">
                            Run #{exec.id.slice(-6).toUpperCase()}
                            {exec.status === "RUNNING" && (
                              <span className="flex w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {formatDistanceToNow(new Date(exec.startedAt), {
                              addSuffix: true,
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <StatusBadge status={exec.status} />
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors transform group-hover:translate-x-0.5" />
                      </div>
                    </div>

                    {exec.completedAt && (
                      <div className="flex items-center gap-4 px-3 py-2 bg-slate-50 dark:bg-slate-950/50 rounded-lg text-xs mt-1">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <span className="font-medium text-foreground">
                            Duration:
                          </span>
                          {(
                            (new Date(exec.completedAt).getTime() -
                              new Date(exec.startedAt).getTime()) /
                            1000
                          ).toFixed(2)}
                          s
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // DETAILS VIEW
            <div className="bg-slate-50/30 dark:bg-slate-950/30">
              {/* Toolbar */}
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10 sticky top-0 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedExecutionId(null)}
                  className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back to Runs
                </Button>

                <div className="flex items-center gap-2">
                  {isLoadingLogs && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Loader2 className="w-3 h-3 animate-spin" /> Polling...
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="max-w-2xl mx-auto space-y-6 p-6 pb-20">
                  {isLoadingLogs && (
                    <div className="flex justify-center p-8">
                      <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    </div>
                  )}

                  <div className="relative isolate">
                    {/* Continuous vertical line for the timeline */}
                    <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-500/20 via-slate-200 dark:via-slate-800 to-transparent -z-10" />

                    <div className="space-y-8">
                      {logs?.map((log: any, index: number) => (
                        <div key={log.id} className="relative pl-10">
                          {/* Timeline dot */}
                          <div
                            className={cn(
                              "absolute left-0 top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 shadow-sm z-10",
                              log.status === "COMPLETED"
                                ? "border-emerald-500"
                                : log.status === "FAILED"
                                  ? "border-rose-500"
                                  : "border-indigo-500",
                            )}
                          >
                            {getStatusIcon(log.status, "w-4 h-4")}
                          </div>

                          {/* Content Card */}
                          <div className="w-full max-w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80">
                              <div className="flex items-center gap-3">
                                <span className="font-semibold text-sm text-foreground">
                                  {log.nodeId}
                                </span>
                                <StatusBadge status={log.status} />
                              </div>
                              <span className="text-xs font-mono text-muted-foreground bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md">
                                {log.completedAt
                                  ? `${((new Date(log.completedAt).getTime() - new Date(log.startedAt).getTime()) / 1000).toFixed(2)}s`
                                  : "Running..."}
                              </span>
                            </div>

                            <div className="p-4 space-y-4">
                              <CodeBlock
                                title="Input Payload"
                                data={log.inputContext}
                                type="input"
                              />
                              <CodeBlock
                                title="Output Payload"
                                data={log.outputContext}
                                type="output"
                              />
                              <CodeBlock
                                title="Error Trace"
                                data={log.error}
                                type="error"
                              />

                              {!log.inputContext &&
                                !log.outputContext &&
                                !log.error && (
                                  <p className="text-xs text-muted-foreground italic px-2">
                                    No payload data recorded for this step.
                                  </p>
                                )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* End indicator */}
                  {logs &&
                    logs.length > 0 &&
                    logs[logs.length - 1].status !== "RUNNING" && (
                      <div className="flex flex-col items-center justify-center pt-8 pb-4">
                        <div className="w-1 h-12 bg-gradient-to-b from-slate-200 dark:from-slate-800 to-transparent mb-4" />
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/5 dark:border-white/5 bg-white/50 dark:bg-slate-900/50 shadow-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Workflow Finished
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
