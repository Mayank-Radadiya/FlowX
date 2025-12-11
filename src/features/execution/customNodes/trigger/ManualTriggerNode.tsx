"use client";

import type { NodeProps } from "@xyflow/react";
import { memo } from "react";
import BaseTriggerNode from "./BaseTriggerNode";

const ManualTriggerNode = memo((props: NodeProps) => {
  return (
    <BaseTriggerNode
      {...props}
      name="Manual Trigger"
      description="Start the flow manually with a click"
      selected={props.selected}
      onSettings={() => {}}
      onDoubleClick={() => {}}
      imageUrl={"/icons/trigger.svg"}
    />
  );
});

ManualTriggerNode.displayName = "ManualTriggerNode";

export default ManualTriggerNode;
