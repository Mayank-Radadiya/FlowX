/**
 * CredentialContainer Component
 * -----------------------------
 * Minimal container for credentials - content-focused design.
 * Note: Pagination is rendered inside CredentialItems (within Suspense boundary)
 * to avoid hydration mismatch issues.
 */

"use client";

import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCredentialsParams } from "../hooks/use-credential-params";

interface CredentialContainerProps {
  children: ReactNode;
}

function CredentialContainer({ children }: CredentialContainerProps) {
  const [params, setParams] = useCredentialsParams();

  const setSearch = (search: string) => {
    setParams({ ...params, search, page: 1 });
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex items-center justify-end">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/30" />
          <input
            type="text"
            value={params.search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search credentials..."
            className={cn(
              "h-10 w-64 pl-9 pr-4 rounded-xl text-sm",
              "bg-white/5 border border-white/10",
              "placeholder:text-white/30 text-white",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50",
              "transition-all duration-200"
            )}
          />
        </div>
      </div>

      {/* Content (includes pagination via CredentialItems) */}
      <div>{children}</div>
    </div>
  );
}

export default CredentialContainer;
