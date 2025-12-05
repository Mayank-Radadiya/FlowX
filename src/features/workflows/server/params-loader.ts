/**
 * Creates a server-side URL parameter loader for workflow queries.
 * This loader parses and validates query params using `nuqs` based on
 * the configuration defined in `workflowsParams`.
 */

import { createLoader } from "nuqs/server";
import { workflowsParams } from "../params";

// Loader used by server components to read typed workflow query parameters
export const workflowsParamsLoader = createLoader(workflowsParams);
