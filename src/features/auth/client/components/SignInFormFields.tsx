/**
 * SignInFormFields Component
 * -------------------------
 * Handles the complete sign-in form logic:
 *  - Form state management and validation
 *  - Email/password authentication
 *  - Error handling and user feedback
 *  - Redirect after successful login
 *
 * This component focuses on behavior and data handling.
 * Layout, animation, and surrounding UI are handled by parent components.
 */

"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { SignInFormType, signInZodSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Link from "next/link";
import { PasswordField } from "./PasswordField";

const SignInFormFields = () => {
  const router = useRouter();

  /**
   * react-hook-form setup
   * ---------------------
   * - handleSubmit → wraps submit handler
   * - register → connects inputs to form state
   * - errors → validation errors from Zod
   * - isSubmitting → true while async submit is running
   *
   * Zod schema is used as the single source of truth
   * for validation rules.
   */
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * handleSignIn
   * ------------
   * Called after successful form validation.
   *
   * Flow:
   *  1. Call Better Auth email sign-in API
   *  2. Show success or error toast
   *  3. Redirect user on success
   */
  const handleSignIn = useCallback(
    async (data: SignInFormType) => {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            toast.success("Signed in successfully!");
            router.push("/workflow");
          },
          onError: (ctx) => {
            toast.error(
              `Sign in failed: ${ctx.error?.message || "Something went wrong."}`,
            );
          },
        },
      );
    },
    [router],
  );

  return (
    <form
      className="space-y-5"
      aria-busy={isSubmitting}
      onSubmit={handleSubmit(handleSignIn)}
    >
      {/* Email */}
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
        >
          Email
        </label>
        <Input
          id="email"
          {...register("email")}
          type="email"
          placeholder="name@example.com"
          required
          className="h-10 bg-background/50 border-border/60 hover:border-border focus:border-primary/70 transition-colors  mt-1.5"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
          >
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs text-primary hover:text-primary/80 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <PasswordField {...register("password")} id="password" />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-10 w-full rounded-xl bg-primary font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 text-white"
      >
        {isSubmitting ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
};

export default SignInFormFields;
