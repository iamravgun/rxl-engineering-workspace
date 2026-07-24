// Signature hero visual: the same technical-drafting language as the
// Engineering Canvas (grid, room outline, cabinets, dimension line) —
// reused here deliberately so the homepage reads as the front door of
// the same engineering platform, not a separate marketing skin.
export function HeroBlueprint() {
  return (
    <svg
      viewBox="0 0 560 460"
      className="h-full w-full"
      role="img"
      aria-label="Technical drawing of a data hall cold-aisle containment layout"
    >
      <defs>
        <pattern id="hero-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M 28 0 L 0 0 0 28" fill="none" stroke="var(--rxl-grid-line)" strokeWidth="1" />
        </pattern>
        <marker id="hero-arrow-a" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto">
          <path d="M7,1 L1,4 L7,7" fill="none" stroke="var(--rxl-text-tertiary)" strokeWidth="1" />
        </marker>
        <marker id="hero-arrow-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M1,1 L7,4 L1,7" fill="none" stroke="var(--rxl-text-tertiary)" strokeWidth="1" />
        </marker>
      </defs>

      <rect x="0" y="0" width="560" height="460" fill="url(#hero-grid)" />

      {/* room perimeter */}
      <rect x="60" y="50" width="440" height="300" fill="var(--rxl-panel)" fillOpacity="0.4" stroke="var(--rxl-border-strong)" strokeWidth="2" />

      {/* containment aisle */}
      <g opacity="0.85">
        <line x1="100" y1="150" x2="420" y2="150" stroke="var(--rxl-accent)" strokeWidth="1.5" strokeDasharray="7 4" />
        <line x1="100" y1="250" x2="420" y2="250" stroke="var(--rxl-accent)" strokeWidth="1.5" strokeDasharray="7 4" />
        <line x1="100" y1="150" x2="100" y2="250" stroke="var(--rxl-accent)" strokeWidth="1.5" strokeDasharray="7 4" />
        <line x1="420" y1="150" x2="420" y2="180" stroke="var(--rxl-accent)" strokeWidth="1.5" />
        <line x1="420" y1="250" x2="420" y2="220" stroke="var(--rxl-accent)" strokeWidth="1.5" />
      </g>

      {/* cabinet row (top) */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={`t${i}`}
          x={120 + i * 60}
          y={100}
          width="44"
          height="50"
          rx="2"
          fill={i === 2 ? "var(--rxl-accent-muted)" : "var(--rxl-surface-raised)"}
          stroke={i === 2 ? "var(--rxl-accent)" : "var(--rxl-border-strong)"}
          strokeWidth={i === 2 ? 1.5 : 1}
        />
      ))}
      {/* cabinet row (bottom) */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={`b${i}`}
          x={120 + i * 60}
          y={250}
          width="44"
          height="50"
          fill="var(--rxl-surface-raised)"
          stroke="var(--rxl-border-strong)"
          strokeWidth="1"
          rx="2"
        />
      ))}

      {/* selection tag on the emphasized cabinet */}
      <g transform="translate(215, 78)">
        <rect width="66" height="16" rx="2" fill="var(--rxl-accent)" />
        <text x="33" y="11.5" fontSize="9" fontWeight="600" fontFamily="var(--font-mono)" fill="#14100c" textAnchor="middle">
          R04 · 600D
        </text>
      </g>

      {/* dimension line */}
      <g stroke="var(--rxl-text-tertiary)" strokeWidth="1">
        <line x1="60" y1="380" x2="500" y2="380" markerStart="url(#hero-arrow-a)" markerEnd="url(#hero-arrow-b)" />
        <text x="280" y="398" fontSize="11" fontFamily="var(--font-mono)" fill="var(--rxl-text-secondary)" textAnchor="middle">
          15,000 mm
        </text>
      </g>

      {/* orientation marker */}
      <g transform="translate(500, 80)">
        <circle r="16" fill="var(--rxl-panel)" stroke="var(--rxl-border-strong)" strokeWidth="1" />
        <line x1="0" y1="8" x2="0" y2="-10" stroke="var(--rxl-text-secondary)" strokeWidth="1.25" />
        <path d="M -4,-6 L 0,-12 L 4,-6" fill="none" stroke="var(--rxl-text-secondary)" strokeWidth="1.25" />
        <text x="0" y="20" fontSize="9" fontFamily="var(--font-mono)" fill="var(--rxl-text-tertiary)" textAnchor="middle">N</text>
      </g>
    </svg>
  );
}
