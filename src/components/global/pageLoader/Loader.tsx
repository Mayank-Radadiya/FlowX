"use client";
import React from "react";
import Image from "next/image";
import { Loader } from "lucide-react";

interface LoaderProps {
  message?: string;
}

export const PageLoader: React.FC<LoaderProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
      <div className="relative animate-pulse">
        <Image
          src="/logo.svg"
          alt="FlowX Logo"
          width={60}
          height={60}
          className="animate-bounce"
          style={{
            animationDuration: "2s",
            filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))",
          }}
        />
      </div>
      {message && (
        <p className="text-center flex items-center text-muted-foreground mt-4 animate-pulse gap-3">
          <Loader className="animate-spin" />
          {message}
        </p>
      )}
    </div>
  );
};
