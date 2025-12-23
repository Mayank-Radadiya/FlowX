"use client";

import type { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { StripeTriggerDialog } from "./components/dialog";
import { useNodeStatus } from "../../hooks/use-node-status";
import { STRIPE_TRIGGER_CHANNEL_NAME } from "@/inngest/channel/stripeTrigger";
import { fetchStripeTriggerRealTimeToken } from "./action/action";
import BaseStripeTriggerNode from "./components/StripeTriggerNode";

const StripeTriggerNode = memo((props: NodeProps) => {
  const [open, setOpen] = useState(false);

  const handleSetting = () => setOpen(true);

  const status = useNodeStatus({
    nodeId: props.id,
    channel: STRIPE_TRIGGER_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchStripeTriggerRealTimeToken,
  });

  return (
    <>
      {open && <StripeTriggerDialog open={open} setOpen={setOpen} />}
      <BaseStripeTriggerNode
        {...props}
        name="Stripe Trigger"
        description="Trigger the flow when a Stripe event is received"
        selected={props.selected}
        onSettings={handleSetting}
        onDoubleClick={handleSetting}
        imageUrl={"/image/stripe.svg"}
        status={status}
      />
    </>
  );
});

export default StripeTriggerNode;
