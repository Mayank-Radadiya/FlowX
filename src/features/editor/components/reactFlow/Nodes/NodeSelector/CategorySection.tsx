import NodeCard from "./NodeCard";
import { NodeTypeOption } from "./NodeSelector";

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
  const CategoryIcon = category.icon;

  return (
    <div className="space-y-3">
      {/* Category Header */}
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

      {/* Nodes Grid */}
      <div className="grid gap-2">
        {category.nodes.map((node) => (
          <NodeCard key={node.type} node={node} onSelect={onSelectNode} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
