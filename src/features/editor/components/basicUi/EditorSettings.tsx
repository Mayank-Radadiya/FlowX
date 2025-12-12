"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Settings, FileText } from "lucide-react";
import { EditDetailsDialog } from "./EditDetailsDialog";
import { EditorDeleteButton } from "./EditorDeleteButton";

interface EditorSettingsProps {
  workflowId: string;
}

export function EditorSettings({ workflowId }: EditorSettingsProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleOpenDialog = () => {
    setMenuOpen(false);
    setDialogOpen(true);
  };

  // SSR placeholder
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon-sm"
        className="rounded-full size-8 border bg-accent/30"
      >
        <Settings className="size-4" />
      </Button>
    );
  }

  return (
    <>
      <div className="relative">
        <Button
          ref={buttonRef}
          variant="ghost"
          size="icon-sm"
          className="rounded-full size-8 border bg-accent/30"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Settings className="size-4" />
        </Button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute right-0 top-full mt-2 z-50 w-44 rounded-lg border bg-popover p-1 shadow-lg"
          >
            <button
              onClick={handleOpenDialog}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors"
            >
              <FileText className="size-4 text-muted-foreground" />
              Edit Details
            </button>

            <EditorDeleteButton workflowId={workflowId} />
          </div>
        )}
      </div>

      {/* Edit Details Dialog */}
      <EditDetailsDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
