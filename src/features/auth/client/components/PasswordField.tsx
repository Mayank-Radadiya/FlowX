/**
 * PasswordField Component
 * -----------------------
 * A reusable password input field with built-in visibility toggle.
 *
 * This component enhances a standard input by:
 *  - Displaying a label
 *  - Allowing users to toggle between hidden and visible password text
 *  - Reusing the base Input component for consistent styling
 *
 * It is designed to be used in authentication forms where password
 * entry and confirmation are required.
 */

"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";

interface PasswordFieldProps extends React.ComponentProps<typeof Input> {
  label?: string; // Optional label text for the password field
}

export function PasswordField(props: PasswordFieldProps) {
  /**
   * show
   * ----
   * Local UI state that controls whether the password
   * is displayed as plain text or masked.
   */
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Input label */}
      <Label htmlFor={props.id || "password"} className="text-sm">
        {props.label || "Password"}
      </Label>

      {/* Input wrapper for positioning toggle button */}
      <div className="relative mt-1">
        <Input
          {...props}
          className="h-11 pr-10 bg-background/50 backdrop-blur-sm hover:border-primary/50 focus:border-primary transition-colors"
          type={show ? "text" : "password"} // Toggle input type
        />

        {/* Toggle password visibility button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full"
          onClick={() => setShow((v) => !v)}
        >
          {show ? <EyeOff /> : <Eye />}
        </Button>
      </div>
    </>
  );
}
