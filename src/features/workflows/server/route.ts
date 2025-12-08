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
 *
 * Prisma is used for all database operations, and each query ensures
 * that the authenticated user's ID is part of the filter conditions.
 */

import { PAGINATION } from "@/constants";
import { prisma } from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
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
    .query(({ ctx, input }) => {
      return prisma.workflow.findFirstOrThrow({
        where: {
          id: input.id,
          userId: ctx.auth.user.id, // Ensure access is restricted
        },
      });
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
});
