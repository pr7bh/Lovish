"use client";

import { Menu } from "lucide-react";
import { signOut } from "@/lib/admin/actions/auth";

interface Props {
  title: string;
  onMenuClick: () => void;
}

export function AdminTopNav({ title, onMenuClick }: Props) {
  return (
    <header className="h-14 bg-white border-b border-beige px-4 lg:px-6 flex items-center gap-4 shrink-0">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-rich-black/60 hover:text-rich-black"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>
      <h1 className="font-heading text-xl text-rich-black flex-1">{title}</h1>
      <form action={signOut}>
        <button
          type="submit"
          className="text-xs font-sans text-muted-text hover:text-rich-black transition-colors px-3 py-1.5 border border-beige rounded-sm hover:border-rich-black/20"
        >
          Sign out
        </button>
      </form>
    </header>
  );
}
