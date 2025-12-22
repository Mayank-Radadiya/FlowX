import { Connection, Node } from "@prisma/client";
import toposort from "toposort";

export const topologicalSort = (
  nodes: Node[],
  connections: Connection[]
): Node[] => {
  // if connection is 0 then it is a source node(or independent nodes)
  if (connections.length === 0) {
    return nodes;
  }

  const edges: [string, string][] = connections.map((connection) => [
    connection.formNodeId,
    connection.toNodeId,
  ]);

  const connectedNodeIDs = new Set<string>();
  for (const conn of connections) {
    connectedNodeIDs.add(conn.formNodeId);
    connectedNodeIDs.add(conn.toNodeId);
  }

  for (const node of nodes) {
    if (!connectedNodeIDs.has(node.id)) {
      edges.push([node.id, node.id]);
    }
  }

  let sortedNodesIds: string[];

  try {
    sortedNodesIds = toposort(edges);
    sortedNodesIds = [...new Set(sortedNodesIds)];
  } catch (error) {
    if (error instanceof Error && error.message.includes("Cyclic")) {
      throw new Error("Workflow contains a cycle");
    }
    throw error;
  }

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return sortedNodesIds.map((id) => nodeMap.get(id)!);
};
