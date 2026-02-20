"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, stagger } from "../lib/animations";

function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-32 relative bg-primary text-primary-foreground overflow-hidden"
      aria-label="Call to action"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:40px_40px]" />

      <motion.div
        className="relative mx-auto max-w-7xl px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-12"
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="lg:w-2/3 border-l-4 border-background pl-6 sm:pl-10">
          <motion.h2
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9]"
          >
            Start automating
            <br />
            <span className="text-secondary-foreground mix-blend-overlay">
              today.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-xl max-w-xl font-medium leading-snug opacity-90"
          >
            Join thousands of teams using FlowX to automate workflows, connect
            AI, and ship faster. No hidden fees. Free forever.
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          className="lg:w-1/3 flex flex-col w-full sm:w-auto gap-4"
        >
          <Link
            href="/sign-up"
            className="group flex items-center justify-center gap-3 px-8 py-5 bg-background text-foreground text-sm font-bold uppercase tracking-widest border-2 border-background hover:bg-transparent hover:text-background transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-background w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[8px] hover:translate-y-[8px] duration-200"
          >
            Create free account
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/sign-in"
            className="flex items-center justify-center gap-3 px-8 py-5 border-2 border-background text-background text-sm font-bold uppercase tracking-widest hover:bg-background hover:text-primary transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-background w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[8px] hover:translate-y-[8px] duration-200"
          >
            Sign in
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default CTABanner;
