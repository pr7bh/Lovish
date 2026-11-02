"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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

const today = new Date().toISOString().split("T")[0];

function buildWhatsAppMessage(f: FormState): string {
  const lines = [
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
  return lines.filter((l) => l !== null).join("\n");
}

const inputBase =
  "w-full px-4 py-3 text-sm font-sans text-rich-black bg-warm-white border rounded-sm outline-none transition-all duration-200 placeholder:text-muted-text/50";
const inputNormal = "border-beige focus:border-gold focus:ring-1 focus:ring-gold/30";
const inputError = "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/30";

export function AppointmentForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    mobile: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function set(field: keyof FormState, value: string) {
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
    if (!validate()) return;
    const msg = buildWhatsAppMessage(form);
    const url = `${clinic.whatsappUrl}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-6 py-8">
        <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
          <CheckCircle2 size={28} className="text-gold" />
        </div>
        <div>
          <h3 className="font-heading text-2xl text-rich-black mb-2">
            WhatsApp Opened
          </h3>
          <p className="text-sm text-muted-text leading-relaxed max-w-sm">
            Your appointment request has been pre-filled in WhatsApp. Simply
            review the message and tap <strong>Send</strong> — Dr. Lovish Nagpal
            will confirm your slot promptly.
          </p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", mobile: "", email: "", service: "", date: "", time: "", message: "" });
          }}
          className="text-sm font-sans font-medium text-gold hover:opacity-70 transition-opacity underline underline-offset-4"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Name + Mobile */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-2">
            Full Name <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            autoComplete="name"
            placeholder="e.g. Rahul Sharma"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className={cn(inputBase, errors.name ? inputError : inputNormal)}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-2">
            Mobile Number <span className="text-gold">*</span>
          </label>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="e.g. +91 98765 43210"
            value={form.mobile}
            onChange={(e) => set("mobile", e.target.value)}
            className={cn(inputBase, errors.mobile ? inputError : inputNormal)}
          />
          {errors.mobile && (
            <p className="mt-1.5 text-xs text-red-500">{errors.mobile}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-2">
          Email{" "}
          <span className="text-muted-text/50 normal-case font-normal tracking-normal">
            (optional)
          </span>
        </label>
        <input
          type="email"
          autoComplete="email"
          placeholder="e.g. rahul@email.com"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          className={cn(inputBase, inputNormal)}
        />
      </div>

      {/* Service */}
      <div>
        <label className="block text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-2">
          Service Required <span className="text-gold">*</span>
        </label>
        <select
          value={form.service}
          onChange={(e) => set("service", e.target.value)}
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
          <p className="mt-1.5 text-xs text-red-500">{errors.service}</p>
        )}
      </div>

      {/* Date + Time */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-2">
            Preferred Date <span className="text-gold">*</span>
          </label>
          <input
            type="date"
            min={today}
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            className={cn(
              inputBase,
              errors.date ? inputError : inputNormal,
              form.date === "" ? "text-muted-text/50" : "text-rich-black"
            )}
          />
          {errors.date && (
            <p className="mt-1.5 text-xs text-red-500">{errors.date}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-2">
            Preferred Time <span className="text-gold">*</span>
          </label>
          <select
            value={form.time}
            onChange={(e) => set("time", e.target.value)}
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
            <p className="mt-1.5 text-xs text-red-500">{errors.time}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-2">
          Additional Message{" "}
          <span className="text-muted-text/50 normal-case font-normal tracking-normal">
            (optional)
          </span>
        </label>
        <textarea
          rows={3}
          placeholder="Describe your concern or any additional details…"
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          className={cn(inputBase, inputNormal, "resize-none")}
        />
      </div>

      <button
        type="submit"
        className="group inline-flex h-12 items-center justify-center gap-2 px-8 bg-gold text-white text-sm font-sans font-medium rounded-sm hover:bg-gold-light transition-all duration-200 mt-1"
      >
        Submit via WhatsApp
        <ArrowRight
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </button>

      <p className="text-xs text-muted-text/60 leading-relaxed -mt-1">
        Clicking submit opens WhatsApp with a pre-filled message. You review it
        and tap Send — nothing is submitted automatically.
      </p>
    </form>
  );
}
