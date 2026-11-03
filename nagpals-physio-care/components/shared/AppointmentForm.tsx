"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Copy, Check, AlertCircle } from "lucide-react";
import { cn } from "cn";
import { clinic } from "@/lib/clinic-config";

const SERVICE_OPTIONS = [
  "Sports Physiotherapy",
  "Orthopedic Physiotherapy",
  "Neurological Rehabilitation",
  "Women's Health Physiotherapy",
  "Pediatric Rehabilitation",
  "Dry Needling",
  "Cupping Therapy",
  "IASTM",
  "Electrotherapy",
  "Exercise Therapy",
  "Manual Therapy",
  "Vestibular Rehabilitation",
  "Generalised Strength Training",
  "Diet & Nutrition Charts",
  "Chiropractic Treatment",
  "Kinesiotaping",
  "Pilates Rehabilitation",
  "Other / Not Sure",
];

const TIME_OPTIONS = [
  "9:00 AM – 10:00 AM",
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "12:00 PM – 1:00 PM",
  "2:00 PM – 3:00 PM",
  "3:00 PM – 4:00 PM",
  "4:00 PM – 5:00 PM",
  "5:00 PM – 6:00 PM",
  "6:00 PM – 7:00 PM",
  "7:00 PM – 8:00 PM",
  "8:00 PM – 9:00 PM",
];

