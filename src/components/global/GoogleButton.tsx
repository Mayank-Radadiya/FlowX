"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
  onClick?: () => void;
};

export default function GoogleButton({ onClick }: Props) {
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={onClick}
      className="
        w-full p-0 overflow-hidden rounded-md shadow-sm hover:shadow-md transition-transform hover:-translate-y-05"
    >
      <div className="flex items-center w-full">
        {/* Google Icon Box */}
        <div className="flex items-center justify-center h-10 w-10 bg-transparent/50 rounded-l-md shadow-sm border-r border-border/40 overflow-hidden">
          <Image
            src="/image/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="block"
          />
        </div>

        {/* Label */}
        <span className="flex-1 text-center text-sm font-medium px-4 font-sans">
          Continue with Google
        </span>

        {/* Arrow Icon */}
        <span className="pr-3">
          <svg
            className="h-4 w-4 text-muted-foreground"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Button>
  );
}
