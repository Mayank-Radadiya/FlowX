"use client";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { memo, useCallback, useEffect } from "react";
import { FileText, Globe, Server, Code } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  HttpRequestFormValues,
  httpRequestSchema,
} from "./http-request.schema";

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
    const form = useForm<HttpRequestFormValues>({
      resolver: zodResolver(httpRequestSchema),
      defaultValues: {
        endpointUrl: defaultData.endpointUrl || "",
        method: defaultData.method || "GET",
        body: defaultData.body || "",
      },
    });

    const watchMethod = form.watch("method");
    const METHODS_WITH_BODY = new Set(["POST", "PUT", "PATCH"]);

    const showBodyField = METHODS_WITH_BODY.has(watchMethod);

    const handleSubmit = (data: HttpRequestFormValues) => {
      onSubmit(data);
      setOpen(false);
    };

    useEffect(() => {
      if (open) {
        form.reset({
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
              Set up the API endpoint, request method, and optional request
              body. This will define how your workflow communicates with
              external services.
            </DialogDescription>
          </DialogHeader>

          {/* ------------------------------------------------- */}
          {/* FORM */}
          {/* ------------------------------------------------- */}
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 px-6 py-4"
          >
            {/* Endpoint URL */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 font-medium text-sm">
                <Globe className="size-4 text-primary" />
                Endpoint URL
              </Label>

              <Input
                {...form.register("endpointUrl")}
                placeholder="https://api.example.com/v1/data"
                className="h-11 rounded-xl border-neutral-300 dark:border-neutral-700"
              />

              {form.formState.errors.endpointUrl && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.endpointUrl.message}
                </p>
              )}
            </div>

            {/* HTTP Method */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 font-medium text-sm">
                <FileText className="size-4 text-primary" />
                Method
              </Label>

              <Controller
                control={form.control}
                defaultValue={defaultData?.method || "GET"}
                name="method"
                render={({ field }) => (
                  <div className="space-y-1">
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                        <SelectItem value="PATCH">PATCH</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.method && (
                      <p className="text-xs text-red-500">
                        {form.formState.errors.method.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <DialogDescription>
              Use Static URl, Dynamic Variables like{" "}
              {"{{previousNode.outputKey}}"} in URL and use{" "}
              {"{{json variable}}"} to stringify Object body.
            </DialogDescription>

            {/* Request Body */}
            {showBodyField && (
              <div className="space-y-2">
                <Label className="flex items-center gap-2 font-medium text-sm">
                  <Code className="size-4 text-primary" />
                  Request Body (JSON)
                </Label>

                <textarea
                  {...form.register("body")}
                  rows={5}
                  placeholder={`{\n  "userId": "{{ httpResponse.userId }}",  \n "email": "{{ httpResponse.email }}",\n "status": "active"\n}`}
                  className={cn(
                    "w-full rounded-xl border px-3 py-2.5 text-sm resize-none h-32",
                    "border-neutral-300 dark:border-neutral-700",
                    "bg-neutral-50 dark:bg-neutral-800"
                  )}
                />
              </div>
            )}

            {/* ------------------------------------------------- */}
            {/* FOOTER */}
            {/* ------------------------------------------------- */}
            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <DialogClose>
                <div className="rounded-xl border px-3 py-2 text-sm">
                  Cancel
                </div>
              </DialogClose>

              <Button
                type="submit"
                className="rounded-xl bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20"
              >
                Save
              </Button>
            </div>
          </form>
        </DialogPopup>
      </Dialog>
    );
  }
);
