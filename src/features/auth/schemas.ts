/**
 * Authentication Validation Schemas
 * ---------------------------------
 * Centralized Zod schemas for validating authentication forms.
 *
 * This file defines:
 *  - Sign-in form validation rules
 *  - Sign-up form validation rules
 *  - Strongly typed TypeScript types inferred from schemas
 *
 * These schemas act as the single source of truth for:
 *  - Client-side validation
 *  - Form type safety
 *  - Error message consistency
 */

import z from "zod";

/**
 * signInZodSchema
 * ----------------
 * Validation rules for the sign-in form.
 *
 * Rules:
 *  - Email must be a valid email format
 *  - Email cannot be empty
 *  - Password must be at least 8 characters
 */
export const signInZodSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

/**
 * SignInFormType
 * --------------
 * TypeScript type automatically inferred from the sign-in schema.
 *
 * Ensures:
 *  - Form data matches validation structure
 *  - End-to-end type safety between UI and submission logic
 */
export type SignInFormType = z.infer<typeof signInZodSchema>;

/**
 * signUpZodSchema
 * ----------------
 * Validation rules for the sign-up form.
 *
 * Rules:
 *  - Email must be valid and non-empty
 *  - Password must meet minimum length
 *  - Confirm password must be present
 *  - Password and confirm password must match
 */
export const signUpZodSchema = z
  .object({
    email: z.email("Invalid email").min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })

  /**
   * Cross-field validation
   * ----------------------
   * Ensures password and confirmPassword match.
   *
   * - Runs after individual field validation
   * - Attaches error directly to confirmPassword field
   */
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match. Please check both fields. ",
    path: ["confirmPassword"],
  });

/**
 * SignUpFormType
 * --------------
 * TypeScript type inferred from the sign-up schema.
 *
 * Guarantees:
 *  - Confirmed password matching at type level
 *  - Strong typing for form submission handlers
 */
export type SignUpFormType = z.infer<typeof signUpZodSchema>;
