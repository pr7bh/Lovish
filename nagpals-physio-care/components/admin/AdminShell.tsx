"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopNav } from "./AdminTopNav";

const PAGE_TITLES: Record<string, string> = {
  "/admin/dashboard":     "Dashboard",
  "/admin/appointments":  "Appointments",
  "/admin/calendar":      "Calendar",
  "/admin/availability":  "Availability",
  "/admin/blocked-dates": "Blocked Dates",
  "/admin/services":      "Services",
  "/admin/settings":      "Settings",
};

interface Props {
  children: React.ReactNode;
  adminName: string;
}

export function AdminShell({ children, adminName }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Match exact path first, then the two-segment prefix for nested routes
  const title =
    PAGE_TITLES[pathname] ??
    PAGE_TITLES[pathname.split("/").slice(0, 3).join("/")] ??
    "Admin";

  return (
    <div className="flex min-h-screen">
      <AdminSidebar
        adminName={adminName}
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1 min-w-0 bg-warm-white">
        <AdminTopNav title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-5 lg:p-7 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
