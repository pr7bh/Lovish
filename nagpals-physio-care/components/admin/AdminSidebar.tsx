"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Clock,
  CalendarOff,
  Stethoscope,
  Settings,
  X,
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { href: "/admin/dashboard",      label: "Dashboard",      icon: LayoutDashboard },
  { href: "/admin/appointments",   label: "Appointments",   icon: ClipboardList   },
  { href: "/admin/calendar",       label: "Calendar",       icon: Calendar        },
  { href: "/admin/availability",   label: "Availability",   icon: Clock           },
  { href: "/admin/blocked-dates",  label: "Blocked Dates",  icon: CalendarOff     },
  { href: "/admin/services",       label: "Services",       icon: Stethoscope     },
  { href: "/admin/settings",       label: "Settings",       icon: Settings        },
];

interface Props {
  adminName: string;
  mobileOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ adminName, mobileOpen, onClose }: Props) {
  const pathname = usePathname();

  const content = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-8 h-8 rounded-sm overflow-hidden shrink-0">
          <Image
            src="/images/nagpals-physio-logo.jpeg"
            alt="Logo"
            width={32}
            height={32}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="min-w-0">
          <p className="text-white text-sm font-sans font-semibold truncate">Nagpal&apos;s</p>
          <p className="text-white/50 text-xs font-sans truncate">Admin Portal</p>
        </div>
        <button
          onClick={onClose}
          className="ml-auto lg:hidden text-white/50 hover:text-white"
          aria-label="Close menu"
        >
          <X size={16} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-sans transition-colors ${
                active
                  ? "bg-gold/20 text-gold"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={16} className="shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Admin name */}
      <div className="px-5 py-4 border-t border-white/10">
        <p className="text-xs text-white/40 font-sans uppercase tracking-widest mb-0.5">Signed in as</p>
        <p className="text-white/80 text-sm font-sans truncate">{adminName}</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-rich-black shrink-0 h-screen sticky top-0">
        {content}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-rich-black/60" onClick={onClose} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-rich-black z-50 flex flex-col">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
