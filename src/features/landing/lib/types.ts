import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export interface Integration {
  name: string;
  src: string;
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
  iconBg: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  highlighted: boolean;
  badge?: string;
  features: string[];
  cta: string;
  ctaHref: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

export interface WorkflowNode {
  id: string;
  label: string;
  subtitle: string;
  icon: string;
  color: string;
  border: string;
  dot: string;
  delay: number;
}
