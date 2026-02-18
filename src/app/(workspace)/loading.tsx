"use client";

import { PageLoader } from "@/components/global/pageLoader/Loader";

export default function Loading() {
  return (
    <div className="flex items-center justify-center z-50 pt-80">
      <PageLoader message="Loading..." />
    </div>
  );
}
