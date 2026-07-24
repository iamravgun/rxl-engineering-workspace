import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Cpu,
  Download,
  FileCheck2,
  Hammer,
  MapPinned,
  PenTool,
  Rows3,
  Server,
  ShieldCheck,
  ThermometerSnowflake,
  Truck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { HeroBlueprint } from "@/components/site/hero-blueprint";

export const metadata: Metadata = {
  title: "RXL Engineered Systems — Data Center Infrastructure, Engineered End to End",
  description:
    "RXL designs, engineers, fabricates, and installs containment, cooling, and cabinet systems for mission-critical data centers.",
};

const SOLUTIONS = [
  {
    icon: Rows3,
    title: "Containment Systems",
    description:
      "Hot and cold aisle containment engineered to your rack layout, with documented clearance and egress validation.",
  },
  {
    icon: ThermometerSnowflake,
    title: "Cooling Manifolds",
    description:
      "Supply and return manifold routing sized to rack load, cross-referenced against your mechanical schedule.",
  },
  {
    icon: Server,
    title: "Cabinets & Racks",
    description:
      "Powder-coated steel cabinets built to spec — dimensions, load rating, and door swing confirmed before fabrication.",
  },
  {
    icon: Zap,
    title: "Power Distribution",
    description:
      "PDU circuit mapping reviewed alongside your containment and cooling design, not bolted on afterward.",
  },
];

const WORKFLOW = [
  {
    icon: PenTool,
    step: "01",
    title: "Design",
    description: "Room layout, containment geometry, and cabinet placement modeled to your facility's exact dimensions.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Engineering",
    description: "Every design runs through documented validation — clearance, cooling compatibility, structural load — before it moves forward.",
  },
  {
    icon: Hammer,
    step: "03",
    title: "Fabrication",
    description: "Cabinets and containment built in-house to the validated spec, with the same drawing set used on-site.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Installation",
    description: "Field teams install against the same engineering package, with revision history tracked from design to commissioning.",
  },
];

const WHY_RXL = [
  {
    icon: ShieldCheck,
    title: "Engineering-Validated",
    description: "Nothing ships until it passes the same checklist you'd see in our Engineering Workspace — clearance, cooling, structural, documentation.",
  },
  {
    icon: Hammer,
    title: "In-House Fabrication",
    description: "Design and fabrication live under one roof, so a spec change doesn't get lost in translation between teams.",
  },
  {
    icon: MapPinned,
    title: "Field-Verified Installation",
    description: "Installation crews work from the same drawing set engineering signed off on — no re-interpretation on site.",
  },
  {
    icon: FileCheck2,
    title: "Full Documentation Package",
    description: "Bill of materials, revision history, and approval status delivered as one engineering package, not scattered PDFs.",
  },
];

const PRODUCTS = [
  {
    icon: Server,
    name: "RXL-CAB-600D",
    category: "Cabinets & Racks",
    specs: "600 × 1200 × 2000 mm · 14-ga powder-coated steel",
  },
  {
    icon: Rows3,
    name: "RXL-CNT-Cold01",
    category: "Containment Systems",
    specs: "Cold aisle containment · configurable to 12-cabinet rows",
  },
  {
    icon: ThermometerSnowflake,
    name: "RXL-CLM-Manifold",
    category: "Cooling Manifolds",
    specs: "Supply/return routing · sized to rack load",
  },
];

const CASE_STUDIES = [
  {
    facility: "Tier III Colocation Facility",
    location: "Northern Virginia",
    scope: "480 kW cold-aisle containment retrofit across 3 data halls",
    outcome: "Zero downtime during phased cutover",
  },
  {
    facility: "Enterprise Private Cloud Campus",
    location: "Central Texas",
    scope: "Cabinet and cooling manifold replacement, 220 racks",
    outcome: "Engineering package delivered 3 weeks ahead of install window",
  },
  {
    facility: "Edge Compute Deployment",
    location: "Pacific Northwest",
    scope: "Containment and power distribution design for a new build",
    outcome: "Full validation and fabrication in a single engineering cycle",
  },
];

