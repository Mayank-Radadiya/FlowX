/**
 * NODE_CATEGORIES
 * ----------------
 * Defines the available node categories and their node options
 * for the workflow editor’s node catalog.
 *
 * This file is purely **configuration-driven**:
 * - No UI logic
 * - No editor state
 * - No side effects
 *
 * Its role is to act as a **single source of truth** for:
 * - How nodes are grouped (categories)
 * - How they are labeled and described
 * - Which Prisma NodeType they map to
 * - Which icon is shown in the UI
 */

import { NodeType } from "@prisma/client";
import {
  GlobeIcon,
  MousePointer,
  Workflow,
  Zap,
  CardSim,
  FileCheck,
  BadgeDollarSign,
  Strikethrough,
  BrainCircuit,
  Bot,
  BotMessageSquare,
  Activity,
} from "lucide-react";

/**
 * NODE_CATEGORIES structure
 * ------------------------
 * Each category represents a logical group of nodes
 * displayed inside the NodeCatalog UI.
 *
 * Category fields:
 * - id: Stable identifier (used as React key / filtering)
 * - label: Display name shown in the UI
 * - description: Short helper text under the label
 * - icon: Category-level icon
 * - nodes: List of node definitions belonging to this category
 *
 * Node fields:
 * - type: Prisma-backed NodeType (used by editor + backend)
 * - label: Human-readable name
 * - description: Short explanation of the node’s purpose
 * - icon: Icon rendered in the node picker
 */
export const NODE_CATEGORIES = [
  {
    id: "triggers",
    label: "Triggers",
    description: "Start your workflow",
    icon: Zap,
    nodes: [
      {
        /**
         * Manual Trigger Node
         * -------------------
         * Entry point for workflows that are started explicitly
         * by the user (e.g., clicking a button).
         */
        type: NodeType.MANUAL_TRIGGER,
        label: "Manual Trigger",
        description: "Start the flow manually",
        icon: MousePointer,
      },
    ],
  },
  {
    id: "actions",
    label: "Actions",
    description: "Perform operations",
    icon: Activity,
    nodes: [
      {
        /**
         * HTTP Request Node
         * -----------------
         * Allows workflows to interact with external services
         * by making REST / API calls.
         */
        type: NodeType.HTTP_REQUEST,
        label: "HTTP Request",
        description: "Make API calls",
        icon: GlobeIcon,
      },
    ],
  },
  {
    id: "google-form",
    label: "Form ",
    description: "connect with google form",
    icon: CardSim,
    nodes: [
      {
        type: NodeType.GOOGLE_FORM_TRIGGER,
        label: "Google Form",
        description: "Run flow when form is submitted",
        icon: FileCheck,
      },
    ],
  },
  {
    id: "stripe-trigger",
    label: "Stripe Trigger",
    description: "connect with stripe",
    icon: Strikethrough,
    nodes: [
      {
        type: NodeType.STRIPE_TRIGGER,
        label: "Stripe Trigger",
        description: "Run flow when stripe event is received",
        icon: BadgeDollarSign,
      },
    ],
  },
  {
    id: "gemini",
    label: "Google Gemini",
    description: "Run prompts using Google Gemini models",
    icon: BrainCircuit,
    nodes: [
      {
        type: NodeType.GEMINI,
        label: "Gemini",
        description: "Generate text and reasoning using Google’s Gemini models",
        image: "/image/gemini.svg",
      },
    ],
  },
  {
    id: "open-ai",
    label: "OpenAI",
    description: "Run prompts using OpenAI GPT models",
    icon: Bot,
    nodes: [
      {
        type: NodeType.OPENAI,
        label: "OpenAI",
        description:
          "Generate text, code, and structured output using OpenAI models",
        image: "/image/openai.svg",
      },
    ],
  },
  {
    id: "anthropic",
    label: "Anthropic",
    description: "Run prompts using Anthropic Claude models",
    icon: BotMessageSquare,
    nodes: [
      {
        type: NodeType.ANTHROPIC,
        label: "Anthropic",
        description:
          "Generate safe and reliable AI responses using Claude models",
        image: "/image/anthropic.svg",
      },
    ],
  },
];
