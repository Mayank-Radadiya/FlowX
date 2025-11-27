"use client";

import { ToggleButton } from "@/components/global/ToggleButton";
import { inngest } from "@/inngest/client";

export default function Home() {
  const handle = async () => {
    await inngest.send({
      name: "test/hello.world",
      data: { email: "hello@gail.com" },
    });
  };

  return (
    <>
      <div className="flex items-center gap-2 flex-col">
        <ToggleButton />
        <button onClick={() => handle()}>Start</button>
      </div>
    </>
  );
}
