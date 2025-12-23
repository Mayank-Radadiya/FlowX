import { NodeType } from "@prisma/client";
import { NodeExecutor } from "../types";
import { manualTriggerExecutor } from "../customNodes/trigger/executor";
import { httpRequestExecutor } from "../customNodes/http-request/executor";

export const executorRegistry: Record<NodeType, NodeExecutor<any>> = {
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
};

export const getNodeExecutor = (type: NodeType): NodeExecutor<any> => {
  const executor = executorRegistry[type];
  if (!executor) {
    throw new Error(`No executor found for node type ${type}`);
  }
  return executor;
};
