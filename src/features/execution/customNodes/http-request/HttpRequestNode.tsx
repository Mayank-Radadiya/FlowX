"use client";

import { type NodeProps, type Node, useReactFlow } from "@xyflow/react";
import { memo, useState } from "react";
import BaseExecutionNode from "./components/BaseExecutionNode";
import { HttpRequestDialog } from "./components/Dialog";

type HttpRequestNodeData = {
  endPontUrl: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeProps = Node<HttpRequestNodeData>;

const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeProps>) => {
  const [open, setOpen] = useState(false);
  const NodeData = props.data as HttpRequestNodeData;
  const { setNodes } = useReactFlow();

  const description = NodeData.endPontUrl
    ? `${NodeData.method || "GET "} ${NodeData.endPontUrl}`
    : "Not configured";

  const handleOpenSettings = () => {
    setOpen(true);
  };

  const handleSubmit = (values: {
    endpointUrl: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: string;
  }) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              endPontUrl: values.endpointUrl,
              method: values.method,
              body: values.body,
            },
          }; 
        }
        return node;
      })
    );
  };
  return (
    <>
      <HttpRequestDialog
        open={open}
        onSubmit={handleSubmit}
        setOpen={setOpen}
        defaultEndpointUrl={NodeData.endPontUrl}
        defaultMethod={NodeData.method}
        defaultBody={NodeData.body}
      />
      <BaseExecutionNode
        {...props}
        name="HTTP Request"
        description={description}
        onSettings={handleOpenSettings}
        imageUrl="/icons/http.svg"
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

HttpRequestNode.displayName = "HttpRequestNode";

export default HttpRequestNode;
