"use client";

import type { NodeProps } from "@xyflow/react";
import { memo } from "react";
import { Play } from "lucide-react";
import BaseVisualNode from "./base/BaseVisualNode";
import toast from "react-hot-toast";

const InitialNode = memo((props: NodeProps) => {
  return (
    <>
      {/* Initial Node   */}
      <BaseVisualNode
        {...props}
        status="default"
        name="Start"
        description="Workflow execution starts here"
        icon={Play}
        hasInput={false}
        hasOutput={false}
        showToolbar={false}
        color="blue"
        onClick={() =>
          toast.success("Click Add Node to start building your workflow")
        }
      />
    </>
  );
});

export default InitialNode;
