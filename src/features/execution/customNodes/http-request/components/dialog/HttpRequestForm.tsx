"use client";

import { Label } from "@/components/ui/label";
import { HttpRequestFormValues } from "./http-request.schema";
import { Baseline, FileText, Globe, Code } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Controller, UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface HttpRequestFormProps {
  submit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  showBody: boolean;
  form: UseFormReturn<HttpRequestFormValues>;
}

export function HttpRequestForm({
  submit,
  showBody,
  form,
}: HttpRequestFormProps) {
  return (
    <>
      <form onSubmit={submit} className="space-y-5 px-6 py-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2 font-medium text-sm">
            <Baseline className="size-5 text-primary" />
            Variable Name
          </Label>

          <Input
            {...form.register("variableName")}
            placeholder="My_API_Call"
            className="h-11 rounded-xl border-neutral-300 dark:border-neutral-700"
          />

          {form.formState.errors.variableName && (
            <p className="text-xs text-red-500">
              {form.formState.errors.variableName.message}
            </p>
          )}
        </div>
        <DialogDescription className="text-xs text-muted-foreground -mt-1">
          Use this variable to store the response data from the HTTP request and
          it will be available in the next nodes. In next node use this variable
          to access the response data{" "}
          {`{{${form.watch("variableName")}.httpResponse.data}}`}
        </DialogDescription>
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

        {/* Request Body */}
        {showBody && (
          <>
            <DialogDescription>
              Use Static URl, Dynamic Variables like{" "}
              {"{{previousNode.outputKey}}"} in URL and use{" "}
              {"{{json variable}}"} to stringify Object body.
            </DialogDescription>
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
          </>
        )}

        {/* ------------------------------------------------- */}
        {/* FOOTER */}
        {/* ------------------------------------------------- */}
        <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <DialogClose>
            <div className="rounded-xl border px-3 py-2 text-sm">Cancel</div>
          </DialogClose>

          <Button
            type="submit"
            className="rounded-xl bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20"
          >
            {form.formState.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </>
  );
}
