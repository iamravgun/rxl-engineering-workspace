"use client";

import { useState } from "react";
import Link from "next/link";
import { Monitor } from "lucide-react";
import { TopNav } from "@/components/workspace/top-nav";
import { LeftSidebar } from "@/components/workspace/left-sidebar";
import { EngineeringCanvas } from "@/components/workspace/engineering-canvas";
import { RightPanel } from "@/components/workspace/right-panel";
import { StatusBar } from "@/components/workspace/status-bar";
import type { CanvasLayer } from "@/lib/workspace-data";

export default function EngineeringWorkspacePage() {
  const [selectedCabinetId, setSelectedCabinetId] = useState("R04");
  const [activeLayer, setActiveLayer] = useState<CanvasLayer | null>(null);
  const [zoom, setZoom] = useState(100);
  const [snapEnabled, setSnapEnabled] = useState(true);

  return (
    <>
      {/* Desktop-only tool: below 1440px, show a clear message instead of
          a degraded CAD experience. Pure CSS breakpoint — no JS/hydration
          flash, correct on first paint. */}
      <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-rxl-bg px-6 text-center min-[1440px]:hidden">
        <div className="flex size-14 items-center justify-center rounded-xl border border-rxl-border bg-rxl-panel">
          <Monitor className="size-6 text-rxl-accent" strokeWidth={1.75} />
        </div>
        <h1 className="mt-6 text-[20px] font-semibold text-rxl-text">
          Engineering Workspace
        </h1>
        <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-rxl-text-secondary">
          The Engineering Workspace is optimized for desktop engineering
          workflows. Please continue on a desktop or laptop (minimum width
          1440px) to access room planning, engineering validation and
          package generation.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-rxl-accent px-5 text-[13px] font-semibold text-[#14100c] transition-colors hover:bg-rxl-accent-hover"
        >
          Return to Homepage
        </Link>
      </div>

      {/* Full workspace — 1440px and up only */}
      <div className="hidden h-dvh w-full flex-col overflow-hidden bg-rxl-bg text-rxl-text min-[1440px]:flex">
        <TopNav />
        <div className="relative flex min-h-0 flex-1">
          <LeftSidebar activeLayer={activeLayer} onSelectLayer={setActiveLayer} />
          <EngineeringCanvas
            selectedCabinetId={selectedCabinetId}
            onSelectCabinet={setSelectedCabinetId}
            activeLayer={activeLayer}
            onSelectLayer={setActiveLayer}
            zoom={zoom}
            onZoomChange={setZoom}
            snapEnabled={snapEnabled}
            onToggleSnap={() => setSnapEnabled((v) => !v)}
          />
          <RightPanel selectedCabinetId={selectedCabinetId} />
        </div>
        <StatusBar zoom={zoom} snapEnabled={snapEnabled} />
      </div>
    </>
  );
}
