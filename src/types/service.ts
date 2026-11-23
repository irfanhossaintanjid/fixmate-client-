export const serviceCategories = [
  "Smartphone",
  "Laptop & PC",
  "AC",
  "Refrigerator",
  "TV",
  "Washing Machine",
  "Electrical",
] as const;

export const serviceModes = ["Home Visit", "Shop Drop-off"] as const;
export type ServiceCategory = (typeof serviceCategories)[number];
export type ServiceMode = (typeof serviceModes)[number];
export type ServiceApprovalStatus = "pending" | "approved" | "rejected";

export type Service = {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  image?: string;
  basePrice: number;
  estimatedDuration?: string;
  serviceMode: ServiceMode;
  serviceArea: string;
  technicianName: string;
  createdAt?: string;
};

export type TechnicianService = Service & {
  approvalStatus: ServiceApprovalStatus;
  isAvailable: boolean;
  rejectionReason?: string;
};

export type ServicesResponse = {
  services: Service[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasAnyServices: boolean;
};
