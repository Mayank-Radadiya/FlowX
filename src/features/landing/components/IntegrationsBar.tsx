"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { fadeUp } from "../lib/animations";
import { INTEGRATIONS } from "../lib/constants";

function IntegrationsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 border-y-2 border-border bg-background overflow-hidden relative"
      aria-label="Integrations"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />

      <motion.div
        className="mx-auto max-w-7xl px-4 md:px-6 mb-12 text-left sm:text-center relative z-10"
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <p className="text-sm font-black text-foreground tracking-widest uppercase inline-block bg-primary text-primary-foreground px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
          Raw integrations. Unlimited power.
        </p>
      </motion.div>

      {/* Marquee */}
      <div
        className="relative z-10 pb-2"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <motion.div
          className="flex gap-8 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          {[...INTEGRATIONS, ...INTEGRATIONS].map((int, i) => (
            <div
              key={`${int.name}-${i}`}
              className="flex items-center gap-3 px-6 py-4 border-2 border-foreground bg-background flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              <Image
                src={int.src}
                alt={int.name}
                width={24}
                height={24}
                className="opacity-90 mix-blend-multiply dark:mix-blend-normal"
              />
              <span className="text-sm font-black uppercase tracking-wider text-foreground whitespace-nowrap">
                {int.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default IntegrationsBar;
