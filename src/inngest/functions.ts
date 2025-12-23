/**
 * This file exports all Inngest functions.
 * It keeps the server route clean and acts as a central registry for functions.
 */

import { NonRetriableError } from "inngest";
import { inngest } from "./client";
import { prisma } from "@/lib/db";
import { topologicalSort } from "./utils";
import { getNodeExecutor } from "@/features/execution/lib/executor-registry";
import { NodeType } from "@prisma/client";
import { httpRequestChannel } from "./channel/httpRequestChannel";
import { manualTriggerChannel } from "./channel/manualTriggerChannel";
import { googleFormTriggerChannel } from "./channel/googleFormChannel";
import { stripeTriggerChannel } from "./channel/stripeTrigger";

export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow", retries: 0 },
  {
    event: "workflow/execute.workflow",
    channels: [
      httpRequestChannel(),
      manualTriggerChannel(),
      googleFormTriggerChannel(),
      stripeTriggerChannel(),
    ],
  },
  async ({ event, step, publish }) => {
    const workflowId = event.data.workflowId;
    if (!workflowId) {
      throw new NonRetriableError("Workflow ID is missing");
    }

    const sortedNodesIds = await step.run("prepare-workflow", async () => {
      const workflow = await prisma.workflow.findFirstOrThrow({
        where: {
          id: workflowId,
        },
        include: {
          nodes: true,
          connections: true,
        },
      });

      return topologicalSort(workflow.nodes, workflow.connections);
    });

    // Initialize context from initial data form the trigger
    let context = event.data.initialData || {};

    for (const node of sortedNodesIds) {
      const executor = getNodeExecutor(node.type as NodeType);
      context = await executor({
        data: node.data as Record<string, unknown>,
        nodeId: node.id,
        context,
        step,
        publish,
      });
    }

    return { workflowId, result: context };
  }
);
