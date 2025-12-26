/**
 * CredentialsPageShell Component
 * ------------------------------
 * Main shell component that wraps the credentials page content.
 *
 * Responsibilities:
 * - Render the PageHeader with blue gradient
 * - Include the CreateCredentialDialog action
 * - Wrap content in CredentialContainer
 */

import { PageHeader } from "@/components/global/PageHeader/PageHeader";
import { KeyRound } from "lucide-react";
import CredentialContainer from "../../ui/CredentialContainer";
import { CreateCredentialDialog } from "../create-credential/CreateCredentialDialog";

export function CredentialsPageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader
        title="Credentials"
        subtitle="Security"
        description="Enterprise-grade security for your API keys, tokens, and secrets."
        icon={<KeyRound className="size-6" />}
        gradient="blue"
        action={<CreateCredentialDialog />}
      />
      <CredentialContainer>{children}</CredentialContainer>
    </>
  );
}
