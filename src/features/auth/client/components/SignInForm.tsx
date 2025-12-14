/**
 * SignInForm Component
 * -------------------
 * Wrapper component for rendering the sign-in form inside a styled
 * authentication card with entrance animation.
 *
 * Responsibilities:
 *  - Apply entry animation using Framer Motion
 *  - Provide the correct AuthCard configuration for sign-in
 *  - Render the actual sign-in form fields
 *
 * This component focuses purely on presentation and layout,
 * while authentication logic is handled inside SignInFormFields.
 */

"use client";

import { motion } from "framer-motion";
import AuthCard from "./AuthCard";
import SignInFormFields from "./SignInFormFields";

const SignInForm = () => {
  return (
    <div>
      {/* Animated container for smooth entrance */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}     // Start hidden and slightly lower
        animate={{ opacity: 1, y: 0 }}      // Fade in and move upward
        transition={{ duration: 0.5, delay: 0.2 }} // Controlled timing for smooth UX
        className="w-full max-w-md relative z-10"
      >
        {/* AuthCard provides layout, title, OAuth, and navigation */}
        <AuthCard formType="sign-in">
          {/* Actual form inputs and submit logic */}
          <SignInFormFields />
        </AuthCard>
      </motion.div>
    </div>
  );
};

export default SignInForm;
