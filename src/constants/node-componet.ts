import initialNode from "@/features/editor/components/reactFlow/Nodes/initialNode";
import { NodeType } from "@prisma/client";
import type { NodeTypes } from "@xyflow/react";

export const NODE_COMPONENTS = {
  [NodeType.INITIAL]: initialNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof NODE_COMPONENTS;
