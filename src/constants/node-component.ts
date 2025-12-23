/**
 * Node Component Registry
 * -----------------------
 * Central mapping between workflow node types (from the database)
 * and their corresponding React Flow node components.
 *
 * Responsibilities:
 * - Define which React component renders each node type
 * - Act as a single source of truth for node registration
 * - Provide strong type safety between Prisma enums and React Flow
 *
 * This file is critical for editor extensibility:
 * adding a new node type only requires registering it here.
 */

import initialNode from "@/features/editor/components/reactFlow/Nodes/initialNode";
import GoogleFormTriggerNode from "@/features/execution/customNodes/google-form/GoogleFormTrigger";
import HttpRequestNode from "@/features/execution/customNodes/http-request/components/HttpRequestNode";
import StripeTriggerNode from "@/features/execution/customNodes/stripe-trigger/StripeTrigger";
import ManualTriggerNode from "@/features/execution/customNodes/trigger/ManualTriggerNode";
import { NodeType } from "@prisma/client";
import type { NodeTypes } from "@xyflow/react";

/**
 * NODE_COMPONENTS
 * ---------------
 * Maps each NodeType enum value to its React Flow node component.
 *
 * Key points:
 * - Keys come directly from the Prisma NodeType enum
 * - Values are React components compatible with React Flow
 * - `as const` preserves literal types
 * - `satisfies NodeTypes` ensures React Flow compatibility
 */
export const NODE_COMPONENTS = {
  [NodeType.INITIAL]: initialNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTriggerNode,
  [NodeType.STRIPE_TRIGGER]: StripeTriggerNode,
} as const satisfies NodeTypes;

/**
 * RegisteredNodeType
 * ------------------
 * Union type of all registered node keys.
 *
 * Used to:
 * - Enforce valid node types at compile time
 * - Prevent referencing unregistered or unsupported nodes
 * - Keep editor logic aligned with the registry
 */
export type RegisteredNodeType = keyof typeof NODE_COMPONENTS;
