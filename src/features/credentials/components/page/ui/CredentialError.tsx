/**
 * CredentialError Component
 * -------------------------
 * Error state with security-themed design - distinct from workflow errors.
 */

import { AlertCircle, Shield, RefreshCw } from "lucide-react";

function CredentialError() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-linear-to-br from-red-500/5 via-orange-500/5 to-transparent p-8 sm:p-12">
      {/* Background glow */}
      <div className="absolute -right-10 -top-10 size-32 rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 size-24 rounded-full bg-orange-500/10 blur-3xl" />

      {/* Security grid overlay */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,transparent_0%,transparent_49%,rgba(239,68,68,0.1)_50%,transparent_51%,transparent_100%),linear-gradient(to_bottom,transparent_0%,transparent_49%,rgba(239,68,68,0.1)_50%,transparent_51%,transparent_100%)] bg-size-[40px_40px]" />

      <div className="relative flex flex-col items-center text-center">
        {/* Error icon */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-red-500/20 blur-xl" />
          <div className="relative flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-red-500 to-orange-600 shadow-lg shadow-red-500/25">
            <AlertCircle className="size-8 text-white" />
          </div>
        </div>

        <h3 className="mt-6 text-xl font-semibold text-neutral-900 dark:text-white">
          Vault connection failed
        </h3>
        <p className="mt-2 max-w-sm text-neutral-600 dark:text-white/60">
          We couldn&apos;t access your secure credentials. Please try refreshing
          or contact support if the issue persists.
        </p>

        {/* Security notice */}
        <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <Shield className="size-4 text-amber-600 dark:text-amber-400" />
          <span className="text-xs text-amber-700 dark:text-amber-300">
            Your credentials remain encrypted and secure
          </span>
        </div>

        {/* Retry button */}
        <button
          onClick={() => window.location.reload()}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-neutral-600 dark:text-white/70 bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 transition-colors"
        >
          <RefreshCw className="size-4" />
          Try again
        </button>
      </div>
    </div>
  );
}

export default CredentialError;
