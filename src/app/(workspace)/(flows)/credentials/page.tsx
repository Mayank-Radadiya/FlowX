import { requiredAuth } from "@/features/auth/server/guards";
import { SearchParams } from "nuqs";
import { credentialsParamsLoader } from "@/features/credentials/server/params-loader";
import { prefetchCredentials } from "@/features/credentials/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import { CredentialsPageShell } from "@/features/credentials/components/page/CredentialsPageShell";
import { CredentialListBoundary } from "@/features/credentials/components/page/CredentialListBoundary";

interface Props {
  searchParams: Promise<SearchParams>;
}

async function CredentialsPage({ searchParams }: Props) {
  await requiredAuth();

  const params = await credentialsParamsLoader(searchParams);

  prefetchCredentials(params);

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-4">
      <HydrateClient>
        <CredentialsPageShell>
          <CredentialListBoundary />
        </CredentialsPageShell>
      </HydrateClient>
    </div>
  );
}

export default CredentialsPage;
