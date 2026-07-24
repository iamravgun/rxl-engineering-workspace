"use client";

import {
  Boxes,
  FolderKanban,
  Layers,
  LibraryBig,
  Rows3,
  Server,
  Settings,
  ThermometerSnowflake,
  UploadCloud,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { CanvasLayer } from "@/lib/workspace-data";

type SidebarItem = {
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  layer?: CanvasLayer;
  disabled?: boolean;
};

// Projects/Components have no destination in this build yet — no page to
// send them to, so they're disabled rather than pretending to work.
const TOP_SECTION: SidebarItem[] = [
  { label: "Projects", icon: FolderKanban, disabled: true },
  { label: "Components", icon: Boxes, disabled: true },
];

// These map to real facets of the canvas — clicking actually emphasizes
// that layer and dims the rest, instead of just toggling a highlight.
const MODEL_SECTION: SidebarItem[] = [
  { label: "Containment Systems", icon: Rows3, layer: "containment" },
  { label: "Cooling Manifolds", icon: ThermometerSnowflake, layer: "cooling" },
  { label: "Cabinets / Racks", icon: Server, layer: "cabinets" },
];

const DATA_SECTION: SidebarItem[] = [
  { label: "Uploads", icon: UploadCloud, disabled: true },
  { label: "Layers", icon: Layers, disabled: true },
  { label: "Assets", icon: LibraryBig, disabled: true },
];

const SETTINGS_ITEM: SidebarItem = {
  label: "Settings",
  icon: Settings,
  disabled: true,
};

function SidebarButton({
  item,
  active,
  onSelect,
}: {
  item: SidebarItem;
  active: boolean;
  onSelect: () => void;
}) {
  const Icon = item.icon;
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label={item.label}
            aria-current={active ? "true" : undefined}
            aria-disabled={item.disabled}
            disabled={item.disabled}
            onClick={item.disabled ? undefined : onSelect}
            className={cn(
              "relative flex size-10 items-center justify-center rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-rxl-accent",
              item.disabled
                ? "cursor-not-allowed text-rxl-text-tertiary opacity-40"
                : active
                ? "bg-rxl-accent-muted text-rxl-accent"
                : "text-rxl-text-secondary hover:bg-rxl-surface hover:text-rxl-text"
            )}
          >
            {active && !item.disabled && (
              <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-rxl-accent" />
            )}
            <Icon className="size-[17px]" strokeWidth={1.6} />
          </button>
        }
      />
      <TooltipContent side="right">
        {item.disabled ? `${item.label} — not available in this preview` : item.label}
      </TooltipContent>
    </Tooltip>
  );
}

export function LeftSidebar({
  activeLayer,
  onSelectLayer,
}: {
  activeLayer: CanvasLayer | null;
  onSelectLayer: (layer: CanvasLayer | null) => void;
}) {
  const renderGroup = (items: SidebarItem[]) => (
    <div className="flex flex-col items-center gap-1">
      {items.map((item) => (
        <SidebarButton
          key={item.label}
          item={item}
          active={item.layer !== undefined && item.layer === activeLayer}
          onSelect={() => {
            if (!item.layer) return;
            // Clicking the already-active layer clears the filter.
            onSelectLayer(item.layer === activeLayer ? null : item.layer);
          }}
        />
      ))}
    </div>
  );

  return (
    <aside className="flex w-[88px] shrink-0 flex-col items-center border-r border-rxl-border bg-rxl-panel py-4">
      {renderGroup(TOP_SECTION)}

      <div className="my-3 h-px w-8 bg-rxl-border" />

      {renderGroup(MODEL_SECTION)}

      <div className="my-3 h-px w-8 bg-rxl-border" />

      {renderGroup(DATA_SECTION)}

      <div className="flex-1" />

      <SidebarButton item={SETTINGS_ITEM} active={false} onSelect={() => {}} />
    </aside>
  );
}
