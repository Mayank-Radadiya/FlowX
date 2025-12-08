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
import { NODE_COMPONENTS } from "@/constants/node-componet";
import { cn } from "@/lib/utils";

// const initialNodes = [
//   { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
//   { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
// ];
// const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

interface FlowCanvasProps {
  nodes: Node[];
  edges: Edge[];
}

const FlowCanvas = ({
  nodes: initialNodes,
  edges: initialEdges,
}: FlowCanvasProps) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

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
      >
        {/* Dot grid background - layered on top of particles */}
        <Background
          variant={BackgroundVariant.Cross}
          gap={16}
          size={2}
          color="rgba(139, 92, 246, 0.3)"
        />
        <Controls className="[&]:bg-white/80 [&]:dark:bg-neutral-900/80 [&]:backdrop-blur-sm [&]:border [&]:border-violet-200/50 [&]:dark:border-violet-500/20 [&]:rounded-lg [&]:shadow-lg" />
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
          pannable
          zoomable
        />
        <Panel position="top-right" className="m-4">
          {/* You can add custom components or information here */}
          <button
            className={cn(
              "px-4 py-2 bg-violet-600 text-white rounded-lg shadow-lg",
              "hover:bg-violet-700",
              "focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
            )}
            onClick={() => {}}
          >
            Add Node
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;
