/**
 * TRPC router that handles all workflow-related operations.
 * All procedures here are protected, meaning each request must come
 * from an authenticated user. This ensures every workflow is tied to
 * the correct user and prevents unauthorized access or modifications.
 *
 * The router supports:
 *  - Creating workflows
 *  - Renaming workflows
 *  - Deleting workflows
 *  - Fetching a single workflow
 *  - Paginated fetching of multiple workflows with search support
 *  - Updating workflow nodes and connections by saving the entire graph data
 *
 * Prisma is used for all database operations, and each query ensures
 * that the authenticated user's ID is part of the filter conditions.
 */

import { PAGINATION } from "@/constants";
import { prisma } from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { NodeType } from "@prisma/client";
import type { Node, Edge } from "@xyflow/react";
import { generateSlug } from "random-word-slugs";
import z from "zod";

export const workflowRouter = createTRPCRouter({
  // Create a new workflow for the authenticated user
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        description: z.string().optional().default("This workflow is about..."),
      })
    )
    .mutation(({ ctx, input }) => {
      return prisma.workflow.create({
        data: {
          name: input.name || generateSlug(3), // Auto-generate a readable name if not provided
          userId: ctx.auth.user.id, // Ensure workflow belongs to the logged-in user
          description: input.description,
          nodes: {
            create: {
              type: NodeType.INITIAL,
              position: { x: 0, y: 0 },
              name: NodeType.INITIAL,
            },
          },
        },
      });
    }),

  // Delete a workflow if it belongs to the authenticated user
  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return prisma.workflow.delete({
        where: {
          id: input.id,
          userId: ctx.auth.user.id, // Authorization check
        },
      });
    }),

  // Update workflow name and description (only allowed for owner)
  updateNameAndDescription: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      //  update and return the workflow
      return prisma.workflow.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  // Retrieve a single workflow owned by the user
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const workflow = await prisma.workflow.findFirstOrThrow({
        where: {
          id: input.id,
          userId: ctx.auth.user.id, // Ensure access is restricted
        },
        include: {
          nodes: true,
          connections: true,
        },
      });

      const nodes: Node[] = workflow.nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position as { x: number; y: number },
        data: (node.data as Record<string, unknown>) || {},
      }));

      const edges: Edge[] = workflow.connections.map((conn) => ({
        id: conn.id,
        source: conn.formNodeId,
        target: conn.toNodeId,
        sourceHandle: conn.fromOutput,
        targetHandle: conn.toInput,
      }));

      return {
        id: workflow.id,
        name: workflow.name,
        description: workflow.description,
        nodes,
        edges,
      };
    }),

  // Paginated list of workflows with optional search
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(PAGINATION.MIN_PAGE)
          .max(PAGINATION.MAX_PAGE)
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;

      // Query workflows + total count in parallel for performance
      const [items, totalCount] = await Promise.all([
        prisma.workflow.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,

          where: {
            userId: ctx.auth.user.id, // Only fetch user-owned workflows
            name: {
              contains: search, // Support searching by name
              mode: "insensitive",
            },
          },
          orderBy: {
            updatedAt: "desc", // Most recently updated first
          },
        }),

        prisma.workflow.count({
          where: {
            userId: ctx.auth.user.id,
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        }),
      ]);

      // Pagination helpers
      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      return {
        items,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      };
    }),

  /**
   * updateWorkflowNodes Procedure
   * --------------------------
   * Saves the entire workflow graph structure:
   *   - Nodes (positions, types, metadata)
   *   - Edges (connections between nodes)
   *
   * This procedure replaces ALL existing nodes and edges for a workflow
   * with the newly submitted ones. This ensures the database always
   * reflects the latest full graph state from the client.
   *
   * Core Operations:
   *   1. Validate user access to workflow
   *   2. Remove all old nodes & edges
   *   3. Insert new nodes
   *   4. Insert new edges
   *
   * Everything runs inside a Prisma transaction for:
   *   - Atomicity (either everything saves, or nothing saves)
   *   - Data consistency across nodes/edges relations
   */

  //  Save Node and Connection Data
  updateWorkflowNodes: protectedProcedure
    .input(
      z.object({
        id: z.string(), // workflow ID
        nodes: z.array(
          z.object({
            id: z.string(),
            type: z.string().nullish(),
            position: z.object({
              x: z.number(),
              y: z.number(),
            }),
            data: z.record(z.string(), z.any()).optional(), // node-specific metadata
          })
        ),
        edges: z.array(
          z.object({
            source: z.string(), // from node
            target: z.string(), // to node
            sourceHandle: z.string().nullish(), // output handle
            targetHandle: z.string().nullish(), // input handle
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, nodes, edges } = input;

      /**
       * Step 1: Validate workflow ownership
       * -----------------------------------
       * Ensure the workflow exists AND belongs to the authenticated user.
       * If not found → throws automatically.
       */
      const workflow = await prisma.workflow.findFirstOrThrow({
        where: {
          id,
          userId: ctx.auth.user.id,
        },
      });

      /**
       * Step 2: Begin transaction
       * -------------------------
       * Ensures:
       *  - Old nodes & edges are removed
       *  - New nodes & edges inserted
       *  - If ANY part fails → rollback entire workflow update
       */
      return prisma.$transaction(async (tx) => {
        // Delete all existing nodes & connections for this workflow
        await tx.node.deleteMany({
          where: { workflowId: workflow.id },
        });

        /**
         * Step 3: Create new nodes
         * ------------------------
         * Node fields stored:
         *   - id (ReactFlow ID)
         *   - workflowId (FK)
         *   - type (node category)
         *   - position (x, y)
         *   - data (custom metadata)
         *
         * If no type is provided → fallback to "UNNAMED".
         */
        await tx.node.createMany({
          data: nodes.map((n) => ({
            id: n.id,
            workflowId: workflow.id,
            name: n.type || "UNNAMED",
            type: n.type as NodeType,
            position: n.position,
            data: n.data || {},
          })),
        });

        /**
         * Step 4: Create new connections (edges)
         * --------------------------------------
         * Edge fields stored:
         *   - Composite ID: "source-target"
         *   - workflowId
         *   - formNodeId (source)
         *   - toNodeId (target)
         *   - handle names (output/input)
         *
         * If handles are missing → defaults to "main".
         */
        await tx.connection.createMany({
          data: edges.map((e) => ({
            workflowId: workflow.id,
            formNodeId: e.source,
            toNodeId: e.target,
            fromOutput: e.sourceHandle || "main",
            toInput: e.targetHandle || "main",
          })),
        });

        // Return workflow info after saving graph state
        return workflow;
      });
    }),
});
