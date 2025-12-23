import { NodeType } from "@prisma/client";
import { NodeExecutor } from "../customNodes/types";
import { httpRequestExecutor } from "../customNodes/http-request/executor";
import { manualTriggerExecutor } from "../customNodes/trigger/executor";
import { googleFormTriggerExecutor } from "../customNodes/google-form/executor";

export const executorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.GOOGLE_FORM_TRIGGER]: googleFormTriggerExecutor,
};

export const getNodeExecutor = (type: NodeType): NodeExecutor<any> => {
  const executor = executorRegistry[type];
  if (!executor) {
    throw new Error(`No executor found for node type ${type}`);
  }
  return executor;
};
