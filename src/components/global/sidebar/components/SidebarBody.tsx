"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileSidebar } from "./MobileSidebar";

export const SidebarBody = (
  props: Omit<React.ComponentProps<typeof motion.div>, "children"> & {
    children?: ReactNode;
  }
) => {
  const { children, ...rest } = props;

  return (
    <>
      <DesktopSidebar {...(rest as React.ComponentProps<typeof motion.aside>)}>
        {children}
      </DesktopSidebar>
      <MobileSidebar {...(rest as React.ComponentProps<"div">)}>
        {children}
      </MobileSidebar>
    </>
  );
};
