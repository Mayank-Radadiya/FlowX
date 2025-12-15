/**
 * WorkflowContainer Component
 * ---------------------------
 * Acts as the structural layout wrapper for the workflows page.
 *
 * Responsibilities:
 * - Provide consistent container styling
 * - Wire search and pagination state to the UI
 * - Render workflow content inside a unified layout
 *
 * This component does NOT fetch data or render items directly.
 * It only coordinates layout-level concerns.
 */

"use client";

import type { ReactNode } from "react";
import { Container } from "@/components/global/main/container/Container";
import { ContainerHeader } from "@/components/global/main/container/ContainerHeader";
import PaginationUi from "@/components/global/pagination/PaginationUi";
import { List } from "lucide-react";
import { useWorkflowsPagination } from "../hooks/use-workflows";
import { SearchBar } from "@/components/global/main/container/SearchBar";

interface WorkflowContainerProps {
  children: ReactNode;
}

function WorkflowContainer({ children }: WorkflowContainerProps) {
  /**
   * Pagination and search state
   * ---------------------------
   * Retrieved from a shared hook that:
   * - Reads state from the URL
   * - Syncs pagination and search parameters
   * - Avoids unnecessary data refetching
   */
  const { currentPage, totalPages, search, setSearch } =
    useWorkflowsPagination();

  return (
    /**
     * Container component
     * -------------------
     * Provides:
     * - Glass-style visual variant
     * - Header with title and icon
     * - Integrated search input
     * - Pagination controls
     *
     * Actual workflow content is injected via children.
     */
    <Container
      variant="glass"
      header={<ContainerHeader title="My Workflows" icon={<List />} />}
      search={
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search workflows..."
        />
      }
      pagination={
        <PaginationUi currentPage={currentPage} totalPages={totalPages} />
      }
    >
      {/* Workflow list, skeleton, or error UI */}
      {children}
    </Container>
  );
}

export default WorkflowContainer;
