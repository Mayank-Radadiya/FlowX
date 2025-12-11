"use client";

import { type NodeProps } from "@xyflow/react";
import { memo, type ReactNode } from "react";
import ImageNode from "../../../editor/components/reactFlow/Nodes/ImageNode";

interface BaseEductionNodeProps extends NodeProps {
  name?: string;
  description?: string;
  //?  status?: NodeStatus;
  children?: ReactNode;
  onSettings?: () => void;
  onDoubleClick: () => void;
  imageUrl?: string;
}

const BaseExecutionNode = memo(
  ({
    name,
    imageUrl,
    description,
    children,
    onSettings,
    onDoubleClick,
    selected,
  }: BaseEductionNodeProps) => {
    const handleDelete = () => {};
    return (
      <>
        <ImageNode
          name={name}
          description={description}
          onSetting={onSettings}
          onDelete={handleDelete}
          imageUrl={imageUrl}
          selected={selected}
          onDoubleClick={onDoubleClick}
          variant="fuchsia"
          hasInput={true}
          hasOutput={true}
        >
          {children}
        </ImageNode>
      </>
    );
  }
);

export default BaseExecutionNode;
