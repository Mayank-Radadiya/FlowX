"use client";

import BaseVisualNode from "@/features/editor/components/reactFlow/Nodes/base/BaseVisualNode";
import { NodeStatus } from "@/features/execution/customNodes/types";
import { useNodeStatus } from "@/features/execution/hooks/use-node-status";
import { useReactFlow, type NodeProps } from "@xyflow/react";
import { memo, type ReactNode } from "react";
import { fetchOpenAIRealTimeToken } from "../actions/action";
import { OPENAI_CHANNEL_NAME } from "@/inngest/channel/openai";

interface BaseOpenAINodeProps extends NodeProps {
  name?: string;
  description?: string;
  status?: NodeStatus;
  children?: ReactNode;
  onSettings?: () => void;
  onDoubleClick: () => void;
  imageUrl?: string;
}

const BaseOpenAINode = memo(
  ({
    id,
    name,
    imageUrl,
    description,
    children,
    onSettings,
    onDoubleClick,
    selected,
    status = "default",
  }: BaseOpenAINodeProps) => {
    const { setNodes, setEdges } = useReactFlow();

    const handleDelete = () => {
      setNodes((nds) => nds.filter((n) => n.id !== id));
      setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    };

    const nodeStatus = useNodeStatus({
      nodeId: id,
      channel: OPENAI_CHANNEL_NAME,
      topic: "status",
      refreshToken: () => fetchOpenAIRealTimeToken(),
    });

    return (
      <>
        <BaseVisualNode
          name={name}
          description={description}
          onSetting={onSettings}
          onDelete={handleDelete}
          imageUrl={imageUrl}
          selected={selected}
          onDoubleClick={onDoubleClick}
          color="green"
          status={nodeStatus || status}
          hasInput={true}
          hasOutput={true}
          showToolbar={true}
        >
          {children}
        </BaseVisualNode>
      </>
    );
  }
);

export default BaseOpenAINode;
