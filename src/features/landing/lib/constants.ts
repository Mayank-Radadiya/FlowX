import {
  Workflow,
  Sparkles,
  Webhook,
  KeyRound,
  History,
  Zap,
} from "lucide-react";
import type {
  NavLink,
  Integration,
  Feature,
  Step,
  Plan,
  FAQ,
  FooterColumn,
  WorkflowNode,
} from "./types";

/* ── Navigation ─────────────────────────────────────────── */

export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

/* ── Integrations Marquee ───────────────────────────────── */

export const INTEGRATIONS: Integration[] = [
  { name: "OpenAI", src: "/image/openai.svg" },
  { name: "Anthropic", src: "/image/anthropic.svg" },
  { name: "Gemini", src: "/image/gemini.svg" },
  { name: "Stripe", src: "/image/stripe.svg" },
  { name: "Google", src: "/image/google.svg" },
  { name: "Google Forms", src: "/image/googleForm.svg" },
  { name: "Slack", src: "/image/slack.svg" },
  { name: "Discord", src: "/image/discord.svg" },
  { name: "GitHub", src: "/image/github.svg" },
];

/* ── Feature Cards ──────────────────────────────────────── */

export const FEATURES: Feature[] = [
  {
    icon: Workflow,
    title: "Visual Builder",
    description:
      "Drag-and-drop node canvas to design complex automations without writing a single line of code.",
    gradient: "from-violet-500/15 to-violet-600/5",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Nodes",
    description:
      "Plug OpenAI, Anthropic Claude, and Google Gemini directly into your workflows as first-class nodes.",
    gradient: "from-blue-500/15 to-blue-600/5",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Webhook,
    title: "Real-time Webhooks",
    description:
      "React to events from Stripe, Google Forms, and any HTTP source the moment they happen.",
    gradient: "from-emerald-500/15 to-emerald-600/5",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: KeyRound,
    title: "Credentials Vault",
    description:
      "Store and manage API keys securely with encrypted storage. Use them across all workflows.",
    gradient: "from-orange-500/15 to-orange-600/5",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: History,
    title: "Execution History",
    description:
      "Monitor every workflow run with detailed logs, status tracking, and error diagnostics.",
    gradient: "from-pink-500/15 to-pink-600/5",
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/10 border-pink-500/20",
  },
  {
    icon: Zap,
    title: "Instant Triggers",
    description:
      "Fire workflows manually, on a schedule, or in response to external events — all from one place.",
    gradient: "from-yellow-500/15 to-yellow-600/5",
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-500/10 border-yellow-500/20",
  },
];

/* ── How It Works Steps ─────────────────────────────────── */

export const STEPS: Step[] = [
  {
    number: "01",
    title: "Build your workflow",
    description:
      "Open the visual editor and drag nodes onto the canvas. Connect triggers to actions in seconds.",
    icon: Workflow,
  },
  {
    number: "02",
    title: "Connect your apps",
    description:
      "Add your API credentials once and use them across every workflow. Secure, encrypted, always ready.",
    icon: KeyRound,
  },
  {
    number: "03",
    title: "Automate & monitor",
    description:
      "Activate your workflow and watch executions happen in real-time. Full logs and history always available.",
    icon: Zap,
  },
];

/* ── Pricing Plans ──────────────────────────────────────── */

export const PLANS: Plan[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for individuals and side projects.",
    highlighted: false,
    features: [
      "Up to 5 workflows",
      "100 executions / month",
      "3 integrations",
      "Community support",
      "Execution history (7 days)",
      "1 API credential",
    ],
    cta: "Get Started",
    ctaHref: "/sign-up",
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "For teams and power users who automate at scale.",
    highlighted: true,
    badge: "Most Popular",
    features: [
      "Unlimited workflows",
      "Unlimited executions",
      "All integrations (AI + webhooks)",
      "Priority support",
      "Execution history (90 days)",
      "Unlimited API credentials",
    ],
    cta: "Upgrade to Pro",
    ctaHref: "/sign-up",
  },
];

/* ── FAQ ────────────────────────────────────────────────── */

export const FAQS: FAQ[] = [
  {
    q: "What is FlowX?",
    a: "FlowX is a visual workflow automation platform that lets you connect apps, trigger actions, and run AI models — all without writing code. Think of it as your personal automation engine.",
  },
  {
    q: "Is FlowX free to use?",
    a: "Yes. The free plan lets you create up to 5 workflows and run 100 executions per month at no cost. Upgrade to Pro when you need unlimited capacity.",
  },
  {
    q: "Which AI models are supported?",
    a: "FlowX has native nodes for OpenAI (GPT-4o, GPT-4), Anthropic (Claude 3.5 Sonnet, Claude 3 Opus), and Google (Gemini 1.5 Pro, Gemini Flash). You bring your own API keys.",
  },
  {
    q: "Can I use my own API keys?",
    a: "Absolutely. FlowX's Credentials Vault lets you securely store and manage your own API keys for any service. Your keys are encrypted at rest and never shared.",
  },
  {
    q: "How do webhook triggers work?",
    a: "FlowX gives each workflow a unique webhook URL. When an external service (like Stripe) sends an event to that URL, your workflow fires automatically — no polling required.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. All credentials are encrypted, all data is transmitted over TLS, and we never store the actual content of your API responses. You can also self-host FlowX for full data control.",
  },
];

/* ── Footer ─────────────────────────────────────────────── */

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "App",
    links: [
      { label: "Sign In", href: "/sign-in" },
      { label: "Get Started", href: "/sign-up" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Workflows", href: "/workflow" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/legal/terms-of-service" },
      { label: "Privacy Policy", href: "/legal/privacy-policy" },
    ],
  },
];

/* ── Workflow Mockup Nodes (Hero Visual) ────────────────── */

export const WORKFLOW_NODES: WorkflowNode[] = [
  {
    id: "trigger",
    label: "Stripe Trigger",
    subtitle: "Payment received",
    icon: "/image/stripe.svg",
    color: "from-violet-500/20 to-violet-600/10",
    border: "border-violet-500/30",
    dot: "bg-green-400",
    delay: 0,
  },
  {
    id: "ai",
    label: "OpenAI GPT-4",
    subtitle: "Generate invoice",
    icon: "/image/openai.svg",
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/30",
    dot: "bg-blue-400",
    delay: 0.15,
  },
  {
    id: "http",
    label: "HTTP Request",
    subtitle: "Send to CRM",
    icon: "/icons/http.svg",
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
    delay: 0.3,
  },
];
