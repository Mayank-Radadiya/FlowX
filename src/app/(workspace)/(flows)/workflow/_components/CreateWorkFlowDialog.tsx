"use client";
/*
 This Component renders a dialog to create a new workflow.
 It includes:
  - A trigger button to open the dialog
  - Dialog content with title, description, and create/cancel buttons
  - Form fields for workflow name and description
  - Uses useCreateWorkflow hook to handle creation logic
  - Shows loading state while creating
 */
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FileText,
  GitPullRequestArrow,
  Loader2,
  Sparkles,
  Type,
} from "lucide-react";
import { useRef, useState } from "react";
import { useCreateWorkflow } from "@/features/workflows/hooks/use-workflows";
import { cn } from "@/lib/utils";

interface CreateWorkFlowDialogProps {
  children?: React.ReactNode;
  triggerClassName?: string;
}

const CreateWorkFlowDialog = ({
  children,
  triggerClassName,
}: CreateWorkFlowDialogProps) => {
  const [open, setOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  /**
   * createWorkflow Mutation
   * -----------------------
   * - Creates a new workflow with name and description
   * - Redirects user to the workflow page after creation
   * - Invalidates workflow list cache
   * - Shows success/error toast
   */
  const { mutate: createWorkflow, isPending } = useCreateWorkflow();

  const handleCreate = () => {
    createWorkflow(
      {
        name: nameRef.current?.value.trim() || undefined,
        description: descriptionRef.current?.value.trim() || undefined,
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset form when dialog closes
      if (nameRef.current) nameRef.current.value = "";
      if (descriptionRef.current) descriptionRef.current.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreate();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        className={cn(
          triggerClassName ||
            "inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-500 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-violet-600 hover:to-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        )}
      >
        {children ? (
          children
        ) : (
          <>
            <Sparkles className="size-4" />
            Create Workflow
          </>
        )}
      </DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-purple-600 shadow-lg">
              <GitPullRequestArrow className="size-5 text-white" />
            </div>
            <span>Create New Workflow</span>
          </DialogTitle>
          <DialogDescription>
            Give your workflow a name and description to get started. Leave
            empty for an auto-generated name.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreate} onKeyDown={handleKeyDown}>
          <div className="space-y-4 px-6 py-4">
            {/* Name Field */}
            <div className="space-y-2">
              <Label
                htmlFor="workflow-name"
                className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-white/80"
              >
                <Type className="size-3.5" />
                Workflow Name
                <span className="text-xs font-normal text-neutral-400 dark:text-white/40">
                  (optional)
                </span>
              </Label>
              <div className="relative">
                <Input
                  id="workflow-name"
                  ref={nameRef}
                  placeholder="My awesome workflow..."
                  disabled={isPending}
                  className={cn(
                    "h-11 rounded-xl border-black/10 dark:border-white/10",
                    "bg-black/2 dark:bg-white/5",
                    "placeholder:text-neutral-400 dark:placeholder:text-white/30",
                    "focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20",
                    "transition-all duration-200"
                  )}
                />
              </div>
              <p className="text-xs text-neutral-500 dark:text-white/40">
                A creative name will be auto-generated if left empty
              </p>
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label
                htmlFor="workflow-description"
                className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-white/80"
              >
                <FileText className="size-3.5" />
                Description
                <span className="text-xs font-normal text-neutral-400 dark:text-white/40">
                  (optional)
                </span>
              </Label>
              <div className="relative">
                <textarea
                  id="workflow-description"
                  ref={descriptionRef}
                  placeholder="Describe what this workflow does..."
                  disabled={isPending}
                  rows={3}
                  className={cn(
                    "flex w-full rounded-xl border px-3 py-2.5 text-sm",
                    "border-black/10 dark:border-white/10",
                    "bg-black/2 dark:bg-white/5",
                    "text-neutral-900 dark:text-white",
                    "placeholder:text-neutral-400 dark:placeholder:text-white/30",
                    "focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none",
                    "transition-all duration-200 resize-none",
                    "disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                />
              </div>
              <p className="text-xs text-neutral-500 dark:text-white/40">
                Help others understand the purpose of this workflow
              </p>
            </div>
          </div>

          <DialogFooter>
            <DialogClose
              disabled={isPending}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
            >
              Cancel
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending}
              className="h-10 rounded-xl bg-linear-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-violet-500/25"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 size-4" />
                  Create Workflow
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  );
};

export default CreateWorkFlowDialog;
