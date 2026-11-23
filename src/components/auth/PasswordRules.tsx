import { Check, Circle } from "lucide-react";

export function PasswordRules({ password }: { password: string }) {
  const rules = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One lowercase letter", met: /[a-z]/.test(password) },
  ];

  return (
    <ul id="password-rules" aria-label="Password requirements" className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5">
      {rules.map(({ label, met }) => (
        <li key={label} className={`inline-flex items-center gap-1.5 text-[11px] ${met ? "text-[#16A34A]" : "text-muted-foreground"}`}>
          {met ? <Check className="size-3" aria-hidden="true" /> : <Circle className="size-2.5" aria-hidden="true" />}
          {label}
        </li>
      ))}
    </ul>
  );
}
