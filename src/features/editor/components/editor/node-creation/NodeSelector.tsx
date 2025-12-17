/**
 * NodeSelector
 * ------------
 * This component provides a **slide-over panel (Sheet)** that allows users
 * to browse and select workflow nodes to add to the editor.
 *
 * Conceptually, this file acts as a **UI shell / container**:
 * - It does NOT know how nodes are created
 * - It does NOT manage workflow state
 * - It only controls *how* the node catalog is presented
 *
 * The actual node list, search, and creation logic live inside `NodeCatalog`.
 */

"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetPanel,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NodeCatalog } from "./NodeCatalog";

interface NodeSelectorProps {
  /**
   * Optional trigger element.
   * Usually a button like "Add Node".
   * If provided, clicking it opens the sheet.
   */
  children?: React.ReactElement;
}

export const NodeSelector = ({ children }: NodeSelectorProps) => {
  return (
    /**
     * Sheet
     * -----
     * Root container for the slide-over UI.
     * Manages open/close state internally (Radix-based).
     */
    <Sheet>
      {/* 
        SheetTrigger
        ------------
        If a trigger element is passed, it is wrapped here.
        Clicking this element opens the node selector panel.
      */}
      {children && <SheetTrigger>{children}</SheetTrigger>}

      {/*
        SheetContent
        ------------
        Defines the actual panel that slides in.
        - side="right" → opens from the right side
        - width constrained for desktop, full-width on mobile
      */}
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-background/90"
      >
        {/*
          SheetHeader
          -----------
          Static header section for context and accessibility.
        */}
        <SheetHeader>
          <SheetTitle>Add Node</SheetTitle>
          <SheetDescription>
            Choose a node to add to your workflow
          </SheetDescription>
        </SheetHeader>

        {/*
          SheetPanel
          ----------
          Main scrollable content area.
          This is where the node catalog UI lives.
        */}
        <SheetPanel className="flex flex-col gap-4">
          <NodeCatalog />
        </SheetPanel>
      </SheetContent>
    </Sheet>
  );
};
