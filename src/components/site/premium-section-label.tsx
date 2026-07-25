"use client";

/**
 * PremiumSectionLabel — a $50k-grade section eyebrow.
 *
 * Parses "NN · Title" to extract the index, renders a unique hand-crafted
 * geometric SVG icon per section (5 distinct shapes), the number in a
 * monospace badge, an animated accent line, and the title.
 *
 * Each icon is original (not a lucide icon) — small geometric marks that
 * reinforce the section's concept:
 *   01 → loop (the transformation loop)
 *   02 → branching nodes (the flow / system)
 *   03 → panel grid (the workspace)
 *   04 → concentric core (the signature)
 *   05 → bolt/arrow (automations / action)
 */

function SectionIcon({ index }: { index: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "none",
    className: "text-accent",
    "aria-hidden": true as const,
  };

  switch (index) {
    case "01":
      // loop — two arcs forming a circular flow
      return (
        <svg {...common}>
          <path
            d="M3 8a5 5 0 0 1 9-2M13 8a5 5 0 0 1-9 2"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="3" cy="8" r="1.4" fill="currentColor" />
          <circle cx="13" cy="8" r="1.4" fill="currentColor" />
        </svg>
      );
    case "02":
      // branching nodes — a node splitting into two
      return (
        <svg {...common}>
          <circle cx="3" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="13" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="13" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M4.5 7.5L11.5 4.5M4.5 8.5L11.5 11.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "03":
      // panel grid — a 2x2 layout
      return (
        <svg {...common}>
          <rect x="2" y="2" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <rect x="8.5" y="2" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <rect x="2" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" fill="currentColor" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "04":
      // concentric core — nested circles
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" opacity="0.35" />
          <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="8" cy="8" r="1.3" fill="currentColor" />
        </svg>
      );
    case "05":
      // bolt / action — a lightning + arrow
      return (
        <svg {...common}>
          <path d="M9 2L4 9h3l-1 5 5-7H8l1-5z" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
  }
}

export function PremiumSectionLabel({ children }: { children: React.ReactNode }) {
  // parse "NN · Title" — extract the index for the icon
  const text = String(children);
  const match = text.match(/^(\d{2})\s*·\s*(.+)$/);
  const index = match?.[1] ?? "00";
  const title = match?.[2] ?? text;

  return (
    <div
      className="inline-flex items-center gap-2.5"
    >
      {/* unique geometric icon */}
      <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-hairline bg-surface-1">
        <SectionIcon index={index} />
      </span>
      {/* number badge */}
      <span className="font-mono text-[11px] font-semibold tabular-nums text-accent">
        {index}
      </span>
      {/* accent line (static — no movement) */}
      <span className="h-px w-8 bg-gradient-to-r from-accent to-accent/30" />
      {/* title */}
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </span>
    </div>
  );
}
