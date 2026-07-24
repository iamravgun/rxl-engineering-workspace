import Link from "next/link";

type FooterLink = { label: string; href: string; disabled?: boolean };

const FOOTER_COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Engineering Workspace", href: "/workspace" },
      { label: "Digital Catalog", href: "#", disabled: true },
      { label: "Client Portal", href: "#", disabled: true },
      { label: "Express Upload", href: "#", disabled: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About RXL", href: "#", disabled: true },
      { label: "Careers", href: "#", disabled: true },
      { label: "Contact", href: "#", disabled: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Technical Documentation", href: "#", disabled: true },
      { label: "CAD Library", href: "#", disabled: true },
      { label: "Compliance Guides", href: "#", disabled: true },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-rxl-border bg-rxl-panel">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-md bg-rxl-accent">
                <span className="text-[13px] font-bold tracking-tight text-[#14100c]">
                  RXL
                </span>
              </div>
              <span className="text-[13px] font-semibold text-rxl-text">
                RXL Engineered Systems
              </span>
            </div>
            <p className="mt-3 max-w-[220px] text-[12px] leading-relaxed text-rxl-text-tertiary">
              Design, engineering, fabrication, and installation for
              mission-critical data center infrastructure.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-wide text-rxl-text-tertiary">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((link) =>
                  link.disabled ? (
                    <li key={link.label}>
                      <span
                        title={`${link.label} — not available in this preview`}
                        aria-disabled="true"
                        className="cursor-not-allowed text-[13px] text-rxl-text-tertiary opacity-60"
                      >
                        {link.label}
                      </span>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-rxl-text-secondary transition-colors hover:text-rxl-text"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-rxl-border pt-6 text-[12px] text-rxl-text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} RXL Engineered Systems. DTB-0011 submission build.</span>
          <span>Engineering Platform — internal preview</span>
        </div>
      </div>
    </footer>
  );
}
