import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <>
      <div className="flex gap-2 ">
        <Loader className="animate-spin h-6 w-6 text-gray-600 " />
        <p className="text-foreground">Loading ...</p>
      </div>
    </>
  );
}
