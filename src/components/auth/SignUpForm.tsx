"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, LoaderCircle, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordRules } from "@/components/auth/PasswordRules";
import { RoleSelector, type SignUpRole } from "@/components/auth/RoleSelector";
import { AvatarUpload } from "@/components/auth/AvatarUpload";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { getDashboardPath } from "@/lib/roles";
import { isInternalRedirect, validateSignUp, validateSignUpField, type SignUpErrors, type SignUpValues } from "@/lib/validation/auth";
import { uploadImage } from "@/lib/uploadImage";

type SignUpFormProps = { redirectTo?: string; queryString: string; showGoogleSignIn?: boolean };

export function SignUpForm({ redirectTo, queryString, showGoogleSignIn = false }: SignUpFormProps) {
  const router = useRouter();
  const [role, setRole] = useState<SignUpRole>("customer");
  const [values, setValues] = useState<SignUpValues>({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof SignUpValues, boolean>>>({});
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [submissionStage, setSubmissionStage] = useState<"idle" | "uploading" | "creating">("idle");
  const isSubmitting = submissionStage !== "idle";
  const googleDestination = isInternalRedirect(redirectTo) ? redirectTo : getDashboardPath("customer");

  function updateValue(field: keyof SignUpValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (touched[field]) setErrors((current) => ({ ...current, [field]: validateSignUpField(field, value) }));
  }

  function validateField(field: keyof SignUpValues) {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateSignUpField(field, values[field]) }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateSignUp(values);
    setTouched({ name: true, email: true, password: true });
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    try {
      let uploadedImage: string | undefined;
      if (profilePhoto) {
        setSubmissionStage("uploading");
        try {
          uploadedImage = await uploadImage(profilePhoto);
        } catch {
          toast.add({
            title: "Photo upload failed",
            description: "Photo upload failed. Try again or remove the photo.",
            type: "error",
          });
          return;
        }
      }

      setSubmissionStage("creating");
      const result = await authClient.signUp.email({
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        password: values.password,
        role,
        ...(uploadedImage ? { image: uploadedImage } : {}),
      });

      if (result.error) {
        const errorText = `${result.error.code ?? ""} ${result.error.message ?? ""}`.toLowerCase();
        const message = errorText.includes("already_exists") || errorText.includes("already exists")
          ? "An account with this email already exists"
          : "Something went wrong. Please try again.";
        toast.add({ title: "Unable to create account", description: message, type: "error" });
        return;
      }

      toast.add({ title: "Account created successfully", type: "success" });
      if (!result.data?.token) {
        router.replace(queryString ? `/sign-in?${queryString}` : "/sign-in");
        return;
      }
      const destination = isInternalRedirect(redirectTo) ? redirectTo : getDashboardPath(result.data?.user?.role ?? role);
      router.replace(destination);
      router.refresh();
    } catch {
      toast.add({
        title: "Unable to create account",
        description: "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setSubmissionStage("idle");
    }
  }

  async function handleGoogleSignIn() {
    try {
      const result = await authClient.signIn.social({ provider: "google", callbackURL: googleDestination });
      if (result.error) {
        toast.add({ title: "Unable to continue with Google", description: "Something went wrong. Please try again.", type: "error" });
      }
    } catch {
      toast.add({ title: "Unable to continue with Google", description: "Something went wrong. Please try again.", type: "error" });
    }
  }

  const signInHref = queryString ? `/sign-in?${queryString}` : "/sign-in";

  return (
    <>
      <div className="mb-5 hidden items-center justify-between lg:flex">
        <Link href="/" className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-1 text-xs font-medium text-muted-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <ArrowLeft className="size-3.5" aria-hidden="true" /> Back to Home
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <span className="rounded-full bg-secondary px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-secondary-foreground">Create account</span>
        </div>
      </div>
      <div className="mb-5">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary lg:hidden">Create account</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-[2rem]">Create your account</h2>
          <p className="mt-2 text-sm text-muted-foreground">Choose how you want to use FixMate.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <fieldset disabled={isSubmitting} className="space-y-4 border-0 p-0">
        <AvatarUpload file={profilePhoto} onChange={setProfilePhoto} disabled={isSubmitting} />

        <fieldset disabled={isSubmitting} className="min-w-0">
          <legend className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-foreground">Select your role</legend>
          <RoleSelector value={role} onChange={setRole} />
        </fieldset>

        <div className="space-y-2">
          <Label htmlFor="signup-name" className="text-xs font-semibold">Full name</Label>
          <div className="relative">
            <UserRound className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="signup-name"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(event) => updateValue("name", event.target.value)}
              onBlur={() => validateField("name")}
              placeholder="Your full name"
              aria-label="Full name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "signup-name-error" : undefined}
              className="h-12 rounded-xl pl-10"
            />
          </div>
          {errors.name && <p id="signup-name-error" className="text-xs text-destructive" role="alert">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email" className="text-xs font-semibold">Email address</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => updateValue("email", event.target.value)}
              onBlur={() => validateField("email")}
              placeholder="you@example.com"
              aria-label="Email address"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "signup-email-error" : undefined}
              className="h-12 rounded-xl pl-10"
            />
          </div>
          {errors.email && <p id="signup-email-error" className="text-xs text-destructive" role="alert">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password" className="text-xs font-semibold">Password</Label>
          <PasswordInput value={values.password} onChange={(value) => updateValue("password", value)} onBlur={() => validateField("password")} error={errors.password} />
          {errors.password && <p id="signup-password-error" className="text-xs text-destructive" role="alert">{errors.password}</p>}
          <PasswordRules password={values.password} />
        </div>

        <Button type="submit" disabled={isSubmitting} className="h-12 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition hover:bg-[#4338A8] dark:hover:bg-[#C4BFFF] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          {isSubmitting ? <><LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> {submissionStage === "uploading" ? "Uploading photo..." : "Creating account..."}</> : <>Create Account <ArrowRight className="size-4" aria-hidden="true" /></>}
        </Button>
        </fieldset>
      </form>

      {showGoogleSignIn && (
        <>
          <div className="my-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> OR <span className="h-px flex-1 bg-border" />
          </div>
          <Button type="button" variant="outline" disabled={isSubmitting} onClick={handleGoogleSignIn} className="h-11 w-full rounded-xl border-border bg-card text-xs font-medium text-foreground hover:bg-muted">
            <span aria-hidden="true" className="mr-1 font-bold text-[#4285F4]">G</span> Continue with Google
          </Button>
        </>
      )}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account? <Link href={signInHref} className="font-semibold text-primary underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Sign In</Link>
      </p>
      <p className="mt-6 border-t border-border pt-4 text-center text-[11px] leading-5 text-muted-foreground">
        By signing up, you agree to FixMate&apos;s <span className="text-foreground">Terms</span> and <span className="text-foreground">Privacy Policy</span>.
      </p>
    </>
  );
}
