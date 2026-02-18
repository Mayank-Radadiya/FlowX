import { NonRetriableError } from "inngest";
import { NodeExecutor } from "../types";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import handlebars from "handlebars";
import { openaiChannel } from "@/inngest/channel/openai";
import { prisma } from "@/lib/db";

type OpenAIExecutorParams = {
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

export const openaiExecutor: NodeExecutor<OpenAIExecutorParams> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  // Publish loading state
  await publish(openaiChannel().status({ nodeId, status: "loading" }));

  if (!data.variableName) {
    await publish(
      openaiChannel().status({
        nodeId,
        status: "error",
      }),
    );
    throw new NonRetriableError("Variable name is required");
  }

  if (!data.userPrompt) {
    await publish(
      openaiChannel().status({
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
  let apiKey = process.env.OPENAI_API_KEY;

  if (data.credentialId) {
    const credential = await prisma.credential.findUnique({
      where: { id: data.credentialId },
      select: { value: true },
    });

    if (credential?.value) {
      apiKey = credential.value;
    }
  }

  if (!apiKey) {
    await publish(
      openaiChannel().status({
        nodeId,
        status: "error",
      }),
    );
    throw new NonRetriableError("OpenAI API key is required");
  }

  const openai = createOpenAI({
    apiKey,
  });

  try {
    const result = await step.ai.wrap("openai-generate-text", generateText, {
      model: openai("gpt-4.1") as any,
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
      openaiChannel().status({
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
      openaiChannel().status({
        nodeId,
        status: "error",
      }),
    );
    throw error;
  }
};
