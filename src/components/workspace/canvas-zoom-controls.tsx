"use client";

import { Maximize, Minus, Plus } from "lucide-react";

export function CanvasZoomControls() {
  return (
    <div className="pointer-events-auto absolute bottom-5 left-5 flex items-center gap-0.5 rounded-md border border-rxl-border bg-rxl-panel/95 p-0.5 shadow-lg shadow-black/20 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Zoom out"
        className="flex size-8 items-center justify-center rounded text-rxl-text-secondary transition-colors hover:bg-rxl-surface hover:text-rxl-text"
      >
        <Minus className="size-4" strokeWidth={1.75} />
      </button>
      <div className="flex h-8 min-w-[52px] items-center justify-center px-1 font-mono text-[12px] tabular-nums text-rxl-text">
        100%
      </div>
      <button
        type="button"
        aria-label="Zoom in"
        className="flex size-8 items-center justify-center rounded text-rxl-text-secondary transition-colors hover:bg-rxl-surface hover:text-rxl-text"
      >
        <Plus className="size-4" strokeWidth={1.75} />
      </button>
      <div className="mx-0.5 h-5 w-px bg-rxl-border" />
      <button
        type="button"
        aria-label="Fit to screen"
        className="flex size-8 items-center justify-center rounded text-rxl-text-secondary transition-colors hover:bg-rxl-surface hover:text-rxl-text"
      >
        <Maximize className="size-[15px]" strokeWidth={1.75} />
      </button>
    </div>
  );
}
