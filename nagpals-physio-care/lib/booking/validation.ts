import { z } from "zod";

export const patientSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  mobile: z
    .string()
    .min(10, "Enter a valid 10-digit mobile number")
    .max(15, "Mobile number is too long")
    .regex(/^[+\d\s\-()\.\*]{7,20}$/, "Enter a valid mobile number"),
  email: z
    .string()
    .refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), {
      message: "Enter a valid email address",
    }),
  reasonForVisit: z.string().max(500, "Keep it under 500 characters"),
  privacyConsent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the privacy policy to proceed",
    }),
});

export type PatientFormValues = z.infer<typeof patientSchema>;
