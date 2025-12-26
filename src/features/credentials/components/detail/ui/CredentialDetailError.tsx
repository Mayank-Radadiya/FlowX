/**
 * Error fallback for credential detail page.
 */

import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export function CredentialDetailError() {
  return (
    <div className="w-[500px] mx-auto flex flex-col items-center py-16 text-center">
      <AlertTriangle className="size-12 text-red-500 mb-4" />
      <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
        Credential not found
      </h2>
      <Link
        href="/credentials"
        className="mt-6 text-blue-600 dark:text-blue-400"
      >
        <ArrowLeft className="size-4 inline mr-2" />
        Back to Credentials
      </Link>
    </div>
  );
}
