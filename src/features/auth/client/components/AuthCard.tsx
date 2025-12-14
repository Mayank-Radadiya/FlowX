/**
 * AuthCard Component
 * ------------------
 * A reusable authentication layout wrapper used for both
 * sign-in and sign-up screens.
 *
 * This component:
 *  - Displays a styled card container
 *  - Shows dynamic headings and descriptions based on form type
 *  - Renders form content via `children`
 *  - Includes OAuth login (Google)
 *  - Provides navigation links between sign-in and sign-up flows
 *
 * The component focuses purely on layout and UX,
 * while the actual form logic is injected as children.
 */

import GoogleButton from "@/components/global/GoogleButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface AuthCardProps {
  children: React.ReactNode; // Auth form content (inputs, buttons, etc.)
  formType: "sign-in" | "sign-up"; // Determines text and navigation behavior
}

/**
 * Configuration for Sign-In UI
 * ----------------------------
 * Centralizes all copy and link data for the sign-in screen.
 */
const signInFormProps = {
  heading: "Welcome Back!",
  description: "Sign in to continue to Flow-X",

  providerDividerText: "Or continue with",

  LinkDividerText: "New to Flow-X?",

  LinkPrompt: "Don't have an account?",
  LinkContent: "Create account",
  LinkHref: "/sign-up",
};

/**
 * Configuration for Sign-Up UI
 * ----------------------------
 * Centralizes all copy and link data for the sign-up screen.
 */
const signUpFormProps = {
  heading: "Create Your Account",
  description: "Sign up to get started with Flow-X",

  providerDividerText: "Or signUp with",

  LinkDividerText: "Already have an account?",

  LinkPrompt: "Sign in instead?",
  LinkContent: "Sign in",
  LinkHref: "/sign-in",
};

const AuthCard = ({ children, formType }: AuthCardProps) => {
  /**
   * Select UI configuration based on form type.
   * This avoids conditional rendering scattered throughout JSX
   * and keeps the component clean and readable.
   */
  const {
    heading,
    description,
    providerDividerText,
    LinkDividerText,
    LinkPrompt,
    LinkContent,
    LinkHref,
  } = formType === "sign-in" ? signInFormProps : signUpFormProps;

  return (
    <>
      <Card className="border w-[470px] hover:border-white/30 transition-all duration-500 shadow-xl backdrop-blur-lg bg-background/20 bg-opacity-90 z-88">
        {/* Header section: title + subtitle */}
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold bg-linear-to-br from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
            {heading}
          </CardTitle>

          <CardDescription className="text-muted-foreground/90">
            {description}
          </CardDescription>
        </CardHeader>

        {/* Main form content injected from parent */}
        <CardContent className="space-y-5">{children}</CardContent>

        {/* Footer: OAuth login + navigation links */}
        <CardFooter className="flex flex-col space-y-4 pt-0">
          {/* Divider above OAuth provider */}
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>

            <div className="relative flex justify-center text-xs">
              <span className="bg-background/70 px-3 text-muted-foreground backdrop-blur-sm">
                {providerDividerText}
              </span>
            </div>
          </div>

          {/* Google OAuth login */}
          <GoogleButton />

          {/* Divider above navigation link */}
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>

            <div className="relative flex justify-center text-xs">
              <span className="bg-background/70 px-3 text-muted-foreground backdrop-blur-sm">
                {LinkDividerText}
              </span>
            </div>
          </div>

          {/* Navigation between sign-in and sign-up */}
          <div className="text-sm text-center text-muted-foreground">
            {LinkPrompt}{" "}
            <Link
              href={LinkHref}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {LinkContent}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default AuthCard;
