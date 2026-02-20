import { PageHeader } from "@/components/global/PageHeader/PageHeader";
import { requiredAuth } from "@/features/auth/server/guards";
import { HydrateClient } from "@/trpc/server";
import { prefetchExecutionHistory } from "@/features/execution/server/prefetch";
import { ExecutionHistoryView } from "@/features/execution/components/ExecutionHistoryView";
import { Activity } from "lucide-react";

export const metadata = {
  title: "Executions | FlowX",
  description:
    "Monitor and debug all your workflow executions in real-time.",
};

async function ExecutionsPage() {
  await requiredAuth();
  await prefetchExecutionHistory();

  return (
    <HydrateClient>
      <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <PageHeader
          title="Executions"
          subtitle="Monitoring"
          description="Real-time monitoring and detailed logs for all your workflow runs."
          icon={<Activity className="size-6" />}
          gradient="orange"
        />
        <ExecutionHistoryView />
      </div>
    </HydrateClient>
  );
}

export default ExecutionsPage;
