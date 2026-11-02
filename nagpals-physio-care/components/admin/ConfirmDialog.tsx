"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ConfirmDialogProps {
  trigger: (open: () => void) => React.ReactNode;
  title: string;
  description: string;
  confirmLabel?: string;
  variant?: "danger" | "primary";
  onConfirm: () => void | Promise<void>;
}

export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel = "Confirm",
  variant = "primary",
  onConfirm,
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      {trigger(() => setOpen(true))}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-rich-black/40 backdrop-blur-sm"
            onClick={() => !loading && setOpen(false)}
          />
          <div className="relative z-10 bg-white border border-beige rounded-sm shadow-2xl w-full max-w-sm p-6">
            <button
              onClick={() => !loading && setOpen(false)}
              className="absolute top-4 right-4 text-muted-text hover:text-rich-black"
              disabled={loading}
              aria-label="Close"
            >
              <X size={16} />
            </button>
            <h3 className="font-heading text-xl text-rich-black mb-2">{title}</h3>
            <p className="text-sm text-muted-text leading-relaxed mb-6">{description}</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="h-9 px-4 text-sm font-sans border border-beige text-rich-black/70 rounded-sm hover:border-rich-black/30 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className={`h-9 px-4 text-sm font-sans font-medium rounded-sm transition-colors disabled:opacity-50 ${
                  variant === "danger"
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-gold text-white hover:bg-gold-light"
                }`}
              >
                {loading ? "Please wait…" : confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
