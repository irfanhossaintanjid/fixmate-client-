import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const guidelines = [
  "Provide an accurate service title and description.",
  "Set a reasonable starting price.",
  "Choose the correct service mode.",
  "Upload a clear service image.",
  "Make sure the service area is accurate.",
];

export function SubmissionGuidelines() {
  return (
    <Card className="rounded-2xl border-border bg-card shadow-sm">
      <CardHeader className="pb-3"><CardTitle className="text-base font-semibold">Before You Publish</CardTitle><CardDescription className="text-xs">A few details make your listing easier to understand.</CardDescription></CardHeader>
      <CardContent><ul className="space-y-3">{guidelines.map((line) => <li key={line} className="flex items-start gap-2.5 text-xs leading-5 text-muted-foreground"><span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"><Check className="size-3" aria-hidden="true" /></span>{line}</li>)}</ul></CardContent>
    </Card>
  );
}
