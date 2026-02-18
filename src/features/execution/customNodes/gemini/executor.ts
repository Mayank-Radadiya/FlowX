import { NonRetriableError } from "inngest";
import { NodeExecutor } from "../types";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import handlebars from "handlebars";
import { geminiChannel } from "@/inngest/channel/gemini";
import { prisma } from "@/lib/db";

type GeminiExecutorParams = {
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

export const geminiExecutor: NodeExecutor<GeminiExecutorParams> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  // Publish loading state
  await publish(geminiChannel().status({ nodeId, status: "loading" }));

  if (!data.variableName) {
    await publish(
      geminiChannel().status({
        nodeId,
        status: "error",
      }),
    );
    throw new NonRetriableError("Variable name is required");
  }

  if (!data.userPrompt) {
    await publish(
      geminiChannel().status({
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
  let apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (data.credentialId) {
    const credential = await prisma.credential.findUnique({
      where: { id: data.credentialId },
      select: { value: true },
    });

    if (credential?.value) {
      apiKey = credential.value;
    }
  }

  const google = createGoogleGenerativeAI({
    apiKey,
  });

  try {
    const { steps } = await step.ai.wrap("gemini-generate-text", generateText, {
      model: google("gemini-2.5-flash"),
      system: systemPrompt,
      prompt: userPrompt,
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });

    const text =
      steps[0].content[0].type === "text" ? steps[0].content[0].text : "";

    await publish(
      geminiChannel().status({
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
      geminiChannel().status({
        nodeId,
        status: "error",
      }),
    );
    throw error;
  }
};
