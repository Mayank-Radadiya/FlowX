"use client";

import { type NodeProps, type Node, useReactFlow } from "@xyflow/react";
import { useMemo, useState } from "react";
import { HttpRequestDialog } from "./dialog/Dialog";
import BaseExecutionNode from "./BaseExecutionNode";
import { HttpRequestFormValues } from "./http-request.schema";

type HttpRequestNodeData = {
  variableName?: string;
  endpointUrl: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
};

type HttpRequestNodeProps = Node<HttpRequestNodeData>;

const HttpRequestNode = (props: NodeProps<HttpRequestNodeProps>) => {
  const [open, setOpen] = useState(false);
  const NodeData = props.data as HttpRequestNodeData;
  const { setNodes } = useReactFlow();

  const description = NodeData.endpointUrl
    ? `${NodeData.method || "GET "} ${NodeData.endpointUrl}`
    : "Not configured";

  const handleOpenSettings = () => {
    setOpen(true);
  };

  const handleSubmit = (values: HttpRequestFormValues) => {
    setNodes((nds) => {
      return nds.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...values,
            },
          };
        }
        return node;
      });
    });
  };

  const defaultData = useMemo(
    () => ({
      endpointUrl: NodeData.endpointUrl,
      method: NodeData.method,
      body: NodeData.body,
      variableName: NodeData.variableName,
    }),
    [
      NodeData.endpointUrl,
      NodeData.method,
      NodeData.body,
      NodeData.variableName,
    ]
  );

  return (
    <>
      {open && (
        <HttpRequestDialog
          open={open}
          onSubmit={handleSubmit}
          setOpen={setOpen}
          defaultData={defaultData}
        />
      )}
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
};

export default HttpRequestNode;
