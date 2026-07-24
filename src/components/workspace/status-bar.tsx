"use client";

import { Magnet, Save } from "lucide-react";

function StatusItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-rxl-text-tertiary">{label}</span>
      <span className="font-mono tabular-nums text-rxl-text-secondary">
        {value}
      </span>
    </div>
  );
}

export function StatusBar() {
  return (
    <footer className="flex h-8 shrink-0 items-center gap-5 border-t border-rxl-border bg-rxl-panel px-5 text-[11px]">
      <StatusItem label="Grid" value="600 mm" />
      <StatusItem label="Units" value="Millimeters" />
      <StatusItem label="Zoom" value="100%" />

      <div className="flex items-center gap-1.5">
        <Magnet className="size-3 text-rxl-accent" strokeWidth={2} />
        <span className="text-rxl-text-secondary">Snap ON</span>
      </div>

      <div className="h-3.5 w-px bg-rxl-border" />

      <div className="flex items-center gap-1.5">
        <Save className="size-3 text-rxl-text-tertiary" strokeWidth={1.75} />
        <span className="text-rxl-text-tertiary">Autosaved 12 seconds ago</span>
      </div>

      <div className="flex-1" />

      <StatusItem label="Revision" value="Rev 03" />
      <StatusItem label="Project" value="DC-West-01" />

      <div className="flex items-center gap-1.5">
        <span className="flex size-1.5 rounded-full bg-rxl-success" />
        <span className="text-rxl-text-secondary">Workspace Synced</span>
      </div>
    </footer>
  );
}
