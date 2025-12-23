import { googleFormTriggerChannel } from "@/inngest/channel/googleFormChannel";
import { NodeExecutor } from "../types";

type GoogleFormTriggerExecutorParams = NodeExecutor<Record<string, unknown>>;

export const googleFormTriggerExecutor: GoogleFormTriggerExecutorParams =
  async ({ nodeId, context, step, publish }) => {
    await publish(
      googleFormTriggerChannel().status({ nodeId, status: "loading" })
    );

    const result = await step.run("google-form-trigger", async () => {
      return context;
    });

    await publish(
      googleFormTriggerChannel().status({ nodeId, status: "success" })
    );

    return result;
  };
