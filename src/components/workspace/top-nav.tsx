"use client";

import { Bell, ChevronDown, PackageCheck, Search } from "lucide-react";
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
  return (
    <header className="flex h-[72px] shrink-0 items-center border-b border-rxl-border bg-rxl-panel px-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-md bg-rxl-accent">
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

      <div className="mx-6 h-8 w-px bg-rxl-border" />

      {/* Primary nav */}
      <nav className="flex items-center gap-1">
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

      {/* Global search */}
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
        className="mr-4 flex h-9 items-center gap-2 rounded-md py-1 pl-1 pr-2 transition-colors hover:bg-rxl-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-rxl-accent"
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
        <ChevronDown className="size-3.5 text-rxl-text-tertiary" />
      </button>

      <div className="h-8 w-px bg-rxl-border" />

      {/* Primary CTA */}
      <Button
        variant="default"
        size="default"
        className="ml-4 h-9 gap-1.5 bg-rxl-accent px-3.5 text-[13px] font-semibold text-[#14100c] hover:bg-rxl-accent-hover"
      >
        <PackageCheck className="size-4" strokeWidth={2} />
        Generate Engineering Package
      </Button>
    </header>
  );
}
