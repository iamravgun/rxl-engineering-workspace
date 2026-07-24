"use client";

import { VALIDATION_ITEMS } from "@/lib/workspace-data";

function ContextField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-rxl-text-tertiary">
        {label}
      </span>
      <span className="text-[12px] font-medium text-rxl-text">{children}</span>
    </div>
  );
}

// Compact, glanceable project metadata that used to be scattered across
// the status bar footer and the validation panel — surfaced here so it's
// visible without scrolling the right panel or the bottom of the screen.
export function ProjectContextStrip() {
  const passedCount = VALIDATION_ITEMS.filter((i) => i.status === "passed").length;
  const total = VALIDATION_ITEMS.length;
  const allVerified = passedCount === total;

  return (
    <div className="flex h-9 shrink-0 items-center gap-4 border-b border-rxl-border bg-rxl-panel px-4">
      <ContextField label="Project">DC-West-01</ContextField>

      <div className="h-3 w-px bg-rxl-border" />

      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-rxl-text-tertiary">
          Status
        </span>
        <span className="flex items-center gap-1.5 text-[12px] font-medium text-rxl-text">
          <span
            className={`size-1.5 rounded-full ${
              allVerified ? "bg-rxl-success" : "bg-rxl-warning"
            }`}
          />
          {allVerified ? "Ready for Package" : "Engineering Review"}
        </span>
      </div>

      <div className="h-3 w-px bg-rxl-border" />

      <ContextField label="Revision">Rev 03</ContextField>

      <div className="h-3 w-px bg-rxl-border" />

      <ContextField label="Selected Aisle">Cold Aisle 01</ContextField>

      <div className="h-3 w-px bg-rxl-border" />

      <ContextField label="Validation">
        <span className="font-mono tabular-nums">
          {passedCount}/{total}
        </span>
      </ContextField>
    </div>
  );
}
