/**
 * SearchBar Component
 * -------------------
 * A reusable, debounced search input with:
 *  - Smooth focus/blur animations
 *  - Debounced value updates to avoid excessive re-renders or API calls
 *  - Built-in loading state via React’s `useTransition`
 *  - Clear button & keyboard shortcut hint
 *
 * Usage:
 * <SearchBar value={search} onChange={setSearch} />
 *
 * The parent component controls the actual search state.
 * This component only manages local typing + debouncing before calling `onChange`.
 */

"use client";

import { cn } from "@/lib/utils";
import { Loader2, Search, X } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";

interface SearchBarProps {
  value: string;                // External value controlled by parent
  onChange: (value: string) => void; // Called after debounce for search updates
  placeholder?: string;
  className?: string;
  debounceMs?: number;          // How long to debounce typing
}

/* ------------------------------------------------
   useDebouncedValue Hook
   --------------------------------------------------
   Purpose:
   Takes a value and returns a debounced version of it.
   The returned value only updates AFTER the delay passes.

   Logic:
   - Start a timer whenever `value` changes
   - After `delay` ms, update the debounced value
   - Clean up the timer to prevent memory leaks

   Usage:
   const debounced = useDebouncedValue(searchTerm, 400);
-------------------------------------------------- */
function useDebouncedValue(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  className,
  debounceMs = 400,
}: SearchBarProps) => {

  // Local state for typing before debounce triggers
  const [localValue, setLocalValue] = useState(value);

  // Track async UI states during transitions
  const [isPending, startTransition] = useTransition();

  // Track focus to animate border/glow
  const [isFocused, setIsFocused] = useState(false);

  // Debounced version of localValue
  const debounced = useDebouncedValue(localValue, debounceMs);

  /* ------------------------------------------
     Sync external value into local input field
     ------------------------------------------
     This ensures that if the parent updates the
     `value` prop (e.g., resetting search), the
     input visually updates.
  ------------------------------------------- */
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  /* ------------------------------------------
     Trigger onChange AFTER debounce
     ------------------------------------------
     - If debounced value differs from external value:
         → call onChange inside a transition
     - Prevents firing onChange on every keystroke
  ------------------------------------------- */
  useEffect(() => {
    if (debounced !== value) {
      startTransition(() => onChange(debounced));
    }
  }, [debounced, value, onChange, startTransition]);

  /* ------------------------------------------
     Clear search input
     ------------------------------------------
     Resets both local and external state
  ------------------------------------------- */
  const handleClear = useCallback(() => {
    setLocalValue("");
    startTransition(() => onChange(""));
  }, [onChange]);

  return (
    <div
      className={cn(
        "group relative flex items-center w-full sm:w-72",
        className
      )}
    >
      {/* Outer container with animated border & shadow */}
      <div
        className={cn(
          "relative flex w-full items-center overflow-hidden rounded-xl",
          "bg-background/80 backdrop-blur-sm",
          "border border-border/50",
          "shadow-sm",
          "transition-all duration-300 ease-out",
          isFocused && [
            "border-primary/50",
            "shadow-md shadow-primary/5",
            "ring-2 ring-primary/10",
          ],
          !isFocused && "hover:border-border hover:shadow-md"
        )}
      >
        {/* Icon container (loader or search icon) */}
        <div
          className={cn(
            "flex items-center justify-center pl-3.5 pr-1",
            "transition-colors duration-200"
          )}
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin text-primary" />
          ) : (
            <Search
              className={cn(
                "size-4 transition-colors duration-200",
                isFocused ? "text-primary" : "text-muted-foreground",
                !isFocused && "group-hover:text-foreground/70"
              )}
            />
          )}
        </div>

        {/* Text input field */}
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            "h-10 w-full bg-transparent px-2 py-2",
            "text-sm text-foreground placeholder:text-muted-foreground/60",
            "outline-none",
            "transition-all duration-200"
          )}
        />

        {/* Clear button (shows only when input has content) */}
        <div
          className={cn(
            "flex items-center pr-2 transition-all duration-200",
            localValue ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              "flex items-center justify-center rounded-md p-1.5",
              "text-muted-foreground",
              "transition-all duration-200",
              "hover:bg-muted hover:text-foreground",
              "active:scale-95"
            )}
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Keyboard shortcut hint (⌘K) */}
      {!isFocused && !localValue && (
        <div
          className={cn(
            "pointer-events-none absolute right-3",
            "hidden items-center gap-1 sm:flex",
            "text-[10px] text-muted-foreground/50"
          )}
        >
          <kbd
            className={cn(
              "rounded border border-border/50 bg-muted/50 px-1.5 py-0.5",
              "font-mono font-medium"
            )}
          >
            ⌘K
          </kbd>
        </div>
      )}
    </div>
  );
};
