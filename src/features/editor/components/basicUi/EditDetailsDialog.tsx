"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useSuspenseWorkflowById,
  useUpdateWorkflowNameAndDescription,
} from "@/features/workflows/hooks/use-workflows";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface EditDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditDetailsDialog = memo(
  ({ open, onOpenChange }: EditDetailsDialogProps) => {
    const pathname = usePathname();
    const workflowId = pathname.split("/").pop() || "";

    const { data: workflow } = useSuspenseWorkflowById(workflowId);
    const updateMutation = useUpdateWorkflowNameAndDescription();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);

    // Sync when dialog opens
    useEffect(() => {
      if (open && workflow) {
        setName(workflow.name ?? "");
        setDescription(workflow.description ?? "");
      }
    }, [open, workflow]);

    // Auto focus
    useEffect(() => {
      if (open) {
        const t = setTimeout(() => inputRef.current?.focus(), 50);
        return () => clearTimeout(t);
      }
    }, [open]);

    const handleSave = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();

        if (
          name.trim() === "" ||
          (name === workflow?.name && description === workflow?.description)
        ) {
          onOpenChange(false);
          return;
        }

        try {
          await updateMutation.mutateAsync(
            {
              id: workflowId,
              name: name.trim(),
              description: description.trim(),
            },
            { onSuccess: () => onOpenChange(false) }
          );
        } catch (error) {
          // Error handling is done in the mutation hook
          setName(workflow?.name || "");
          setDescription(workflow?.description || "");
        }
      },
      [workflowId, name, description, updateMutation, onOpenChange]
    );

    const keyDownHandler = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSave(e);
        }
        if (e.key === "Escape") {
          e.preventDefault();
          onOpenChange(false);
        }
      },
      [handleSave, onOpenChange]
    );

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogPopup>
          <DialogHeader>
            <DialogTitle>Edit Workflow Details</DialogTitle>
            <DialogDescription>
              Update the name and description of your workflow.
            </DialogDescription>
          </DialogHeader>

          <form
            className="flex flex-col gap-4 px-6 pt-4"
            onKeyDown={keyDownHandler}
            onSubmit={handleSave}
          >
            {/* Name Field */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="workflow-name">Name</Label>
              <Input
                ref={inputRef}
                id="workflow-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter workflow name"
                autoComplete="off"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="workflow-description">Description</Label>
              <textarea
                id="workflow-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter workflow description (optional)"
                rows={3}
                className={cn(
                  "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none resize-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                )}
              />
            </div>
            <div className="w-full h-px bg-linear-to-r from-transparent via-black/30 to-transparent dark:via-white/30" />

            <DialogFooter variant="bare">
              <Button
                className=" hover:bg-red-400 hover:text-white"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="text-white"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <Loader2 className="animate-spin size-6" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogPopup>
      </Dialog>
    );
  }
);
