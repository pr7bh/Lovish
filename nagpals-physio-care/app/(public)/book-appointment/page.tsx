import type { Metadata } from "next";
import BookingWizard from "@/components/booking/BookingWizard";
import { meta } from "@/lib/seo";

export const metadata: Metadata = meta({
  title: "Book an Appointment",
  description:
    "Request an appointment at Nagpal's Physio Care. Choose your service, preferred date and time, and submit your booking request online.",
  path: "/book-appointment",
});

export default function BookAppointmentPage() {
  return <BookingWizard />;
}
