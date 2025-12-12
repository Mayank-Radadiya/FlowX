"use client";

import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { NODE_COMPONENTS } from "@/constants/node-component";
import { cn } from "@/lib/utils";
import AddNewNodeButton from "./Nodes/NodeSelector/AddNewNodeButton";
import { useSetAtom } from "jotai";
import { editorAtom } from "../../store/atom";

interface WorkflowNodeCanvasProps {
  nodes: Node[];
  edges: Edge[];
}

const WorkflowNodeCanvas = ({
  nodes: initialNodes,
  edges: initialEdges,
}: WorkflowNodeCanvasProps) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const setEditor = useSetAtom(editorAtom);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return (
    <div className="w-full h-full relative bg-neutral-50 dark:bg-neutral-950">
      {/* React Flow Canvas */}
      <ReactFlow
        className="relative z-10 text-black/80"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={NODE_COMPONENTS}
        proOptions={{
          hideAttribution: true,
        }}
        onInit={setEditor}
        panOnScroll
        panOnDrag={false}
        selectionOnDrag
      >
        {/* Dot grid background - layered on top of particles */}
        <Background
          variant={BackgroundVariant.Cross}
          gap={16}
          size={2}
          color="rgba(139, 92, 246, 0.3)"
        />
        <Controls />
        <MiniMap
          className={cn(
            "[&]:bg-white/80 [&]:dark:bg-neutral-900/80",
            "[&]:backdrop-blur-sm",
            "[&]:border [&]:border-violet-200/50",
            "[&]:dark:border-violet-500/20",
            "[&]:rounded-lg [&]:shadow-lg"
          )}
          nodeColor={"#b59cf1"}
          maskColor={"rgba(139, 92, 246, 0.15)"}
          bgColor={"transparent"}
        />
        <Panel position="top-right" className="m-4">
          <AddNewNodeButton />
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default WorkflowNodeCanvas;
