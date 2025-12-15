"use client";

import { cn } from "@/lib/utils";
import { Loader2, Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className,
  debounceMs = 400,
}: SearchBarProps) {
  const [input, setInput] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [isPending, startTransition] = useTransition();

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  /* ------------------------------------------
     Sync external value → local input
     ------------------------------------------ */
  useEffect(() => {
    setInput(value);
  }, [value]);

  /* ------------------------------------------
     Debounced search effect
     ------------------------------------------ */
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (input !== value) {
        startTransition(() => onChange(input));
      }
    }, debounceMs);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [input, value, debounceMs, onChange]);

  /* ------------------------------------------
     Clear handler
     ------------------------------------------ */
  const handleClear = useCallback(() => {
    setInput("");
    startTransition(() => onChange(""));
  }, [onChange]);

  return (
    <div className={cn("relative w-full sm:w-72", className)}>
      <div
        className={cn(
          "group flex h-10 items-center gap-2 rounded-xl px-3",
          "bg-background/80 backdrop-blur-sm",
          "border border-border/50",
          "transition-all duration-200",
          isFocused
            ? "border-primary/50 ring-2 ring-primary/10"
            : "hover:border-border"
        )}
      >
        {/* Icon */}
        {isPending ? (
          <Loader2 className="size-4 animate-spin text-primary" />
        ) : (
          <Search
            className={cn(
              "size-4 transition-colors",
              isFocused
                ? "text-primary"
                : "text-muted-foreground group-hover:text-foreground/70"
            )}
          />
        )}

        {/* Input */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
        />

        {/* Clear button */}
        {input && (
          <button
            type="button"
            onClick={handleClear}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {/* Shortcut hint */}
      {!input && !isFocused && (
        <div className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 text-[10px] text-muted-foreground/50 sm:flex">
          <kbd className="rounded border border-border/50 bg-muted/50 px-1.5 py-0.5 font-mono">
            ⌘K
          </kbd>
        </div>
      )}
    </div>
  );
}
