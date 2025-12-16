"use client";

import { Settings, FileText } from "lucide-react";
import { EditDetailsDialog } from "../../ui/EditDetailsDialog";
import { EditorDeleteButton } from "./EditorDeleteButton";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/menu";

interface EditorSettingsProps {
  workflowId: string;
}

export function EditorSettings({ workflowId }: EditorSettingsProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="size-8 rounded-full border bg-accent/30 items-center justify-center flex hover:bg-accent/50 border-border">
          <Settings className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem
            onClick={() => setEditOpen(true)}
            className="px-3 py-2"
          >
            <FileText className="mr-2 size-4 text-muted-foreground" />
            Edit Details
          </DropdownMenuItem>

          <EditorDeleteButton workflowId={workflowId} />
        </DropdownMenuContent>
      </DropdownMenu>

      <EditDetailsDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        workflowId={workflowId}
      />
    </>
  );
}
