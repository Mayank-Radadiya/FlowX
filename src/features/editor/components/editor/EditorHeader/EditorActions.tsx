import { ToggleButton } from "@/components/global/ToggleButton";
import { EditorSettings } from "./EditorSettings";
import { EditorSaveButton } from "./EditorSaveButton";

interface EditorActionsProps {
  workflowId: string;
}

export function EditorActions({ workflowId }: EditorActionsProps) {
  return (
    <>
      <ToggleButton className="size-7.5" />
      <EditorSettings workflowId={workflowId} />
      <div className="h-4 w-px bg-border" />
      <EditorSaveButton workflowId={workflowId} />
    </>
  );
}
