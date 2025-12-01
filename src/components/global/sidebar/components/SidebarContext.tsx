"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface SidebarContextValue {
  open: boolean;
  setOpen: (value: boolean) => void;
  animate: boolean;
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return ctx;
};

interface SidebarProviderProps {
  children: ReactNode;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  animate?: boolean;
}

export const SidebarProvider = ({
  children,
  open,
  setOpen,
  animate = true,
}: SidebarProviderProps) => {
  const [internalOpen, internalSetOpen] = useState(false);

  const contextValue = useMemo<SidebarContextValue>(
    () => ({
      open: open ?? internalOpen,
      setOpen: setOpen ?? internalSetOpen,
      animate,
    }),
    [open, setOpen, animate, internalOpen]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};
