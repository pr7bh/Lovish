import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login — Nagpal's Physio Care",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo & branding */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-sm overflow-hidden border border-beige shadow-sm">
              <Image
                src="/images/nagpals-physio-logo.jpeg"
                alt="Nagpal's Physio Care"
                width={56}
                height={56}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
          <h1 className="font-heading text-2xl text-rich-black">Admin Portal</h1>
          <p className="text-sm text-muted-text font-sans mt-1">Nagpal&apos;s Physio Care</p>
        </div>

        {/* Login card */}
        <div className="bg-white border border-beige rounded-sm p-7 shadow-sm">
          <h2 className="font-heading text-lg text-rich-black mb-5">Sign in to your account</h2>
          <LoginForm />
        </div>

        <p className="text-center text-xs text-muted-text font-sans mt-6">
          Admin access only. Unauthorised access is prohibited.
        </p>
      </div>
    </div>
  );
}
