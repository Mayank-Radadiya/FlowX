"use client";

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { memo } from "react";
import { MousePointer2 } from "lucide-react";

interface ManualTriggerDialogProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
}

export const ManualTriggerDialog = memo(
  ({ open, setOpen }: ManualTriggerDialogProps) => {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPopup
          className="
          max-w-md rounded-2xl border border-black/10 dark:border-white/10
          bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-xl
        "
        >
          {/* Header */}
          <DialogHeader className="space-y-3">
            <DialogTitle className="flex items-center gap-3">
              <div
                className="
                  flex size-12 items-center justify-center rounded-xl
                  bg-linear-to-br from-primary to-primary/70
                  shadow-md shadow-primary/30
                "
              >
                <MousePointer2 className="size-6 text-white" />
              </div>

              <div className="flex flex-col">
                <span className="text-base font-semibold">Manual Trigger</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  Configure the manual trigger node
                </span>
              </div>
            </DialogTitle>

            <DialogDescription
              className="
              text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed
            "
            >
              The manual trigger is used to start the workflow manually.
            </DialogDescription>

            <DialogDescription
              className="
              text-lg font-mono  text-neutral-600 dark:text-neutral-400 leading-relaxed
            "
            >
              Configuration is not required for this node.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 px-6 py-4">
            {/* Footer */}
            <div
              className="
              mt-2 flex justify-end gap-3 pt-2
              border-black/5 dark:border-white/10
            "
            >
              <Button
                className="
                  rounded-xl bg-linear-to-r from-primary to-primary/80
                  text-white hover:from-primary/90 hover:to-primary/70
                  transition-all shadow-md shadow-primary/30
                "
              >
                Close
              </Button>
            </div>
          </div>
        </DialogPopup>
      </Dialog>
    );
  }
);
