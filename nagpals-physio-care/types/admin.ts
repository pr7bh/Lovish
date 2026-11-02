export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "rejected"
  | "cancelled"
  | "completed";

export interface Appointment {
  id: string;
  bookingReference: string;
  serviceId: string;
  serviceName: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string | null;
  reasonForVisit: string | null;
  appointmentStart: string;
  appointmentEnd: string;
  status: AppointmentStatus;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
  confirmedAt: string | null;
  rejectedAt: string | null;
  cancelledAt: string | null;
  completedAt: string | null;
}

export interface AdminProfile {
  id: string;
  authUserId: string;
  fullName: string;
  role: "admin" | "superadmin";
}

export interface ClinicHours {
  id: string;
  weekday: number;
  isOpen: boolean;
  openingTime: string | null;
  closingTime: string | null;
}

export interface ClinicBreak {
  id: string;
  weekday: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export interface BlockedSlot {
  id: string;
  startsAt: string;
  endsAt: string;
  reason: string | null;
  createdAt: string;
}

export interface AdminService {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  durationMinutes: number;
  isActive: boolean;
  createdAt: string;
}

export interface DashboardMetrics {
  todayCount: number;
  pendingCount: number;
  confirmedCount: number;
  completedCount: number;
  upcomingCount: number;
  weeklyCount: number;
}

export type ActionResult<T = undefined> =
  | { success: true; data?: T }
  | { success: false; error: string };

// Valid status transitions (admin-controlled)
export const STATUS_TRANSITIONS: Record<AppointmentStatus, AppointmentStatus[]> = {
  pending:   ["confirmed", "rejected"],
  confirmed: ["cancelled", "completed"],
  rejected:  [],
  cancelled: [],
  completed: [],
};

export const STATUS_LABELS: Record<AppointmentStatus, string> = {
  pending:   "Pending",
  confirmed: "Confirmed",
  rejected:  "Rejected",
  cancelled: "Cancelled",
  completed: "Completed",
};

export const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
export const WEEKDAY_FULL  = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
