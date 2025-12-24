/**
 * NodeListItem Component
 * ---------------------
 * Renders a single selectable node option inside the node picker.
 *
 * Responsibilities:
 * - Display node icon, label, and description
 * - Handle user selection of a node
 * - Close the surrounding sheet when a node is selected
 *
 * This component is stateless and fully controlled by props.
 */

import { BadgePlus } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import { NodeTypeOption } from "../../../editor/node-creation/types";
import Image from "next/image";

interface NodeCardProps {
  /** Metadata describing the node type */
  node: NodeTypeOption;

  /** Callback triggered when the node is selected */
  onSelect: (node: NodeTypeOption) => void;
}

const NodeListItem = ({ node, onSelect }: NodeCardProps) => {
  /**
   * Extract the icon component from the node definition
   * so it can be rendered dynamically.
   */
  const Icon = node?.icon;

  return (
    /**
     * SheetClose
     * ----------
     * Wraps the button so that selecting a node
     * automatically closes the surrounding sheet/drawer.
     */
    <SheetClose>
      {
        /**
         * Interactive node card
         * ---------------------
         * Acts as a button that:
         * - Selects the node
         * - Provides hover, focus, and active feedback
         */
        <div
          onClick={() => onSelect(node)}
          className="group relative w-full rounded-xl border border-border/50 bg-card p-4 transition-all duration-200 ease-out hover:border-primary/50 hover:bg-accent/50 hover:shadow-md hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          <div className="flex items-start gap-3">
            {/* Node icon */}
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white dark:group-hover:text-primary-foreground">
              {Icon && <Icon className="size-5" />}
              {node.image && (
                <Image
                  width={20}
                  height={20}
                  src={node.image}
                  alt={node.label}
                  className="size-5 object-contain"
                />
              )}
            </div>

            {/* Node label and description */}
            <div className="min-w-0 flex-1 text-left">
              <h4 className="truncate text-sm font-medium text-foreground">
                {node.label}
              </h4>
              <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                {node.description}
              </p>
            </div>

            {/* Add (+) indicator */}
            <div className="flex size-6 items-center justify-center rounded-full bg-transparent text-muted-foreground/50 transition-all duration-200 group-hover:bg-primary/10 group-hover:text-primary">
              <BadgePlus className="size-3.5 transition-transform duration-200 group-hover:rotate-90" />
            </div>
          </div>
        </div>
      }
    </SheetClose>
  );
};

export default NodeListItem;
