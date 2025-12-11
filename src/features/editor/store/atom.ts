/**
 * reactFlowInstanceAtom
 * ----------------------
 * Stores a reference to the ReactFlow instance so it can be accessed
 * across different components or hooks.
 *
 * Why this is needed:
 * -------------------
 * React Flow exposes useful API methods through the instance, such as:
 *   - getNodes()
 *   - getEdges()
 *   - setCenter()
 *   - project()
 *   - zoomTo()
 *
 * Instead of passing the instance down multiple layers of components,
 * Jotai provides a global, lightweight state container.
 *
 * Any component can:
 *   - read the current instance
 *   - update the instance when React Flow initializes
 *   - call instance methods safely
 */

import type { ReactFlowInstance } from "@xyflow/react";
import { atom } from "jotai";

// Atom that holds the React Flow instance or null before initialization
export const editorAtom = atom<ReactFlowInstance | null>(null);
