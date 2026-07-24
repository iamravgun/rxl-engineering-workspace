"use client";

import { useState } from "react";
import { CanvasMinimap } from "@/components/workspace/canvas-minimap";
import { cn } from "@/lib/utils";
import {
  CanvasToolbar,
  type CanvasTool,
} from "@/components/workspace/canvas-toolbar";
import {
  CanvasZoomControls,
  ZOOM_MAX,
  ZOOM_MIN,
} from "@/components/workspace/canvas-zoom-controls";

// Coordinate system: 1 SVG unit = 15mm. Minor grid (40u = 600mm) matches
// standard raised-floor tile pitch; major grid (200u = 3,000mm) is bolded.
const UNIT_MM = 15;
const VB_W = 1440;
const VB_H = 900;

const ROOM = { x: 200, y: 120, w: 1000, h: 620 };

const CABINET_W = 55;
const CABINET_H = 70;
const CABINET_GAP = 18;
const ROW_START_X = 270;

const topRow = Array.from({ length: 6 }, (_, i) => ({
  id: `R0${i + 1}`,
  x: ROW_START_X + i * (CABINET_W + CABINET_GAP),
  y: 180,
}));

const bottomRow = Array.from({ length: 6 }, (_, i) => ({
  id: `R${(i + 7).toString().padStart(2, "0")}`,
  x: ROW_START_X + i * (CABINET_W + CABINET_GAP),
  y: 390,
}));

const ALL_CABINETS = [...topRow, ...bottomRow];

function mmLabel(units: number) {
  return Math.round(units * UNIT_MM).toLocaleString("en-US");
}

function GridReferenceBubbles() {
  const cols = Array.from({ length: 12 }, (_, i) => ({
    label: String(i + 1),
    x: ROOM.x + (i + 0.5) * (ROOM.w / 12),
  }));
  const rows = Array.from({ length: 6 }, (_, i) => ({
    label: String.fromCharCode(65 + i),
    y: ROOM.y + (i + 0.5) * (ROOM.h / 6),
  }));

  return (
    <g aria-hidden>
      {cols.map((c) => (
        <g key={c.label}>
          <line x1={c.x} y1={106} x2={c.x} y2={ROOM.y} stroke="var(--rxl-border)" strokeWidth={1} />
          <circle cx={c.x} cy={98} r={7} fill="var(--rxl-panel)" stroke="var(--rxl-border-strong)" strokeWidth={1} />
          <text x={c.x} y={101} fontSize={8} fontFamily="var(--font-mono)" fill="var(--rxl-text-tertiary)" textAnchor="middle">
            {c.label}
          </text>
        </g>
      ))}
      {rows.map((r) => (
        <g key={r.label}>
          <line x1={186} y1={r.y} x2={ROOM.x} y2={r.y} stroke="var(--rxl-border)" strokeWidth={1} />
          <circle cx={178} cy={r.y} r={7} fill="var(--rxl-panel)" stroke="var(--rxl-border-strong)" strokeWidth={1} />
          <text x={178} y={r.y + 3} fontSize={8} fontFamily="var(--font-mono)" fill="var(--rxl-text-tertiary)" textAnchor="middle">
            {r.label}
          </text>
        </g>
      ))}
    </g>
  );
}

function TopRuler() {
  const ticks = [200, 400, 600, 800, 1000, 1200];
  return (
    <g aria-hidden>
      <line
        x1={ROOM.x}
        y1={72}
        x2={ROOM.x + ROOM.w}
        y2={72}
        stroke="var(--rxl-border-strong)"
        strokeWidth={1}
      />
      {ticks.map((x) => (
        <g key={x}>
          <line
            x1={x}
            y1={64}
            x2={x}
            y2={72}
            stroke="var(--rxl-text-tertiary)"
            strokeWidth={1}
          />
          <text
            x={x}
            y={56}
            fontSize={10}
            fontFamily="var(--font-mono)"
            fill="var(--rxl-text-tertiary)"
            textAnchor="middle"
          >
            {mmLabel(x - ROOM.x)}
          </text>
        </g>
      ))}
    </g>
  );
}

