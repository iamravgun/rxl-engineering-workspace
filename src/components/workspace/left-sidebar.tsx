"use client";

import { useState } from "react";
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

type SidebarItem = {
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

const TOP_SECTION: SidebarItem[] = [
  { label: "Projects", icon: FolderKanban },
  { label: "Components", icon: Boxes },
];

const MODEL_SECTION: SidebarItem[] = [
  { label: "Containment Systems", icon: Rows3 },
  { label: "Cooling Manifolds", icon: ThermometerSnowflake },
  { label: "Cabinets / Racks", icon: Server },
];

const DATA_SECTION: SidebarItem[] = [
  { label: "Uploads", icon: UploadCloud },
  { label: "Layers", icon: Layers },
  { label: "Assets", icon: LibraryBig },
];

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
            onClick={onSelect}
            className={cn(
              "relative flex size-10 items-center justify-center rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-rxl-accent",
              active
                ? "bg-rxl-accent-muted text-rxl-accent"
                : "text-rxl-text-secondary hover:bg-rxl-surface hover:text-rxl-text"
            )}
          >
            {active && (
              <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-rxl-accent" />
            )}
            <Icon className="size-[17px]" strokeWidth={1.6} />
          </button>
        }
      />
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}

const SETTINGS_ITEM: SidebarItem = { label: "Settings", icon: Settings };

export function LeftSidebar() {
  const [activeLabel, setActiveLabel] = useState("Containment Systems");

  const renderGroup = (items: SidebarItem[]) => (
    <div className="flex flex-col items-center gap-1">
      {items.map((item) => (
        <SidebarButton
          key={item.label}
          item={item}
          active={item.label === activeLabel}
          onSelect={() => setActiveLabel(item.label)}
        />
      ))}
    </div>
  );

  return (
    <aside className="flex w-[72px] shrink-0 flex-col items-center border-r border-rxl-border bg-rxl-panel py-4 sm:w-[88px]">
      {renderGroup(TOP_SECTION)}

      <div className="my-3 h-px w-8 bg-rxl-border" />

      {renderGroup(MODEL_SECTION)}

      <div className="my-3 h-px w-8 bg-rxl-border" />

      {renderGroup(DATA_SECTION)}

      <div className="flex-1" />

      <SidebarButton
        item={SETTINGS_ITEM}
        active={activeLabel === SETTINGS_ITEM.label}
        onSelect={() => setActiveLabel(SETTINGS_ITEM.label)}
      />
    </aside>
  );
}
