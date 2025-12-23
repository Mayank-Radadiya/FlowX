"use client";

import type { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { GoogleFormDialog } from "./components/dialog";
import BaseGoogleFormTriggerNode from "./components/BaseGoogleFormTriggerNode";
import { useNodeStatus } from "../../hooks/use-node-status";
import { GOOGLE_FORM_TRIGGER_CHANNEL_NAME } from "@/inngest/channel/googleFormChannel";
import { fetchGoogleFormTriggerRealTimeToken } from "./action/action";

const GoogleFormTriggerNode = memo((props: NodeProps) => {
  const [open, setOpen] = useState(false);

  const handleSetting = () => setOpen(true);

  const status = useNodeStatus({
    nodeId: props.id,
    channel: GOOGLE_FORM_TRIGGER_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchGoogleFormTriggerRealTimeToken,
  });

  return (
    <>
      {open && <GoogleFormDialog open={open} setOpen={setOpen} />}
      <BaseGoogleFormTriggerNode
        {...props}
        name="Google Form"
        description="Trigger the flow when a Form is submitted"
        selected={props.selected}
        onSettings={handleSetting}
        onDoubleClick={handleSetting}
        imageUrl={"/image/googleForm.svg"}
        status={status}
      />
    </>
  );
});

export default GoogleFormTriggerNode;
