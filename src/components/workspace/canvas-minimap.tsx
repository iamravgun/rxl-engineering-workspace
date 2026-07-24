"use client";

export function CanvasMinimap() {
  return (
    <div className="pointer-events-auto absolute bottom-5 right-5 w-[190px] overflow-hidden rounded-md border border-rxl-border bg-rxl-panel shadow-md shadow-black/15">
      <div className="border-b border-rxl-border px-2.5 py-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-rxl-text-tertiary">
          Overview
        </span>
      </div>
      <svg viewBox="0 0 190 120" className="block h-[120px] w-full">
        <rect x="0" y="0" width="190" height="120" fill="var(--rxl-surface)" />
        {/* room outline */}
        <rect
          x="14"
          y="16"
          width="162"
          height="88"
          fill="none"
          stroke="var(--rxl-border-strong)"
          strokeWidth="1"
        />
        {/* pod A */}
        <rect
          x="24"
          y="36"
          width="62"
          height="48"
          fill="var(--rxl-accent-muted)"
          stroke="var(--rxl-accent)"
          strokeWidth="1"
        />
        {/* pod B */}
        <rect
          x="118"
          y="36"
          width="46"
          height="48"
          fill="rgba(168,176,184,0.08)"
          stroke="var(--rxl-border-strong)"
          strokeWidth="1"
        />
        {/* viewport indicator */}
        <rect
          x="10"
          y="12"
          width="170"
          height="96"
          fill="none"
          stroke="var(--rxl-accent)"
          strokeWidth="1.25"
          strokeDasharray="3 2"
        />
      </svg>
    </div>
  );
}
