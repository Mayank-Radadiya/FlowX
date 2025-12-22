import { NodeExecutor } from "../../types";

type ManualTriggerExecutorParams = NodeExecutor<Record<string, unknown>>;

export const manualTriggerExecutor: ManualTriggerExecutorParams = async ({
  nodeId,
  context,
  step,
}) => {
  // Publish loading state

  const result = await step.run("manual-trigger", async () => {
    return context;
  });

  // Todo publish success state

  return result;
};
