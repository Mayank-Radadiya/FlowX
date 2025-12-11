"use client";

import { useSuspenseWorkflowById } from "@/features/workflows/hooks/use-workflows";
import { EditorHeader } from "./EditorHeader";
import WorkflowNodeCanvas from "./reactFlow/WorkflowNodeCanvas";
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
      <EditorHeader workflowName={workflow.name} workflowId={workflowId} />

      {/* Editor Canvas */}
      <div className="flex-1 min-h-0 bg-neutral-50 dark:bg-neutral-950">
        {/* React Flow content */}
        <WorkflowNodeCanvas nodes={workflow.nodes} edges={workflow.edges} />
      </div>
    </div>
  );
};

export default Editor;
