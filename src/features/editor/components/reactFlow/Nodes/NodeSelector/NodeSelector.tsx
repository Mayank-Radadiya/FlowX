"use client";

import { createId } from "@paralleldrive/cuid2";
import { useReactFlow } from "@xyflow/react";
import { GlobeIcon, MousePointer, Search, Zap, Workflow } from "lucide-react";
import { useCallback, useId, useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetPanel,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NodeType } from "@prisma/client";
import EmptySearchState from "./EmptySearchState";
import CategorySection from "./CategorySection";
import toast from "react-hot-toast";

// ============================================================================
// Types
// ============================================================================

export type NodeTypeOption = {
  type: NodeType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

type NodeCategory = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  nodes: NodeTypeOption[];
};

// ============================================================================
// Node Categories Configuration
// ============================================================================

const nodeCategories: NodeCategory[] = [
  {
    id: "triggers",
    label: "Triggers",
    icon: Zap,
    description: "Start your workflow",
    nodes: [
      {
        type: NodeType.MANUAL_TRIGGER,
        label: "Manual Trigger",
        description: "Start the flow manually with a click",
        icon: MousePointer,
      },
    ],
  },
  {
    id: "actions",
    label: "Actions",
    icon: Workflow,
    description: "Perform operations",
    nodes: [
      {
        type: NodeType.HTTP_REQUEST,
        label: "HTTP Request",
        description: "Make API calls to external services",
        icon: GlobeIcon,
      },
    ],
  },
];

// ============================================================================
// Main Component
// ============================================================================
interface NodeSelectorProps {
  children?: React.ReactElement<Record<string, unknown>>;
}

export const NodeSelector = ({ children }: NodeSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { addNodes, setNodes, screenToFlowPosition, getNodes } = useReactFlow();
  const triggerId = useId();

  // Filter categories and nodes based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return nodeCategories;

    const query = searchQuery.toLowerCase().trim();

    return nodeCategories
      .map((category) => ({
        ...category,
        nodes: category.nodes.filter(
          (node) =>
            node.label.toLowerCase().includes(query) ||
            node.description.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.nodes.length > 0);
  }, [searchQuery]);

  // Calculate total nodes count
  const totalNodesCount = useMemo(
    () => filteredCategories.reduce((acc, cat) => acc + cat.nodes.length, 0),
    [filteredCategories]
  );

  // Handle node selection
  const handleSelectNode = useCallback(
    (node: NodeTypeOption) => {
      // Check if trying add Manual Trigger when one already exists
      if (node.type === NodeType.MANUAL_TRIGGER) {
        const node = getNodes();
        const hasManualTriggerNode = node.some(
          (n) => n.type === NodeType.MANUAL_TRIGGER
        );
        if (hasManualTriggerNode) {
          toast.error("Only one Manual Trigger node is allowed per workflow.");
          return;
        }
      }

      setNodes((nodes) => {
        const hasInitialTrigger = nodes.some(
          (n) => n.type === NodeType.INITIAL
        );
        // Calculate position for new node (center of viewport with slight offset)
        const position = screenToFlowPosition({
          x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
          y: window.innerHeight / 2 + (Math.random() - 0.5) * 200,
        });

        const newNode = {
          id: createId(),
          data: {},
          position: position,
          type: node.type,
        };

        if (hasInitialTrigger) {
          return [newNode];
        }

        return [...nodes, newNode];
      });

      // Reset search
      setSearchQuery("");
    },
    [addNodes, screenToFlowPosition, setNodes, getNodes]
  );

  return (
    <Sheet>
      {children && <SheetTrigger id={triggerId} render={children} />}

      <SheetContent side="right" className="w-full sm:max-w-md bg-accent/30">
        <SheetHeader>
          <SheetTitle>Add Node</SheetTitle>
          <SheetDescription>
            Select a node to add to your workflow
          </SheetDescription>
        </SheetHeader>

        <SheetPanel className="flex flex-col gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {totalNodesCount} {totalNodesCount === 1 ? "node" : "nodes"}{" "}
              available
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-primary hover:underline"
              >
                Clear search
              </button>
            )}
          </div>

          {/* Categories */}
          <ScrollArea className="flex-1 -mx-6 px-6">
            {filteredCategories.length > 0 ? (
              <div className="space-y-6 pb-6">
                {filteredCategories.map((category) => (
                  <CategorySection
                    key={category.id}
                    category={category}
                    onSelectNode={handleSelectNode}
                  />
                ))}
              </div>
            ) : (
              <EmptySearchState searchQuery={searchQuery} />
            )}
          </ScrollArea>
        </SheetPanel>
      </SheetContent>
    </Sheet>
  );
};
