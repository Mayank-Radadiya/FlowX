/**
 * NodeCatalog Component
 * --------------------
 * Renders the searchable catalog of available workflow nodes.
 *
 * Responsibilities:
 * - Display node categories and their node options
 * - Provide search and filtering functionality
 * - Delegate node creation to editor logic
 *
 * This component acts as the main entry point for node discovery
 * inside the workflow editor.
 */

"use client";

import { useMemo, useState } from "react";
import { NODE_CATEGORIES } from "./NodeCategories";
import { ScrollArea } from "@/components/ui/scroll-area";
import CategorySection from "./ui/CategorySection";
import EmptySearchState from "./ui/EmptySearchState";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCreateNode } from "./useCreateNode";

export function NodeCatalog() {
  /**
   * Local search state
   * ------------------
   * Stores the user-entered query for filtering node options.
   */
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Node creation handler
   * ---------------------
   * Encapsulates editor-specific logic for adding a node
   * to the workflow graph.
   */
  const createNode = useCreateNode();

  /**
   * Filtered categories
   * -------------------
   * Filters node categories based on the search query.
   *
   * Logic:
   * - If search is empty → return all categories
   * - Otherwise:
   *   - Filter nodes by label or description
   *   - Remove empty categories
   *
   * Memoized to avoid unnecessary recalculations on re-render.
   */
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return NODE_CATEGORIES;

    const q = searchQuery.toLowerCase();
    return NODE_CATEGORIES.map((c) => ({
      ...c,
      nodes: c.nodes.filter(
        (n) =>
          n.label.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q)
      ),
    })).filter((c) => c.nodes.length > 0);
  }, [searchQuery]);

  return (
    <>
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search nodes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Scrollable node list */}
      <ScrollArea className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thin-thumb">
        {filteredCategories.length ? (
          <div className="flex flex-col gap-3 pb-5">
            {filteredCategories.map((category) => (
              <CategorySection
                key={category.id}
                category={category}
                /**
                 * Node selection handler
                 * ----------------------
                 * Converts a selected node option into
                 * an actual workflow node in the editor.
                 */
                onSelectNode={(node) => createNode(node.type)}
              />
            ))}
          </div>
        ) : (
          /**
           * Empty search state
           * ------------------
           * Rendered when no nodes match the search query.
           */
          <EmptySearchState searchQuery={searchQuery} />
        )}
      </ScrollArea>
    </>
  );
}
