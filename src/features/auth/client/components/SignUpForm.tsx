/**
 * SignUpForm Component
 * -------------------
 * Wrapper component for rendering the sign-up form inside a styled
 * authentication card with an entrance animation.
 *
 * Responsibilities:
 *  - Animate the sign-up form on mount
 *  - Provide AuthCard with sign-up–specific configuration
 *  - Render the actual sign-up form fields
 *
 * All authentication logic (validation, submission) is handled
 * inside SignUpFormFields.
 */

"use client";

import { motion } from "framer-motion";
import AuthCard from "./AuthCard";
import SignUpFormFields from "./SignUpFormFields";

const SignUpForm = () => {
  return (
    <div className="">
      {/* Animated container for smooth entry */}
      <motion.div
        initial={{ opacity: 0, y: 40 }} // Start hidden and lower
        animate={{ opacity: 1, y: 0 }} // Fade in and slide upward
        transition={{ duration: 0.5, delay: 0.2 }} // Smooth entrance timing
        className="w-full max-w-[480px] relative z-10"
      >
        {/* AuthCard switches UI copy and links for sign-up */}
        <AuthCard formType="sign-up">
          {/* Sign-up form inputs and submission logic */}
          <SignUpFormFields />
        </AuthCard>
      </motion.div>
    </div>
  );
};

export default SignUpForm;
