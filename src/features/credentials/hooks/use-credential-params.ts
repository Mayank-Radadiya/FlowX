/**
 * Hook for reading and updating credential-related URL query parameters.
 * Uses `nuqs` to keep pagination, search, and other params fully typed
 * and synced with the URL.
 */

import { useQueryStates } from "nuqs";
import { credentialsParams } from "../params";

// Returns [params, setParams] for managing credential query state in the URL
export const useCredentialsParams = () => {
  return useQueryStates(credentialsParams);
};
