/**
 * Client-side theme toggle button that switches between light and dark mode.
 * Includes view-transition animations and persists the user's preference.
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { flushSync } from "react-dom";
import { Toggle } from "@radix-ui/react-toggle";
import { cn } from "@/lib/utils";

export const ToggleButton = ({ className }: { className?: string }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Load saved theme on component mount
  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;

    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = stored ?? (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);

    // Apply the theme to the <html> element
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  /**
   * Main toggle handler.
   * Uses the View Transitions API (when available) to animate the theme switch.
   * Falls back gracefully on unsupported browsers.
   */
  const toggleTheme = useCallback(async () => {
    if (!document.startViewTransition || !buttonRef.current) {
      // Fallback for browsers without View Transitions API
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      localStorage.setItem("theme", newTheme);
      return;
    }

    const newTheme = theme === "dark" ? "light" : "dark";

    // Start transition
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
      });
    });

    await transition.ready;

    // Calculate animation center based on button location
    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Animate a circular reveal effect
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 450,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [theme]);

  return (
    <Toggle
      ref={buttonRef}
      aria-label="Toggle theme"
      pressed={theme === "dark"}
      onPressedChange={toggleTheme}
      className={cn(
        "group size-9 flex items-center justify-center rounded-full",
        "bg-muted/40 backdrop-blur-xl ring-1 ring-border/40",
        "transition-all duration-300",
        "hover:bg-muted/60 hover:ring-border/60",
        "data-[state=on]:bg-muted/20 data-[state=on]:hover:bg-muted/40",
        "shadow-[0_2px_6px_rgba(0,0,0,0.15)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.4)]",
        className
      )}
    >
      {/* Dark Mode Icon */}
      <div className="hidden dark:flex items-center justify-center transition-all duration-300">
        <MoonIcon
          size={16}
          className="text-foreground/80 group-data-[state=on]:scale-110 transition-transform"
        />
      </div>

      {/* Light Mode Icon */}
      <div className="flex dark:hidden items-center justify-center transition-all duration-300">
        <SunIcon
          size={16}
          className="text-foreground/80 group-data-[state=on]:scale-110 transition-transform"
        />
      </div>
    </Toggle>
  );
};
