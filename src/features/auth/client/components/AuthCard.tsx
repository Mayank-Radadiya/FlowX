"use client";

import GoogleButton from "@/components/global/GoogleButton";
import Link from "next/link";

interface AuthCardProps {
  children: React.ReactNode;
  formType: "sign-in" | "sign-up";
}

const config = {
  "sign-in": {
    heading: "Welcome back",
    description: "Sign in to your FlowX account",
    dividerText: "or continue with",
    footerText: "Don't have an account?",
    footerLinkText: "Sign up",
    footerHref: "/sign-up",
  },
  "sign-up": {
    heading: "Create your account",
    description: "Start automating your workflows today",
    dividerText: "or sign up with",
    footerText: "Already have an account?",
    footerLinkText: "Sign in",
    footerHref: "/sign-in",
  },
};

const AuthCard = ({ children, formType }: AuthCardProps) => {
  const {
    heading,
    description,
    dividerText,
    footerText,
    footerLinkText,
    footerHref,
  } = config[formType];

  return (
    <div className="w-[450px]">
      {/* Glass card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-background/60 backdrop-blur-xl shadow-2xl shadow-black/20 dark:shadow-black/40">
        {/* Subtle top glow accent */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

        <div className="relative px-8 pt-8 pb-6">
          {/* Wordmark + description */}
          <div className="mb-7">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {heading}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>

          {/* Form content injected from parent */}
          {children}

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border/60" />
            <span className="text-xs text-muted-foreground">{dividerText}</span>
            <div className="h-px flex-1 bg-border/60" />
          </div>

          {/* Google OAuth */}
          <GoogleButton />
        </div>

        {/* Footer */}
        <div className="border-t border-border/40 bg-muted/20 px-8 py-4 text-center text-sm text-muted-foreground">
          {footerText}{" "}
          <Link
            href={footerHref}
            className="font-medium text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
          >
            {footerLinkText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
