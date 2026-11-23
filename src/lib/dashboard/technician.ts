import type { BookingStatus } from "@/lib/dashboard/types";

export type TechnicianServiceStats = {
  total: number;
  approved: number;
  pendingApproval: number;
  unavailable: number;
};

export type TechnicianRecentRequest = {
  _id: string;
  serviceTitle: string;
  serviceImage?: string;
  category?: string;
  customerName?: string;
  customerPhone?: string;
  preferredDate?: string;
  createdAt?: string;
  status: BookingStatus;
  paymentStatus?: "paid" | "unpaid";
};

export type TechnicianOverviewData = {
  services: TechnicianServiceStats;
  bookings: {
    total: number;
    byStatus: Record<BookingStatus, number>;
  };
  recentRequests: TechnicianRecentRequest[];
};
