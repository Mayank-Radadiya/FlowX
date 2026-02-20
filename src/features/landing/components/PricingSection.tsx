"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { fadeUp, stagger, scaleIn } from "../lib/animations";
import { PLANS } from "../lib/constants";

function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="pricing"
      ref={ref}
      className="py-32 relative bg-background border-b-2 border-border"
      aria-label="Pricing"
    >
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {/* Header - Asymmetric Left */}
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
            Pricing
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-5xl sm:text-6xl font-black uppercase tracking-tighter text-foreground mb-6"
          >
            Simple, transparent <span className="text-primary">Pricing.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-muted-foreground font-medium leading-snug"
          >
            Start free, upgrade when you need more power. No hidden fees, no
            lock-in, just raw computing value.
          </motion.p>
        </motion.div>

        {/* Cards - Brutalist Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl"
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={plan.highlighted ? scaleIn : fadeUp}
              whileHover={{
                y: -8,
                transition: { duration: 0.2, ease: "linear" },
              }}
              className={`relative p-8 md:p-12 border-2 flex flex-col cursor-pointer transition-transform ${
                plan.highlighted
                  ? "border-primary bg-primary text-primary-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)]"
                  : "border-foreground bg-background text-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)]"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-0 right-0 border-l-2 border-b-2 border-primary bg-background text-foreground px-4 py-2">
                  <span className="text-xs font-black tracking-widest uppercase">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan name & price */}
              <div className="mb-8">
                <p
                  className={`text-base font-bold tracking-widest uppercase mb-4 ${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                >
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-6xl md:text-7xl font-black tracking-tighter">
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm font-bold uppercase tracking-wider ${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                  >
                    / {plan.period}
                  </span>
                </div>
                <p
                  className={`text-sm font-medium leading-relaxed ${plan.highlighted ? "text-primary-foreground/90" : "text-muted-foreground"}`}
                >
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-4 mb-10 border-t-2 border-current pt-8">
                {plan.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-4 text-sm font-bold"
                  >
                    <span
                      className={`size-6 border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.highlighted
                          ? "border-primary-foreground text-primary-foreground bg-transparent"
                          : "border-primary text-primary bg-transparent"
                      }`}
                    >
                      <Check size={14} strokeWidth={4} />
                    </span>
                    <span className="mt-1">{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.ctaHref}
                className={`mt-auto w-full py-5 text-sm font-black text-center uppercase tracking-widest transition-colors duration-200 border-2 ${
                  plan.highlighted
                    ? "bg-background text-primary border-background hover:bg-transparent hover:text-background"
                    : "bg-primary text-primary-foreground border-primary hover:bg-transparent hover:text-primary"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default PricingSection;
