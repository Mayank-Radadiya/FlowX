"use client";

import type { NodeProps, Node } from "@xyflow/react";
import { memo } from "react";
import BaseExecutionNode from "./BaseExecutionNode";
import toast from "react-hot-toast";

type HttpRequestNodeData = {
  endPontUrl: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeProps = Node<HttpRequestNodeData>;

const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeProps>) => {
  const NodeData = props.data as HttpRequestNodeData;

  const description = NodeData.endPontUrl
    ? `${NodeData.method || "GET "} ${NodeData.endPontUrl}`
    : "Not configured";
  return (
    <>
      <BaseExecutionNode
        {...props}
        name="HTTP Request"
        description={description}
        onSettings={() => {}}
        imageUrl="/icons/http.svg"
        onDoubleClick={() => {
          toast.error("Not implemented yet");
        }}
      />
    </>
  );
});

HttpRequestNode.displayName = "HttpRequestNode";

export default HttpRequestNode;
