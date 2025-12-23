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
import { FileSpreadsheet, Copy, ExternalLink, Code2 } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { generateGoogleFormScript } from "./utils/googleWebhookScript";
import toast from "react-hot-toast";

interface GoogleFormDialogProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
}

const INSTRUCTIONS = [
  {
    step: 1,
    text: (
      <span>
        Open Google Form → Click <strong>⋮</strong> (3 dots) →{" "}
        <strong>Apps Script</strong>
      </span>
    ),
  },
  {
    step: 2,
    text: (
      <span>
        Delete existing code and paste the <strong>Generated Script</strong>{" "}
        below
      </span>
    ),
  },
  {
    step: 3,
    text: (
      <span>
        Save and go to <strong>Triggers</strong> (alarm icon) →{" "}
        <strong>Add Trigger</strong>
      </span>
    ),
  },
  {
    step: 4,
    text: (
      <span>
        Select <strong>onFormSubmit</strong> → Event type:{" "}
        <strong>On form submit</strong>
      </span>
    ),
  },
];

export const GoogleFormDialog = memo(
  ({ open, setOpen }: GoogleFormDialogProps) => {
    const params = useParams();
    const workflowId = params.workflowId as string;

    // 🔐 Webhook base URL must be public
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!baseUrl) {
      throw new Error(
        "NEXT_PUBLIC_APP_URL is not set. Required for webhook URLs."
      );
    }

    const webHookUrl = `${baseUrl}/api/webhooks/google-form?workflowId=${workflowId}`;

    const handleCopy = useCallback(async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
      } catch {
        toast.error("Failed to copy");
      }
    }, []);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPopup
          className="
          max-w-xl rounded-2xl border border-black/10 dark:border-white/10
          bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-2xl
          overflow-hidden
        "
        >
          {/* Header */}
          <DialogHeader className="px-6 pt-6 pb-2 space-y-4">
            <DialogTitle className="flex items-center gap-4">
              <div
                className="
                  flex size-14 shrink-0 items-center justify-center rounded-2xl
                  bg-linear-to-br from-green-500 to-emerald-600
                  shadow-lg shadow-green-500/20 ring-1 ring-black/5 dark:ring-white/10
                "
              >
                <FileSpreadsheet className="size-7 text-white" />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xl font-bold tracking-tight">
                  Google Form Trigger
                </span>
                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  Connect forms to your workflow instantly
                </span>
              </div>
            </DialogTitle>

            <DialogDescription className="text-neutral-600 dark:text-neutral-400">
              Listen for form submissions in real-time. We&apos;ve generated a
              custom script for you to paste into Google Forms.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-6 px-6 py-4">
            {/* Script Generation Section (Primary Action) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <Code2 className="size-4 text-primary" />
                  Generated Apps Script
                </label>
              </div>

              <div className="relative group rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50 overflow-hidden">
                <div className="absolute right-2 bottom-2 z-10">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 bg-white dark:bg-neutral-950 text-xs font-medium shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-300 dark:hover:border-neutral-700 hover:scale-105 transition-all duration-200"
                    onClick={() =>
                      handleCopy(generateGoogleFormScript(webHookUrl))
                    }
                  >
                    <Copy className="mr-2 size-3.5 text-neutral-500" />
                    Copy Script
                  </Button>
                </div>
                <div className="p-4 pr-24 font-mono text-[10px] leading-relaxed text-neutral-500 dark:text-neutral-400 overflow-hidden h-[80px] select-none bg-grid-black/[0.02] dark:bg-grid-white/[0.02]">
                  <div className="opacity-50 blur-[0.1px]">
                    {`function onFormSubmit(e) {
                          var formResponse = e.response;
                          var itemResponses = formResponse.getItemResponses();
                          // ... (Full script hidden)
                        }`}
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 px-1">
                This script automatically includes your unique webhook URL and
                payload formatting logic.
              </p>
            </div>

            {/* Instructions Section */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Quick Setup Guide
              </label>
              <div className="grid gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/50 mt-2">
                {INSTRUCTIONS.map((item) => (
                  <div key={item.step} className="flex gap-3 items-start group">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-400 group-hover:bg-primary group-hover:text-white transition-colors mt-0.5">
                      {item.step}
                    </span>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-normal">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Webhook URL (Secondary) */}
            <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => handleCopy(webHookUrl)}
                className="flex w-full items-center justify-between gap-2 py-2 group cursor-pointer"
              >
                <span className="text-xs font-medium text-neutral-500 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors">
                  Only need the Webhook URL?
                </span>
                <div className="flex items-center gap-1.5 text-xs text-primary font-medium opacity-80 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 bg-neutral-50/50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800">
            <Link
              href="https://developers.google.com/apps-script/guides/triggers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-primary transition-colors pl-2"
            >
              <ExternalLink className="size-3" />
              Documentation
            </Link>

            <Button
              className="px-8 rounded-xl font-medium shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all text-white"
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
