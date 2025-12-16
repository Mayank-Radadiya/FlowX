"use client";

import EditorHeader from "./EditorHeader/EditorHeader";
import EditorCanvas from "./EditorCanvas";

interface EditorShellProps {
  workflowId: string;
  workflow: {
    id: string;
    name: string;
    nodes: any[];
    edges: any[];
  };
}

const EditorShell = ({ workflowId, workflow }: EditorShellProps) => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <EditorHeader workflowId={workflowId} workflowName={workflow.name} />

      <div className="flex-1 min-h-0 bg-neutral-50 dark:bg-neutral-950">
        <EditorCanvas nodes={workflow.nodes} edges={workflow.edges} />
      </div>
    </div>
  );
};

export default EditorShell;
