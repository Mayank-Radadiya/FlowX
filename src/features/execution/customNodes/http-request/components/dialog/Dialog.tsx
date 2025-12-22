"use client";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogTitle,
} from "@/components/ui/dialog";
import { memo, useEffect } from "react";
import { Server } from "lucide-react";
import { cn } from "@/lib/utils";
import { HttpRequestFormValues } from "../http-request.schema";
import { useHttpRequestForm } from "./useHttpRequestForm";
import { HttpRequestForm } from "./HttpRequestForm";

// ---------------------------------------------------------
// Component
// ---------------------------------------------------------
interface HttpRequestDialogProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (values: HttpRequestFormValues) => void;
  defaultData?: Partial<HttpRequestFormValues>;
}

export const HttpRequestDialog = memo(
  ({ open, setOpen, onSubmit, defaultData = {} }: HttpRequestDialogProps) => {
    const { form, submit, showBody } = useHttpRequestForm({
      defaultData,
      onSubmit,
      onClose: () => setOpen(false),
    });

    useEffect(() => {
      if (open) {
        form.reset({
          variableName: defaultData.variableName || "",
          endpointUrl: defaultData.endpointUrl || "",
          method: defaultData.method || "GET",
          body: defaultData.body || "",
        });
      }
    }, [open, defaultData, form]);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPopup
          className={cn(
            "max-w-md rounded-2xl shadow-2xl",
            "bg-white dark:bg-neutral-900",
            "border border-neutral-200 dark:border-neutral-700"
          )}
        >
          {/* ------------------------------------------------- */}
          {/* Header */}
          {/* ------------------------------------------------- */}
          <DialogHeader className="space-y-3">
            <DialogTitle className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/30">
                <Server className="size-6 text-white" />
              </div>

              <div className="flex flex-col">
                <span className="text-lg font-semibold">HTTP Request</span>
                <span className="text-xs text-muted-foreground">
                  Configure your HTTP request node
                </span>
              </div>
            </DialogTitle>

            <DialogDescription className="text-sm text-muted-foreground">
              Set up the API endpoint, request method, variable name and
              optional request body. This will define how your workflow
              communicates with external services.
            </DialogDescription>
          </DialogHeader>

          {/* ------------------------------------------------- */}
          {/* FORM */}
          {/* ------------------------------------------------- */}
          <HttpRequestForm form={form} submit={submit} showBody={showBody} />
        </DialogPopup>
      </Dialog>
    );
  }
);
