/**
 * OpenAINode Component
 * --------------------
 * React Flow node component for the OpenAI AI integration.
 * Handles node configuration and dialog state management.
 */

"use client";

import { type NodeProps, type Node, useReactFlow } from "@xyflow/react";
import { useMemo, useState } from "react";
import BaseOpenAINode from "./BaseOpenAINode";
import { OpenAIDialog } from "./dialog";
import { DEFAULT_MODEL, OpenAIModel } from "./dialog/openai.constants";
import { OpenAIFormValues } from "./dialog/openai.schema";

type OpenAINodeData = {
  variableName?: string;
  model?: OpenAIModel;
  systemPrompt?: string;
  userPrompt?: string;
  openaiApiKey?: string;
};

type OpenAINodeProps = Node<OpenAINodeData>;

const OpenAINode = (props: NodeProps<OpenAINodeProps>) => {
  const [open, setOpen] = useState(false);
  const nodeData = props.data as OpenAINodeData;
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

  const handleSubmit = (values: OpenAIFormValues) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === props.id
          ? { ...node, data: { ...node.data, ...values } }
          : node
      )
    );
  };

  const defaultData = useMemo<Partial<OpenAIFormValues>>(
    () => ({
      variableName: nodeData.variableName,
      model: nodeData.model,
      systemPrompt: nodeData.systemPrompt,
      userPrompt: nodeData.userPrompt,
      openaiApiKey: nodeData.openaiApiKey,
    }),
    [
      nodeData.variableName,
      nodeData.model,
      nodeData.systemPrompt,
      nodeData.userPrompt,
      nodeData.openaiApiKey,
    ]
  );

  return (
    <>
      {open && (
        <OpenAIDialog
          open={open}
          onSubmit={handleSubmit}
          setOpen={setOpen}
          defaultData={defaultData}
        />
      )}
      <BaseOpenAINode
        {...props}
        name="OpenAI"
        description={description}
        onSettings={handleOpenSettings}
        imageUrl="/image/openai.svg"
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
};

export default OpenAINode;
