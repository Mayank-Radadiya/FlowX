/**
 * EditCredentialDialog Component
 * Dialog for editing credential name and API key.
 */

import { Eye, EyeOff, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface EditCredentialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editName: string;
  editValue: string;
  showValue: boolean;
  isUpdating: boolean;
  onNameChange: (value: string) => void;
  onValueChange: (value: string) => void;
  onToggleValue: () => void;
  onSave: () => void;
}

export function EditCredentialDialog({
  open,
  onOpenChange,
  editName,
  editValue,
  showValue,
  isUpdating,
  onNameChange,
  onValueChange,
  onToggleValue,
  onSave,
}: EditCredentialDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Edit Credential</DialogTitle>
          <DialogDescription>Update name or API key.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 px-6 py-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={editName}
              onChange={(e) => onNameChange(e.target.value)}
              className="h-11 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label>New API Key</Label>
            <div className="relative">
              <Input
                type={showValue ? "text" : "password"}
                value={editValue}
                onChange={(e) => onValueChange(e.target.value)}
                placeholder="Leave empty to keep current"
                className="h-11 rounded-xl pr-10 font-mono"
              />
              <button
                type="button"
                onClick={onToggleValue}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
              >
                {showValue ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onSave}
            disabled={isUpdating || !editName.trim()}
            className="bg-linear-to-r from-blue-500 to-cyan-600 text-white"
          >
            {isUpdating ? (
              <Loader2 className="size-4 animate-spin mr-2" />
            ) : (
              <Save className="size-4 mr-2" />
            )}
            Save
          </Button>
        </div>
      </DialogPopup>
    </Dialog>
  );
}
