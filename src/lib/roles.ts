export type UserRole = "customer" | "technician" | "admin";

export function getDashboardPath(role: unknown): string {
  if (role === "technician") return "/dashboard/technician";
  if (role === "admin") return "/dashboard/admin";
  return "/dashboard/customer";
}
