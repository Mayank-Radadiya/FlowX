import { PageHeader } from "@/components/global/PageHeader/PageHeader";
import { requiredAuth } from "@/features/auth/server/guards";
import { Activity } from "lucide-react";
import { CredentialListBoundary } from "@/features/credentials/components/page/CredentialListBoundary";

async function ExecutionsPage() {
  await requiredAuth();

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Executions"
        subtitle="Analytics"
        description="Real-time monitoring and detailed logs for all your workflow runs."
        icon={<Activity className="size-6" />}
        gradient="orange"
      />
      <CredentialListBoundary />
    </div>
  );
}

export default ExecutionsPage;