function LeftRuler() {
  const ticks = [120, 320, 520, 720];
  return (
    <g aria-hidden>
      <line
        x1={162}
        y1={ROOM.y}
        x2={162}
        y2={ROOM.y + ROOM.h}
        stroke="var(--rxl-border-strong)"
        strokeWidth={1}
      />
      {ticks.map((y) => (
        <g key={y}>
          <line
            x1={154}
            y1={y}
            x2={162}
            y2={y}
            stroke="var(--rxl-text-tertiary)"
            strokeWidth={1}
          />
          <text
            x={148}
            y={y + 3}
            fontSize={10}
            fontFamily="var(--font-mono)"
            fill="var(--rxl-text-tertiary)"
            textAnchor="end"
          >
            {mmLabel(y - ROOM.y)}
          </text>
        </g>
      ))}
    </g>
  );
}

function DimensionLine({
  x1,
  y1,
  x2,
  y2,
  label,
  vertical,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  vertical?: boolean;
}) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  return (
    <g stroke="var(--rxl-text-tertiary)" strokeWidth={1}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} markerStart="url(#dim-arrow-start)" markerEnd="url(#dim-arrow-end)" />
      <rect
        x={vertical ? midX - 9 : midX - label.length * 3.4}
        y={vertical ? midY - label.length * 3.4 : midY - 9}
        width={vertical ? 18 : label.length * 6.8}
        height={vertical ? label.length * 6.8 : 18}
        fill="var(--rxl-bg)"
        stroke="none"
      />
      <text
        x={midX}
        y={midY}
        fontSize={10.5}
        fontFamily="var(--font-mono)"
        fill="var(--rxl-text-secondary)"
        textAnchor="middle"
        dominantBaseline="middle"
        transform={vertical ? `rotate(-90 ${midX} ${midY})` : undefined}
      >
        {label}
      </text>
    </g>
  );
}

function Cabinet({
  id,
  x,
  y,
  selected,
  interactive,
  onSelect,
}: {
  id: string;
  x: number;
  y: number;
  selected?: boolean;
  interactive?: boolean;
  onSelect?: (id: string) => void;
}) {
  return (
    <g
      onClick={interactive ? () => onSelect?.(id) : undefined}
      className={interactive ? "cursor-pointer" : undefined}
      role={interactive ? "button" : undefined}
      aria-label={interactive ? `Select cabinet ${id}` : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect?.(id);
              }
            }
          : undefined
      }
    >
      <rect
        x={x}
        y={y}
        width={CABINET_W}
        height={CABINET_H}
        rx={2}
        fill={selected ? "var(--rxl-accent-muted)" : "var(--rxl-surface-raised)"}
        stroke={selected ? "var(--rxl-accent)" : "var(--rxl-border-strong)"}
        strokeWidth={selected ? 1.5 : 1}
      />
      {/* rack door detail lines */}
      <line
        x1={x + 8}
        y1={y + 10}
        x2={x + 8}
        y2={y + CABINET_H - 10}
        stroke="var(--rxl-border-strong)"
        strokeWidth={0.75}
        opacity={0.6}
      />
      <text
        x={x + CABINET_W / 2}
        y={y + CABINET_H / 2 + 3.5}
        fontSize={11}
        fontWeight={600}
        fontFamily="var(--font-mono)"
        fill={selected ? "var(--rxl-accent)" : "var(--rxl-text-secondary)"}
        textAnchor="middle"
      >
        {id}
      </text>
    </g>
  );
}

function SelectionOverlay({ x, y, id }: { x: number; y: number; id: string }) {
  const pad = 6;
  const bx = x - pad;
  const by = y - pad;
  const bw = CABINET_W + pad * 2;
  const bh = CABINET_H + pad * 2;
  const handles = [
    [bx, by],
    [bx + bw, by],
    [bx, by + bh],
    [bx + bw, by + bh],
  ];
  const tagWidth = 44 + id.length * 6.5;
  return (
    <g>
      <rect
        x={bx}
        y={by}
        width={bw}
        height={bh}
        fill="none"
        stroke="var(--rxl-accent)"
        strokeWidth={1.5}
        strokeDasharray="5 3"
      />
      {handles.map(([hx, hy], i) => (
        <rect
          key={i}
          x={hx - 3.5}
          y={hy - 3.5}
          width={7}
          height={7}
          fill="var(--rxl-bg)"
          stroke="var(--rxl-accent)"
          strokeWidth={1.5}
        />
      ))}
      {/* floating label tag */}
      <g transform={`translate(${x - 4}, ${by - 22})`}>
        <rect width={tagWidth} height={18} rx={3} fill="var(--rxl-accent)" />
        <text
          x={tagWidth / 2}
          y={12.5}
          fontSize={10}
          fontWeight={600}
          fontFamily="var(--font-mono)"
          fill="#14100c"
          textAnchor="middle"
        >
          {id} · SELECTED
        </text>
      </g>
    </g>
  );
}

