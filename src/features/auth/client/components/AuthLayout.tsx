/**
 * AuthLayoutStructure Component
 * ----------------------------
 * Provides the shared visual layout for all authentication-related pages
 * (sign-in, sign-up, etc.).
 *
 * This layout is responsible for:
 *  - Full-screen centered layout
 *  - Decorative animated backgrounds (grid, gradients, meteors)
 *  - Theme toggle access
 *  - Navigation back to the main site
 *  - Brand/logo presentation with entry animation
 *  - Legal links (terms & privacy)
 *
 * The actual authentication forms are rendered via `children`.
 */

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ToggleButton } from "@/components/global/ToggleButton";
import { Meteors } from "@/components/ui/meteors";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode; // Auth form content injected into the layout
}

const AuthLayoutStructure = ({ children }: AuthLayoutProps) => {
  return (
    <>
      {/* Root container: full-screen, centered layout */}
      <div className="flex min-h-screen flex-col items-center justify-center bg-background relative overflow-hidden">
        {/* Animated meteor background layer (visual only) */}
        <div className="absolute h-full w-full inset-0 overflow-hidden pointer-events-none z-20">
          <Meteors />
        </div>

        {/* Grid texture background */}
        <div className="absolute inset-0 bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.05] z-0"></div>

        {/* Radial mask to soften edges and focus center */}
        <div className="absolute inset-0 bg-background mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] z-0"></div>

        {/* Ambient gradient blobs for depth */}
        <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10 z-0"></div>
        <div className="absolute -right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[120px] dark:bg-purple-500/10 z-0"></div>
        <div className="absolute left-1/3 bottom-0 h-[300px] w-[300px] rounded-full bg-blue-500/5 blur-[80px] dark:bg-blue-500/10 z-0"></div>

        {/* Theme toggle button (top-right corner) */}
        <div className="absolute right-4 top-4 flex items-center gap-2 z-10">
          <ToggleButton />
        </div>

        {/* Back navigation to home */}
        <Link
          href="/"
          className="absolute left-4 top-4 flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground z-10"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>

        {/* Brand/logo section with entrance animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Start slightly hidden and lower
          animate={{ opacity: 1, y: 0 }} // Animate into view
          transition={{ duration: 0.5 }} // Smooth transition
          className="mb-8 z-10"
        >
          <Link
            href="/"
            className="group flex items-center gap-3 transition-all duration-300"
          >
            {/* Logo container with subtle glow and hover effects */}
            <div className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-background via-background to-background backdrop-blur-sm overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-primary/10">
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-80"></div>

              <Image
                src={"/logo.svg"}
                alt="Logo"
                width={44}
                height={44}
                className="relative z-10 transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Brand name */}
            <span className="bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
              Flow
              <span className="text-primary/90 font-bold text-4xl ml-1 font-mono">
                X
              </span>
            </span>
          </Link>
        </motion.div>

        {/* Authentication form content */}
        {children}

        {/* Legal disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Start slightly hidden and lower
          animate={{ opacity: 1, y: 0 }} // Animate into view
          transition={{ duration: 0.5, delay: 2 }} // Slight delay after logo
          className="max-w-md mx-auto px-4 z-10"
        >
          <p className="text-center text-xs text-muted-foreground mt-6">
            By signing in, you agree to our{" "}
            <Link
              href="/"
              className="font-medium text-primary underline-offset-4 hover:underline transition-colors"
            >
              Terms of Service
            </Link>
            {" and "}
            <Link
              href="/"
              className="font-medium text-primary underline-offset-4 hover:underline transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default AuthLayoutStructure;
