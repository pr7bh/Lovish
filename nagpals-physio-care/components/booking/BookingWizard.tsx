"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ServiceData } from "@/lib/services-data";
import type { PatientDetails, BookingPhase, BookingStep } from "@/types/booking";
import { submitBookingRequest } from "@/lib/booking/booking-adapter";
import BookingProgress from "./BookingProgress";
import ServiceSelection from "./ServiceSelection";
import DateSelection from "./DateSelection";
import TimeSlotSelection from "./TimeSlotSelection";
import PatientDetailsForm from "./PatientDetailsForm";
import BookingReview from "./BookingReview";
import BookingSuccess from "./BookingSuccess";

const ease: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export default function BookingWizard() {
  const [step, setStep] = useState<BookingPhase>(1);
  const [service, setService] = useState<ServiceData | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [patient, setPatient] = useState<PatientDetails | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const direction = useRef<1 | -1>(1);
  const prefersReduced = useReducedMotion() ?? false;

  function goTo(next: BookingPhase) {
    direction.current =
      typeof next === "number" && typeof step === "number" && next > step
        ? 1
        : -1;
    setStep(next);
  }

  async function handleConfirm() {
    if (!service || !date || !timeSlot || !patient) return;
    setSubmitting(true);
    setSubmitError(null);

    const result = await submitBookingRequest({
      serviceSlug: service.slug,
      serviceTitle: service.title,
      date,
      timeSlot,
      patient,
      requestedAt: new Date().toISOString(),
    });

    setSubmitting(false);

    if (result.success && result.requestId) {
      setRequestId(result.requestId);
      direction.current = 1;
      setStep("success");
    } else {
      setSubmitError(result.error ?? "Something went wrong. Please try again.");
    }
  }

  function resetBooking() {
    setStep(1);
    setService(null);
    setDate(null);
    setTimeSlot(null);
    setPatient(null);
    setRequestId(null);
    setSubmitError(null);
    direction.current = 1;
  }

  const variants = {
    enter: (dir: 1 | -1) => ({
      x: prefersReduced ? 0 : dir > 0 ? 48 : -48,
      opacity: prefersReduced ? 1 : 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: 1 | -1) => ({
      x: prefersReduced ? 0 : dir > 0 ? -48 : 48,
      opacity: prefersReduced ? 1 : 0,
    }),
  };

  const transition = { duration: prefersReduced ? 0 : 0.28, ease };

  function renderStep() {
    switch (step) {
      case 1:
        return (
          <ServiceSelection
            selected={service}
            onSelect={setService}
            onNext={() => goTo(2)}
          />
        );
      case 2:
        return (
          <DateSelection
            selected={date}
            onSelect={setDate}
            onNext={() => goTo(3)}
            onBack={() => goTo(1)}
          />
        );
      case 3:
        return (
          <TimeSlotSelection
            date={date!}
            serviceSlug={service!.slug}
            selected={timeSlot}
            onSelect={setTimeSlot}
            onNext={() => goTo(4)}
            onBack={() => goTo(2)}
          />
        );
      case 4:
        return (
          <PatientDetailsForm
            initialValues={patient}
            onSubmit={(p) => {
              setPatient(p);
              goTo(5);
            }}
            onBack={() => goTo(3)}
          />
        );
      case 5:
        return (
          <BookingReview
            service={service!}
            date={date!}
            timeSlot={timeSlot!}
            patient={patient!}
            onConfirm={handleConfirm}
            onEdit={(s: BookingStep) => goTo(s)}
            submitting={submitting}
            error={submitError}
          />
        );
      case "success":
        return (
          <BookingSuccess
            requestId={requestId!}
            service={service!}
            date={date!}
            timeSlot={timeSlot!}
            onNewBooking={resetBooking}
          />
        );
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-ivory">
      {/* Progress bar — visible only for numbered steps */}
      {typeof step === "number" && (
        <div className="sticky top-16 md:top-20 z-40 bg-ivory/95 backdrop-blur-sm border-b border-beige">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <BookingProgress current={step} />
          </div>
        </div>
      )}

      {/* Step content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <AnimatePresence mode="wait" custom={direction.current}>
          <motion.div
            key={step}
            custom={direction.current}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