function SnapMarkers({ selectedCabinet }: { selectedCabinet: { x: number; y: number } }) {
  const points = [
    [ROW_START_X - 18, 180],
    [ROW_START_X - 18, 250],
    [selectedCabinet.x + CABINET_W + 18, 180],
    [selectedCabinet.x + CABINET_W + 18, 250],
  ];
  return (
    <g stroke="var(--rxl-text-tertiary)" strokeWidth={1} opacity={0.7}>
      {points.map(([px, py], i) => (
        <g key={i}>
          <line x1={px - 4} y1={py} x2={px + 4} y2={py} />
          <line x1={px} y1={py - 4} x2={px} y2={py + 4} />
        </g>
      ))}
    </g>
  );
}

function ContainmentPod({ muted }: { muted?: boolean }) {
  const x1 = 240;
  const x2 = 700;
  const topY = 250;
  const bottomY = 390;
  const stroke = muted ? "var(--rxl-text-tertiary)" : "var(--rxl-accent)";
  const op = muted ? 0.4 : 0.85;

  return (
    <g opacity={op}>
      {/* aisle side walls */}
      <line x1={x1} y1={topY} x2={x2 - 40} y2={topY} stroke={stroke} strokeWidth={1.5} strokeDasharray="7 4" />
      <line x1={x1} y1={bottomY} x2={x2 - 40} y2={bottomY} stroke={stroke} strokeWidth={1.5} strokeDasharray="7 4" />
      {/* end wall (closed, left) */}
      <line x1={x1} y1={topY} x2={x1} y2={bottomY} stroke={stroke} strokeWidth={1.5} strokeDasharray="7 4" />
      {/* end wall (door, right) */}
      <line x1={x2 - 40} y1={topY} x2={x2 - 40} y2={topY + 18} stroke={stroke} strokeWidth={1.5} />
      <line x1={x2 - 40} y1={bottomY} x2={x2 - 40} y2={bottomY - 18} stroke={stroke} strokeWidth={1.5} />
      {/* door swing arc */}
      <path
        d={`M ${x2 - 40} ${topY + 18} A 18 18 0 0 1 ${x2 - 22} ${topY + 36}`}
        fill="none"
        stroke={stroke}
        strokeWidth={1}
        strokeDasharray="2 2"
      />
    </g>
  );
}

