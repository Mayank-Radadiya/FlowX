/**
 * This file exports all Inngest functions.
 * It keeps the server route clean and acts as a central registry for functions.
 */

import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const google = createGoogleGenerativeAI();

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap("gemini-generate-text", generateText, {
      model: google("gemini-2.5-flash"),
      system: "You are a helpful assistant. ",
      prompt: "what is the future of AI?",
    });

    return { steps };
  }
);
