/**
 * DeleteCredentialDialog Component
 * Confirmation dialog for deleting a credential.
 */

import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface DeleteCredentialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  credentialName: string;
  isDeleting: boolean;
  onDelete: () => void;
}

export function DeleteCredentialDialog({
  open,
  onOpenChange,
  credentialName,
  isDeleting,
  onDelete,
}: DeleteCredentialDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle className="text-red-500">Delete Credential</DialogTitle>
          <DialogDescription>
            Delete "{credentialName}"? This cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onDelete}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {isDeleting ? (
              <Loader2 className="size-4 animate-spin mr-2" />
            ) : (
              <Trash2 className="size-4 mr-2" />
            )}
            Delete
          </Button>
        </div>
      </DialogPopup>
    </Dialog>
  );
}
