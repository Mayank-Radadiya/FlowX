"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, stagger } from "../lib/animations";
import WorkflowMockup from "./WorkflowMockup";

function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-20 pb-16 bg-background selection:bg-primary selection:text-primary-foreground"
      aria-label="Hero"
    >
      {/* Brutalist Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] " />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col xl:flex-row items-end gap-12 xl:gap-8">
        {/* Left: copy (Takes up 60-70% of visual weight) */}
        <motion.div
          className="w-full xl:w-2/3 border-l-4 border-primary pl-6 sm:pl-10 relative -top-32"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-block px-3 py-1 bg-foreground text-background text-xs font-bold uppercase tracking-widest">
              Engineered for Scale
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-6xl sm:text-7xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter text-foreground mb-8"
          >
            Automate
            <br />
            <span className="text-primary block mt-2">Everything.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-muted-foreground max-w-xl font-medium leading-snug mb-12"
          >
            Deploy logic in seconds. Connect your stack instantly. FlowX is the
            high-performance workflow engine built for modern SaaS teams. No
            compromises. No bloat.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <Link
              href="/sign-up"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-widest border-2 border-primary hover:bg-transparent hover:text-primary transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Deploy Now
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-foreground text-foreground text-sm font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
            >
              Read Docs
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={fadeUp}
            className="mt-12 flex items-center gap-6 text-xs font-bold text-muted-foreground uppercase tracking-wider"
          >
            <span>// SOC2 Type II</span>
            <span className="hidden sm:inline">// 99.99% Uptime</span>
            <span className="hidden md:inline">// Enterprise Ready</span>
          </motion.div>
        </motion.div>

        {/* Right: abstract representation (Takes up 30-40% of space, creating tension) */}
        <motion.div
          className="w-full xl:w-[45%] flex justify-center xl:justify-end xl:mb-12 pt-20"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <div className="w-full max-w-[500px] relative group pr-4 pb-4">
            <WorkflowMockup />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
