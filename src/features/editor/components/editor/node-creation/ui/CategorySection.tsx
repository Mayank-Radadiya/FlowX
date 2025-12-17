/**
 * CategorySection Component
 * -------------------------
 * Renders a grouped section of workflow nodes under a single category.
 *
 * Responsibilities:
 * - Display category metadata (icon, label, description)
 * - Render a list of selectable node items
 * - Forward node selection events to the parent
 *
 * This component is purely presentational and stateless.
 */

import { NodeTypeOption } from "../types";
import NodeListItem from "./NodeListItem";

type NodeCategory = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  nodes: NodeTypeOption[];
};

interface CategorySectionProps {
  category: NodeCategory;
  onSelectNode: (node: NodeTypeOption) => void;
}

const CategorySection = ({ category, onSelectNode }: CategorySectionProps) => {
  /**
   * Extract the category icon component so it can be
   * rendered dynamically like a normal React component.
   */
  const CategoryIcon = category.icon;

  return (
    /**
     * Category container
     * ------------------
     * Provides vertical spacing between multiple categories
     * inside the node selection panel.
     */
    <div className="space-y-3 mt-3">
      {/* 
        Category header
        ----------------
        Displays category icon, name, and short description
        to help users quickly understand available nodes.
      */}
      <div className="flex items-center gap-2 px-1">
        <div className="flex size-6 items-center justify-center rounded-md bg-muted text-muted-foreground">
          <CategoryIcon className="size-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">
            {category.label}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {category.description}
          </span>
        </div>
      </div>

      {/* 
        Nodes list
        ----------
        Renders all node options belonging to this category.
        Each item delegates selection handling upward.
      */}
      <div className="grid gap-2">
        {category.nodes.map((node) => (
          <NodeListItem key={node.type} node={node} onSelect={onSelectNode} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
