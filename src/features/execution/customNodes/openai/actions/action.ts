"use server";

import { openaiChannel } from "@/inngest/channel/openai";
import { inngest } from "@/inngest/client";
import { getSubscriptionToken, type Realtime } from "@inngest/realtime";

export type OpenAIToken = Realtime.Token<typeof openaiChannel, ["status"]>;

export async function fetchOpenAIRealTimeToken(): Promise<OpenAIToken> {
  const token = await getSubscriptionToken(inngest, {
    channel: openaiChannel(),
    topics: ["status"],
  });

  return token;
}
