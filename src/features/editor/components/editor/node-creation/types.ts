import { NodeType } from "@prisma/client";

export type NodeTypeOption = {
  type: NodeType;
  label: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  image?: string;
};

export type NodeCategory = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  nodes: NodeTypeOption[];
};
