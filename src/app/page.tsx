"use client";

import { useState } from "react";
import { TopNav } from "@/components/workspace/top-nav";
import { LeftSidebar } from "@/components/workspace/left-sidebar";
import { EngineeringCanvas } from "@/components/workspace/engineering-canvas";
import { RightPanel } from "@/components/workspace/right-panel";
import { StatusBar } from "@/components/workspace/status-bar";
import { VALIDATION_ITEMS } from "@/lib/workspace-data";

export default function EngineeringWorkspacePage() {
  const [selectedCabinetId, setSelectedCabinetId] = useState("R04");
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  const pendingReviewCount = VALIDATION_ITEMS.filter(
    (i) => i.status === "review"
  ).length;

  return (
    // h-dvh (dynamic viewport height), not h-screen (100vh): on mobile
    // browsers the address bar resizes and 100vh doesn't match the real
    // visible viewport, which leaves phantom empty space at the bottom.
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-rxl-bg text-rxl-text">
      <TopNav />
      <div className="relative flex min-h-0 flex-1">
        <LeftSidebar />
        <EngineeringCanvas
          selectedCabinetId={selectedCabinetId}
          onSelectCabinet={setSelectedCabinetId}
          pendingReviewCount={pendingReviewCount}
          onOpenRightPanel={() => setRightPanelOpen(true)}
        />

        {/* Backdrop for the right panel when it's a mobile/tablet drawer */}
        {rightPanelOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setRightPanelOpen(false)}
            aria-hidden="true"
          />
        )}

        <RightPanel
          selectedCabinetId={selectedCabinetId}
          open={rightPanelOpen}
          onClose={() => setRightPanelOpen(false)}
        />
      </div>
      <StatusBar />
    </div>
  );
}
