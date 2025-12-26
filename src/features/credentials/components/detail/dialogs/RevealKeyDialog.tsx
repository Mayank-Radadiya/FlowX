/**
 * RevealKeyDialog Component
 * Confirmation dialog before revealing API key.
 */

import { AlertTriangle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRevealSecret } from "../hooks/useRevealSecret";

interface RevealKeyDialogProps {
  credentialId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RevealKeyDialog({
  credentialId,
  open,
  onOpenChange,
}: RevealKeyDialogProps) {
  const { reveal } = useRevealSecret(credentialId);

  const handleReveal = () => {
    reveal();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-amber-500" />
            Reveal API Key?
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to reveal this API key? Make sure no one is
            watching your screen.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleReveal}
            className="bg-amber-500 hover:bg-amber-600 text-white"
          >
            <Eye className="size-4 mr-2" />
            Reveal Key
          </Button>
        </div>
      </DialogPopup>
    </Dialog>
  );
}