function CoolingManifold({ label, x }: { label: string; x: number }) {
  return (
    <g>
      <line x1={x} y1={95} x2={x} y2={180} stroke="#5b8aa6" strokeWidth={2} />
      <circle cx={x} cy={180} r={4} fill="#5b8aa6" />
      <path d={`M ${x - 5} 130 L ${x + 5} 130 L ${x} 122 Z`} fill="#5b8aa6" />
      <rect x={x - 22} y={78} width={44} height={16} rx={2} fill="var(--rxl-panel)" stroke="#5b8aa6" strokeWidth={1} />
      <text x={x} y={89.5} fontSize={9.5} fontFamily="var(--font-mono)" fontWeight={600} fill="#5b8aa6" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

export function EngineeringCanvas({
  selectedCabinetId,
  onSelectCabinet,
  pendingReviewCount,
  onOpenRightPanel,
}: {
  selectedCabinetId: string;
  onSelectCabinet: (id: string) => void;
  pendingReviewCount: number;
  onOpenRightPanel: () => void;
}) {
  const [zoom, setZoom] = useState(100);
  const [activeTool, setActiveTool] = useState<CanvasTool>("select");
  const [gridVisible, setGridVisible] = useState(true);
  const [snapEnabled, setSnapEnabled] = useState(true);

  const selectedCabinet =
    ALL_CABINETS.find((c) => c.id === selectedCabinetId) ?? topRow[3];

  // Alignment guide: draw between the selected cabinet and its counterpart
  // directly across the aisle (same column, opposite row), if one exists.
  const selectedIsTop = topRow.some((c) => c.id === selectedCabinet.id);
  const counterpartRow = selectedIsTop ? bottomRow : topRow;
  const counterpart = counterpartRow.find((c) => c.x === selectedCabinet.x);

  const handleZoomIn = () => setZoom((z) => Math.min(ZOOM_MAX, z + 25));
  const handleZoomOut = () => setZoom((z) => Math.max(ZOOM_MIN, z - 25));
  const handleFit = () => setZoom(100);

  return (
    <section className="relative flex min-w-0 flex-1 flex-col bg-rxl-bg" aria-label="Engineering canvas">
      <CanvasToolbar
        activeTool={activeTool}
        onToolChange={setActiveTool}
        gridVisible={gridVisible}
        onToggleGrid={() => setGridVisible((v) => !v)}
        snapEnabled={snapEnabled}
        onToggleSnap={() => setSnapEnabled((v) => !v)}
        pendingReviewCount={pendingReviewCount}
        onOpenRightPanel={onOpenRightPanel}
      />

      <div
        className={cn(
          "relative flex-1 overflow-hidden",
          activeTool === "pan" && "cursor-grab active:cursor-grabbing",
          activeTool === "measure" && "cursor-crosshair"
        )}
      >
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="h-full w-full transition-transform duration-150 ease-out"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "50% 50%", letterSpacing: "0.02em" }}
          role="img"
          aria-label="Data Hall A floor plan — Cold Aisle 01 containment layout with cabinets R01 through R12 and cooling manifold CM-02"
        >
          <defs>
            <pattern id="grid-minor" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--rxl-grid-line)" strokeWidth="1" />
            </pattern>
            <pattern id="grid-major" width="200" height="200" patternUnits="userSpaceOnUse">
              <rect width="200" height="200" fill="url(#grid-minor)" />
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="var(--rxl-grid-line-strong)" strokeWidth="1" />
            </pattern>
            <marker id="dim-arrow-start" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto">
              <path d="M7,1 L1,4 L7,7" fill="none" stroke="var(--rxl-text-tertiary)" strokeWidth="1" />
            </marker>
            <marker id="dim-arrow-end" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M1,1 L7,4 L1,7" fill="none" stroke="var(--rxl-text-tertiary)" strokeWidth="1" />
            </marker>
          </defs>

          {/* background coordinate grid */}
          <rect
            x="0"
            y="0"
            width={VB_W}
            height={VB_H}
            fill={gridVisible ? "url(#grid-major)" : "var(--rxl-bg)"}
          />

          {/* architectural grid reference bubbles (A-F / 1-12) */}
          <GridReferenceBubbles />

          {/* orientation marker */}
          <g transform={`translate(${VB_W - 60}, 60)`} aria-hidden>
            <circle r="16" fill="var(--rxl-panel)" stroke="var(--rxl-border-strong)" strokeWidth="1" />
            <line x1="0" y1="8" x2="0" y2="-10" stroke="var(--rxl-text-secondary)" strokeWidth="1.25" />
            <path d="M -4,-6 L 0,-12 L 4,-6" fill="none" stroke="var(--rxl-text-secondary)" strokeWidth="1.25" />
            <text x="0" y="20" fontSize="9" fontFamily="var(--font-mono)" fill="var(--rxl-text-tertiary)" textAnchor="middle">N</text>
          </g>

          <TopRuler />
          <LeftRuler />

          {/* room perimeter (walls) */}
          <rect
            x={ROOM.x}
            y={ROOM.y}
            width={ROOM.w}
            height={ROOM.h}
            fill="var(--rxl-panel)"
            fillOpacity={0.35}
            stroke="var(--rxl-border-strong)"
            strokeWidth={3}
          />

          {/* cooling manifold routing (CM-02) */}
          <CoolingManifold label="CM-02" x={485} />
          <CoolingManifold label="CM-03" x={980} />

          {/* Pod A — Cold Aisle 01 (active, selectable) */}
          <ContainmentPod />
          {topRow.map((c) => (
            <Cabinet
              key={c.id}
              id={c.id}
              x={c.x}
              y={c.y}
              selected={c.id === selectedCabinetId}
              interactive
              onSelect={onSelectCabinet}
            />
          ))}
          {bottomRow.map((c) => (
            <Cabinet
              key={c.id}
              id={c.id}
              x={c.x}
              y={c.y}
              selected={c.id === selectedCabinetId}
              interactive
              onSelect={onSelectCabinet}
            />
          ))}

          {/* alignment guide between selected cabinet and its aisle counterpart */}
          {counterpart && (
            <line
              x1={selectedCabinet.x + CABINET_W / 2}
              y1={selectedIsTop ? selectedCabinet.y + CABINET_H : counterpart.y + CABINET_H}
              x2={counterpart.x + CABINET_W / 2}
              y2={selectedIsTop ? counterpart.y : selectedCabinet.y}
              stroke="var(--rxl-accent)"
              strokeWidth={1}
              strokeDasharray="3 3"
              opacity={0.55}
            />
          )}

          {snapEnabled && <SnapMarkers selectedCabinet={selectedCabinet} />}
          <SelectionOverlay x={selectedCabinet.x} y={selectedCabinet.y} id={selectedCabinet.id} />

          {/* Pod B — Cold Aisle 02 (context, muted) */}
          <g opacity={0.55}>
            <ContainmentPod muted />
            {[0, 1, 2].map((i) => (
              <Cabinet key={`b-top-${i}`} id={`R${13 + i}`} x={820 + i * 73} y={180} />
            ))}
            {[0, 1, 2].map((i) => (
              <Cabinet key={`b-bot-${i}`} id={`R${16 + i}`} x={820 + i * 73} y={390} />
            ))}
            <text x={820} y={168} fontSize={11} fontFamily="var(--font-mono)" fill="var(--rxl-text-tertiary)">
              Cold Aisle 02
            </text>
          </g>
          <text x={240} y={168} fontSize={11} fontWeight={600} fontFamily="var(--font-mono)" fill="var(--rxl-text-secondary)">
            Cold Aisle 01
          </text>

          {/* dimension annotations */}
          <DimensionLine x1={ROOM.x} y1={800} x2={ROOM.x + ROOM.w} y2={800} label={`${mmLabel(ROOM.w)} mm`} />
          <line x1={ROOM.x} y1={ROOM.y + ROOM.h} x2={ROOM.x} y2={806} stroke="var(--rxl-border)" strokeWidth={1} strokeDasharray="2 3" />
          <line x1={ROOM.x + ROOM.w} y1={ROOM.y + ROOM.h} x2={ROOM.x + ROOM.w} y2={806} stroke="var(--rxl-border)" strokeWidth={1} strokeDasharray="2 3" />

          <DimensionLine x1={110} y1={ROOM.y} x2={110} y2={ROOM.y + ROOM.h} label={`${mmLabel(ROOM.h)} mm`} vertical />

          <DimensionLine
            x1={topRow[0].x}
            y1={160}
            x2={topRow[0].x + CABINET_W}
            y2={160}
            label={`${mmLabel(CABINET_W)}`}
          />

          <DimensionLine x1={712} y1={250} x2={712} y2={390} label={`${mmLabel(140)} mm`} vertical />

          {/* crosshair cursor position indicator */}
          <g transform="translate(790, 590)" aria-hidden>
            <line x1="-9" y1="0" x2="9" y2="0" stroke="var(--rxl-accent)" strokeWidth={1} />
            <line x1="0" y1="-9" x2="0" y2="9" stroke="var(--rxl-accent)" strokeWidth={1} />
            <circle r="3.5" fill="none" stroke="var(--rxl-accent)" strokeWidth={1} />
            <rect x="14" y="-9" width="112" height="18" rx={3} fill="var(--rxl-panel)" stroke="var(--rxl-border-strong)" strokeWidth={1} />
            <text x="70" y="3.5" fontSize="9.5" fontFamily="var(--font-mono)" fill="var(--rxl-text-secondary)" textAnchor="middle">
              X 8,850  Y 7,050 mm
            </text>
          </g>
        </svg>

        <CanvasZoomControls
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onFit={handleFit}
        />
        <div className="hidden sm:block">
          <CanvasMinimap />
        </div>
      </div>
    </section>
  );
}

