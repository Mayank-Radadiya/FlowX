"use client";

import { Button } from "@/components/ui/button";
import { Play, Save } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { EditorSettings } from "./basicUi/EditorSettings";
import { ToggleButton } from "@/components/global/ToggleButton";
import { EditorSaveButton } from "./basicUi/EditorSaveButton";

interface EditorHeaderProps {
  workflowName: string;
  onRun?: () => void;
  onUpdateDetails?: () => void;
  workflowId: string;
}

export function EditorHeader({
  workflowName,
  onRun,
  workflowId,
}: EditorHeaderProps) {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b bg-background/80 px-3">
      {/* Left - Back & Name */}
      <div className="flex items-center gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <BreadcrumbEllipsis />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href="/workflow">Workflows</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{workflowName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-1.5">
        <ToggleButton />
        <EditorSettings />
        <div className="h-4 w-px bg-border" />
        <EditorSaveButton workflowId={workflowId} />
        <Button size="sm" onClick={onRun} className="text-white">
          <Play className="size-4 " />
          Run
        </Button>
      </div>
    </header>
  );
}

export default EditorHeader;
