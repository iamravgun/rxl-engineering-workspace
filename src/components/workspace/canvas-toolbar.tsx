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
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CANVAS_LAYER_LABELS, type CanvasLayer } from "@/lib/workspace-data";

export type CanvasTool = "select" | "pan" | "measure";

function ToolButton({
  icon: Icon,
  label,
  active,
  disabled,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label={label}
            aria-pressed={active}
            disabled={disabled}
            onClick={onClick}
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-rxl-accent",
              disabled
                ? "cursor-not-allowed text-rxl-text-tertiary opacity-40"
                : active
                ? "bg-rxl-accent-muted text-rxl-accent"
                : "text-rxl-text-secondary hover:bg-rxl-surface hover:text-rxl-text"
            )}
          >
            <Icon className="size-4" strokeWidth={1.75} />
          </button>
        }
      />
      <TooltipContent side="bottom">
        {disabled ? `${label} (nothing to ${label.toLowerCase()})` : label}
      </TooltipContent>
    </Tooltip>
  );
}

export function CanvasToolbar({
  activeTool,
  onToolChange,
  gridVisible,
  onToggleGrid,
  snapEnabled,
  onToggleSnap,
  activeLayer,
  onClearLayer,
}: {
  activeTool: CanvasTool;
  onToolChange: (tool: CanvasTool) => void;
  gridVisible: boolean;
  onToggleGrid: () => void;
  snapEnabled: boolean;
  onToggleSnap: () => void;
  activeLayer: CanvasLayer | null;
  onClearLayer: () => void;
}) {
  return (
    <div className="flex h-11 shrink-0 items-center gap-3 border-b border-rxl-border bg-rxl-panel px-4">
      <div className="flex shrink-0 items-center gap-1.5 text-[12px] text-rxl-text-secondary">
        <span className="font-medium text-rxl-text">DC-West-01</span>
        <ChevronRight className="size-3.5 text-rxl-text-tertiary" />
        <span>Data Hall A</span>
        <ChevronRight className="size-3.5 text-rxl-text-tertiary" />
        <span className="rounded border border-rxl-border-strong bg-rxl-surface px-1.5 py-0.5 text-[11px] font-medium text-rxl-text">
          Cold Aisle 01
        </span>
      </div>

      <div className="h-3.5 w-px shrink-0 bg-rxl-border" />

      <span className="shrink-0 rounded-sm border border-rxl-border-strong bg-rxl-surface px-1.5 py-0.5 text-[10.5px] font-medium uppercase tracking-wide text-rxl-text-secondary">
        Engineering Review
      </span>

      {activeLayer && (
        <button
          type="button"
          onClick={onClearLayer}
          className="flex shrink-0 items-center gap-1 rounded-sm border border-rxl-accent-border bg-rxl-accent-muted px-1.5 py-0.5 text-[11px] font-medium text-rxl-accent transition-colors hover:bg-rxl-accent-border/40"
        >
          {CANVAS_LAYER_LABELS[activeLayer]}
          <X className="size-3" strokeWidth={2} />
        </button>
      )}

      <div className="h-5 w-px shrink-0 bg-rxl-border" />

      <div className="flex shrink-0 items-center gap-0.5">
        <ToolButton
          icon={MousePointer2}
          label="Select"
          active={activeTool === "select"}
          onClick={() => onToolChange("select")}
        />
        <ToolButton
          icon={Hand}
          label="Pan"
          active={activeTool === "pan"}
          onClick={() => onToolChange("pan")}
        />
        <ToolButton
          icon={Ruler}
          label="Measure"
          active={activeTool === "measure"}
          onClick={() => onToolChange("measure")}
        />
      </div>

      <div className="h-5 w-px shrink-0 bg-rxl-border" />

      <div className="flex shrink-0 items-center gap-0.5">
        <ToolButton icon={Undo2} label="Undo" disabled />
        <ToolButton icon={Redo2} label="Redo" disabled />
      </div>

      <div className="flex-1" />

      <div className="flex shrink-0 items-center gap-0.5">
        <ToolButton
          icon={Grid3x3}
          label="Toggle Grid"
          active={gridVisible}
          onClick={onToggleGrid}
        />
        <ToolButton
          icon={Magnet}
          label="Snap to Grid"
          active={snapEnabled}
          onClick={onToggleSnap}
        />
      </div>
    </div>
  );
}
