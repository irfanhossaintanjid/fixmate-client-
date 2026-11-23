import { Info } from "lucide-react";

export function ApprovalNotice() {
  return (
    <aside className="rounded-2xl border border-indigo-200 bg-indigo-50/80 p-4 dark:border-indigo-900 dark:bg-indigo-950/35" aria-label="Service approval information">
      <div className="flex items-start gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-900/70 dark:text-indigo-200"><Info className="size-4" aria-hidden="true" /></span><div><h2 className="text-sm font-semibold text-indigo-950 dark:text-indigo-100">Admin approval required</h2><p className="mt-1 text-xs leading-5 text-indigo-900/80 dark:text-indigo-200/80">Your service will be reviewed by an admin before appearing publicly on FixMate.</p><p className="mt-2 text-xs leading-5 text-indigo-900/70 dark:text-indigo-200/70">After submission, it will have Pending approval status. Once approved, customers can discover your service.</p></div></div>
    </aside>
  );
}
