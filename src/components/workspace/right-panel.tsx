"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  PackageCheck,
  Save,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { VALIDATION_ITEMS, type ValidationItem } from "@/lib/workspace-data";

function ValidationRow({ item }: { item: ValidationItem }) {
  const passed = item.status === "passed";
  return (
    <div className="flex items-start gap-2.5 py-2">
      {passed ? (
        <CheckCircle2
          className="mt-0.5 size-4 shrink-0 text-rxl-success"
          strokeWidth={2}
        />
      ) : (
        <AlertTriangle
          className="mt-0.5 size-4 shrink-0 text-rxl-warning"
          strokeWidth={2}
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[13px] font-medium text-rxl-text">
            {item.label}
          </span>
          <span
            className={
              passed
                ? "shrink-0 rounded bg-rxl-success-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-rxl-success"
                : "shrink-0 rounded bg-rxl-warning-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-rxl-warning"
            }
          >
            {passed ? "Verified" : "Needs Confirmation"}
          </span>
        </div>
        <p className="mt-0.5 text-[12px] leading-snug text-rxl-text-tertiary">
          {item.detail}
        </p>
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5">
      <span className="text-[12px] text-rxl-text-tertiary">{label}</span>
      <span className="max-w-[62%] text-right text-[12px] font-medium text-rxl-text">
        {value}
      </span>
    </div>
  );
}

type ActionState = "idle" | "working" | "done";

export function RightPanel({
  selectedCabinetId,
  open,
  onClose,
}: {
  selectedCabinetId: string;
  open: boolean;
  onClose: () => void;
}) {
  const passedCount = VALIDATION_ITEMS.filter(
    (i) => i.status === "passed"
  ).length;
  const allVerified = passedCount === VALIDATION_ITEMS.length;

  const [saveState, setSaveState] = useState<ActionState>("idle");
  const [packageState, setPackageState] = useState<ActionState>("idle");

  function runAction(setState: (s: ActionState) => void) {
    setState("working");
    window.setTimeout(() => {
      setState("done");
      window.setTimeout(() => setState("idle"), 1600);
    }, 700);
  }

  return (
    <aside
      className={cn(
        // Mobile/tablet: fixed slide-in drawer from the right.
        "fixed inset-y-0 right-0 z-50 flex w-[86vw] max-w-[380px] flex-col border-l border-rxl-border bg-rxl-panel shadow-2xl shadow-black/40 transition-transform duration-200 ease-out",
        open ? "translate-x-0" : "translate-x-full",
        // Desktop (lg+): back to the original static docked column.
        "lg:relative lg:inset-auto lg:z-auto lg:w-[360px] lg:shrink-0 lg:translate-x-0 lg:shadow-none lg:transition-none"
      )}
    >
      {/* Drawer header — only shown below lg, where this is an overlay */}
      <div className="flex items-center justify-between border-b border-rxl-border px-5 py-4 lg:hidden">
        <span className="text-[13px] font-semibold text-rxl-text">
          Engineering Details
        </span>
        <button
          type="button"
          aria-label="Close panel"
          onClick={onClose}
          className="flex size-8 items-center justify-center rounded-md text-rxl-text-secondary transition-colors hover:bg-rxl-surface hover:text-rxl-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-rxl-accent"
        >
          <X className="size-4" strokeWidth={1.75} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Validation summary */}
        <div className="px-5 pt-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-semibold uppercase tracking-wide text-rxl-text">
              Engineering Validation
            </h2>
            <span className="font-mono text-[11px] tabular-nums text-rxl-text-tertiary">
              {passedCount}/{VALIDATION_ITEMS.length}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-md border border-rxl-border bg-rxl-surface px-3 py-2.5">
            {allVerified ? (
              <CheckCircle2 className="size-4 shrink-0 text-rxl-success" strokeWidth={2} />
            ) : (
              <AlertTriangle className="size-4 shrink-0 text-rxl-warning" strokeWidth={2} />
            )}
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-rxl-text-tertiary">
                Overall Status
              </p>
              <p className="text-[13px] font-medium text-rxl-text">
                {allVerified
                  ? "Ready for Engineering Package"
                  : "Engineering Review Required"}
              </p>
            </div>
          </div>

          <p className="mt-2.5 text-[11px] text-rxl-text-tertiary">
            Validation updated 12 seconds ago
          </p>

          <h3 className="mt-5 text-[11px] font-semibold uppercase tracking-wide text-rxl-text-tertiary">
            Validation Summary
          </h3>
          <div className="mt-1.5 divide-y divide-rxl-border">
            {VALIDATION_ITEMS.map((item) => (
              <ValidationRow key={item.label} item={item} />
            ))}
          </div>
        </div>

        <Separator className="my-5 bg-rxl-border" />

        {/* Selected component */}
        <div className="px-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-semibold uppercase tracking-wide text-rxl-text">
              Selected Component
            </h2>
            <span className="rounded bg-rxl-accent-muted px-1.5 py-0.5 font-mono text-[10px] font-semibold text-rxl-accent">
              {selectedCabinetId}
            </span>
          </div>

          <div className="mt-3 rounded-md border border-rxl-border bg-rxl-surface p-3.5">
            <div className="divide-y divide-rxl-border">
              <SpecRow label="Model" value="RXL-CAB-600D" />
              <SpecRow label="Dimensions" value="600 × 1200 × 2000 mm" />
              <SpecRow label="Material" value="14-ga powder-coated steel" />
              <SpecRow label="Manufacturer" value="RXL Engineered Systems" />
            </div>
            <div className="mt-2.5 border-t border-rxl-border pt-2.5">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-rxl-text-tertiary">
                Installation Notes
              </span>
              <p className="mt-1 text-[12px] leading-relaxed text-rxl-text-secondary">
                Verify raised-floor cutout alignment prior to install.
                Maintain 1,200 mm rear service clearance and confirm
                containment door swing does not obstruct aisle egress.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-rxl-border" />

      {/* Actions */}
      <div className="p-5">
        <h3 className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-rxl-text-tertiary">
          Primary Actions
        </h3>
        <div className="space-y-2">
          <Button
            variant="default"
            disabled={packageState !== "idle"}
            onClick={() => runAction(setPackageState)}
            className="h-10 w-full gap-2 bg-rxl-accent text-[13px] font-semibold text-[#14100c] hover:bg-rxl-accent-hover disabled:opacity-90"
          >
            {packageState === "working" ? (
              <Loader2 className="size-4 animate-spin" strokeWidth={2} />
            ) : packageState === "done" ? (
              <CheckCircle2 className="size-4" strokeWidth={2} />
            ) : (
              <PackageCheck className="size-4" strokeWidth={2} />
            )}
            {packageState === "working"
              ? "Generating…"
              : packageState === "done"
              ? "Package Ready"
              : "Generate Engineering Package"}
          </Button>
          <Button
            variant="outline"
            disabled={saveState !== "idle"}
            onClick={() => runAction(setSaveState)}
            className="h-9 w-full gap-2 border-rxl-border bg-transparent text-[13px] font-medium text-rxl-text-secondary hover:bg-rxl-surface hover:text-rxl-text"
          >
            {saveState === "working" ? (
              <Loader2 className="size-[15px] animate-spin" strokeWidth={1.75} />
            ) : saveState === "done" ? (
              <CheckCircle2 className="size-[15px] text-rxl-success" strokeWidth={1.75} />
            ) : (
              <Save className="size-[15px]" strokeWidth={1.75} />
            )}
            {saveState === "working"
              ? "Saving…"
              : saveState === "done"
              ? "Saved"
              : "Save Project"}
          </Button>
        </div>
      </div>
    </aside>
  );
}
