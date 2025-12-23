"use client";

import type { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import BaseTriggerNode from "./components/BaseTriggerNode";
import { ManualTriggerDialog } from "./components/dialog";
import { useNodeStatus } from "../../hooks/use-node-status";
import { MANUAL_TRIGGER_CHANNEL_NAME } from "@/inngest/channel/manualTriggerChannel";
import { fetchManualTriggerRealTimeToken } from "./action/action";

const ManualTriggerNode = memo((props: NodeProps) => {
  const [open, setOpen] = useState(false);

  const handleSetting = () => setOpen(true);

  const status = useNodeStatus({
    nodeId: props.id,
    channel: MANUAL_TRIGGER_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchManualTriggerRealTimeToken,
  });

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
        status={status}
      />
    </>
  );
});

export default ManualTriggerNode;
