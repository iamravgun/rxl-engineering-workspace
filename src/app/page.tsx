import { TopNav } from "@/components/workspace/top-nav";
import { LeftSidebar } from "@/components/workspace/left-sidebar";
import { EngineeringCanvas } from "@/components/workspace/engineering-canvas";
import { RightPanel } from "@/components/workspace/right-panel";
import { StatusBar } from "@/components/workspace/status-bar";

export default function EngineeringWorkspacePage() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-rxl-bg text-rxl-text">
      <TopNav />
      <div className="flex min-h-0 flex-1">
        <LeftSidebar />
        <EngineeringCanvas />
        <RightPanel />
      </div>
      <StatusBar />
    </div>
  );
}
