// Status variants
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export const nodeStatusVariants = {
  default: { border: undefined, icon: null as React.ReactNode  },
  loading: {
    border: "border-blue-400",
    icon: <Loader2 className="size-5 animate-spin text-blue-500" />,
  },
  success: {
    border: "border-emerald-500",
    icon: <CheckCircle2 className="size-5 text-emerald-500" />,
  },
  error: {
    border: "border-red-500",
    icon: <AlertCircle className="size-5 text-red-500" />,
  },
};
