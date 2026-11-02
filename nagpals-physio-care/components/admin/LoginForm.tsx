"use client";

import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { signIn } from "@/lib/admin/actions/auth";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const result = await signIn(
      data.get("email") as string,
      data.get("password") as string
    );

    // If result is returned, it's an error (success redirects server-side).
    if (result && !result.success) {
      setError(result.error);
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {error && (
        <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-200 rounded-sm text-sm text-red-700">
          <AlertCircle size={15} className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-xs font-sans font-semibold text-rich-black/70 uppercase tracking-widest mb-1.5">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full h-10 px-3 text-sm font-sans border border-beige rounded-sm bg-warm-white text-rich-black placeholder-muted-text focus:outline-none focus:border-gold transition-colors"
          placeholder="admin@clinic.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-sans font-semibold text-rich-black/70 uppercase tracking-widest mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            className="w-full h-10 px-3 pr-10 text-sm font-sans border border-beige rounded-sm bg-warm-white text-rich-black focus:outline-none focus:border-gold transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-rich-black"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-10 bg-gold text-white text-sm font-sans font-medium rounded-sm hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
