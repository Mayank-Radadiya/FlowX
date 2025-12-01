import { Activity, GitBranch, KeyRound, LayoutDashboard } from "lucide-react";

export const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={18} strokeWidth={1.7} />,
  },
  {
    label: "Workflows",
    href: "/workflow",
    icon: <GitBranch size={18} strokeWidth={1.7} />,
  },
  {
    label: "Credentials",
    href: "/credentials",
    icon: <KeyRound size={18} strokeWidth={1.7} />,
  },
  {
    label: "Executions",
    href: "/executions",
    icon: <Activity size={18} strokeWidth={1.7} />,
  },
];

export const USER = {
  name: "John Doe",
  email: "xxx@gmail.com",
};
