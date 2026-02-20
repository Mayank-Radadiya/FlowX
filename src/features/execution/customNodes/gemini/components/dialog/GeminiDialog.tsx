/**
 * GeminiDialog Component
 * ----------------------
 * Modal dialog for configuring the Gemini AI node.
 * Clean, professional UI with Radix-safe interaction handling.
 */

"use client";

import { memo, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Sparkles, MessageSquare, Settings2, Wand2, Bot } from "lucide-react";

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { GeminiFormValues } from "./gemini.schema";
import { useGeminiForm } from "./useGeminiForm";
import { AVAILABLE_MODELS, DEFAULT_MODEL } from "./gemini.constants";
import { CredentialSelector } from "@/features/execution/customNodes/shared/CredentialSelector";

interface GeminiDialogProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (values: GeminiFormValues) => void;
  defaultData?: Partial<GeminiFormValues>;
}

export const GeminiDialog = memo(function GeminiDialog({
  open,
  setOpen,
  onSubmit,
  defaultData = {},
}: GeminiDialogProps) {
  const { form, submit } = useGeminiForm({
    defaultData,
    onSubmit,
    onClose: () => setOpen(false),
  });

  const watchVariableName = form.watch("variableName");

  // Reset form when dialog opens
  useEffect(() => {
    if (!open) return;

    form.reset({
      variableName: defaultData.variableName || "",
      model: defaultData.model || DEFAULT_MODEL,
      systemPrompt: defaultData.systemPrompt || "",
      userPrompt: defaultData.userPrompt || "",
      credentialId: defaultData.credentialId || "",
    });
  }, [open, defaultData, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPopup className="max-w-xl w-full">
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-600">
              <Bot className="size-5 text-white" />
            </div>
            Configure Gemini AI
          </DialogTitle>

          <DialogDescription>
            Setup your AI model parameters and prompts.
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={submit}>
          <DialogPanel className="space-y-4 py-4">
            {/* Variable Name */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-white/80">
                <Wand2 className="size-3.5" />
                Output Variable
                <span className="text-red-500">*</span>
              </Label>

              <Input
                {...form.register("variableName")}
                placeholder="gemini_response"
                className={cn(
                  "h-11 rounded-xl border-black/10 dark:border-white/10",
                  "bg-black/2 dark:bg-white/5",
                  "placeholder:text-neutral-400 dark:placeholder:text-white/30",
                  "focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20",
                  "transition-all duration-200",
                  form.formState.errors.variableName && "border-red-500",
                )}
              />

              {form.formState.errors.variableName ? (
                <p className="text-xs text-red-500">
                  {form.formState.errors.variableName.message}
                </p>
              ) : (
                <p className="text-xs text-neutral-500 dark:text-white/40">
                  Access result as{" "}
                  <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[11px]">
                    {`{{${watchVariableName || "variableName"}.data}}`}
                  </code>
                </p>
              )}
            </div>

            {/* Model Selection */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-white/80">
                <Sparkles className="size-3.5" />
                Model
                <span className="text-red-500">*</span>
              </Label>

              <Controller
                control={form.control}
                name="model"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={cn(
                        "py-6 px-4 rounded-xl border-black/10 dark:border-white/10",
                        "bg-black/2 dark:bg-white/5",
                        "focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20",
                        "transition-all duration-200",
                      )}
                    >
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>

                    <SelectContent className="rounded-xl border-black/10 dark:border-white/10">
                      {AVAILABLE_MODELS.map((model) => (
                        <SelectItem
                          key={model.value}
                          value={model.value}
                          className="cursor-pointer rounded-lg my-0.5"
                        >
                          <div className="flex flex-col gap-0.5 py-0.5">
                            <span className="font-medium">{model.label}</span>
                            <span className="text-xs text-muted-foreground">
                              {model.description}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {form.formState.errors.model && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.model.message}
                </p>
              )}
            </div>

            {/* System Instructions */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-white/80">
                <Settings2 className="size-3.5" />
                System Instructions
                <span className="text-xs font-normal text-neutral-400 dark:text-white/40">
                  (optional)
                </span>
              </Label>

              <textarea
                {...form.register("systemPrompt")}
                rows={3}
                placeholder="You are a helpful assistant..."
                className={cn(
                  "w-full rounded-xl border px-3 py-2.5 text-sm",
                  "border-black/10 dark:border-white/10",
                  "bg-black/2 dark:bg-white/5",
                  "placeholder:text-neutral-400 dark:placeholder:text-white/30",
                  "focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none",
                  "transition-all duration-200 resize-none",
                )}
              />

              <p className="text-xs text-neutral-500 dark:text-white/40">
                Define the AI&apos;s behavior and constraints.
              </p>
            </div>

            {/* User Prompt */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-white/80">
                <MessageSquare className="size-3.5" />
                User Prompt
                <span className="text-red-500">*</span>
              </Label>

              <textarea
                {...form.register("userPrompt")}
                rows={3}
                placeholder="Analyze the data and provide insights..."
                className={cn(
                  "w-full rounded-xl border px-3 py-2.5 text-sm",
                  "border-black/10 dark:border-white/10",
                  "bg-black/2 dark:bg-white/5",
                  "placeholder:text-neutral-400 dark:placeholder:text-white/30",
                  "focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none",
                  "transition-all duration-200 resize-y min-h-[100px]",
                  form.formState.errors.userPrompt &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                )}
              />

              {form.formState.errors.userPrompt ? (
                <p className="text-xs text-red-500">
                  {form.formState.errors.userPrompt.message}
                </p>
              ) : (
                <p className="text-xs text-neutral-500 dark:text-white/40">
                  Use{" "}
                  <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[11px]">
                    {"{{variableName.data.text}}"}
                  </code>{" "}
                  to reference data from previous nodes.
                </p>
              )}
            </div>

            {/* Credential Selector */}
            <CredentialSelector
              credentialType="GEMINI"
              formState={form.formState}
              control={form.control}
              name="credentialId"
              accentColor="indigo"
            />
          </DialogPanel>

          {/* Footer */}
          <DialogFooter>
            <DialogClose className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200">
              Cancel
            </DialogClose>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="h-10 rounded-xl bg-linear-to-r from-indigo-500 to-violet-600 text-white hover:from-indigo-600 hover:to-violet-700 shadow-lg shadow-indigo-500/25 transition-all duration-200"
            >
              {form.formState.isSubmitting ? (
                <>
                  <span className="size-3 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 size-4" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  );
});
