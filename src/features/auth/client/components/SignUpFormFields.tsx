/**
 * SignUpFormFields Component
 * -------------------------
 * Handles the complete sign-up form logic:
 *  - Form state and validation using react-hook-form + Zod
 *  - Password and confirm-password matching
 *  - Account creation via Better Auth
 *  - User feedback with loading state and toasts
 *  - Redirect after successful registration
 *
 * This component focuses purely on behavior and validation.
 * Layout and animation are handled by the parent SignUpForm component.
 */

"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { SignUpFormType, signUpZodSchema } from "../../schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PasswordField } from "./PasswordField";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const SignUpFormFields = () => {
  const router = useRouter();

  /**
   * react-hook-form setup
   * ---------------------
   * - Uses Zod as the validation source
   * - Tracks submission and validation state
   * - Prevents invalid data from being sent to the backend
   */
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpZodSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  /**
   * handleSignUp
   * ------------
   * Executes after successful validation.
   *
   * Flow:
   *  1. Call Better Auth sign-up API
   *  2. Create user with email/password
   *  3. Show success or error toast
   *  4. Redirect user on success
   */
  const handleSignUp = useCallback(
    async (data: SignUpFormType) => {
      await authClient.signUp.email(
        {
          name: data.email, // Temporary display name
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
            toast.error(`Sign in failed: ${ctx.error.message}`);
          },
        },
      );
    },
    [router],
  );

  return (
    <>
      <form
        className="space-y-4"
        aria-busy={isSubmitting}
        onSubmit={handleSubmit(handleSignUp)}
      >
        {/* ---------------- Email Field ---------------- */}
        <div className="space-y-2">
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

          {errors.email && (
            <p className="text-xs text-destructive mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* ---------------- Password Field ---------------- */}
        <div className="space-y-2">
          <PasswordField {...register("password")} label="Password" />

          {errors.password && (
            <p className="text-xs text-destructive mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* ---------------- Confirm Password Field ---------------- */}
        <div className="space-y-2">
          <PasswordField
            {...register("confirmPassword")}
            label="Confirm Password"
          />

          {errors.confirmPassword && (
            <p className="text-xs text-destructive mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Placeholder for CAPTCHA or bot protection */}
        <div id="clerk-captcha" className="mt-5" />

        {/* ---------------- Submit Button ---------------- */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-10 w-full rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 bg-linear-to-r from-primary to-primary/90 font-medium relative overflow-hidden group mt-4 text-white"
        >
          {/* Animated shimmer effect */}
          <span className="absolute top-0 w-12 h-full bg-white/20 transform -translate-x-full skew-x-[-20deg] group-hover:translate-x-[750%] transition-transform duration-2000"></span>
          <span className="absolute top-0 -left-5 w-12 h-full bg-white/20 transform -translate-x-full skew-x-[-20deg] group-hover:translate-x-[350%] transition-transform duration-3000"></span>

          {/* Button content */}
          {isSubmitting ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Sign up"
          )}
        </Button>
      </form>
    </>
  );
};

export default SignUpFormFields;
