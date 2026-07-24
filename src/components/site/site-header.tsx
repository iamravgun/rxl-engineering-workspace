"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Solutions", href: "/#solutions" },
  { label: "Workflow", href: "/#workflow" },
  { label: "Why RXL", href: "/#why-rxl" },
  { label: "Products", href: "/#products" },
  { label: "Case Studies", href: "/#case-studies" },
  { label: "Resources", href: "/#resources" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rxl-border bg-rxl-panel/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-md bg-rxl-accent">
            <span className="text-sm font-bold tracking-tight text-[#14100c]">
              RXL
            </span>
          </div>
          <div className="hidden flex-col leading-none sm:flex">
            <span className="text-[13px] font-semibold tracking-wide text-rxl-text">
              RXL
            </span>
            <span className="text-[11px] text-rxl-text-tertiary">
              Engineering Platform
            </span>
          </div>
        </Link>

        <nav className="ml-10 hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-md px-3 py-2 text-[13px] font-medium text-rxl-text-secondary transition-colors hover:bg-rxl-surface hover:text-rxl-text"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="hidden items-center gap-1 lg:flex">
          <span
            title="Client Portal — not available in this preview"
            aria-disabled="true"
            className="cursor-not-allowed rounded-md px-3 py-2 text-[13px] font-medium text-rxl-text-tertiary opacity-50"
          >
            Client Portal
          </span>
          <Link
            href="/workspace"
            className="rounded-md px-3 py-2 text-[13px] font-medium text-rxl-text-secondary transition-colors hover:bg-rxl-surface hover:text-rxl-text"
          >
            Engineering Workspace
          </Link>
        </div>

        <Button
          variant="default"
          className="ml-4 hidden h-9 gap-1.5 bg-rxl-accent px-3.5 text-[13px] font-semibold text-[#14100c] hover:bg-rxl-accent-hover lg:inline-flex"
          render={
            <Link href="/workspace">
              Start a Project
              <ArrowRight className="size-3.5" strokeWidth={2} />
            </Link>
          }
        />

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="ml-2 flex size-9 items-center justify-center rounded-md text-rxl-text-secondary transition-colors hover:bg-rxl-surface hover:text-rxl-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-rxl-accent lg:hidden"
        >
          {menuOpen ? (
            <X className="size-[18px]" strokeWidth={1.75} />
          ) : (
            <Menu className="size-[18px]" strokeWidth={1.75} />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-rxl-border bg-rxl-panel px-4 py-4 sm:px-6 lg:hidden">
          <nav className="flex flex-col gap-0.5">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2.5 text-[13px] font-medium text-rxl-text-secondary transition-colors hover:bg-rxl-surface hover:text-rxl-text"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/workspace"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-2.5 text-[13px] font-medium text-rxl-text-secondary transition-colors hover:bg-rxl-surface hover:text-rxl-text"
            >
              Engineering Workspace
            </Link>
            <span
              aria-disabled="true"
              className={cn(
                "flex cursor-not-allowed items-center justify-between rounded-md px-3 py-2.5 text-[13px] font-medium text-rxl-text-tertiary opacity-50"
              )}
            >
              Client Portal
              <span className="text-[10px] uppercase tracking-wide">Soon</span>
            </span>
          </nav>
          <Button
            variant="default"
            className="mt-3 h-10 w-full gap-1.5 bg-rxl-accent text-[13px] font-semibold text-[#14100c] hover:bg-rxl-accent-hover"
            render={
              <Link href="/workspace" onClick={() => setMenuOpen(false)}>
                Start a Project
                <ArrowRight className="size-3.5" strokeWidth={2} />
              </Link>
            }
          />
        </div>
      )}
    </header>
  );
}
