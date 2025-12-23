"use client";

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { memo, useCallback } from "react";
import {
  CreditCard,
  Copy,
  ExternalLink,
  Link2,
  Zap,
  Shield,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

interface StripeTriggerDialogProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
}

const INSTRUCTIONS = [
  {
    step: 1,
    text: (
      <span>
        Open{" "}
        <Link
          href="https://dashboard.stripe.com/webhooks"
          target="_blank"
          className="text-violet-600 hover:underline font-medium"
        >
          Stripe Dashboard
        </Link>{" "}
        → Developers → Webhooks
      </span>
    ),
  },
  {
    step: 2,
    text: (
      <span>
        Click <strong>Add endpoint</strong> and paste the URL below
      </span>
    ),
  },
  {
    step: 3,
    text: <span>Select the events you want to listen to</span>,
  },
  {
    step: 4,
    text: (
      <span>
        Save and copy the <strong>signing secret</strong>
      </span>
    ),
  },
];

const COMMON_EVENTS = [
  "checkout.session.completed",
  "payment_intent.succeeded",
  "invoice.paid",
  "customer.subscription.created",
];

export const StripeTriggerDialog = memo(
  ({ open, setOpen }: StripeTriggerDialogProps) => {
    const params = useParams();
    const workflowId = params.workflowId as string;

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!baseUrl) {
      throw new Error(
        "NEXT_PUBLIC_APP_URL is not set. Required for webhook URLs."
      );
    }

    const webHookUrl = `${baseUrl}/api/webhooks/stripe?workflowId=${workflowId}`;

    const handleCopy = useCallback(async (text: string, label?: string) => {
      try {
        await navigator.clipboard.writeText(text);
        toast.success(label ? `${label} copied!` : "Copied to clipboard");
      } catch {
        toast.error("Failed to copy");
      }
    }, []);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPopup
          className="
            max-w-lg rounded-2xl border border-black/10 dark:border-white/10
            bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-2xl
            overflow-hidden
          "
        >
          {/* Header */}
          <DialogHeader className="px-6 pt-6 pb-3">
            <DialogTitle className="flex items-center gap-4">
              <div
                className="
                  flex size-12 shrink-0 items-center justify-center rounded-xl
                  bg-gradient-to-br from-violet-500 to-purple-600
                  shadow-lg shadow-violet-500/25
                "
              >
                <CreditCard className="size-6 text-white" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-lg font-bold">Stripe Webhook</span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  Trigger workflows on payment events
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-5 px-6 py-4">
            {/* Webhook URL */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Link2 className="size-4 text-violet-500" />
                <label className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  Endpoint URL
                </label>
              </div>
              <div
                className="
                  flex items-center gap-2 p-3 rounded-xl
                  bg-violet-50 dark:bg-violet-950/30
                  border border-violet-200 dark:border-violet-800/50
                "
              >
                <p className="flex-1 text-xs font-mono text-violet-700 dark:text-violet-300 truncate">
                  {webHookUrl}
                </p>
                <Button
                  size="sm"
                  className="shrink-0 h-8 px-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium shadow-md"
                  onClick={() => handleCopy(webHookUrl, "Webhook URL")}
                >
                  <Copy className="mr-1.5 size-3" />
                  Copy
                </Button>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                Setup Guide
              </label>
              <div className="space-y-2.5 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50">
                {INSTRUCTIONS.map((item) => (
                  <div key={item.step} className="flex gap-3 items-start group">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/50 text-[10px] font-bold text-violet-600 dark:text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                      {item.step}
                    </span>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed pt-0.5">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Events */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="size-4 text-amber-500" />
                <label className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  Common Events
                </label>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_EVENTS.map((event) => (
                  <button
                    key={event}
                    onClick={() => handleCopy(event, "Event")}
                    className="
                      px-2.5 py-1 rounded-md text-[10px] font-mono cursor-pointer
                      bg-neutral-100 dark:bg-neutral-800
                      hover:bg-violet-100 dark:hover:bg-violet-900/40
                      border border-neutral-200 dark:border-neutral-700
                      hover:border-violet-300 dark:hover:border-violet-700
                      text-neutral-600 dark:text-neutral-400
                      hover:text-violet-700 dark:hover:text-violet-300
                      transition-all
                    "
                  >
                    {event}
                  </button>
                ))}
              </div>
            </div>

            {/* Security Note */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40">
              <Shield className="size-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed">
                After creating the endpoint, copy the{" "}
                <strong>signing secret</strong> to verify webhook authenticity.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 bg-neutral-50/80 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800">
            <Link
              href="https://stripe.com/docs/webhooks"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-violet-600 transition-colors"
            >
              <ExternalLink className="size-3" />
              Stripe Docs
            </Link>
            <Button
              className="px-6 rounded-xl text-sm font-medium bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20"
              onClick={() => setOpen(false)}
            >
              Done
            </Button>
          </div>
        </DialogPopup>
      </Dialog>
    );
  }
);
