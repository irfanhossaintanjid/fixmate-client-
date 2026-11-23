export type BookingStatus = "requested" | "accepted" | "in-progress" | "completed" | "rejected" | "cancelled";
export type PaymentStatus = "paid" | "unpaid";

export type Booking = {
  id: string;
  serviceTitle?: string;
  title?: string;
  serviceImage?: string;
  image?: string;
  technicianName?: string;
  preferredDate?: string;
  basePrice?: number;
  finalAmount?: number;
  status: BookingStatus;
  paymentStatus?: PaymentStatus;
  createdAt?: string;
};

export type BookingSummary = {
  total: number;
  active: number;
  completed: number;
  byStatus: Record<BookingStatus, number>;
  perMonth: { month: string; count: number }[];
  readyToPay: Booking | null;
};

export type PaymentRecord = {
  id: string;
  bookingId: string;
  amount: number;
  transactionId: string;
  paidAt: string;
  serviceTitle?: string;
  technicianName?: string;
};
