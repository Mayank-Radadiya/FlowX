import { NonRetriableError } from "inngest";
import { NodeExecutor } from "../types";
import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import handlebars from "handlebars";
import { anthropicChannel } from "@/inngest/channel/anthropic";
import { prisma } from "@/lib/db";

type AnthropicExecutorParams = {
  variableName?: string;
  model?: string;
  systemPrompt?: string;
  userPrompt?: string;
  credentialId?: string;
};

handlebars.registerHelper("json", function (context) {
  try {
    return new handlebars.SafeString(JSON.stringify(context ?? {}, null, 2));
  } catch {
    return "{}";
  }
});

export const anthropicExecutor: NodeExecutor<AnthropicExecutorParams> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  // Publish loading state
  await publish(anthropicChannel().status({ nodeId, status: "loading" }));

  if (!data.variableName) {
    await publish(
      anthropicChannel().status({
        nodeId,
        status: "error",
      }),
    );
    throw new NonRetriableError("Variable name is required");
  }

  if (!data.userPrompt) {
    await publish(
      anthropicChannel().status({
        nodeId,
        status: "error",
      }),
    );
    throw new NonRetriableError("User prompt is required");
  }

  const systemPrompt = data.systemPrompt
    ? handlebars.compile(data.systemPrompt)(context)
    : "You are a helpful assistant.";

  const userPrompt = data.userPrompt
    ? handlebars.compile(data.userPrompt)(context)
    : "What can I help you with?";

  // Resolve API key: credential from vault > environment variable
  let apiKey = process.env.ANTHROPIC_API_KEY;

  if (data.credentialId) {
    const credential = await prisma.credential.findUnique({
      where: { id: data.credentialId },
      select: { value: true },
    });

    if (credential?.value) {
      apiKey = credential.value;
    }
  }

  const anthropic = createAnthropic({
    apiKey,
  });

  try {
    const result = await step.ai.wrap("anthropic-generate-text", generateText, {
      model: anthropic("claude-2.1") as any,
      system: systemPrompt,
      prompt: userPrompt,
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });

    const text = result.text || "";

    await publish(
      anthropicChannel().status({
        nodeId,
        status: "success",
      }),
    );

    return {
      ...context,
      [data.variableName]: {
        response: text,
      },
    };
  } catch (error) {
    await publish(
      anthropicChannel().status({
        nodeId,
        status: "error",
      }),
    );
    throw error;
  }
};
