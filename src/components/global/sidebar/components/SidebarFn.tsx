"use client";

import type { ReactNode } from "react";
import { SidebarProvider } from "./SidebarContext";

interface SidebarProviderProps {
  children: ReactNode;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  animate?: boolean;
}

interface SidebarProps extends SidebarProviderProps {
  children: ReactNode;
}

export const SidebarFn = ({ children, ...providerProps }: SidebarProps) => {
  return <SidebarProvider {...providerProps}>{children}</SidebarProvider>;
};
