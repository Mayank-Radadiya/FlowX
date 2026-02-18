/**
 * GeminiNode Component
 * --------------------
 * React Flow node component for the Gemini AI integration.
 * Handles node configuration and dialog state management.
 */

"use client";

import { type NodeProps, type Node, useReactFlow } from "@xyflow/react";
import { useMemo, useState } from "react";
import BaseGeminiNode from "./BaseGeminiNode";
import { GeminiDialog } from "./dialog";
import { DEFAULT_MODEL, GeminiModel } from "./dialog/gemini.constants";
import { GeminiFormValues } from "./dialog/gemini.schema";

type GeminiNodeData = {
  variableName?: string;
  model?: GeminiModel;
  systemPrompt?: string;
  userPrompt?: string;
  credentialId?: string;
};

type GeminiNodeProps = Node<GeminiNodeData>;

const GeminiNode = (props: NodeProps<GeminiNodeProps>) => {
  const [open, setOpen] = useState(false);
  const nodeData = props.data as GeminiNodeData;
  const { setNodes } = useReactFlow();

  // Generate description from configuration
  const description = useMemo(() => {
    if (!nodeData.userPrompt) return "Not configured";

    const model = nodeData.model || DEFAULT_MODEL;
    const promptPreview =
      nodeData.userPrompt.length > 40
        ? `${nodeData.userPrompt.slice(0, 40)}...`
        : nodeData.userPrompt;

    return `${model} • ${promptPreview}`;
  }, [nodeData.model, nodeData.userPrompt]);

  const handleOpenSettings = () => {
    setOpen(true);
  };

  const handleSubmit = (values: GeminiFormValues) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === props.id
          ? { ...node, data: { ...node.data, ...values } }
          : node,
      ),
    );
  };

  const defaultData = useMemo<Partial<GeminiFormValues>>(
    () => ({
      variableName: nodeData.variableName,
      model: nodeData.model,
      systemPrompt: nodeData.systemPrompt,
      userPrompt: nodeData.userPrompt,
      credentialId: nodeData.credentialId,
    }),
    [
      nodeData.variableName,
      nodeData.model,
      nodeData.systemPrompt,
      nodeData.userPrompt,
      nodeData.credentialId,
    ],
  );

  return (
    <>
      {open && (
        <GeminiDialog
          open={open}
          onSubmit={handleSubmit}
          setOpen={setOpen}
          defaultData={defaultData}
        />
      )}
      <BaseGeminiNode
        {...props}
        name="Gemini"
        description={description}
        onSettings={handleOpenSettings}
        imageUrl="/image/gemini.svg"
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
};

export default GeminiNode;
