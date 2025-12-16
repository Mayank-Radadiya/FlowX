"use client";

import { useAtomValue } from "jotai";
import { useUpdateWorkflowNodes } from "@/features/workflows/hooks/use-workflows";
import { editorAtom } from "@/features/editor/store/atom";

export function useEditorSave(workflowId: string) {
  const editor = useAtomValue(editorAtom);
  const mutation = useUpdateWorkflowNodes();

  const save = () => {
    if (!editor) return;

    mutation.mutate({
      id: workflowId,
      nodes: editor.getNodes(),
      edges: editor.getEdges(),
    });
  };

  return {
    save,
    canSave: Boolean(editor),
    isSaving: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
}
