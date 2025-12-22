/**
 * This route exposes your Inngest functions to the Inngest cloud runtime.
 * It enables event delivery, scheduling, and local development sync.
 * Next.js runs this as an API endpoint that Inngest automatically hooks into.
 */

import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { executeWorkflow } from "@/inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [executeWorkflow],
});
