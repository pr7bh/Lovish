import type { BookingSubmission, BookingResult } from "@/types/booking";

/**
 * Submits a booking request to POST /api/appointments.
 * All heavy validation and slot-conflict checking happens server-side.
 */
export async function submitBookingRequest(
  submission: BookingSubmission
): Promise<BookingResult> {
  try {
    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceSlug: submission.serviceSlug,
        date: submission.date,
        timeSlot: submission.timeSlot,
        patient: submission.patient,
      }),
    });

    const data = (await response.json()) as {
      success: boolean;
      bookingReference?: string;
      message?: string;
    };

    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data.message ?? "Unable to submit your booking request. Please try again.",
      };
    }

    return { success: true, requestId: data.bookingReference };
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}
