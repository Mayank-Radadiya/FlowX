/**
 * AddNewNodeButton Component
 * -------------------------
 * Renders a primary action button used to add new nodes
 * to the workflow editor.
 *
 * Responsibilities:
 * - Provide an entry point to the node selection UI
 * - Delegate node selection behavior to NodeSelector
 * - Visually emphasize node creation as a primary action
 *
 * This component is memoized to avoid unnecessary re-renders,
 * as its UI and behavior are static.
 */

"use client";

import { BadgePlus } from "lucide-react";
import { memo } from "react";
import { NodeSelector } from "./NodeSelector";

const AddNewNodeButton = memo(() => {
  return (
    /**
     * NodeSelector
     * ------------
     * Wraps the button and controls:
     * - Opening the node selection panel
     * - Handling user interaction for choosing a node
     *
     */
    <>
      <NodeSelector>
        {/* 
          Trigger button
          --------------
          Styled as a primary call-to-action that clearly
          communicates node creation.
        */}
        <div className="group flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-violet-600 to-violet-500 text-white text-sm font-medium rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 hover:from-violet-500 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 active:scale-[0.98] transition-all duration-200">
          {/* Icon with subtle rotation feedback on hover */}
          <BadgePlus className="size-4 transition-transform duration-200 group-hover:rotate-90" />
          {/* Button label */}
          Add Node
        </div>
      </NodeSelector>
    </>
  );
});

export default AddNewNodeButton;
