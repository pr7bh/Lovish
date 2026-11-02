/**
 * Central source of truth for all clinic contact details.
 * Import from here — never duplicate strings across components.
 */
export const clinic = {
  name: "Nagpal's Physio Care",
  tagline: "Restoring you to your best.",
  doctor: "Dr. Lovish Nagpal (PT)",
  email: "nagpalsphysiocare@gmail.com",
  emailHref: "mailto:nagpalsphysiocare@gmail.com",
  phone: "+91 72061 99132",
  phoneHref: "tel:+917206199132",
  whatsapp: "+91 72061 99132",
  whatsappUrl: "https://wa.me/917206199132",
  instagram: "@nagpals_physio_care",
  instagramUrl: "https://www.instagram.com/nagpals_physio_care",
  address: {
    street: "717, Mahavir Colony, East Bhatia Nagar",
    city: "Yamuna Nagar",
    state: "Haryana",
    pincode: "135001",
    country: "India",
    full: "717, Mahavir Colony, East Bhatia Nagar,\nYamuna Nagar, Haryana 135001",
  },
  hours: {
    weekdays: "Mon – Sat: 9:00 AM – 9:00 PM",
    sunday: "Sunday: 9:00 AM – 2:00 PM",
    combined: "Mon – Sat: 9:00 AM – 9:00 PM\nSunday: 9:00 AM – 2:00 PM",
  },
  timezone: "Asia/Kolkata",
  googleRating: { score: 5.0, count: 52 },
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "https://nagpalsphysiocare.com",
} as const;
