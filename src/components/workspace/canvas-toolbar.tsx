"use client";

import {
  ChevronRight,
  Grid3x3,
  Hand,
  Magnet,
  MousePointer2,
  Redo2,
  Ruler,
  Undo2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function ToolButton({
  icon: Icon,
  label,
  active,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  active?: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label={label}
            aria-pressed={active}
            className={cn(
              "flex size-8 items-center justify-center rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-rxl-accent",
              active
                ? "bg-rxl-accent-muted text-rxl-accent"
                : "text-rxl-text-secondary hover:bg-rxl-surface hover:text-rxl-text"
            )}
          >
            <Icon className="size-4" strokeWidth={1.75} />
          </button>
        }
      />
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  );
}

export function CanvasToolbar() {
  return (
    <div className="flex h-11 shrink-0 items-center border-b border-rxl-border bg-rxl-panel px-4">
      <div className="flex items-center gap-1.5 text-[12px] text-rxl-text-secondary">
        <span className="font-medium text-rxl-text">DC-West-01</span>
        <ChevronRight className="size-3.5 text-rxl-text-tertiary" />
        <span>Data Hall A</span>
        <ChevronRight className="size-3.5 text-rxl-text-tertiary" />
        <span className="rounded bg-rxl-accent-muted px-1.5 py-0.5 text-[11px] font-medium text-rxl-accent">
          Cold Aisle 01
        </span>
      </div>

      <div className="mx-4 h-5 w-px bg-rxl-border" />

      <div className="flex items-center gap-0.5">
        <ToolButton icon={MousePointer2} label="Select" active />
        <ToolButton icon={Hand} label="Pan" />
        <ToolButton icon={Ruler} label="Measure" />
      </div>

      <div className="mx-4 h-5 w-px bg-rxl-border" />

      <div className="flex items-center gap-0.5">
        <ToolButton icon={Undo2} label="Undo" />
        <ToolButton icon={Redo2} label="Redo" />
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-0.5">
        <ToolButton icon={Grid3x3} label="Toggle Grid" active />
        <ToolButton icon={Magnet} label="Snap to Grid" active />
      </div>
    </div>
  );
}
