/**
 * Inngest client initializes your app’s connection to Inngest.
 * This file defines your application ID and acts as the entry point
 * for all functions and event triggers. It stays stable and is imported
 * across all server-side Inngest logic.
 */

import { Inngest } from "inngest";
import { realtimeMiddleware } from "@inngest/realtime/middleware";

export const inngest = new Inngest({
  id: "FlowX", // change to your project/app name
  middleware: [realtimeMiddleware()],
});
