import { createAuthClient } from "better-auth/react";
// The client and its exported hooks/actions must share one auth instance.
// Better Auth uses the same-origin /api/auth route provided by this app.
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;
