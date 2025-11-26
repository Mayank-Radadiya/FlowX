/**
 * Wraps the application with global UI providers, including theme management
 * and toast notifications. Applies consistent styling for all toast messages.
 */

"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/* Global toast notifications with custom styling */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--toast-bg)",
            color: "var(--toast-text)",
            boxShadow: "var(--toast-shadow)",
            backdropFilter: "var(--toast-blur)",
            WebkitBackdropFilter: "var(--toast-blur)",
            border: "1px solid var(--toast-border)",
            borderRadius: "14px",
            padding: "10px 14px",
            fontSize: "15px",
            fontWeight: "500",
            lineHeight: "1.5",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s ease",
          },
          success: { duration: 4000 },
          error: { duration: 6000 },
        }}
      />

      {/* Render the app's content */}
      {children}
    </ThemeProvider>
  );
}
