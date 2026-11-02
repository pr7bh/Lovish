"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "cn";
import { patientSchema, type PatientFormValues } from "@/lib/booking/validation";
import type { PatientDetails } from "@/types/booking";

interface Props {
  initialValues: PatientDetails | null;
  onSubmit: (patient: PatientDetails) => void;
  onBack: () => void;
}

export default function PatientDetailsForm({
  initialValues,
  onSubmit,
  onBack,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: initialValues ?? {
      fullName: "",
      mobile: "",
      email: "",
      reasonForVisit: "",
      privacyConsent: false,
    },
  });

  function onValid(data: PatientFormValues) {
    onSubmit(data as PatientDetails);
  }

  const inputBase =
    "w-full h-11 px-4 bg-warm-white border rounded-sm text-sm font-sans text-rich-black placeholder:text-muted-text/50 outline-none transition-colors duration-200 focus:border-gold focus:ring-1 focus:ring-gold/30";

  return (
    <div>
      <h2 className="font-heading text-2xl md:text-3xl text-rich-black mb-2">
        Your Details
      </h2>
      <p className="text-sm text-muted-text mb-8 max-w-lg">
        We need a few details to process your appointment request. Your
        information is handled with strict confidentiality.
      </p>

      <form onSubmit={handleSubmit(onValid)} noValidate className="space-y-5">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-sans font-medium text-rich-black mb-1.5"
          >
            Full Name <span className="text-gold">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            {...register("fullName")}
            className={cn(inputBase, errors.fullName ? "border-red-400" : "border-beige")}
          />
          {errors.fullName && (
            <p className="mt-1.5 text-xs text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <label
            htmlFor="mobile"
            className="block text-sm font-sans font-medium text-rich-black mb-1.5"
          >
            Mobile Number <span className="text-gold">*</span>
          </label>
          <input
            id="mobile"
            type="tel"
            autoComplete="tel"
            placeholder="+91 XXXXX XXXXX"
            {...register("mobile")}
            className={cn(inputBase, errors.mobile ? "border-red-400" : "border-beige")}
          />
          {errors.mobile && (
            <p className="mt-1.5 text-xs text-red-500">{errors.mobile.message}</p>
          )}
        </div>

        {/* Email (optional) */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-sans font-medium text-rich-black mb-1.5"
          >
            Email Address{" "}
            <span className="text-muted-text font-normal">(optional)</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...register("email")}
            className={cn(inputBase, errors.email ? "border-red-400" : "border-beige")}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Reason for visit (optional) */}
        <div>
          <label
            htmlFor="reasonForVisit"
            className="block text-sm font-sans font-medium text-rich-black mb-1.5"
          >
            Reason for Visit{" "}
            <span className="text-muted-text font-normal">(optional)</span>
          </label>
          <textarea
            id="reasonForVisit"
            rows={3}
            placeholder="Briefly describe your condition or what you'd like help with…"
            {...register("reasonForVisit")}
            className={cn(
              "w-full px-4 py-3 bg-warm-white border rounded-sm text-sm font-sans text-rich-black placeholder:text-muted-text/50 outline-none resize-none transition-colors duration-200 focus:border-gold focus:ring-1 focus:ring-gold/30",
              errors.reasonForVisit ? "border-red-400" : "border-beige"
            )}
          />
          {errors.reasonForVisit && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.reasonForVisit.message}
            </p>
          )}
        </div>

        {/* Privacy consent */}
        <div
          className={cn(
            "flex items-start gap-3 p-4 rounded-sm border",
            errors.privacyConsent
              ? "border-red-300 bg-red-50/40"
              : "border-beige bg-warm-white"
          )}
        >
          <input
            id="privacyConsent"
            type="checkbox"
            {...register("privacyConsent")}
            className="mt-0.5 h-4 w-4 shrink-0 accent-gold cursor-pointer"
          />
          <label
            htmlFor="privacyConsent"
            className="text-sm text-rich-black/80 leading-relaxed cursor-pointer"
          >
            I consent to Nagpal&apos;s Physio Care collecting and processing my
            personal information for the purpose of this appointment request, in
            accordance with their privacy policy.
          </label>
        </div>
        {errors.privacyConsent && (
          <p className="text-xs text-red-500 -mt-3">
            {errors.privacyConsent.message}
          </p>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-3">
          <button
            type="button"
            onClick={onBack}
            className="h-11 px-6 border border-rich-black/20 text-rich-black text-sm font-sans font-medium rounded-sm hover:border-gold hover:text-gold transition-colors duration-200"
          >
            ← Back
          </button>
          <button
            type="submit"
            className="h-11 px-8 bg-gold text-white text-sm font-sans font-medium rounded-sm hover:bg-gold-light transition-colors duration-200"
          >
            Review Booking →
          </button>
        </div>
      </form>
    </div>
  );
}
