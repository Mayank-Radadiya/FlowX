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
import { Label } from "@/components/ui/label";
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
              `Sign in failed: ${ctx.error?.message || "Something went wrong."}`
            );
          },
        }
      );
    },
    [router]
  );

  return (
    <form
      className="space-y-4"
      aria-busy={isSubmitting}
      onSubmit={handleSubmit(handleSignIn)}
    >
      {/* ---------------- Email Field ---------------- */}
      <div className="space-y-2 text-sm">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          {...register("email")}
          type="email"
          placeholder="name@example.com"
          required
          className="h-11 bg-background/50 backdrop-blur-sm hover:border-primary/50 focus:border-primary transition-colors mt-1.5"
          aria-invalid={!!errors.email}
        />

        {/* Email validation error */}
        {errors.email && (
          <p className="text-xs text-destructive mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* ---------------- Password Field ---------------- */}
      <div className="space-y-2">
        <div className="relative">
          <PasswordField {...register("password")} id="password" />
        </div>

        {/* Forgot password link */}
        <div className="w-full flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs text-primary hover:underline underline-offset-4"
          >
            Forgot password?
          </Link>
        </div>

        {/* Password validation error */}
        {errors.password && (
          <p className="text-xs text-destructive mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* ---------------- Submit Button ---------------- */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-10 w-full rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 bg-linear-to-r from-primary to-primary/90 font-medium relative overflow-hidden group mt-2 text-white"
      >
        {/* Animated shimmer background */}
        <span className="absolute top-0 w-12 h-full bg-white/20 transform -translate-x-full skew-x-[-20deg] group-hover:translate-x-[750%] transition-transform duration-2000"></span>
        <span className="absolute top-0 -left-5 w-12 h-full bg-white/20 transform -translate-x-full skew-x-[-20deg] group-hover:translate-x-[350%] transition-transform duration-3000"></span>

        {/* Button content */}
        {isSubmitting ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
};

export default SignInFormFields;
