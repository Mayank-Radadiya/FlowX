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
import { geminiChannel } from "./channel/gemini";
import { openaiChannel } from "./channel/openai";
import { anthropicChannel } from "./channel/anthropic";

export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow", retries: 0 },
  {
    event: "workflow/execute.workflow",
    channels: [
      httpRequestChannel(),
      manualTriggerChannel(),
      googleFormTriggerChannel(),
      stripeTriggerChannel(),
      geminiChannel(),
      openaiChannel(),
      anthropicChannel(),
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

    const workflowExecution = await step.run("create-execution", async () => {
      // Fetch workflow name for the snapshot stored in the execution record
      const wf = await prisma.workflow.findUnique({
        where: { id: workflowId },
        select: { name: true },
      });
      return await prisma.workflowExecution.create({
        data: {
          workflowId: workflowId,
          status: "RUNNING",
          triggerType: event.data.triggerType ?? "MANUAL",
          workflowName: wf?.name ?? null,
        },
      });
    });

    let workflowFailed = false;

    for (const node of sortedNodesIds) {
      // Create log for the individual node
      const log = await step.run(`create-log-${node.id}`, async () => {
        return await prisma.executionLog.create({
          data: {
            executionId: workflowExecution.id,
            nodeId: node.id,
            // Snapshot node metadata so it survives node renaming / deletion
            nodeName: (node as any).name ?? null,
            nodeType: (node as any).type ?? null,
            status: "RUNNING",
            inputContext: context
              ? JSON.parse(JSON.stringify(context))
              : undefined,
          },
        });
      });

      try {
        const executor = getNodeExecutor(node.type as NodeType);
        context = await executor({
          data: node.data as Record<string, unknown>,
          nodeId: node.id,
          context,
          step,
          publish,
        });

        // Mark node as completed
        await step.run(`update-log-${node.id}-success`, async () => {
          await prisma.executionLog.update({
            where: { id: log.id },
            data: {
              status: "COMPLETED",
              outputContext: context
                ? JSON.parse(JSON.stringify(context))
                : undefined,
              completedAt: new Date(),
            },
          });
        });
      } catch (error) {
        workflowFailed = true;
        // Mark node as failed
        await step.run(`update-log-${node.id}-error`, async () => {
          await prisma.executionLog.update({
            where: { id: log.id },
            data: {
              status: "FAILED",
              error: error instanceof Error ? error.message : String(error),
              completedAt: new Date(),
            },
          });
        });
        break; // Stop executing further nodes on error
      }
    }

    // Finalize the workflow execution status
    await step.run("update-execution-status", async () => {
      await prisma.workflowExecution.update({
        where: { id: workflowExecution.id },
        data: {
          status: workflowFailed ? "FAILED" : "COMPLETED",
          completedAt: new Date(),
        },
      });
    });

    if (workflowFailed) {
      throw new Error(`Workflow execution failed for workflow ${workflowId}`);
    }

    return { workflowId, result: context, executionId: workflowExecution.id };
  },
);
