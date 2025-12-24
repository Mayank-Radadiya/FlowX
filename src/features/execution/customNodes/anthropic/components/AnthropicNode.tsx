/**
 * AnthropicNode Component
 * -----------------------
 * React Flow node component for the Anthropic AI integration.
 * Handles node configuration and dialog state management.
 */

"use client";

import { type NodeProps, type Node, useReactFlow } from "@xyflow/react";
import { useMemo, useState } from "react";
import { AnthropicDialog } from "./dialog";
import { DEFAULT_MODEL, AnthropicModel } from "./dialog/anthropic.constants";
import { AnthropicFormValues } from "./dialog/anthropic.schema";
import BaseAnthropicNode from "./BaseAnthropicNode";

type AnthropicNodeData = {
  variableName?: string;
  model?: AnthropicModel;
  systemPrompt?: string;
  userPrompt?: string;
  anthropicApiKey?: string;
};

type AnthropicNodeProps = Node<AnthropicNodeData>;

const AnthropicNode = (props: NodeProps<AnthropicNodeProps>) => {
  const [open, setOpen] = useState(false);
  const nodeData = props.data as AnthropicNodeData;
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

  const handleSubmit = (values: AnthropicFormValues) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === props.id
          ? { ...node, data: { ...node.data, ...values } }
          : node
      )
    );
  };

  const defaultData = useMemo<Partial<AnthropicFormValues>>(
    () => ({
      variableName: nodeData.variableName,
      model: nodeData.model,
      systemPrompt: nodeData.systemPrompt,
      userPrompt: nodeData.userPrompt,
      anthropicApiKey: nodeData.anthropicApiKey,
    }),
    [
      nodeData.variableName,
      nodeData.model,
      nodeData.systemPrompt,
      nodeData.userPrompt,
      nodeData.anthropicApiKey,
    ]
  );

  return (
    <>
      {open && (
        <AnthropicDialog
          open={open}
          onSubmit={handleSubmit}
          setOpen={setOpen}
          defaultData={defaultData}
        />
      )}
      <BaseAnthropicNode
        {...props}
        name="Anthropic"
        description={description}
        onSettings={handleOpenSettings}
        imageUrl="/image/anthropic.svg"
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
};

export default AnthropicNode;
