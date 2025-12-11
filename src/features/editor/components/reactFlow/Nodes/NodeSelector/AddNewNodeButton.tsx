"use client";

import { BadgePlus } from "lucide-react";
import { NodeSelector } from "./NodeSelector";

const AddNewNodeButton = () => {
  // const [open, setOpen] = useState(false);
  return (
    <>
      <NodeSelector >
        <button
          className="group flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-violet-600 to-violet-500 text-white text-sm font-medium rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 hover:from-violet-500 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 active:scale-[0.98] transition-all duration-200"

        >
          <BadgePlus className="size-4 transition-transform duration-200 group-hover:rotate-90" />
          Add Node
        </button>
      </NodeSelector>
    </>
  );
};

export default AddNewNodeButton;
