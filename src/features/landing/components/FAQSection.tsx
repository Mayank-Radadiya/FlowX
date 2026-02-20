"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeUp, stagger, staggerFast } from "../lib/animations";
import { FAQS } from "../lib/constants";

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={ref}
      className="py-32 bg-background border-b-2 border-border"
      aria-label="FAQ"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Layout: Text Left, Accordion Right */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Header */}
          <motion.div
            className="lg:w-1/3 border-l-4 border-primary pl-6 sm:pl-10 h-fit"
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block px-3 py-1 bg-foreground text-background text-xs font-bold tracking-widest uppercase mb-6"
            >
              FAQ
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-5xl sm:text-6xl font-black uppercase tracking-tighter text-foreground mb-6"
            >
              Answers.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-muted-foreground font-medium leading-snug"
            >
              Got questions? We have the technical details you need.
            </motion.p>
          </motion.div>

          {/* Accordion */}
          <motion.div
            className="lg:w-2/3 flex flex-col border-2 border-border"
            variants={staggerFast}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i;
              const contentId = `faq-content-${i}`;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`bg-background border-b-2 border-border last:border-b-0 group transition-colors ${isOpen ? "bg-muted" : ""}`}
                >
                  <button
                    onClick={() => toggleOpen(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleOpen(i);
                      }
                    }}
                    className="w-full flex items-center justify-between gap-4 px-6 md:px-8 py-6 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                  >
                    <span className="text-lg font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors duration-200">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="flex-shrink-0 size-8 border-2 border-foreground flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors"
                    >
                      <ChevronDown size={20} className="text-current" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={contentId}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "circOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 md:px-8 pb-6 text-base font-medium text-muted-foreground leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
