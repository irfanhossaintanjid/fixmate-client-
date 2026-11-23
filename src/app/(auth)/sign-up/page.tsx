import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { auth } from "@/lib/auth";
import { getDashboardPath } from "@/lib/roles";

export const instant = false;

type SignUpPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams;
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user) redirect(getDashboardPath(session.user.role));

  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) value.forEach((item) => query.append(key, item));
    else if (value !== undefined) query.set(key, value);
  }

  return (
    <AuthSplitLayout>
      <SignUpForm
        redirectTo={typeof params.redirect === "string" ? params.redirect : undefined}
        queryString={query.toString()}
        showGoogleSignIn={Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)}
      />
    </AuthSplitLayout>
  );
}
