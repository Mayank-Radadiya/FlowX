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
        className="space-y-5"
        aria-busy={isSubmitting}
        onSubmit={handleSubmit(handleSignUp)}
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
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Password
          </label>
          <PasswordField {...register("password")} label="Password" />
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Confirm Password
          </label>
          <PasswordField
            {...register("confirmPassword")}
            label="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-10 w-full rounded-xl bg-primary font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 text-white "
        >
          {isSubmitting ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Creating account…
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>
    </>
  );
};

export default SignUpFormFields;
