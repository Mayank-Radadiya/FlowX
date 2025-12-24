import { NodeType } from "@prisma/client";
import { NodeExecutor } from "../customNodes/types";
import { httpRequestExecutor } from "../customNodes/http-request/executor";
import { manualTriggerExecutor } from "../customNodes/trigger/executor";
import { googleFormTriggerExecutor } from "../customNodes/google-form/executor";
import { stripeTriggerExecutor } from "../customNodes/stripe-trigger/executor";
import { geminiExecutor } from "../customNodes/gemini/executor";
import { openaiExecutor } from "../customNodes/openai/executor";
import { anthropicExecutor } from "../customNodes/anthropic/executor";

export const executorRegistry: Partial<Record<NodeType, NodeExecutor>> = {
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.GOOGLE_FORM_TRIGGER]: googleFormTriggerExecutor,
  [NodeType.STRIPE_TRIGGER]: stripeTriggerExecutor,
  [NodeType.GEMINI]: geminiExecutor,
  [NodeType.ANTHROPIC]: anthropicExecutor,
  [NodeType.OPENAI]: openaiExecutor,
};

export const getNodeExecutor = (type: NodeType): NodeExecutor<any> => {
  const executor = executorRegistry[type];
  if (!executor) {
    throw new Error(`No executor found for node type ${type}`);
  }
  return executor;
};
