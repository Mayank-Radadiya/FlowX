/**
 * CreateWorkflowDialog Component
 * ------------------------------
 * Provides a modal dialog interface for creating a new workflow.
 *
 * Responsibilities:
 *  - Control dialog open/close state
 *  - Render a reusable trigger element for opening the dialog
 *  - Display a structured dialog with title, description, and form
 *  - Close the dialog automatically after successful workflow creation
 *
 * This component acts as a coordinator between the trigger UI
 * and the workflow creation form.
 */

"use client";

import {
  Dialog,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GitPullRequestArrow } from "lucide-react";
import { useState } from "react";
import { CreateWorkflowForm } from "./CreateWorkflowForm";
import { CreateWorkflowTrigger } from "./CreateWorkflowTrigger";

export function CreateWorkflowDialog({
  children,
  triggerClassName,
}: {
  children?: React.ReactNode;
  triggerClassName?: string;
}) {
  /**
   * Dialog open state
   * -----------------
   * Controls whether the dialog is visible.
   * This state is shared between the trigger and the dialog component.
   */
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger that opens the dialog */}
      <DialogTrigger>
        <CreateWorkflowTrigger className={triggerClassName}>
          {children}
        </CreateWorkflowTrigger>
      </DialogTrigger>

      {/* Dialog content */}
      <DialogPopup>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {/* Icon container */}
            <div className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-purple-600">
              <GitPullRequestArrow className="size-5 text-white" />
            </div>
            Create New Workflow
          </DialogTitle>

          {/* Short explanatory text */}
          <DialogDescription>
            Give your workflow a name and description to get started.
          </DialogDescription>
        </DialogHeader>

        {/* Workflow creation form */}
        <CreateWorkflowForm onDone={() => setOpen(false)} />
      </DialogPopup>
    </Dialog>
  );
}
