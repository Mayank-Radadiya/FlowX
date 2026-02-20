"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, stagger } from "../lib/animations";
import { STEPS } from "../lib/constants";

function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-32 bg-background border-b-2 border-border"
      aria-label="How it works"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="mb-20 max-w-3xl border-l-4 border-primary pl-6 sm:pl-10"
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.span
            variants={fadeUp}
            className="inline-block px-3 py-1 bg-foreground text-background text-xs font-bold tracking-widest uppercase mb-6"
          >
            Process
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-5xl sm:text-6xl font-black uppercase tracking-tighter text-foreground mb-6 leading-none"
          >
            Up & <span className="text-secondary-foreground">Running</span>
            <br />
            in 3 Steps.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-muted-foreground font-medium leading-snug"
          >
            No DevOps, no complicated setup. Deploy raw logic directly to
            production in under 5 minutes.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[28px] left-[16%] right-[16%] h-0.5 bg-border z-0" />
          <motion.div
            className="hidden lg:block absolute top-[28px] left-[16%] h-0.5 bg-primary z-[1]"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.8, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transformOrigin: "left",
              right: "16%",
            }}
          />

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-2 border-border bg-background relative z-10"
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  className={`group relative flex flex-col p-10 lg:p-12 transition-colors hover:bg-muted cursor-default ${
                    idx !== STEPS.length - 1
                      ? "border-b-2 lg:border-b-0 lg:border-r-2 border-border"
                      : ""
                  }`}
                >
                  {/* Step number and icon */}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl font-black text-primary/80 tracking-tighter mix-blend-multiply dark:mix-blend-screen">
                      0{step.number}
                    </span>
                    <div className="size-14 bg-background border-2 border-current flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <Icon size={24} className="text-foreground" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold uppercase tracking-wider text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-sm font-medium leading-relaxed opacity-80 text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