const RESOURCES = [
  { icon: FileCheck2, label: "Technical Documentation" },
  { icon: Download, label: "CAD Library" },
  { icon: ShieldCheck, label: "Compliance Guides" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-rxl-bg text-rxl-text">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-[1400px] px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
            <div>
              <span className="inline-flex items-center rounded-sm border border-rxl-border-strong bg-rxl-surface px-2 py-1 text-[10.5px] font-medium uppercase tracking-wide text-rxl-text-secondary">
                RXL Engineering Platform
              </span>
              <h1 className="mt-5 text-[34px] font-semibold leading-[1.15] tracking-tight text-rxl-text sm:text-[42px] lg:text-[48px]">
                Data center infrastructure, engineered end to end.
              </h1>
              <p className="mt-5 max-w-[480px] text-[15px] leading-relaxed text-rxl-text-secondary">
                RXL designs, engineers, fabricates, and installs containment,
                cooling, and cabinet systems for mission-critical facilities —
                validated to spec before a single component ships.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="default"
                  className="h-11 gap-2 bg-rxl-accent px-5 text-[13px] font-semibold text-[#14100c] hover:bg-rxl-accent-hover"
                  render={
                    <Link href="/workspace">
                      Open Engineering Workspace
                      <ArrowRight className="size-4" strokeWidth={2} />
                    </Link>
                  }
                />
                <span
                  title="Express Upload — not available in this preview"
                  aria-disabled="true"
                  className="flex h-11 cursor-not-allowed items-center justify-center rounded-md border border-rxl-border px-5 text-[13px] font-medium text-rxl-text-tertiary opacity-60"
                >
                  Submit Project Files
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-rxl-border bg-rxl-panel">
              <HeroBlueprint />
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section id="solutions" className="scroll-mt-[88px] border-t border-rxl-border bg-rxl-panel/40">
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-[560px]">
              <h2 className="text-[11px] font-semibold uppercase tracking-wide text-rxl-text-tertiary">
                Solutions
              </h2>
              <p className="mt-2 text-[24px] font-semibold text-rxl-text sm:text-[28px]">
                Four systems, one validated design.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SOLUTIONS.map((s) => (
                <div key={s.title} className="rounded-md border border-rxl-border bg-rxl-surface p-5">
                  <div className="flex size-9 items-center justify-center rounded-md bg-rxl-accent-muted text-rxl-accent">
                    <s.icon className="size-[18px]" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 text-[14px] font-semibold text-rxl-text">{s.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-rxl-text-tertiary">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Engineering Workflow */}
        <section id="workflow" className="scroll-mt-[88px] border-t border-rxl-border">
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-[560px]">
              <h2 className="text-[11px] font-semibold uppercase tracking-wide text-rxl-text-tertiary">
                Engineering Workflow
              </h2>
              <p className="mt-2 text-[24px] font-semibold text-rxl-text sm:text-[28px]">
                From drawing to commissioned install.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {WORKFLOW.map((w) => (
                <div key={w.step} className="rounded-md border border-rxl-border bg-rxl-surface p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex size-9 items-center justify-center rounded-md border border-rxl-border-strong text-rxl-text-secondary">
                      <w.icon className="size-[18px]" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[11px] tabular-nums text-rxl-text-tertiary">
                      {w.step}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[14px] font-semibold text-rxl-text">{w.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-rxl-text-tertiary">
                    {w.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why RXL */}
        <section id="why-rxl" className="scroll-mt-[88px] border-t border-rxl-border bg-rxl-panel/40">
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-[560px]">
              <h2 className="text-[11px] font-semibold uppercase tracking-wide text-rxl-text-tertiary">
                Why RXL
              </h2>
              <p className="mt-2 text-[24px] font-semibold text-rxl-text sm:text-[28px]">
                Engineering rigor, not just fabrication.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {WHY_RXL.map((w) => (
                <div key={w.title} className="flex gap-4 rounded-md border border-rxl-border bg-rxl-surface p-5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-rxl-accent-muted text-rxl-accent">
                    <w.icon className="size-[18px]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-rxl-text">{w.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-rxl-text-tertiary">
                      {w.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="products" className="scroll-mt-[88px] border-t border-rxl-border">
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-[560px]">
                <h2 className="text-[11px] font-semibold uppercase tracking-wide text-rxl-text-tertiary">
                  Featured Products
                </h2>
                <p className="mt-2 text-[24px] font-semibold text-rxl-text sm:text-[28px]">
                  From the digital catalog.
                </p>
              </div>
              <span
                title="Digital Catalog — not available in this preview"
                aria-disabled="true"
                className="cursor-not-allowed text-[13px] font-medium text-rxl-text-tertiary opacity-60"
              >
                View full catalog →
              </span>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {PRODUCTS.map((p) => (
                <div key={p.name} className="rounded-md border border-rxl-border bg-rxl-surface p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex size-9 items-center justify-center rounded-md border border-rxl-border-strong text-rxl-text-secondary">
                      <p.icon className="size-[18px]" strokeWidth={1.75} />
                    </div>
                    <span className="rounded-sm bg-rxl-surface-raised px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-rxl-text-tertiary">
                      {p.category}
                    </span>
                  </div>
                  <h3 className="mt-4 font-mono text-[13px] font-semibold text-rxl-text">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-rxl-text-tertiary">
                    {p.specs}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section id="case-studies" className="scroll-mt-[88px] border-t border-rxl-border bg-rxl-panel/40">
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-[560px]">
              <h2 className="text-[11px] font-semibold uppercase tracking-wide text-rxl-text-tertiary">
                Case Studies
              </h2>
              <p className="mt-2 text-[24px] font-semibold text-rxl-text sm:text-[28px]">
                Recent engineering work.
              </p>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {CASE_STUDIES.map((c) => (
                <div key={c.facility} className="rounded-md border border-rxl-border bg-rxl-surface p-5">
                  <Building2 className="size-5 text-rxl-text-tertiary" strokeWidth={1.75} />
                  <h3 className="mt-3 text-[14px] font-semibold text-rxl-text">{c.facility}</h3>
                  <p className="text-[12px] text-rxl-text-tertiary">{c.location}</p>
                  <p className="mt-3 text-[13px] leading-relaxed text-rxl-text-secondary">{c.scope}</p>
                  <div className="mt-3 border-t border-rxl-border pt-3">
                    <span className="text-[12px] font-medium text-rxl-success">{c.outcome}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources */}
        <section id="resources" className="scroll-mt-[88px] border-t border-rxl-border">
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-[560px]">
              <h2 className="text-[11px] font-semibold uppercase tracking-wide text-rxl-text-tertiary">
                Resources
              </h2>
              <p className="mt-2 text-[24px] font-semibold text-rxl-text sm:text-[28px]">
                Documentation for engineering teams.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {RESOURCES.map((r) => (
                <div
                  key={r.label}
                  title={`${r.label} — not available in this preview`}
                  aria-disabled="true"
                  className="flex cursor-not-allowed items-center gap-3 rounded-md border border-rxl-border bg-rxl-surface p-4 opacity-60"
                >
                  <r.icon className="size-[18px] text-rxl-text-tertiary" strokeWidth={1.75} />
                  <span className="text-[13px] font-medium text-rxl-text-tertiary">{r.label}</span>
                  <span className="ml-auto text-[10px] uppercase tracking-wide text-rxl-text-tertiary">
                    Soon
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-rxl-border bg-rxl-panel/40">
          <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-20">
            <div>
              <p className="text-[24px] font-semibold text-rxl-text sm:text-[28px]">
                Start your next engineering project.
              </p>
              <p className="mt-2 max-w-[480px] text-[14px] leading-relaxed text-rxl-text-secondary">
                Open the Engineering Workspace to model your containment
                layout, run validation, and generate an engineering package.
              </p>
            </div>
            <Button
              variant="default"
              className="h-11 shrink-0 gap-2 bg-rxl-accent px-5 text-[13px] font-semibold text-[#14100c] hover:bg-rxl-accent-hover"
              render={
                <Link href="/workspace">
                  Open Engineering Workspace
                  <ArrowRight className="size-4" strokeWidth={2} />
                </Link>
              }
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
