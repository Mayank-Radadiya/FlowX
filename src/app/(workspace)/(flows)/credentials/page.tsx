import { PageHeader } from "@/components/global/PageHeader/PageHeader";
import { requiredAuth } from "@/features/auth/server/guards";
import { KeyRound } from "lucide-react";
import { HeroSection } from "./_components/HeroSection";

async function CredentialsPage() {
  await requiredAuth();

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Credentials"
        subtitle="Security"
        description="Enterprise-grade security for your API keys, tokens, and secrets."
        buttonLabel="Add Credential"
        newButtonHref="/credentials/new"
        icon={<KeyRound className="size-6" />}
        gradient="blue"
      />

      <HeroSection />
    </div>
  );
}

export default CredentialsPage;
