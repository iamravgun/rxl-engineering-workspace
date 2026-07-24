"use client";

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  PackageCheck,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PRIMARY_NAV = [
  { label: "Projects", href: "#" },
  { label: "Engineering Workspace", href: "#", active: true },
  { label: "Resources", href: "#" },
  { label: "Client Portal", href: "#" },
  { label: "Support", href: "#" },
];

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative flex h-[72px] shrink-0 items-center border-b border-rxl-border bg-rxl-panel px-4 sm:px-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-rxl-accent">
          <span className="text-sm font-bold tracking-tight text-[#14100c]">
            RXL
          </span>
        </div>
        <div className="hidden flex-col leading-none xl:flex">
          <span className="text-[13px] font-semibold tracking-wide text-rxl-text">
            RXL
          </span>
          <span className="text-[11px] text-rxl-text-tertiary">
            Engineering Platform
          </span>
        </div>
      </div>

      {/* Current page — mobile/tablet only, replaces the full nav */}
      <span className="ml-4 truncate text-[13px] font-medium text-rxl-text lg:hidden">
        Engineering Workspace
      </span>

      <div className="mx-6 hidden h-8 w-px bg-rxl-border lg:block" />

      {/* Primary nav — desktop only */}
      <nav className="hidden items-center gap-1 lg:flex">
        {PRIMARY_NAV.map((item) => (
          <a
            key={item.label}
            href={item.href}
            aria-current={item.active ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
              item.active
                ? "bg-rxl-accent-muted text-rxl-accent"
                : "text-rxl-text-secondary hover:bg-rxl-surface hover:text-rxl-text"
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="flex-1" />

      {/* Global search — desktop only */}
      <div className="mr-4 hidden h-9 items-center gap-2 rounded-md border border-rxl-border bg-rxl-surface px-3 text-rxl-text-tertiary transition-colors focus-within:border-rxl-accent-border lg:flex">
        <Search className="size-4" strokeWidth={1.75} />
        <input
          type="text"
          placeholder="Search projects, components, drawings..."
          className="w-56 bg-transparent text-[13px] text-rxl-text placeholder:text-rxl-text-tertiary focus:outline-none"
        />
        <kbd className="rounded border border-rxl-border-strong px-1.5 py-0.5 font-mono text-[10px] text-rxl-text-tertiary">
          ⌘K
        </kbd>
      </div>

      {/* Menu toggle — mobile/tablet only, reveals nav links + search */}
      <button
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
        className="mr-1 flex size-9 items-center justify-center rounded-md text-rxl-text-secondary transition-colors hover:bg-rxl-surface hover:text-rxl-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-rxl-accent lg:hidden"
      >
        {menuOpen ? (
          <X className="size-[18px]" strokeWidth={1.75} />
        ) : (
          <Menu className="size-[18px]" strokeWidth={1.75} />
        )}
      </button>

      {/* Notifications */}
      <button
        type="button"
        aria-label="Notifications, 2 unread"
        className="relative mr-2 flex size-9 items-center justify-center rounded-md text-rxl-text-secondary transition-colors hover:bg-rxl-surface hover:text-rxl-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-rxl-accent"
      >
        <Bell className="size-[18px]" strokeWidth={1.75} />
        <span className="absolute right-2 top-2 flex size-1.5 rounded-full bg-rxl-accent" />
      </button>

      {/* Profile */}
      <button
        type="button"
        className="mr-2 flex h-9 items-center gap-2 rounded-md py-1 pl-1 pr-2 transition-colors hover:bg-rxl-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-rxl-accent sm:mr-4"
      >
        <div className="flex size-7 items-center justify-center rounded-full bg-rxl-surface-raised text-[11px] font-semibold text-rxl-text">
          DM
        </div>
        <div className="hidden flex-col items-start leading-none xl:flex">
          <span className="text-[12px] font-medium text-rxl-text">
            D. Mercer
          </span>
          <span className="text-[10px] text-rxl-text-tertiary">
            Data Center Engineer
          </span>
        </div>
        <ChevronDown className="hidden size-3.5 text-rxl-text-tertiary sm:block" />
      </button>

      <div className="hidden h-8 w-px bg-rxl-border sm:block" />

      {/* Primary CTA — icon-only on the smallest screens */}
      <Button
        variant="default"
        size="default"
        className="ml-2 h-9 gap-1.5 bg-rxl-accent px-2.5 text-[13px] font-semibold text-[#14100c] hover:bg-rxl-accent-hover sm:ml-4 sm:px-3.5"
      >
        <PackageCheck className="size-4" strokeWidth={2} />
        <span className="hidden sm:inline">Generate Engineering Package</span>
      </Button>

      {/* Mobile/tablet menu — nav links + search, revealed below lg */}
      {menuOpen && (
        <div className="absolute inset-x-0 top-[72px] z-50 border-b border-rxl-border bg-rxl-panel px-4 py-4 shadow-lg shadow-black/30 sm:px-6 lg:hidden">
          <div className="mb-3 flex h-9 items-center gap-2 rounded-md border border-rxl-border bg-rxl-surface px-3 text-rxl-text-tertiary">
            <Search className="size-4" strokeWidth={1.75} />
            <input
              type="text"
              placeholder="Search projects, components, drawings..."
              className="w-full bg-transparent text-[13px] text-rxl-text placeholder:text-rxl-text-tertiary focus:outline-none"
            />
          </div>
          <nav className="flex flex-col gap-0.5">
            {PRIMARY_NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2.5 text-[13px] font-medium transition-colors",
                  item.active
                    ? "bg-rxl-accent-muted text-rxl-accent"
                    : "text-rxl-text-secondary hover:bg-rxl-surface hover:text-rxl-text"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
