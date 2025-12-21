"use client";

import type { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import BaseTriggerNode from "./components/BaseTriggerNode";
import { ManualTriggerDialog } from "./components/dialog";

const ManualTriggerNode = memo((props: NodeProps) => {
  const [open, setOpen] = useState(false);

  const handleSetting = () => setOpen(true);

  return (
    <>
      {open && <ManualTriggerDialog open={open} setOpen={setOpen} />}
      <BaseTriggerNode
        {...props}
        name="Manual Trigger"
        description="Start the flow manually with a click"
        selected={props.selected}
        onSettings={handleSetting}
        onDoubleClick={handleSetting}
        imageUrl={"/icons/trigger.svg"}
        w
      />
    </>
  );
});

export default ManualTriggerNode;
