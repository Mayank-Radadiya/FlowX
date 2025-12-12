import { Loader } from "@/components/global/Loader";

export const EditorLoader = () => {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center gap-6">
      <h1 className="text-xl font-mono"> Loading workflow...</h1>
      <Loader />
    </div>
  );
};
