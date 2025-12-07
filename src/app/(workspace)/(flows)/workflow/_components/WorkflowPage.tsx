/**
 * CreateWorkFlowPage Component
 * ---------------------------
 * High-level page layout for the Workflows section.
 *
 * This component combines:
 *  - A header with description + "Create Workflow" dialog
 *  - A search bar to filter workflows
 *  - A paginated list container
 *  - A pagination UI synced with query parameters
 *  - The workflow creation logic (via useCreateWorkflow)
 *
 * This component acts as the “page wrapper” where:
 *   - Top-level actions are handled (create, search)
 *   - Pagination state is read from the URL
 *   - Child content is rendered inside a styled container
 */

"use client";

import { Container } from "@/components/global/main/container/Container";
import { ContainerHeader } from "@/components/global/main/container/ContainerHeader";
import { SearchBar } from "@/components/global/main/container/SearchBar";
import { PageHeader } from "@/components/global/main/PageHeader/PageHeader";
import PaginationUi from "@/components/global/pagination/PaginationUi";

import {
  useCreateWorkflow,
  useWorkflowsPagination,
} from "@/features/workflows/hooks/use-workflows";

import { GitPullRequestArrow, List } from "lucide-react";

interface WorkflowPageProps {
  children: React.ReactNode;
}

export const CreateWorkFlowPage = ({ children }: WorkflowPageProps) => {

  /**
   * useWorkflowsPagination Hook
   * ---------------------------
   * Reads pagination + search state directly from TanStack Query cache
   * and URL parameters:
   *
   * Returns:
   *   - currentPage → number
   *   - totalPages → number
   *   - search → current search filter
   *   - setSearch → update search (writes to URL)
   */
  const { currentPage, totalPages, search, setSearch } =
    useWorkflowsPagination();

  return (
    <>
      {/* ------------------------------------------
          Top Page Header (title, description, action)
         ------------------------------------------- */}
      <PageHeader
        title="Workflows"
        subtitle="Automation"
        description="Build powerful automation that connect your apps and services seamlessly."
        buttonLabel="Create Workflow"
        icon={<GitPullRequestArrow className="size-6" />}
        gradient="purple"
        onNew={() => {}}// Handled inside CreateWorkFlowDialog
      />

      {/* ------------------------------------------
          Main Content Container
         -------------------------------------------
         - Contains search bar
         - Contains pagination UI
         - Renders children (workflow list or UI)
       */}
      <Container
        variant="glass"
        search={
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search workflows..."
          />
        }
        header={<ContainerHeader title="My Workflows" icon={<List />} />}
        pagination={
          <PaginationUi currentPage={currentPage} totalPages={totalPages} />
        }
      >
        {children}
      </Container>
    </>
  );
};
