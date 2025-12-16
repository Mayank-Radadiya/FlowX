import { ToggleButton } from "@/components/global/ToggleButton";
import { EditorSettings } from "./EditorSettings";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { EditorSaveButton } from "./EditorSaveButton";

interface EditorActionsProps {
  workflowId: string;
  onRun?: () => void;
}

export function EditorActions({ workflowId, onRun }: EditorActionsProps) {
  return (
    <>
      <ToggleButton className="size-7.5" />
      <EditorSettings workflowId={workflowId} />
      <div className="h-4 w-px bg-border" />
      <EditorSaveButton workflowId={workflowId} />
      <Button size="sm" onClick={onRun} className="text-white">
        <Play className="size-4 " />
        Run
      </Button>
    </>
  );
}
