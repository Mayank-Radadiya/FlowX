import initialNode from "@/features/editor/components/reactFlow/Nodes/initialNode";

import HttpRequestNode from "@/features/execution/customNodes/http-request/HttpRequestNode";
import ManualTriggerNode from "@/features/execution/customNodes/trigger/ManualTriggerNode";
import { NodeType } from "@prisma/client";
import type { NodeTypes } from "@xyflow/react";

export const NODE_COMPONENTS = {
  [NodeType.INITIAL]: initialNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof NODE_COMPONENTS;
