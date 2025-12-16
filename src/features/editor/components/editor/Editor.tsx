"use client";

import { useSuspenseWorkflowById } from "@/features/workflows/hooks/use-workflows";
import EditorShell from "./EditorShell";

interface EditorProps {
  workflowId: string;
}

function Editor({ workflowId }: EditorProps) {
  const { data: workflow } = useSuspenseWorkflowById(workflowId);

  if (!workflow) return null;

  return <EditorShell workflowId={workflowId} workflow={workflow} />;
}

export default Editor;
