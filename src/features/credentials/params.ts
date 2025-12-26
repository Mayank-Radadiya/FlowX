/**
 * Defines URL query parameter parsers for credentials using `nuqs`.
 * Each parameter is typed, given a default value, and configured to
 * automatically clear itself from the URL when the default is used.
 */

import { PAGINATION } from "@/constants";
import { parseAsInteger, parseAsString } from "nuqs/server";

export const credentialsParams = {
  // Page number with default and URL cleanup
  page: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),

  // Items per page with default and cleanup
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({ clearOnDefault: true }),

  // Search term parameter (defaults to empty string)
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
};
