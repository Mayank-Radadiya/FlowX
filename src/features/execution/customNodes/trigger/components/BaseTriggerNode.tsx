"use client";

import BaseVisualNode from "@/features/editor/components/reactFlow/Nodes/base/BaseVisualNode";
import { NodeStatus } from "@/features/execution/customNodes/types";
import { useReactFlow, type NodeProps } from "@xyflow/react";
import { memo, type ReactNode } from "react";

interface BaseTriggerNodeProps extends NodeProps {
  name?: string;
  description?: string;
  status?: NodeStatus;
  children?: ReactNode;
  onSettings?: () => void;
  onDoubleClick: () => void;
  imageUrl?: string;
}

const BaseTriggerNode = memo(
  ({
    name,
    imageUrl,
    description,
    children,
    onSettings,
    onDoubleClick,
    selected,
    id,
    status,
  }: BaseTriggerNodeProps) => {
    const { setNodes, setEdges } = useReactFlow();

    const handleDelete = () => {
      setNodes((nds) => nds.filter((n) => n.id !== id));
      setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    };

    return (
      <>
        <BaseVisualNode
          name={name}
          showToolbar={true}
          description={description}
          onSetting={onSettings}
          onDelete={handleDelete}
          imageUrl={imageUrl}
          selected={selected}
          onDoubleClick={onDoubleClick}
          hasInput={false}
          hasOutput={true}
          className="rounded-l-2xl"
          color="indigo"
          status={status}
        >
          {children}
        </BaseVisualNode>
      </>
    );
  }
);

export default BaseTriggerNode;
