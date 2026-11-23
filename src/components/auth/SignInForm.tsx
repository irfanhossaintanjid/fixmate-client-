"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { getDashboardPath } from "@/lib/roles";
import { isInternalRedirect } from "@/lib/validation/auth";

type SignInFormProps = { redirectTo?: string; queryString: string; showGoogleSignIn?: boolean };

export function SignInForm({ redirectTo, queryString, showGoogleSignIn = false }: SignInFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [attemptError, setAttemptError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const signUpHref = queryString ? `/sign-up?${queryString}` : "/sign-up";
  const googleDestination = isInternalRedirect(redirectTo) ? redirectTo : "/";

  function validateEmail() {
    const message = !email.trim()
      ? "Enter your email address."
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ? "Enter a valid email address."
        : undefined;
    setErrors((current) => ({ ...current, email: message }));
    return message;
  }

  function validatePassword() {
    const message = password ? undefined : "Enter your password.";
    setErrors((current) => ({ ...current, password: message }));
    return message;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttemptError("");
    const emailError = validateEmail();
    const passwordError = validatePassword();
    if (emailError || passwordError) return;

    setSubmitting(true);
    try {
      const result = await authClient.signIn.email({
        email: email.trim().toLowerCase(),
        password,
      });

      if (result.error) {
        setAttemptError("Invalid email or password. Please try again.");
        return;
      }

      toast.add({ title: "Signed in successfully", type: "success" });
      const destination = isInternalRedirect(redirectTo)
        ? redirectTo
        : getDashboardPath(result.data?.user?.role);
      router.replace(destination);
      router.refresh();
    } catch {
      setAttemptError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setAttemptError("");
    try {
      const result = await authClient.signIn.social({ provider: "google", callbackURL: googleDestination });
      if (result.error) setAttemptError("Unable to continue with Google. Please try again.");
    } catch {
      setAttemptError("Unable to continue with Google. Please try again.");
    }
  }

  return (
    <>
      <div className="mb-7 hidden items-center justify-between lg:flex">
        <Link href="/" className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-1 text-sm font-medium text-muted-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <ArrowLeft className="size-4" aria-hidden="true" /> Back to Home
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <span className="rounded-full bg-secondary px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-secondary-foreground">Sign in</span>
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary lg:hidden">Sign in</p>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-[2rem]">Sign in to your account</h2>
        <p className="mt-2 text-sm text-muted-foreground">Enter your email and password to continue.</p>
      </div>

      {attemptError && (
        <div role="alert" className="mb-5 flex min-h-12 items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300">
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-red-600 text-xs font-bold text-white" aria-hidden="true">!</span>
          {attemptError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="signin-email" className="text-sm font-medium">Email Address</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="signin-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => { setEmail(event.target.value); setAttemptError(""); }}
              onBlur={validateEmail}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "signin-email-error" : undefined}
              className="h-12 rounded-xl bg-muted/40 pl-10"
              disabled={submitting}
            />
          </div>
          {errors.email && <p id="signin-email-error" className="text-xs text-destructive" role="alert">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="signin-password" className="text-sm font-medium">Password</Label>
          </div>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="signin-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => { setPassword(event.target.value); setAttemptError(""); }}
              onBlur={validatePassword}
              placeholder="Enter your password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "signin-password-error" : undefined}
              className="h-12 rounded-xl bg-muted/40 pl-10 pr-12"
              disabled={submitting}
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute right-1 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {showPassword ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
            </button>
          </div>
          {errors.password && <p id="signin-password-error" className="text-xs text-destructive" role="alert">{errors.password}</p>}
        </div>

        <Button type="submit" disabled={submitting} className="h-12 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-[#4338A8] dark:hover:bg-[#C4BFFF] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          {submitting ? <><LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> Signing in...</> : <>Sign In <ArrowRight className="size-4" aria-hidden="true" /></>}
        </Button>
      </form>

      {showGoogleSignIn && (
        <>
          <div className="my-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> OR <span className="h-px flex-1 bg-border" />
          </div>
          <Button type="button" variant="outline" disabled={submitting} onClick={handleGoogleSignIn} className="h-12 w-full rounded-xl border-border bg-card text-sm font-medium text-foreground hover:bg-muted">
            <span aria-hidden="true" className="mr-1 font-bold text-[#4285F4]">G</span> Continue with Google
          </Button>
        </>
      )}

      <p className="mt-7 text-center text-sm text-muted-foreground">
        Don&apos;t have an account? <Link href={signUpHref} className="font-semibold text-primary underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Sign Up</Link>
      </p>
      <p className="mt-7 border-t border-border pt-5 text-center text-xs leading-5 text-muted-foreground">
        Sign in to manage repair requests, follow job progress, and pay after completion.
      </p>
    </>
  );
}
