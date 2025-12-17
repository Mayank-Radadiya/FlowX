/**
 * useCreateNode
 * -------------
 * This custom hook encapsulates **all logic required to add a new node**
 * into the React Flow canvas.
 *
 * Responsibilities of this hook:
 * - Enforce node-creation rules (example: only one Manual Trigger allowed)
 * - Generate unique node IDs
 * - Calculate a safe position inside the canvas
 * - Insert the node into React Flow state
 *
 * This hook is intentionally UI-agnostic:
 * it does not render anything — it only mutates the graph state.
 */

import { createId } from "@paralleldrive/cuid2";
import { NodeType } from "@prisma/client";
import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import toast from "react-hot-toast";

export function useCreateNode() {
  /**
   * React Flow helpers
   * ------------------
   * - setNodes: updates the node list
   * - getNodes: reads current nodes synchronously
   * - screenToFlowPosition: converts screen coords → canvas coords
   */
  const { setNodes, getNodes, screenToFlowPosition } = useReactFlow();

  /**
   * Returned callback
   * -----------------
   * Accepts a NodeType and attempts to create a new node of that type.
   *
   * Wrapped in `useCallback` to keep a stable reference
   * when passed to child components.
   */
  return useCallback(
    (type: NodeType) => {
      /**
       * Business Rule: Manual Trigger
       * -----------------------------
       * Only ONE manual trigger is allowed per workflow.
       * This is enforced at the UI level to prevent invalid graphs.
       */
      if (type === NodeType.MANUAL_TRIGGER) {
        const hasTrigger = getNodes().some(
          (n) => n.type === NodeType.MANUAL_TRIGGER
        );

        if (hasTrigger) {
          toast.error("Only one Manual Trigger is allowed.");
          return;
        }
      }

      /**
       * Add node to React Flow state
       * ----------------------------
       * We use the functional `setNodes` form to always work
       * with the most recent state.
       */
      setNodes((nodes) => {
        /**
         * Check if an INITIAL node already exists.
         * This is often used as a placeholder / bootstrap node.
         */
        const hasInitialNode = nodes.some(
          (n) => n.type === NodeType.INITIAL
        );

        /**
         * Compute a random position near the center of the screen.
         * This improves UX by avoiding node overlap and off-screen placement.
         */
        const position = screenToFlowPosition({
          x: window.innerWidth / 2 + (Math.random() - 0.5) * 160,
          y: window.innerHeight / 2 + (Math.random() - 0.5) * 160,
        });

        /**
         * Construct the new node object.
         * - id: globally unique
         * - type: determines which node component renders
         * - data: node-specific configuration (initially empty)
         * - position: canvas coordinates
         */
        const newNode = {
          id: createId(),
          type,
          data: {},
          position,
        };

        /**
         * Special handling when INITIAL node exists:
         * -------------------------------------------
         * If an initial node is present, we replace the entire
         * node list with the new node.
         *
         * This pattern is commonly used when the INITIAL node
         * acts as a temporary placeholder.
         */
        if (hasInitialNode) {
          return [newNode];
        }

        /**
         * Default behavior:
         * append the new node to existing nodes.
         */
        return [...nodes, newNode];
      });
    },
    [getNodes, screenToFlowPosition, setNodes]
  );
}
