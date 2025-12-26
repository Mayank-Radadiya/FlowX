/**
 * CredentialContainer Component
 * -----------------------------
 * Minimal container for credentials - content-focused design.
 */

"use client";

import type { ReactNode } from "react";
import PaginationUi from "@/components/global/pagination/PaginationUi";
import { Search } from "lucide-react";
import { useCredentialsPagination } from "../hooks/use-credential";
import { cn } from "@/lib/utils";

interface CredentialContainerProps {
  children: ReactNode;
}

function CredentialContainer({ children }: CredentialContainerProps) {
  const { currentPage, totalPages, search, setSearch } =
    useCredentialsPagination();

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex items-center justify-end">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/30" />
          <input
            type="text"
            value={search}
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

      {/* Content */}
      <div className="min-h-[300px]">{children}</div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end pt-4 border-t border-white/10">
          <PaginationUi currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}

export default CredentialContainer;
