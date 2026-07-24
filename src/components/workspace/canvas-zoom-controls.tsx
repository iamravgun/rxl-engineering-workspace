"use client";

import { Maximize, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export const ZOOM_MIN = 25;
export const ZOOM_MAX = 400;

export function CanvasZoomControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onFit,
}: {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFit: () => void;
}) {
  return (
    <div className="pointer-events-auto absolute bottom-5 left-5 flex items-center gap-0.5 rounded-md border border-rxl-border bg-rxl-panel/95 p-0.5 shadow-lg shadow-black/20 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Zoom out"
        disabled={zoom <= ZOOM_MIN}
        onClick={onZoomOut}
        className={cn(
          "flex size-8 items-center justify-center rounded text-rxl-text-secondary transition-colors hover:bg-rxl-surface hover:text-rxl-text",
          zoom <= ZOOM_MIN && "cursor-not-allowed opacity-30 hover:bg-transparent"
        )}
      >
        <Minus className="size-4" strokeWidth={1.75} />
      </button>
      <button
        type="button"
        aria-label="Reset zoom to 100%"
        onClick={onFit}
        className="flex h-8 min-w-[52px] items-center justify-center px-1 font-mono text-[12px] tabular-nums text-rxl-text hover:text-rxl-accent"
      >
        {zoom}%
      </button>
      <button
        type="button"
        aria-label="Zoom in"
        disabled={zoom >= ZOOM_MAX}
        onClick={onZoomIn}
        className={cn(
          "flex size-8 items-center justify-center rounded text-rxl-text-secondary transition-colors hover:bg-rxl-surface hover:text-rxl-text",
          zoom >= ZOOM_MAX && "cursor-not-allowed opacity-30 hover:bg-transparent"
        )}
      >
        <Plus className="size-4" strokeWidth={1.75} />
      </button>
      <div className="mx-0.5 h-5 w-px bg-rxl-border" />
      <button
        type="button"
        aria-label="Fit to screen"
        onClick={onFit}
        className="flex size-8 items-center justify-center rounded text-rxl-text-secondary transition-colors hover:bg-rxl-surface hover:text-rxl-text"
      >
        <Maximize className="size-[15px]" strokeWidth={1.75} />
      </button>
    </div>
  );
}
