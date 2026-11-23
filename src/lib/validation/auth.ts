export type SignUpValues = {
  name: string;
  email: string;
  password: string;
};

export type SignUpErrors = Partial<Record<keyof SignUpValues, string>>;

export function validateSignUpField(field: keyof SignUpValues, value: string): string | undefined {
  if (field === "name") {
    const name = value.trim();
    if (!name) return "Please enter your full name.";
    if (name.length < 2) return "Name must be at least 2 characters.";
  }

  if (field === "email") {
    if (!value.trim()) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Enter a valid email address.";
  }

  if (field === "password") {
    if (!value) return "Please create a password.";
    if (value.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(value)) return "Add at least one uppercase letter.";
    if (!/[a-z]/.test(value)) return "Add at least one lowercase letter.";
  }
}

export function validateSignUp(values: SignUpValues): SignUpErrors {
  return {
    name: validateSignUpField("name", values.name),
    email: validateSignUpField("email", values.email),
    password: validateSignUpField("password", values.password),
  };
}

export function isInternalRedirect(value: string | null | undefined): value is string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return false;
  try {
    const parsed = new URL(value, "https://fixmate.invalid");
    return parsed.origin === "https://fixmate.invalid";
  } catch {
    return false;
  }
}
