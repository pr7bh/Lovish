export type BookingStep = 1 | 2 | 3 | 4 | 5;
export type BookingPhase = BookingStep | "success";

export interface PatientDetails {
  fullName: string;
  mobile: string;
  email: string;
  reasonForVisit: string;
  privacyConsent: boolean;
}

export interface TimeSlot {
  time: string;
  display: string;
  available: boolean;
}

export interface BookingSubmission {
  serviceSlug: string;
  serviceTitle: string;
  date: string;
  timeSlot: string;
  patient: PatientDetails;
  requestedAt: string;
}

export interface BookingResult {
  success: boolean;
  requestId?: string;
  error?: string;
}
