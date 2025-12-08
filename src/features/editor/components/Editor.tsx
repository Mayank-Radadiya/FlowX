"use client";

import { useSuspenseWorkflowById } from "@/features/workflows/hooks/use-workflows";
import { EditorHeader } from "./EditorHeader";
import FlowCanvas from "./reactFlow/Node";
interface EditorProps {
  workflowId: string;
}

const Editor = ({ workflowId }: EditorProps) => {
  const { data: workflow } = useSuspenseWorkflowById(workflowId);

  if (!workflow) {
    return null;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <EditorHeader workflowName={workflow.name} />

      {/* Editor Canvas */}
      <div className="flex-1 min-h-0 bg-neutral-50 dark:bg-neutral-950">
        {/* React Flow content */}
        <FlowCanvas nodes={workflow.nodes} edges={workflow.edges} />
      </div>
    </div>
  );
};

export default Editor;
