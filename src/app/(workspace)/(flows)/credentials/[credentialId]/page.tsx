import { requiredAuth } from "@/features/auth/server/guards";
import { HydrateClient } from "@/trpc/server";
import { CredentialDetailPage } from "@/features/credentials/components/detail";
interface Props {
  params: Promise<{ credentialId: string }>;
}

async function CredentialPage({ params }: Props) {
  await requiredAuth();
  const { credentialId } = await params;

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
      <HydrateClient>
        <CredentialDetailPage credentialId={credentialId} />
      </HydrateClient>
    </div>
  );
}

export default CredentialPage;
