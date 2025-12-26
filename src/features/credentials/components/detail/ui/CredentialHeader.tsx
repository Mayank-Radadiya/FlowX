/**
 * CredentialHeader Component
 * Top navigation bar with back link and action buttons.
 */

import Link from "next/link";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CredentialHeaderProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function CredentialHeader({ onEdit, onDelete }: CredentialHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Link
        href="/credentials"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-white/50 hover:text-neutral-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="size-4" />
        Credentials
      </Link>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="text-neutral-600 dark:text-white/70 hover:bg-neutral-100 dark:hover:bg-white/10"
        >
          <Pencil className="size-4 mr-1.5" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}
