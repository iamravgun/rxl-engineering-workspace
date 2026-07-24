export type ValidationStatus = "passed" | "review";

// The three canvas facets that can be individually emphasized via the
// left sidebar's Model section (Containment Systems / Cooling Manifolds /
// Cabinets & Racks). null = show everything at normal opacity.
export type CanvasLayer = "containment" | "cooling" | "cabinets";

export const CANVAS_LAYER_LABELS: Record<CanvasLayer, string> = {
  containment: "Containment Systems",
  cooling: "Cooling Manifolds",
  cabinets: "Cabinets / Racks",
};

export type ValidationItem = {
  label: string;
  status: ValidationStatus;
  detail: string;
};

// Single source of truth: both the Right Panel (full checklist) and the
// mobile toolbar toggle (attention badge) read from this so they can
// never drift out of sync with each other.
export const VALIDATION_ITEMS: ValidationItem[] = [
  {
    label: "Containment Layout",
    status: "passed",
    detail: "Cold Aisle 01 geometry within tolerance",
  },
  {
    label: "Cooling Compatibility",
    status: "passed",
    detail: "CM-02 / CM-03 capacity matches rack load",
  },
  {
    label: "Cabinet Placement",
    status: "passed",
    detail: "R01–R12 spacing meets clearance spec",
  },
  {
    label: "Service Clearance",
    status: "passed",
    detail: "Front and rear access ≥ 1,200 mm",
  },
  {
    label: "Documentation Ready",
    status: "passed",
    detail: "Drawing set complete for export",
  },
  {
    label: "Power Distribution Review",
    status: "review",
    detail: "PDU circuit mapping needs engineer confirmation",
  },
];
