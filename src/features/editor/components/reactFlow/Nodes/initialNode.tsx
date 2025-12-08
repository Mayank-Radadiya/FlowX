"use client";

import type { NodeProps } from "@xyflow/react";
import { memo } from "react";
import { Play } from "lucide-react";
import WorkFlowNode from "./WorkFlowNode";

const InitialNode = memo((props: NodeProps) => {
  return (
    <>
      {/* Initial Node   */}
      <WorkFlowNode
        variant="success"
        badge="Trigger"
        {...props}
        name="Start"
        description="Workflow execution starts here"
        icon={Play}
        hasInput={false}
        hasOutput={false}
        showToolbar={false}
      />
    </>
  );
});

export default InitialNode;
