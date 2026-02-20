"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ToggleButton } from "@/components/global/ToggleButton";
import { NAV_LINKS } from "../lib/constants";
import AuthButton from "./AuthButton";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      className="fixed top-4 left-4 right-4 z-50 bg-background border-2 border-primary/10 shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/landing" className="flex items-center gap-2 group">
          <div className="size-6 bg-primary" />
          <span className="text-lg font-bold text-foreground tracking-tight uppercase">
            FlowX
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <AuthButton />
          <ToggleButton />
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-3">
          <ToggleButton />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setMobileOpen(!mobileOpen);
              }
            }}
            className="size-9 flex items-center justify-center border border-border bg-background hover:bg-muted transition-colors cursor-pointer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t-2 border-primary/10 bg-background overflow-hidden"
          >
            <nav className="px-4 py-4 flex flex-col gap-2" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-3 text-sm font-medium text-foreground hover:bg-muted border border-transparent hover:border-border transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
                <Link
                  href="/sign-in"
                  className="px-3 py-3 text-sm font-bold text-center border border-border hover:bg-muted transition-colors uppercase tracking-widest"
                >
                  Log In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-3 py-3 text-sm font-bold text-center bg-primary text-primary-foreground hover:bg-primary/90 transition-colors uppercase tracking-widest border border-primary"
                >
                  Start Building
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
function useAuth(): { session: any } {
  throw new Error("Function not implemented.");
}
