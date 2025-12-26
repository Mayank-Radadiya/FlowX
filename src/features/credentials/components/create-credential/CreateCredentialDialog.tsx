/**
 * CreateCredentialDialog Component
 * --------------------------------
 * Provides a modal dialog interface for creating a new credential.
 *
 * Responsibilities:
 * - Control dialog open/close state
 * - Render a reusable trigger element
 * - Display structured dialog with form
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
import { KeyRound } from "lucide-react";
import { useState } from "react";
import { CreateCredentialForm } from "./CreateCredentialForm";
import { CreateCredentialTrigger } from "./CreateCredentialTrigger";

export function CreateCredentialDialog({
  children,
  triggerClassName,
}: {
  children?: React.ReactNode;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <CreateCredentialTrigger className={triggerClassName}>
          {children}
        </CreateCredentialTrigger>
      </DialogTrigger>

      <DialogPopup>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {/* Icon container with blue gradient */}
            <div className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-cyan-600">
              <KeyRound className="size-5 text-white" />
            </div>
            Add New Credential
          </DialogTitle>

          <DialogDescription>
            Securely store API keys for your AI providers.
          </DialogDescription>
        </DialogHeader>

        <CreateCredentialForm onDone={() => setOpen(false)} />
      </DialogPopup>
    </Dialog>
  );
}