interface FormState {
  name: string;
  mobile: string;
  email: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

interface Errors {
  name?: string;
  mobile?: string;
  service?: string;
  date?: string;
  time?: string;
}

type CopyState = "idle" | "copied" | "failed";
type EmailStatus = "sending" | "sent" | "failed";

function buildWhatsAppMessage(f: FormState): string {
  const lines: (string | null)[] = [
    `Hello Dr. Lovish Nagpal,`,
    ``,
    `I would like to request a physiotherapy appointment.`,
    ``,
    `*Patient Details*`,
    `Name: ${f.name}`,
    `Mobile: ${f.mobile}`,
    f.email ? `Email: ${f.email}` : null,
    ``,
    `*Appointment Details*`,
    `Service: ${f.service}`,
    `Preferred Date: ${f.date}`,
    `Preferred Time: ${f.time}`,
    f.message ? `` : null,
    f.message ? `Additional Message: ${f.message}` : null,
    ``,
    `Please let me know your availability and confirm the appointment.`,
    ``,
    `Thank you.`,
  ];
  return lines.filter((l): l is string => l !== null).join("\n");
}

const inputBase =
  "w-full px-4 py-3 text-sm font-sans text-rich-black bg-warm-white border rounded-sm outline-none transition-all duration-200 placeholder:text-muted-text/50";
const inputNormal = "border-beige focus:border-gold focus:ring-1 focus:ring-gold/30";
const inputError = "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/30";

const EMPTY_FORM: FormState = {
  name: "", mobile: "", email: "", service: "", date: "", time: "", message: "",
};

export function AppointmentForm() {
  const [today, setToday] = useState("");
  useEffect(() => { setToday(new Date().toISOString().split("T")[0]); }, []);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("sending");
  const lastMessage = useRef("");

  function setField(field: keyof FormState, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field as keyof Errors]) {
      setErrors((p) => ({ ...p, [field]: undefined }));
    }
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.mobile.trim()) {
      e.mobile = "Mobile number is required.";
    } else if (!/^[+\d][\d\s\-()]{6,}$/.test(form.mobile.trim())) {
      e.mobile = "Please enter a valid mobile number.";
    }
    if (!form.service) e.service = "Please select a service.";
    if (!form.date) e.date = "Please select a preferred date.";
    if (!form.time) e.time = "Please select a preferred time.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;

    const msg = buildWhatsAppMessage(form);
    lastMessage.current = msg;

    const url = `${clinic.whatsappUrl}?text=${encodeURIComponent(msg)}`;
    setSubmitting(true);
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);

    // Fire email notification and track status for UI feedback
    setEmailStatus("sending");
    fetch("/api/send-appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => setEmailStatus(res.ok ? "sent" : "failed"))
      .catch(() => setEmailStatus("failed"));

    // Re-enable after 3 s in case user returns to the form
    setTimeout(() => setSubmitting(false), 3000);
  }

  async function handleCopy() {
    const msg = lastMessage.current;
    if (!msg) return;
    try {
      await navigator.clipboard.writeText(msg);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    setTimeout(() => setCopyState("idle"), 5000);
  }

  function handleReset() {
    setSubmitted(false);
    setSubmitting(false);
    setCopyState("idle");
    setEmailStatus("sending");
    setForm(EMPTY_FORM);
    setErrors({});
  }

  // ── Success screen ───────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-6 py-6">
        <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
          <CheckCircle2 size={28} className="text-gold" />
        </div>

        <div>
          <h3 className="font-heading text-2xl text-rich-black mb-2">
            WhatsApp Opened
          </h3>
          <p className="text-sm text-muted-text leading-relaxed max-w-sm">
            Your appointment details have been pre-filled in WhatsApp. Review
            the message and tap <strong>Send</strong> to submit your request to
            Dr. Lovish Nagpal.
          </p>
        </div>

        {/* Email status badge */}
        <div className={cn(
          "inline-flex items-center gap-2.5 px-4 py-2.5 rounded-sm border text-xs font-sans transition-all duration-300",
          emailStatus === "sending" && "bg-beige/60 border-beige text-muted-text",
          emailStatus === "sent"    && "bg-gold/8 border-gold/30 text-gold",
          emailStatus === "failed"  && "bg-red-50 border-red-200 text-red-600",
        )}>
          {emailStatus === "sending" && (
            <>
              <svg className="animate-spin shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Sending email confirmation to the clinic…
            </>
          )}
          {emailStatus === "sent" && (
            <>
              <Check size={13} className="shrink-0" />
              Email confirmation sent to the clinic
            </>
          )}
          {emailStatus === "failed" && (
            <>
              <AlertCircle size={13} className="shrink-0" />
              Email could not be sent — WhatsApp message is still confirmed
            </>
          )}
        </div>

        {/* Copy fallback */}
        <div className="w-full rounded-sm border border-beige bg-warm-white p-5 flex flex-col gap-3">
          <p className="text-xs font-sans font-semibold text-muted-text uppercase tracking-widest">
            WhatsApp didn&apos;t open?
          </p>
          <p className="text-sm text-muted-text leading-relaxed">
            Copy your appointment message and paste it directly into WhatsApp
            Web or the WhatsApp app.
          </p>

          <button
            type="button"
            onClick={handleCopy}
            disabled={copyState === "copied"}
            className={cn(
              "inline-flex items-center gap-2 h-10 px-5 rounded-sm text-sm font-sans font-medium transition-all duration-200",
              copyState === "copied"
                ? "bg-gold/10 text-gold cursor-default"
                : copyState === "failed"
                ? "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100"
                : "bg-beige text-rich-black hover:bg-beige/70"
            )}
          >
            {copyState === "copied" ? (
              <>
                <Check size={15} />
                Message Copied
              </>
            ) : copyState === "failed" ? (
              <>
                <AlertCircle size={15} />
                Copy Failed — Try Again
              </>
            ) : (
              <>
                <Copy size={15} />
                Copy Appointment Message
              </>
            )}
          </button>

          {copyState === "copied" && (
            <p className="text-xs text-gold leading-relaxed">
              Appointment message copied successfully. Open WhatsApp and paste
              it into the chat.
            </p>
          )}
          {copyState === "failed" && (
            <p className="text-xs text-red-500 leading-relaxed">
              Clipboard access was blocked. Please allow clipboard permissions
              in your browser settings and try again.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-sm font-sans font-medium text-gold hover:opacity-70 transition-opacity underline underline-offset-4"
        >
          Submit another request
        </button>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Name + Mobile */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="appt-name" className="block text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-2">
            Full Name <span className="text-gold" aria-hidden="true">*</span>
          </label>
          <input
            id="appt-name"
            type="text"
            autoComplete="name"
            placeholder="e.g. Rahul Sharma"
            aria-required="true"
            aria-describedby={errors.name ? "appt-name-error" : undefined}
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            className={cn(inputBase, errors.name ? inputError : inputNormal)}
          />
          {errors.name && (
            <p id="appt-name-error" className="mt-1.5 text-xs text-red-500" role="alert">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="appt-mobile" className="block text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-2">
            Mobile Number <span className="text-gold" aria-hidden="true">*</span>
          </label>
          <input
            id="appt-mobile"
            type="tel"
            autoComplete="tel"
            placeholder="e.g. +91 98765 43210"
            aria-required="true"
            aria-describedby={errors.mobile ? "appt-mobile-error" : undefined}
            value={form.mobile}
            onChange={(e) => setField("mobile", e.target.value)}
            className={cn(inputBase, errors.mobile ? inputError : inputNormal)}
          />
          {errors.mobile && (
            <p id="appt-mobile-error" className="mt-1.5 text-xs text-red-500" role="alert">{errors.mobile}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="appt-email" className="block text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-2">
          Email{" "}
          <span className="text-muted-text/50 normal-case font-normal tracking-normal">
            (optional)
          </span>
        </label>
        <input
          id="appt-email"
          type="email"
          autoComplete="email"
          placeholder="e.g. rahul@email.com"
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
          className={cn(inputBase, inputNormal)}
        />
      </div>

      {/* Service */}
      <div>
        <label htmlFor="appt-service" className="block text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-2">
          Service Required <span className="text-gold" aria-hidden="true">*</span>
        </label>
        <select
          id="appt-service"
          value={form.service}
          aria-required="true"
          aria-describedby={errors.service ? "appt-service-error" : undefined}
          onChange={(e) => setField("service", e.target.value)}
          className={cn(
            inputBase,
            errors.service ? inputError : inputNormal,
            form.service === "" ? "text-muted-text/50" : "text-rich-black"
          )}
        >
          <option value="" disabled>
            Select a service…
          </option>
          {SERVICE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.service && (
          <p id="appt-service-error" className="mt-1.5 text-xs text-red-500" role="alert">{errors.service}</p>
        )}
      </div>

      {/* Date + Time */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="min-w-0 overflow-hidden">
          <label htmlFor="appt-date" className="block text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-2">
            Preferred Date <span className="text-gold" aria-hidden="true">*</span>
          </label>
          <div className="overflow-hidden rounded-sm">
            <input
              id="appt-date"
              type="date"
              min={today}
              aria-required="true"
              aria-describedby={errors.date ? "appt-date-error" : undefined}
              value={form.date}
              onChange={(e) => setField("date", e.target.value)}
              className={cn(
                inputBase,
                "min-w-0",
                errors.date ? inputError : inputNormal,
                form.date === "" ? "text-muted-text/50" : "text-rich-black"
              )}
            />
          </div>
          {errors.date && (
            <p id="appt-date-error" className="mt-1.5 text-xs text-red-500" role="alert">{errors.date}</p>
          )}
        </div>
        <div className="min-w-0">
          <label htmlFor="appt-time" className="block text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-2">
            Preferred Time <span className="text-gold" aria-hidden="true">*</span>
          </label>
          <select
            id="appt-time"
            value={form.time}
            aria-required="true"
            aria-describedby={errors.time ? "appt-time-error" : undefined}
            onChange={(e) => setField("time", e.target.value)}
            className={cn(
              inputBase,
              errors.time ? inputError : inputNormal,
              form.time === "" ? "text-muted-text/50" : "text-rich-black"
            )}
          >
            <option value="" disabled>
              Select a time slot…
            </option>
            {TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.time && (
            <p id="appt-time-error" className="mt-1.5 text-xs text-red-500" role="alert">{errors.time}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="appt-message" className="block text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-2">
          Additional Message{" "}
          <span className="text-muted-text/50 normal-case font-normal tracking-normal">
            (optional)
          </span>
        </label>
        <textarea
          id="appt-message"
          rows={3}
          placeholder="Describe your concern or any additional details…"
          value={form.message}
          onChange={(e) => setField("message", e.target.value)}
          className={cn(inputBase, inputNormal, "resize-none")}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex h-12 items-center justify-center gap-2 px-8 bg-gold text-white text-sm font-sans font-medium rounded-sm hover:bg-gold-light transition-all duration-200 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Continue to WhatsApp
        <ArrowRight
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </button>

      <p className="text-xs text-muted-text/60 leading-relaxed -mt-1">
        WhatsApp will open with your appointment details. Please review your
        message and press Send to submit your request.
      </p>
    </form>
  );
}
