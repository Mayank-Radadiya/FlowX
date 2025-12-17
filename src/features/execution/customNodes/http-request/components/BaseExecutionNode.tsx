"use client";

import BaseVisualNode from "@/features/editor/components/reactFlow/Nodes/base/BaseVisualNode";
import { NodeStatus } from "@/features/execution/types";
import { useReactFlow, type NodeProps } from "@xyflow/react";
import { memo, type ReactNode } from "react";

interface BaseEductionNodeProps extends NodeProps {
  name?: string;
  description?: string;
  status?: NodeStatus;
  children?: ReactNode;
  onSettings?: () => void;
  onDoubleClick: () => void;
  imageUrl?: string;
}

const BaseExecutionNode = memo(
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
  }: BaseEductionNodeProps) => {
    const { setNodes, setEdges } = useReactFlow();

    const handleDelete = () => {
      setNodes((nds) => nds.filter((n) => n.id !== id));
      setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    };

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
          color="pink"
          status={status}
          hasInput={true}
          hasOutput={true}
        >
          {children}
        </BaseVisualNode>
      </>
    );
  }
);

export default BaseExecutionNode;
