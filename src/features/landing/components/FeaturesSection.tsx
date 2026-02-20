"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, stagger, scaleIn } from "../lib/animations";
import { FEATURES } from "../lib/constants";

function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="features"
      ref={ref}
      className="py-32 relative bg-background border-y-2 border-border"
      aria-label="Features"
    >
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {/* Header - Left Aligned to match Hero tension */}
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
            Capabilities
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-5xl sm:text-6xl font-black uppercase tracking-tighter text-foreground mb-6"
          >
            Everything you need to automate
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-muted-foreground font-medium leading-snug"
          >
            From simple task runners to multi-step AI pipelines — FlowX gives
            you the raw building blocks for any automation. No hidden magic,
            just pure control.
          </motion.p>
        </motion.div>

        {/* Staggered Grid - Anti-Bento */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-border"
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            // Add right and bottom borders to create a sharp grid system
            const isLastInRow = (idx + 1) % 3 === 0;
            const isLastRow = idx >= FEATURES.length - 3;

            return (
              <motion.div
                key={feature.title}
                variants={scaleIn}
                className={`group relative p-8 md:p-10 cursor-pointer bg-background text-foreground hover:bg-foreground hover:text-background flex flex-col items-start transition-colors duration-200 border-border
                  ${!isLastInRow ? "border-r-2 lg:border-r-2 md:border-r-[0px]" : ""}
                  ${!isLastRow ? "border-b-2" : ""}
                  md:[&:nth-child(even)]:border-l-2 lg:[&:nth-child(even)]:border-l-0
                  md:[&:nth-child(odd)]:border-r-2 lg:[&:nth-child(odd)]:border-r-2
                `}
              >
                <div className="mb-8 p-4 border-2 border-current rounded-none">
                  <Icon
                    size={32}
                    className="text-current group-hover:text-background"
                  />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wider mb-4 group-hover:text-background">
                  {feature.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed opacity-80 group-hover:opacity-100 group-hover:text-background flex-grow">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;
