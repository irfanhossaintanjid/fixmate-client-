"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ManageRequestsError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("Could not load technician requests."); }, []);
  return <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-5 text-center"><h1 className="text-xl font-bold text-foreground">Requests couldn’t load</h1><p className="mt-2 text-sm text-muted-foreground">Please try again. If the problem continues, come back in a little while.</p><Button onClick={reset} className="mt-5 min-h-11 rounded-xl">Try Again</Button></div>;
}
