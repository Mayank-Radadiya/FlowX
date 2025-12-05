/**
 * Hook for reading and updating workflow-related URL query parameters.
 * Uses `nuqs` to keep pagination, search, and other params fully typed
 * and synced with the URL.
 */

import { useQueryStates } from "nuqs";
import { workflowsParams } from "../params";

// Returns [params, setParams] for managing workflow query state in the URL
export const useWorkflowsParams = () => {
  return useQueryStates(workflowsParams);
};
