"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WORKFLOW_NODES } from "../lib/constants";

function WorkflowMockup() {
  return (
    <div className="relative">
      {/* Canvas frame */}
      <motion.div
        className="relative border-4 border-foreground bg-background overflow-hidden shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_0px_rgba(255,255,255,0.1)]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Top bar */}
        <div className="flex items-center gap-2 px-6 py-4 border-b-4 border-foreground bg-muted">
          <div className="size-4 rounded-none bg-foreground" />
          <div className="size-4 rounded-none bg-muted-foreground" />
          <div className="size-4 rounded-none border-2 border-foreground bg-background" />
          <span className="ml-4 text-sm text-foreground font-black tracking-widest uppercase">
            payment-workflow.flow
          </span>
          <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-background border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]">
            <span className="size-2 rounded-none bg-primary animate-pulse" />
            <span className="text-xs font-black text-foreground uppercase tracking-widest">
              Live Flow
            </span>
          </div>
        </div>

        {/* Canvas area */}
        <div className="p-10 relative bg-background min-h-[400px]">
          {/* Brutalist Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_2px,transparent_2px),linear-gradient(to_bottom,#80808012_2px,transparent_2px)] bg-[size:40px_40px]" />

          <div className="relative flex flex-col items-center gap-0 z-10 pt-4 pb-4">
            {WORKFLOW_NODES.map((node, i) => (
              <div key={node.id} className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: 0.4 + node.delay,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  className={`w-full max-w-[320px] flex items-center gap-4 px-6 py-5 border-2 border-foreground bg-background shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] cursor-default`}
                >
                  <div className="size-12 bg-muted border-2 border-foreground flex items-center justify-center flex-shrink-0">
                    <Image
                      src={node.icon}
                      alt={node.label}
                      width={24}
                      height={24}
                      className="grayscale"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-black text-foreground uppercase tracking-wider truncate">
                      {node.label}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest truncate">
                      {node.subtitle}
                    </p>
                  </div>
                  <span
                    className={`size-3 rounded-none bg-foreground flex-shrink-0 animate-pulse`}
                  />
                </motion.div>

                {/* Connector */}
                {i < WORKFLOW_NODES.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{
                      delay: 0.65 + node.delay,
                      duration: 0.3,
                      ease: "linear",
                    }}
                    className="flex flex-col items-center origin-top my-2"
                  >
                    <div className="w-2 h-10 bg-foreground" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="flex items-center gap-6 px-6 py-4 border-t-4 border-foreground bg-muted">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-none bg-primary" />
            <span className="text-xs font-bold text-foreground uppercase tracking-widest">
              3 Nodes
            </span>
          </div>
          <div className="text-xs font-bold text-foreground uppercase tracking-widest">
            Last run: 2s ago
          </div>
          <div className="ml-auto text-xs font-black text-foreground uppercase tracking-widest bg-background border-2 border-foreground px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]">
            1,284 Executions
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default WorkflowMockup;
