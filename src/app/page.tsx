"use client";

import { ToggleButton } from "@/components/global/ToggleButton";
import { inngest } from "@/inngest/client";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC();
  const testAi = useMutation(trpc.testAi.mutationOptions());

  return (
    <>
      <div className="flex items-center gap-2 flex-col">
        <ToggleButton />
        <button onClick={() => testAi.mutate()}> Test AI</button>
        {JSON.stringify(testAi.data)}
      </div>
    </>
  );
}
