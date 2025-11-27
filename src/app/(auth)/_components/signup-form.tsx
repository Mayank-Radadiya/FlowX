"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ToggleButton } from "@/components/global/ToggleButton";
import { Meteors } from "@/components/ui/meteors";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import GoogleButton from "@/components/global/GoogleButton";

const signUpZodSchema = z
  .object({
    email: z.email("Invalid email").min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match. Please check both fields. ",
    path: ["confirmPassword"],
  });

type SignUpFormType = z.infer<typeof signUpZodSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConformPassword, setConformShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpZodSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignUp = async (data: SignUpFormType) => {
    setIsLoading(true);
    await authClient.signUp.email(
      {
        name: data.email,
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          toast.success("Signed in successfully!");
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(`Sign in failed: ${ctx.error.message}`);
        },
      }
    );
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute h-full w-full inset-0 overflow-hidden pointer-events-none z-20">
        <Meteors />
      </div>

      <div className="absolute inset-0 bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.05] z-0"></div>
      <div className="absolute inset-0 bg-background mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] z-0"></div>
      <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10 z-0"></div>
      <div className="absolute -right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[120px] dark:bg-purple-500/10 z-0"></div>
      <div className="absolute left-1/3 bottom-0 h-[300px] w-[300px] rounded-full bg-blue-500/5 blur-[80px] dark:bg-blue-500/10 z-0"></div>

      <div className="absolute right-4 top-4 flex items-center gap-2 z-10">
        <ToggleButton />
      </div>

      <Link
        href="/"
        className="absolute left-4 top-4 flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground z-10"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 z-10"
      >
        <Link
          href="/"
          className="group flex items-center gap-3 transition-all duration-300"
        >
          <div className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-background via-background to-background  backdrop-blur-sm overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-primary/10">
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-80"></div>
            <Image
              src={"/logo.svg"}
              alt="Logo"
              width={44}
              height={44}
              className="relative z-10 transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span className="bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            Flow
            <span className="text-primary/90 font-bold text-4xl ml-1 font-mono">
              X
            </span>
          </span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border hover:border-white/30 transition-all duration-500 shadow-xl backdrop-blur-lg bg-background/20 bg-opacity-90 ">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold bg-linear-to-br from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
              Create account
            </CardTitle>
            <CardDescription className="text-muted-foreground/90">
              Create an account to continue to FlowX
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
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

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative overflow-hidden">
                  <Input
                    id="password"
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    required
                    className="h-11 pr-10 bg-background/50 backdrop-blur-sm hover:border-primary/50 focus:border-primary transition-colors"
                    aria-invalid={!!errors.password}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-11 w-11"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 ">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <div className="relative overflow-hidden">
                  <Input
                    id="confirmPassword"
                    {...register("confirmPassword")}
                    type={showConformPassword ? "text" : "password"}
                    required
                    className="h-11  bg-background/50 backdrop-blur-sm hover:border-primary/50 focus:border-primary transition-colors"
                    aria-invalid={!!errors.confirmPassword}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-11 w-11"
                    onClick={() => setConformShowPassword(!showConformPassword)}
                  >
                    {showConformPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showConformPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div id="clerk-captcha" className="mt-5" />
              <Button
                type="submit"
                disabled={isLoading}
                className="h-10 w-full rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 bg-linear-to-r from-primary to-primary/90 font-medium relative overflow-hidden group mt-4"
              >
                <span className="absolute top-0 w-12 h-full bg-white/20 transform -translate-x-full skew-x-[-20deg] group-hover:translate-x-[750%] transition-transform duration-2000"></span>
                <span className="absolute top-0 -left-5 w-12 h-full bg-white/20 transform -translate-x-full skew-x-[-20deg] group-hover:translate-x-[350%] transition-transform duration-3000"></span>

                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background/80 px-3 text-muted-foreground backdrop-blur-sm">
                  Or SignUp with
                </span>
              </div>
            </div>

            <GoogleButton />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-0">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background/80 px-3 text-muted-foreground backdrop-blur-sm">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="text-sm text-center text-muted-foreground">
              Sign in instead?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing up, you agree to our{" "}
          <Link
            href="/legal/terms-of-service"
            className="font-medium text-primary underline-offset-4 hover:underline transition-colors"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/legal/privacy-policy"
            className="font-medium text-primary underline-offset-4 hover:underline transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
