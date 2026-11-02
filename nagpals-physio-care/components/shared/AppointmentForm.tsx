"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle } from "lucide-react";

export function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Placeholder: replace with actual form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-8">
        <CheckCircle size={48} className="text-gold mb-5" />
        <h3 className="font-heading text-2xl text-rich-black mb-3">
          Message Received
        </h3>
        <p className="text-sm text-muted-text leading-relaxed">
          Thank you for reaching out. We&apos;ll be in touch shortly to confirm
          your appointment.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      aria-label="Appointment request form"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="firstName"
            className="block text-xs font-sans font-medium text-muted-text uppercase tracking-wider mb-2"
          >
            First Name <span className="text-gold">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className="w-full h-11 px-4 bg-warm-white border border-beige rounded-sm text-sm text-rich-black placeholder:text-muted-text/50 focus:outline-none focus:border-gold transition-colors"
            placeholder="Your first name"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-xs font-sans font-medium text-muted-text uppercase tracking-wider mb-2"
          >
            Last Name <span className="text-gold">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className="w-full h-11 px-4 bg-warm-white border border-beige rounded-sm text-sm text-rich-black placeholder:text-muted-text/50 focus:outline-none focus:border-gold transition-colors"
            placeholder="Your last name"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-xs font-sans font-medium text-muted-text uppercase tracking-wider mb-2"
        >
          Email <span className="text-gold">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full h-11 px-4 bg-warm-white border border-beige rounded-sm text-sm text-rich-black placeholder:text-muted-text/50 focus:outline-none focus:border-gold transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-xs font-sans font-medium text-muted-text uppercase tracking-wider mb-2"
        >
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full h-11 px-4 bg-warm-white border border-beige rounded-sm text-sm text-rich-black placeholder:text-muted-text/50 focus:outline-none focus:border-gold transition-colors"
          placeholder="+1 (XXX) XXX-XXXX"
        />
      </div>

      <div>
        <label
          htmlFor="concern"
          className="block text-xs font-sans font-medium text-muted-text uppercase tracking-wider mb-2"
        >
          Primary Concern <span className="text-gold">*</span>
        </label>
        <select
          id="concern"
          name="concern"
          required
          className="w-full h-11 px-4 bg-warm-white border border-beige rounded-sm text-sm text-rich-black focus:outline-none focus:border-gold transition-colors appearance-none"
        >
          <option value="">Select your primary concern</option>
          <option>Back or Neck Pain</option>
          <option>Sports Injury</option>
          <option>Post-Surgical Rehabilitation</option>
          <option>Joint Pain (Knee/Hip/Shoulder)</option>
          <option>Chronic Pain</option>
          <option>Neurological Condition</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs font-sans font-medium text-muted-text uppercase tracking-wider mb-2"
        >
          Additional Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-4 py-3 bg-warm-white border border-beige rounded-sm text-sm text-rich-black placeholder:text-muted-text/50 focus:outline-none focus:border-gold transition-colors resize-none"
          placeholder="Briefly describe your condition or any questions you have..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full h-12 items-center justify-center gap-2 bg-gold text-white text-sm font-sans font-medium rounded-sm hover:bg-gold-light transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Sending…" : "Send Message"}
        {!loading && <Send size={15} />}
      </button>
    </form>
  );
}
