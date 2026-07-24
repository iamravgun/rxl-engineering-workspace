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

type SidebarItem = {
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  active?: boolean;
};

const TOP_SECTION: SidebarItem[] = [
  { label: "Projects", icon: FolderKanban },
  { label: "Components", icon: Boxes },
];

const MODEL_SECTION: SidebarItem[] = [
  { label: "Containment Systems", icon: Rows3, active: true },
  { label: "Cooling Manifolds", icon: ThermometerSnowflake },
  { label: "Cabinets / Racks", icon: Server },
];

const DATA_SECTION: SidebarItem[] = [
  { label: "Uploads", icon: UploadCloud },
  { label: "Layers", icon: Layers },
  { label: "Assets", icon: LibraryBig },
];

function SidebarButton({ item }: { item: SidebarItem }) {
  const Icon = item.icon;
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label={item.label}
            aria-current={item.active ? "true" : undefined}
            className={cn(
              "relative flex size-11 items-center justify-center rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-rxl-accent",
              item.active
                ? "bg-rxl-accent-muted text-rxl-accent"
                : "text-rxl-text-secondary hover:bg-rxl-surface hover:text-rxl-text"
            )}
          >
            {item.active && (
              <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-rxl-accent" />
            )}
            <Icon className="size-[19px]" strokeWidth={1.6} />
          </button>
        }
      />
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}

export function LeftSidebar() {
  return (
    <aside className="flex w-[88px] shrink-0 flex-col items-center border-r border-rxl-border bg-rxl-panel py-4">
      <div className="flex flex-col items-center gap-1">
        {TOP_SECTION.map((item) => (
          <SidebarButton key={item.label} item={item} />
        ))}
      </div>

      <div className="my-3 h-px w-8 bg-rxl-border" />

      <div className="flex flex-col items-center gap-1">
        {MODEL_SECTION.map((item) => (
          <SidebarButton key={item.label} item={item} />
        ))}
      </div>

      <div className="my-3 h-px w-8 bg-rxl-border" />

      <div className="flex flex-col items-center gap-1">
        {DATA_SECTION.map((item) => (
          <SidebarButton key={item.label} item={item} />
        ))}
      </div>

      <div className="flex-1" />

      <SidebarButton item={{ label: "Settings", icon: Settings }} />
    </aside>
  );
}
