/**
 * This file exports all Inngest functions.
 * It keeps the server route clean and acts as a central registry for functions.
 */

import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "10s");
    return { message: `Hello ${event.data.email}!` };
  }
);
