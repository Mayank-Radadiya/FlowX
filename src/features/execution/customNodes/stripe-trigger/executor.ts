import { NodeExecutor } from "../types";
import { stripeTriggerChannel } from "@/inngest/channel/stripeTrigger";

type StripeTriggerExecutorParams = NodeExecutor<Record<string, unknown>>;

export const stripeTriggerExecutor: StripeTriggerExecutorParams = async ({
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(stripeTriggerChannel().status({ nodeId, status: "loading" }));

  const result = await step.run("stripe-form-trigger", async () => {
    return context;
  });

  await publish(stripeTriggerChannel().status({ nodeId, status: "success" }));

  return result;
};
