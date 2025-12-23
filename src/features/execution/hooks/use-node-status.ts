import type { Realtime } from "@inngest/realtime";
import { useEffect, useState } from "react";
import { useInngestSubscription } from "@inngest/realtime/hooks";
import { NodeStatus } from "../customNodes/types";

interface UseNodeStatusProps {
  nodeId: string;
  channel: string;
  topic: string;
  refreshToken: () => Promise<Realtime.Subscribe.Token>;
}

// interface nodeStatus {
//   status: "default" | "success" | "error" | "warning";
// }

export function useNodeStatus({
  nodeId,
  channel,
  topic,
  refreshToken,
}: UseNodeStatusProps) {
  const [status, setStatus] = useState<NodeStatus>("default");

  const { data } = useInngestSubscription({
    refreshToken,
    enabled: true,
  });

  useEffect(() => {
    if (!data.length) return;

    const latestMessage = data
      .filter(
        (msg) =>
          msg.kind === "data" &&
          msg.channel === channel &&
          msg.topic === topic &&
          msg.data.nodeId === nodeId
      )
      .sort((a, b) => {
        if (a.kind === "data" && b.kind === "data") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        return 0;
      })[0];

    if (latestMessage && latestMessage.kind === "data") {
      setStatus(latestMessage.data.status as NodeStatus);
    }
  }, [data, nodeId, topic, channel]);

  return status;
}
