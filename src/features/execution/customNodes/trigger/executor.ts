import { manualTriggerChannel } from "@/inngest/channel/manualTriggerChannel";
import { NodeExecutor } from "../types";

type ManualTriggerExecutorParams = NodeExecutor<Record<string, unknown>>;

export const manualTriggerExecutor: ManualTriggerExecutorParams = async ({
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(manualTriggerChannel().status({ nodeId, status: "loading" }));

  const result = await step.run("manual-trigger", async () => {
    return context;
  });

  await publish(manualTriggerChannel().status({ nodeId, status: "success" }));

  return result;
};
