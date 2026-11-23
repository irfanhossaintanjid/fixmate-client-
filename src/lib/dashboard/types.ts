export type BookingStatus = "requested" | "accepted" | "in-progress" | "completed" | "rejected" | "cancelled";
export type PaymentStatus = "paid" | "unpaid";

export type Booking = {
  _id: string;
  serviceId?: string;
  serviceTitle?: string;
  serviceImage?: string;
  category?: string;
  serviceMode?: string;
  serviceArea?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  address?: string;
  problemDescription?: string;
  technicianName?: string;
  preferredDate?: string;
  basePrice?: number;
  finalAmount?: number;
  status: BookingStatus;
  paymentStatus?: PaymentStatus;
  createdAt?: string;
};

export type BookingCounts = {
  all: number;
  requested: number;
  accepted: number;
  "in-progress": number;
  completed: number;
  rejected: number;
  cancelled: number;
};

export type BookingHighlights = {
  pendingRequests: { count: number; latestTitle: string | null };
  inProgress: { count: number; latestTitle: string | null };
  paymentDue: { count: number; totalAmount: number; latestTitle: string | null };
};

export type BookingSummary = {
  total: number;
  active: number;
  completed: number;
  byStatus: Record<BookingStatus, number>;
};

export type PaymentRecord = {
  id: string;
  amount: number;
  transactionId: string;
  paidAt: string;
  serviceTitle?: string;
  technicianName?: string;
};

export type PaymentHistorySummary = {
  totalPaid: number;
  count: number;
  lastPaymentDate: string | null;
  latest: { serviceTitle?: string; amount: number } | null;
};
