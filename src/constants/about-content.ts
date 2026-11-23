export type IconName =
  | "Search"
  | "ClipboardList"
  | "Wrench"
  | "CreditCard"
  | "BadgeCheck"
  | "CircleDollarSign"
  | "Activity"
  | "ShieldCheck"
  | "UserRound"
  | "Settings2"
  | "CalendarCheck"
  | "ListChecks";

export const howItWorksSteps: {
  number: string;
  title: string;
  description: string;
  icon: IconName;
}[] = [
  {
    number: "01",
    title: "Find the Right Service",
    description:
      "Browse approved repair services and search, filter or sort by category, service mode and price to find the right fit.",
    icon: "Search",
  },
  {
    number: "02",
    title: "Request a Repair",
    description:
      "Share your phone number, address, preferred date and a description of the problem. Your request goes straight to the technician.",
    icon: "ClipboardList",
  },
  {
    number: "03",
    title: "Get Your Device Repaired",
    description:
      "The technician accepts the job, starts the work and marks it completed with the final amount. You can follow every status.",
    icon: "Wrench",
  },
  {
    number: "04",
    title: "Pay After Completion",
    description:
      "Once the job is completed, pay securely online with Stripe. You never pay before the work is done.",
    icon: "CreditCard",
  },
];

export const whyChooseFixMate: {
  title: string;
  description: string;
  icon: IconName;
}[] = [
  {
    title: "Verified Professionals",
    description:
      "Technician services are reviewed and approved by an admin before they appear on the platform.",
    icon: "BadgeCheck",
  },
  {
    title: "Transparent Pricing",
    description:
      "Every service shows a starting price, and the final amount is confirmed by the technician when the job is completed.",
    icon: "CircleDollarSign",
  },
  {
    title: "Track Your Repair",
    description:
      "Follow your job from requested to completed in your dashboard.",
    icon: "Activity",
  },
  {
    title: "Secure Payments",
    description:
      "Pay online with Stripe only after the technician marks the job completed.",
    icon: "ShieldCheck",
  },
];

export const repairStatuses = [
  {
    title: "Requested",
    description: "You send your repair request.",
    color: "#3B82F6",
    tint: "#DBEAFE",
    textColor: "#1D4ED8",
  },
  {
    title: "Accepted",
    description: "The technician agrees to take the job.",
    color: "#6366F1",
    tint: "#E0E7FF",
    textColor: "#4338CA",
  },
  {
    title: "In Progress",
    description: "The repair work has started.",
    color: "#D97706",
    tint: "#FEF3C7",
    textColor: "#B45309",
  },
  {
    title: "Completed",
    description: "The job is done and the final amount is set.",
    color: "#16A34A",
    tint: "#DCFCE7",
    textColor: "#15803D",
  },
  {
    title: "Paid",
    description: "You pay online and the job is closed.",
    color: "#059669",
    tint: "#D1FAE5",
    textColor: "#047857",
  },
] as const;

export const otherRepairOutcomes = [
  {
    title: "Rejected",
    description: "The technician declined a requested job.",
    color: "#DC2626",
    tint: "#FEE2E2",
    textColor: "#B91C1C",
  },
  {
    title: "Cancelled",
    description:
      "The customer cancelled while the job was still in the Requested stage.",
    color: "#64748B",
    tint: "#E2E8F0",
    textColor: "#475569",
  },
] as const;

export const customerGuidance = [
  {
    title: "Discover Services",
    description: "Browse approved services from technicians across repair categories.",
    icon: "Search",
  },
  {
    title: "Book with Confidence",
    description: "Send a request with your problem description and preferred date.",
    icon: "CalendarCheck",
  },
  whyChooseFixMate[2],
  {
    title: "Secure Online Payment",
    description: "Pay with Stripe only after the job is completed.",
    icon: "ShieldCheck",
  },
] as const;

export const technicianGuidance = [
  {
    title: "Create Service Listing",
    description: "Add your repair services with details, pricing and an image.",
    icon: "ListChecks",
  },
  {
    title: "Get Admin Approval",
    description: "Listings go live after an admin approves them.",
    icon: "BadgeCheck",
  },
  {
    title: "Manage Repair Requests",
    description: "Accept or reject requests and update job progress.",
    icon: "Settings2",
  },
  {
    title: "Complete Jobs and Set Final Amount",
    description: "Mark the job completed and confirm the final price for payment.",
    icon: "CircleDollarSign",
  },
] as const;

export const aboutFAQs = [
  {
    question: "How do I book a repair?",
    answer:
      "Open an approved service, choose Request Repair, and send your phone number, address, preferred date and a description of at least 20 characters. You need a customer account.",
  },
  {
    question: "How can I track my repair?",
    answer:
      "Open My Bookings in your dashboard. Each job shows its current status and payment status.",
  },
  {
    question: "Can I cancel a request?",
    answer:
      "Yes, while the job is still in the Requested stage. After the technician accepts it, it can no longer be cancelled.",
  },
  {
    question: "What if a technician rejects my request?",
    answer:
      "The request is closed as Rejected. You can browse other services and send a new request.",
  },
  {
    question: "When do I pay?",
    answer:
      "Only after the technician marks the job completed. A Pay Now button then appears in My Bookings, and checkout is handled by Stripe.",
  },
  {
    question: "How do technicians list services?",
    answer:
      "Technicians add a service from their dashboard. It stays pending until an admin approves it, and any later edit sends it back for approval.",
  },
] as const;
