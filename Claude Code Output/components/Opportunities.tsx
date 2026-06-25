import { useEffect, useRef, useState } from "react";
import {
  Search,
  Bell,
  Home,
  Briefcase,
  LineChart,
  TrendingUp,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronsLeft,
  ChevronLeft,
  ChevronsRight,
  PanelLeft,
  SlidersHorizontal,
  ChevronsUpDown,
  User,
  Tag,
  MessageSquareText,
  Copy,
  Check,
  ListChecks,
  X,
  Calendar,
  CircleCheck,
  Ban,
  ChevronsUpDown as Selector,
} from "lucide-react";

/**
 * Opportunities — Alpheya wealth platform
 * Full-page conversion of Figma node 635:51110.
 * Design tokens pulled from the Figma variable collection.
 */

type OppType = "rebalancing" | "maturity" | "idle-cash";

interface Opportunity {
  id: string;
  name: string;
  client: string;
  account: string;
  accountKind: "portfolio" | "client";
  createdOn: string;
  expiry: string;
  expiryTone: "urgent" | "normal" | "expired";
  type: OppType;
  dataPoint: string;
}

const OPPORTUNITIES: Opportunity[] = [
  // High idle cash in portfolio (idle-cash) — 5 impacted clients
  { id: "1", name: "High idle cash in portfolio", client: "Abdulla Al Gurg", account: "37491-3", accountKind: "portfolio", createdOn: "06/04/2025", expiry: "7 days left", expiryTone: "urgent", type: "idle-cash", dataPoint: "AED 2.4M idle · 38% of portfolio" },
  { id: "2", name: "High idle cash in portfolio", client: "Ava Thompson", account: "065528-018", accountKind: "client", createdOn: "03/04/2025", expiry: "30 days left", expiryTone: "normal", type: "idle-cash", dataPoint: "AED 680K idle · 19% of portfolio" },
  { id: "3", name: "High idle cash in portfolio", client: "Ava Johnson", account: "065528-019", accountKind: "client", createdOn: "02/04/2025", expiry: "Expired", expiryTone: "expired", type: "idle-cash", dataPoint: "AED 540K idle · 17% of portfolio" },
  { id: "4", name: "High idle cash in portfolio", client: "Ahmed Al Maktoum", account: "37491-1", accountKind: "portfolio", createdOn: "04/04/2025", expiry: "30 days left", expiryTone: "normal", type: "idle-cash", dataPoint: "AED 1.1M idle · 22% of portfolio" },
  { id: "5", name: "High idle cash in portfolio", client: "Sara Khan", account: "88210-004", accountKind: "client", createdOn: "05/04/2025", expiry: "7 days left", expiryTone: "urgent", type: "idle-cash", dataPoint: "AED 900K idle · 25% of portfolio" },

  // Portfolio balance by sector over concentration (rebalancing) — 4 impacted clients
  { id: "6", name: "Portfolio balance by sector over concentration", client: "Ava Martinez", account: "065528-018", accountKind: "client", createdOn: "08/04/2025", expiry: "3 days left", expiryTone: "urgent", type: "rebalancing", dataPoint: "AED 3.2M in Saudi Aramco · 41% over target" },
  { id: "7", name: "Portfolio balance by sector over concentration", client: "Aisha Al Mansoori", account: "074120-009", accountKind: "client", createdOn: "07/04/2025", expiry: "3 days left", expiryTone: "urgent", type: "rebalancing", dataPoint: "AED 2.1M in Al Rajhi · 33% over target" },
  { id: "8", name: "Portfolio balance by sector over concentration", client: "Omar Khalid Elshamsi", account: "1-00065528-018", accountKind: "portfolio", createdOn: "06/04/2025", expiry: "7 days left", expiryTone: "urgent", type: "rebalancing", dataPoint: "AED 4.5M in tech sector · 38% over target" },
  { id: "9", name: "Portfolio balance by sector over concentration", client: "Fatima Noor", account: "55301-002", accountKind: "client", createdOn: "05/04/2025", expiry: "14 days left", expiryTone: "normal", type: "rebalancing", dataPoint: "AED 1.8M in energy · 29% over target" },

  // Fixed deposit approaching maturity soon (maturity) — 3 impacted clients
  { id: "10", name: "Fixed deposit approaching maturity soon", client: "Abdulla Al Gurg", account: "065528-018", accountKind: "portfolio", createdOn: "09/04/2025", expiry: "1 day left", expiryTone: "urgent", type: "maturity", dataPoint: "AED 250K maturing · in 1 day" },
  { id: "11", name: "Fixed deposit approaching maturity soon", client: "Amna Al Owais", account: "1-00065528-016", accountKind: "portfolio", createdOn: "01/04/2025", expiry: "Expired", expiryTone: "expired", type: "maturity", dataPoint: "AED 500K maturing · overdue" },
  { id: "12", name: "Fixed deposit approaching maturity soon", client: "Yousef Hassan", account: "33190-007", accountKind: "client", createdOn: "02/04/2025", expiry: "2 days left", expiryTone: "urgent", type: "maturity", dataPoint: "AED 320K maturing · in 2 days" },

  // Unrealized significant portfolio loss (rebalancing) — 2 impacted clients
  { id: "13", name: "Unrealized significant portfolio loss", client: "Abdulla Al Gurg", account: "1-00065528-018", accountKind: "portfolio", createdOn: "05/04/2025", expiry: "7 days left", expiryTone: "urgent", type: "rebalancing", dataPoint: "AED 380K unrealized loss · −12%" },
  { id: "14", name: "Unrealized significant portfolio loss", client: "Khalid Rahman", account: "91002-005", accountKind: "client", createdOn: "04/04/2025", expiry: "5 days left", expiryTone: "urgent", type: "rebalancing", dataPoint: "AED 220K unrealized loss · −9%" },

  // Single-client signals
  { id: "15", name: "Significant portfolio balance change in 1 day", client: "Omar Khalid Elshamsi", account: "1-00065528-018", accountKind: "portfolio", createdOn: "10/04/2025", expiry: "1 day left", expiryTone: "urgent", type: "rebalancing", dataPoint: "AED 1.2M change · +18% in 1 day" },
  { id: "16", name: "Client balance increase 1 day", client: "Amna Al Owais", account: "1-00065528-016", accountKind: "portfolio", createdOn: "01/04/2025", expiry: "Expired", expiryTone: "expired", type: "idle-cash", dataPoint: "AED 750K increase · +24%" },
];

interface SignalGroup {
  name: string;
  type: OppType;
  items: Opportunity[];
}

function groupBySignal(items: Opportunity[]): SignalGroup[] {
  const map = new Map<string, Opportunity[]>();
  for (const o of items) {
    const arr = map.get(o.name) ?? [];
    arr.push(o);
    map.set(o.name, arr);
  }
  return [...map.entries()].map(([name, items]) => ({ name, type: items[0].type, items }));
}

// Most urgent expiry to surface at the group level.
function groupExpiry(items: Opportunity[]): Opportunity {
  const rank = { urgent: 0, normal: 1, expired: 2 } as const;
  return [...items].sort((a, b) => rank[a.expiryTone] - rank[b.expiryTone])[0];
}

const TYPE_META: Record<OppType, { label: string; className: string }> = {
  rebalancing: { label: "Portfolio rebalancing", className: "bg-[#dbeafe] text-[#193cb8]" },
  maturity: { label: "Maturity event", className: "bg-[#fef3c6] text-[#7b3306]" },
  "idle-cash": { label: "Idle cash deployment", className: "bg-[#00a63e33] text-[#016630]" },
};

const ACTION_META: Record<string, { label: string; className: string }> = {
  dismissed: { label: "Dismissed", className: "bg-[#fde8ea] text-[#d2031b]" },
  task: { label: "Task generated", className: "bg-[#e8eef6] text-[#193cb8]" },
  mailing: { label: "Mailing list", className: "bg-[#f2f6f9] text-[#687178]" },
};

type ActionRecord = { action: string; reason?: string; note?: string; at: string; by: string };

// Pre-actioned records so the Actioned tab has history on load.
const SEED_ACTIONED: Record<string, ActionRecord> = {
  "3": {
    action: "dismissed",
    reason: "Client not interested",
    note: "Client prefers to hold cash this quarter — revisit after Q3.",
    at: "2026-06-20",
    by: "Tariq Ali",
  },
  "11": { action: "dismissed", reason: "Already actioned elsewhere", at: "2026-06-18", by: "Sara Idris" },
  "9": { action: "task", at: "2026-06-22", by: "Tariq Ali" },
  "16": { action: "task", at: "2026-06-19", by: "Mariam Yousef" },
};

const PORTFOLIOS = [
  "XYZ-0000-ABC", "ABN-1042-DEF", "QWE-2231-GHI", "LMN-7741-JKL", "RST-3390-MNO",
  "UVW-5582-PQR", "XYZ-9120-STU", "ABN-4471-VWX", "QWE-6634-YZA", "LMN-8853-BCD",
];

const DETAIL_BY_TYPE: Record<OppType, { situation: string; benefits: string[]; recommendation: string }> = {
  rebalancing: {
    situation:
      "The client's portfolio has drifted from its target allocation, requiring rebalancing to restore strategic weights and manage concentration risk.",
    benefits: ["Realign to strategic targets", "Reduce concentration risk", "Capture tax-efficient gains"],
    recommendation:
      "Consider taking profits to lock in gains, rebalancing to strategic targets, or implementing tax-efficient gain harvesting strategies.",
  },
  maturity: {
    situation:
      "The client's $250,000 fixed deposit matures in 7 days, requiring immediate reinvestment decisions to avoid idle cash.",
    benefits: ["Maximize returns on $250,000", "Access competitive interest rates", "Diversify investment portfolio"],
    recommendation:
      "Review the maturing instrument and present reinvestment options aligned to the client's risk profile and liquidity needs.",
  },
  "idle-cash": {
    situation:
      "Elevated idle cash is sitting uninvested, creating a drag on portfolio returns that should be deployed promptly.",
    benefits: ["Put idle cash to work", "Improve overall portfolio yield", "Stay aligned to the mandate"],
    recommendation:
      "Propose deploying idle cash into suitable money-market or income strategies consistent with the client's objectives.",
  },
};

const DETECTED_BY_TONE: Record<Opportunity["expiryTone"], string> = {
  urgent: "3 days ago",
  normal: "2 weeks ago",
  expired: "1 month ago",
};

function buildDetail(o: Opportunity) {
  return {
    portfolio: PORTFOLIOS[(Number(o.id) - 1) % PORTFOLIOS.length],
    detectedOn: DETECTED_BY_TONE[o.expiryTone],
    ...DETAIL_BY_TYPE[o.type],
  };
}

function TypeBadge({ type }: { type: OppType }) {
  const meta = TYPE_META[type];
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${meta.className}`}
    >
      {meta.label}
    </span>
  );
}

function SortableHead({
  label,
  dir,
  onClick,
}: {
  label: string;
  dir?: "asc" | "desc" | null;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1f2123] hover:text-black"
    >
      {label}
      {dir === "asc" ? (
        <ChevronUp className="h-3.5 w-3.5 text-[#1f2123]" strokeWidth={2} />
      ) : dir === "desc" ? (
        <ChevronDown className="h-3.5 w-3.5 text-[#1f2123]" strokeWidth={2} />
      ) : (
        <ChevronsUpDown className="h-3.5 w-3.5 text-[#9ea5ac]" strokeWidth={1.75} />
      )}
    </button>
  );
}

type ActionItem = { label: string; onClick: () => void; destructive?: boolean };

function ActionMenu({
  label,
  items,
  primary,
}: {
  label: string;
  items: ActionItem[];
  primary?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className={`inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium shadow-[0_1px_2px_0_#0000000d] transition-colors ${
          primary
            ? "bg-[#1f2123] text-white hover:bg-[#1f2123]/90"
            : "border border-[#dee3e7] bg-white text-[#1f2123] hover:bg-[#f2f6f9]"
        }`}
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 ${primary ? "text-white/80" : "text-[#9ea5ac]"}`} />
      </button>
      {open && (
        <div className="absolute right-0 z-30 mt-1 w-48 rounded-md border border-[#1f2123]/10 bg-white p-1 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]">
          {items.map((it) => (
            <button
              key={it.label}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                it.onClick();
              }}
              className={`flex w-full items-center rounded-md px-2.5 py-1.5 text-left text-sm transition-colors ${
                it.destructive
                  ? "text-[#d2031b] hover:bg-[#fde8ea]"
                  : "text-[#1f2123] hover:bg-[#f2f6f9]"
              }`}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- Sidebar --------------------------------- */

function NavItem({
  icon,
  label,
  active,
  badge,
  shortcut,
  chevron,
}: {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  shortcut?: string;
  chevron?: "down" | "right";
}) {
  return (
    <button
      className={`flex h-8 w-full items-center gap-2.5 rounded-md px-2 text-sm transition-colors ${
        active
          ? "bg-white font-medium text-[#1f2123] shadow-[0_1px_2px_0_#0000000d]"
          : "text-[#1f2123]/90 hover:bg-white/60"
      }`}
    >
      {icon && <span className="shrink-0 text-[#1f2123]/70">{icon}</span>}
      <span className="flex-1 truncate text-left">{label}</span>
      {badge && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d2031b] px-1.5 text-[11px] font-semibold text-white">
          {badge}
        </span>
      )}
      {shortcut && <span className="text-xs text-[#1f2123]/40">{shortcut}</span>}
      {chevron === "down" && <ChevronDown className="h-4 w-4 text-[#1f2123]/50" />}
      {chevron === "right" && <ChevronRight className="h-4 w-4 text-[#1f2123]/50" />}
    </button>
  );
}

function Sidebar() {
  return (
    <aside className="flex w-[260px] shrink-0 flex-col bg-[#e9edf1] px-3 py-4">
      {/* Logo */}
      <div className="mb-4 flex items-center gap-2 px-2">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#1f2123]">
          <path d="M3 18L9 7l4 6 2-3 3 8H3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
        <span className="text-[17px] font-semibold tracking-tight text-[#1f2123]">Alpheya</span>
      </div>

      {/* Search + notifications */}
      <div className="flex flex-col gap-1">
        <NavItem icon={<Search className="h-4 w-4" />} label="Search" shortcut="⌘K" />
        <NavItem icon={<Bell className="h-4 w-4" />} label="Notifications" badge="8" />
      </div>

      <div className="my-3 h-px bg-black/10" />

      {/* Home group */}
      <div className="flex flex-col gap-0.5">
        <NavItem icon={<Home className="h-4 w-4" />} label="Home" chevron="down" />
        <div className="ml-[26px] flex flex-col gap-0.5 border-l border-black/10 pl-2.5">
          <NavItem label="Dashboard" />
          <NavItem label="KPIs" />
          <NavItem label="Insights" />
          <NavItem label="Opportunities" active />
          <NavItem label="Tasks" />
          <NavItem label="Servicing" />
        </div>
      </div>

      <div className="mt-1 flex flex-col gap-0.5">
        <NavItem icon={<Briefcase className="h-4 w-4" />} label="Book of Business" chevron="right" />
        <NavItem icon={<LineChart className="h-4 w-4" />} label="Marketplace" chevron="right" />
        <NavItem icon={<TrendingUp className="h-4 w-4" />} label="Trading" chevron="right" />
        <NavItem icon={<Sparkles className="h-4 w-4" />} label="AI assistant" />
      </div>

      {/* User footer */}
      <div className="mt-auto flex items-center gap-2.5 rounded-md px-2 py-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1f2123] text-xs font-semibold text-white">
          T
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-[#1f2123]">Thariq</div>
          <div className="truncate text-xs text-[#1f2123]/55">thariq@alpheya.com</div>
        </div>
        <Selector className="h-4 w-4 text-[#1f2123]/50" />
      </div>
    </aside>
  );
}

/* ---------------------------------- Drawer ---------------------------------- */

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[52px] items-center gap-2 border-b border-[#1f2123]/10 last:border-b-0">
      <div className="flex w-[184px] shrink-0 items-center gap-1 text-sm text-[#1f2123]">
        <span className="text-[#687178]">{icon}</span>
        <span>{label}</span>
      </div>
      <div className="min-w-0 flex-1 text-sm text-[#1f2123]">{children}</div>
    </div>
  );
}

function OpportunityDrawer({
  opp,
  record,
  open,
  parentName,
  onBack,
  onClose,
  onGenerateMessage,
  onDismiss,
}: {
  opp: Opportunity | null;
  record?: { action: string; reason?: string; note?: string; at: string; by: string } | null;
  open: boolean;
  parentName?: string | null;
  onBack?: () => void;
  onClose: () => void;
  onGenerateMessage: () => void;
  onDismiss: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const d = opp ? buildDetail(opp) : null;
  const readOnly = !!record;

  return (
    <div className={`fixed inset-0 z-40 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ease-out ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      {/* Sheet */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={opp?.name}
        className={`absolute right-0 top-0 flex h-full w-[480px] flex-col bg-white shadow-[-8px_0_24px_0_rgba(0,0,0,0.08)] transition-transform duration-300 will-change-transform ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {opp && d && (
          <>
        {/* Top navigation */}
        <div className="flex h-12 shrink-0 items-center gap-2 border-b border-[#1f2123]/10 px-4">
          <button onClick={onClose} className="shrink-0 text-[#687178] hover:text-[#1f2123]" aria-label="Close">
            <ChevronsRight className="h-4 w-4" />
          </button>
          {parentName && (
            <nav aria-label="breadcrumb" className="min-w-0">
              <ol className="flex items-center gap-1.5 text-sm text-[#9ea5ac]">
                <li className="inline-flex min-w-0 items-center">
                  <button onClick={onBack} className="truncate transition-colors hover:text-[#1f2123]">
                    {parentName}
                  </button>
                </li>
                <li aria-hidden className="shrink-0 [&>svg]:size-3.5">
                  <ChevronRight />
                </li>
                <li className="inline-flex min-w-0 items-center">
                  <span aria-current="page" className="truncate font-normal text-[#1f2123]">
                    {opp.client}
                  </span>
                </li>
              </ol>
            </nav>
          )}
        </div>

        {/* Header */}
        <div className="flex shrink-0 flex-col gap-2 px-4 pb-4 pt-4">
          <h2 className="text-2xl font-semibold leading-none tracking-[-0.6px] text-[#1f2123]">{opp.name}</h2>
          <p className="text-sm tabular-nums text-[#687178]">
            Created at: {opp.createdOn} • Detected on: {d.detectedOn}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto px-4 py-4">
          {/* Item group */}
          <div className="flex flex-col">
            <DetailRow icon={<Tag className="h-4 w-4" strokeWidth={1.75} />} label="Type">
              <TypeBadge type={opp.type} />
            </DetailRow>
            <DetailRow icon={<User className="h-4 w-4" strokeWidth={1.75} />} label="Client">
              <span className="font-medium">{opp.client}</span>
            </DetailRow>
            <DetailRow icon={<Briefcase className="h-4 w-4" strokeWidth={1.75} />} label="Portfolio">
              <span className="font-medium tabular-nums">{d.portfolio}</span>
            </DetailRow>
          </div>

          {/* Current situation */}
          <div className="mt-6 flex flex-col gap-1">
            <h3 className="text-sm font-medium text-[#1f2123]">Current situation</h3>
            <p className="text-sm leading-5 text-[#687178]">{d.situation}</p>
          </div>

          {/* Potential benefits */}
          <div className="mt-6 flex flex-col gap-1">
            <h3 className="text-sm font-medium text-[#1f2123]">Potential benefits</h3>
            <ul className="list-disc pl-5 text-sm leading-5 text-[#687178] marker:text-[#687178]">
              {d.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>

          {/* Recommended actions */}
          <div className="mt-6 rounded-md border border-[#1f2123]/10 bg-[#f2f6f9] p-4">
            <p className="text-sm font-medium text-[#1f2123]">Recommended actions</p>
            <p className="mt-1 text-sm leading-5 text-[#687178]">{d.recommendation}</p>
          </div>

          {/* Action history (read-only / actioned records) */}
          {readOnly && record && (
            <>
              <div className="mt-6 h-px bg-[#1f2123]/10" />
              <p className="mb-3 mt-6 text-sm font-medium text-[#1f2123]">Action history</p>
              <div className="overflow-hidden rounded-xl border border-[#1f2123]/10">
                {/* Event header */}
                <div className="flex items-start gap-3 bg-[#f2f6f9]/50 p-4">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      ACTION_META[record.action]?.className ?? "bg-[#f2f6f9] text-[#687178]"
                    }`}
                  >
                    {record.action === "dismissed" ? (
                      <Ban className="h-[18px] w-[18px]" strokeWidth={2} />
                    ) : (
                      <ListChecks className="h-[18px] w-[18px]" strokeWidth={2} />
                    )}
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-[#1f2123]">
                      {ACTION_META[record.action]?.label ?? record.action}
                    </p>
                    <p className="mt-0.5 text-xs text-[#687178]">
                      by <span className="font-medium text-[#1f2123]">{record.by}</span>
                      <span className="px-1.5 text-[#dee3e7]">·</span>
                      <span className="tabular-nums">{formatDMY(record.at)}</span>
                    </p>
                  </div>
                </div>

                {/* Reason + feedback */}
                {(record.reason || record.note) && (
                  <div className="flex flex-col gap-3 border-t border-[#1f2123]/10 p-4">
                    {record.reason && (
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9ea5ac]">Reason</p>
                        <p className="mt-1 text-sm leading-5 text-[#1f2123]">{record.reason}</p>
                      </div>
                    )}
                    {record.note && (
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9ea5ac]">
                          Feedback to NBA engine
                        </p>
                        <p className="mt-1 text-sm leading-5 text-[#687178]">{record.note}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {readOnly ? (
          <div className="flex h-16 shrink-0 items-center justify-end border-t border-[#1f2123]/10 px-4">
            <button
              onClick={onClose}
              className="h-7 rounded-md border border-[#dee3e7] bg-white px-3 text-sm font-medium text-[#1f2123] shadow-[0_1px_2px_0_#0000000d] hover:bg-[#f2f6f9]"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-t border-[#1f2123]/10 px-4">
            <button
              onClick={onDismiss}
              className="h-7 rounded-md px-2.5 text-sm font-medium text-[#687178] transition-colors hover:bg-[#fde8ea] hover:text-[#d2031b]"
            >
              Dismiss
            </button>
            <button
              onClick={onGenerateMessage}
              className="inline-flex h-7 items-center gap-1.5 rounded-md bg-[#1f2123] px-2.5 text-sm font-medium text-white shadow-[0_1px_2px_0_#0000000d] hover:bg-[#1f2123]/90"
            >
              <MessageSquareText className="h-4 w-4" />
              Generate message
            </button>
          </div>
        )}
          </>
        )}
      </aside>
    </div>
  );
}

/* ----------------------------- Generate message ----------------------------- */

type Tone = "formal" | "casual";

const TONE_OPTIONS: { value: Tone; title: string; desc: string }[] = [
  { value: "formal", title: "Formal", desc: "Professional tone suitable for email communication" },
  { value: "casual", title: "Casual", desc: "Friendly tone perfect for WhatsApp or instant messaging" },
];

const MESSAGE_SUBJECTS: Record<OppType, string> = {
  rebalancing: "Rebalancing opportunity to optimise your portfolio",
  maturity: "Your $250,000 fixed deposit matures in 7 days",
  "idle-cash": "Putting your idle cash to work",
};

const FORMAL_BODY: Record<OppType, (c: string) => string> = {
  rebalancing: (c) =>
    `Dear ${c},\nI hope this message finds you well. I wanted to bring to your attention an opportunity to optimise your portfolio's risk and return profile through rebalancing.\nCurrently, your portfolio is overweight in Saudi Aramco shares. By reducing this concentration and increasing your holdings in Al Rajhi Bank, we can improve diversification and better align your investments with your risk tolerance.\nI'd be happy to discuss this recommendation further at your convenience.\n\nBest regards,\nYour wealth manager`,
  maturity: (c) =>
    `Dear ${c},\nI hope you are well. Your fixed deposit of $250,000 is approaching maturity in 7 days. To avoid leaving the proceeds as idle cash, I'd recommend we review reinvestment options aligned to your risk profile and liquidity needs.\nI'd be glad to walk you through some competitive alternatives at your convenience.\n\nBest regards,\nYour wealth manager`,
  "idle-cash": (c) =>
    `Dear ${c},\nI hope this message finds you well. I noticed an elevated cash balance sitting uninvested in your portfolio, which is currently creating a drag on returns. We could deploy this into suitable money-market or income strategies consistent with your objectives.\nI'd be happy to discuss the options whenever it suits you.\n\nBest regards,\nYour wealth manager`,
};

const CASUAL_BODY: Record<OppType, (f: string) => string> = {
  rebalancing: (f) =>
    `Hi ${f},\nQuick one — I spotted a chance to tidy up your portfolio. It's a bit heavy on Saudi Aramco right now, so shifting some into Al Rajhi Bank would spread the risk and keep things aligned with your goals.\nWant to jump on a quick call to talk it through?\n\nCheers,\nYour wealth manager`,
  maturity: (f) =>
    `Hi ${f},\nHeads up — your $250,000 fixed deposit matures in about a week. Let's put it to work rather than leaving it idle. I've got a few solid reinvestment options that fit your risk appetite.\nFree for a quick chat this week?\n\nCheers,\nYour wealth manager`,
  "idle-cash": (f) =>
    `Hi ${f},\nNoticed you've got some cash just sitting there. We could easily put it to work in a money-market or income strategy to earn a bit more without much fuss.\nWant me to send over a couple of options?\n\nCheers,\nYour wealth manager`,
};

function buildMessage(opp: Opportunity, tone: Tone) {
  const first = opp.client.split(" ")[0];
  return {
    subject: `Subject: ${MESSAGE_SUBJECTS[opp.type]}`,
    body: tone === "formal" ? FORMAL_BODY[opp.type](opp.client) : CASUAL_BODY[opp.type](first),
  };
}

function ToneOption({
  option,
  selected,
  onSelect,
}: {
  option: { value: Tone; title: string; desc: string };
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button type="button" onClick={onSelect} className="flex flex-1 items-start gap-3 text-left">
      <span
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
          selected ? "border-[#1f2123]" : "border-[#dee3e7]"
        }`}
      >
        {selected && <span className="h-2 w-2 rounded-full bg-[#1f2123]" />}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-[#1f2123]">{option.title}</span>
        <span className="text-xs text-[#687178]">{option.desc}</span>
      </span>
    </button>
  );
}

function GenerateMessageModal({
  opp,
  open,
  onClose,
  onCreateTask,
}: {
  opp: Opportunity | null;
  open: boolean;
  onClose: () => void;
  onCreateTask: (description: string) => void;
}) {
  const [tone, setTone] = useState<Tone>("formal");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setTone("formal");
      setCopied(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const msg = opp ? buildMessage(opp, tone) : null;

  const handleCopy = () => {
    if (!msg) return;
    navigator.clipboard?.writeText(`${msg.subject}\n\n${msg.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ease-out ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Generate message"
        className={`relative flex w-[640px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-xl border border-[#1f2123]/10 bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05),0_4px_6px_-4px_rgba(0,0,0,0.05)] transition-all duration-200 ease-out ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {msg && opp && (
          <>
            {/* Header */}
            <div className="flex items-center gap-1.5 px-4 pt-4">
              <h2 className="flex-1 text-base font-semibold leading-none text-[#1f2123]">Generate message</h2>
              <button onClick={onClose} className="text-[#687178] hover:text-[#1f2123]" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-4 p-4">
              {/* Tone selection */}
              <div className="flex flex-col gap-3">
                <p className="text-sm text-[#1f2123]">Please select your message tone:</p>
                <div className="flex gap-4">
                  {TONE_OPTIONS.map((o) => (
                    <ToneOption
                      key={o.value}
                      option={o}
                      selected={tone === o.value}
                      onSelect={() => setTone(o.value)}
                    />
                  ))}
                </div>
              </div>

              {/* Generated message preview — fixed height so switching tone doesn't resize the modal */}
              <div className="flex h-[340px] flex-col gap-2 overflow-hidden rounded-xl border border-[#1f2123]/10 bg-[#f2f6f9]/50 p-4">
                <p className="text-xs tracking-[0.12px] text-[#687178]">Generated message</p>
                <p className="text-sm font-semibold leading-5 text-[#1f2123]">{msg.subject}</p>
                <p className="flex-1 overflow-y-auto whitespace-pre-line text-sm leading-5 text-[#1f2123]">
                  {msg.body}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 border-t border-[#1f2123]/10 bg-[#f2f6f9]/50 p-4">
              <button
                onClick={handleCopy}
                className="inline-flex h-7 items-center gap-2 rounded-md border border-[#dee3e7] bg-white px-3 text-sm font-medium text-[#1f2123] shadow-[0_1px_2px_0_#0000000d] hover:bg-[#f2f6f9]"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-[#016630]" />
                ) : (
                  <Copy className="h-4 w-4 text-[#687178]" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={() => onCreateTask(`----------\nGenerated message:\n\n${msg.subject}\n\n${msg.body}`)}
                className="inline-flex h-7 items-center gap-2 rounded-md bg-[#1f2123] px-3 text-sm font-medium text-white shadow-[0_1px_2px_0_#0000000d] hover:bg-[#1f2123]/90"
              >
                <ListChecks className="h-4 w-4" />
                Create task
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------- Date picker -------------------------------- */
/* shadcn-style date picker: outline button trigger + popover calendar. */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const formatDMY = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<Date>(() => (value ? new Date(value + "T00:00:00") : new Date()));
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  const openCal = () => {
    if (value) setView(new Date(value + "T00:00:00"));
    const r = triggerRef.current!.getBoundingClientRect();
    const calH = 332;
    const calW = 272;
    let top = r.bottom + 4;
    if (top + calH > window.innerHeight) top = Math.max(8, r.top - calH - 4);
    let left = r.left;
    if (left + calW > window.innerWidth) left = window.innerWidth - calW - 8;
    setPos({ top, left });
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!popRef.current?.contains(e.target as Node) && !triggerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const y = view.getFullYear();
  const m = view.getMonth();
  const gridStart = new Date(y, m, 1 - new Date(y, m, 1).getDay());
  const cells = Array.from({ length: 42 }, (_, i) => {
    const dt = new Date(gridStart);
    dt.setDate(gridStart.getDate() + i);
    return dt;
  });
  const todayISO = toISO(new Date());

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? setOpen(false) : openCal())}
        className="inline-flex h-8 w-full items-center gap-2 rounded-md border border-[#dee3e7] bg-white px-3 text-sm shadow-[0_1px_2px_0_#0000000d] hover:bg-[#f2f6f9]"
      >
        <Calendar className="h-4 w-4 shrink-0 text-[#9ea5ac]" />
        <span className={value ? "text-[#1f2123]" : "text-[#9ea5ac]"}>
          {value ? formatDMY(value) : placeholder}
        </span>
      </button>

      {open && (
        <div
          ref={popRef}
          style={{ top: pos.top, left: pos.left }}
          className="fixed z-[80] w-[272px] rounded-md border border-[#1f2123]/10 bg-white p-3 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]"
        >
          {/* Caption */}
          <div className="flex items-center justify-between pb-3">
            <button
              type="button"
              onClick={() => setView(new Date(y, m - 1, 1))}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#dee3e7] text-[#687178] hover:bg-[#f2f6f9]"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium text-[#1f2123]">
              {MONTHS[m]} {y}
            </span>
            <button
              type="button"
              onClick={() => setView(new Date(y, m + 1, 1))}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#dee3e7] text-[#687178] hover:bg-[#f2f6f9]"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7">
            {WEEKDAYS.map((w) => (
              <div key={w} className="flex h-8 items-center justify-center text-xs text-[#9ea5ac]">
                {w}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7">
            {cells.map((dt) => {
              const iso = toISO(dt);
              const outside = dt.getMonth() !== m;
              const selected = value === iso;
              const isToday = todayISO === iso;
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={`mx-auto flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors ${
                    selected
                      ? "bg-[#1f2123] font-medium text-white"
                      : outside
                      ? "text-[#9ea5ac]/50 hover:bg-[#f2f6f9]"
                      : "text-[#1f2123] hover:bg-[#f2f6f9]"
                  } ${isToday && !selected ? "border border-[#dee3e7]" : ""}`}
                >
                  {dt.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

/* --------------------------------- Add task --------------------------------- */

const FIELD_INPUT =
  "h-8 w-full rounded-md border border-[#dee3e7] bg-white px-3 text-sm text-[#1f2123] placeholder:text-[#9ea5ac] focus:border-[#1f2123]/30 focus:outline-none focus:ring-2 focus:ring-[#1f2123]/10";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium text-[#687178]">{children}</label>;
}

function AddTaskDrawer({
  opp,
  description,
  open,
  onClose,
  onSave,
}: {
  opp: Opportunity | null;
  description: string;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [due, setDue] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (open) {
      setTitle("");
      setPriority("Medium");
      setDue("");
      setDesc(description);
    }
  }, [open, description]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const d = opp ? buildDetail(opp) : null;

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ease-out ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      {/* Sheet */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Add task"
        className={`absolute right-0 top-0 flex h-full w-[480px] flex-col bg-white shadow-[-8px_0_24px_0_rgba(0,0,0,0.08)] transition-transform duration-300 will-change-transform ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {open && (
          <>
            {/* Top navigation */}
            <div className="flex h-12 shrink-0 items-center border-b border-[#1f2123]/10 px-4">
              <button onClick={onClose} className="text-[#687178] hover:text-[#1f2123]" aria-label="Close">
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>

            {/* Header */}
            <div className="shrink-0 px-4 pb-4 pt-4">
              <h2 className="text-2xl font-semibold leading-none tracking-[-0.6px] text-[#1f2123]">Add task</h2>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto px-4 py-4">
              {/* Task details */}
              <p className="text-sm font-medium text-[#1f2123]">Task details</p>
              <div className="mt-4 flex flex-col gap-5">
                {/* Task title */}
                <div className="flex flex-col gap-2">
                  <FieldLabel>Task title</FieldLabel>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add task title"
                    className={FIELD_INPUT}
                  />
                </div>

                {/* Priority */}
                <div className="flex flex-col gap-2">
                  <FieldLabel>Priority</FieldLabel>
                  <div className="relative">
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className={`${FIELD_INPUT} appearance-none pr-9`}
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ea5ac]" />
                  </div>
                </div>

                {/* Type — single-client only */}
                {opp && d && (
                  <div className="flex flex-col gap-2">
                    <FieldLabel>Type</FieldLabel>
                    <div className="flex h-8 w-full overflow-hidden rounded-md border border-[#dee3e7]">
                      <div className="flex items-center gap-1 border-r border-[#dee3e7] bg-[#f2f6f9]/60 px-3 text-sm text-[#687178]">
                        Portfolio
                        <ChevronDown className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex min-w-0 flex-1 items-center gap-2 px-3 text-sm">
                        <span className="tabular-nums text-[#1f2123]">{d.portfolio}</span>
                        <span className="truncate text-[#687178]">{opp.client}</span>
                        <ChevronsUpDown className="ml-auto h-3.5 w-3.5 shrink-0 text-[#9ea5ac]" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Assignee */}
                <div className="flex flex-col gap-2">
                  <FieldLabel>Assignee</FieldLabel>
                  <input readOnly value="Me (Tariq Ali)" className={`${FIELD_INPUT} bg-[#f2f6f9]/50`} />
                </div>

                {/* Due date */}
                <div className="flex flex-col gap-2">
                  <FieldLabel>Due date</FieldLabel>
                  <DatePicker value={due} onChange={setDue} placeholder="Select due date" />
                </div>
              </div>

              {/* Separator */}
              <div className="my-5 h-px bg-[#1f2123]/10" />

              {/* Description */}
              <p className="text-sm font-medium text-[#1f2123]">Description (Optional)</p>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="mt-4 min-h-[220px] w-full resize-y rounded-md border border-[#dee3e7] bg-white p-3 text-sm leading-5 text-[#1f2123] placeholder:text-[#9ea5ac] focus:border-[#1f2123]/30 focus:outline-none focus:ring-2 focus:ring-[#1f2123]/10"
              />
            </div>

            {/* Footer */}
            <div className="flex h-16 shrink-0 items-center justify-end gap-2 border-t border-[#1f2123]/10 px-4">
              <button
                onClick={onClose}
                className="h-7 rounded-md border border-[#dee3e7] bg-white px-3 text-sm font-medium text-[#1f2123] shadow-[0_1px_2px_0_#0000000d] hover:bg-[#f2f6f9]"
              >
                Close
              </button>
              <button
                disabled={!title.trim()}
                onClick={onSave}
                className="h-7 rounded-md bg-[#1f2123] px-3 text-sm font-medium text-white shadow-[0_1px_2px_0_#0000000d] hover:bg-[#1f2123]/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/* --------------------------------- Toast ------------------------------------ */

function SuccessToast({
  open,
  title,
  description,
  onClose,
}: {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed right-4 top-4 z-[70] transition-all duration-300 ease-out ${
        open ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-4 opacity-0"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex w-[360px] items-start gap-3 rounded-md border border-[#1f2123]/10 border-l-4 border-l-[#00a63e] bg-white p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
        <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#00a63e]" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-[#1f2123]">{title}</p>
          <p className="text-sm text-[#687178]">{description}</p>
        </div>
        <button onClick={onClose} className="text-[#9ea5ac] hover:text-[#1f2123]" aria-label="Dismiss">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* --------------------------------- Filters ---------------------------------- */

interface Filters {
  types: OppType[];
  resources: string[];
  start: string;
  end: string;
}

const EMPTY_FILTERS: Filters = { types: [], resources: [], start: "", end: "" };

const TYPE_FILTER_OPTIONS: { label: string; value: OppType }[] = [
  { label: "Portfolio rebalancing", value: "rebalancing" },
  { label: "Maturity event", value: "maturity" },
  { label: "Idle cash deployment", value: "idle-cash" },
];

const RESOURCE_OPTIONS = ["Account", "Client", "Portfolio"];

function parseDMY(s: string) {
  const [d, m, y] = s.split("/").map(Number);
  return new Date(y, m - 1, d);
}

function countFilters(f: Filters) {
  return f.types.length + f.resources.length + (f.start ? 1 : 0) + (f.end ? 1 : 0);
}

function matchesFilters(o: Opportunity, f: Filters) {
  if (f.types.length && !f.types.includes(o.type)) return false;
  if (f.resources.length) {
    const kinds = f.resources.map((r) => (r === "Client" ? "client" : "portfolio"));
    if (!kinds.includes(o.accountKind)) return false;
  }
  const created = parseDMY(o.createdOn);
  if (f.start && created < new Date(f.start)) return false;
  if (f.end && created > new Date(f.end)) return false;
  return true;
}

function FilterCheckbox({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
          checked ? "border-[#1f2123] bg-[#1f2123]" : "border-[#dee3e7] bg-white"
        }`}
      >
        {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onToggle} />
      <span className="text-sm text-[#1f2123]">{label}</span>
    </label>
  );
}

function FilterDialog({
  open,
  initial,
  onClose,
  onApply,
}: {
  open: boolean;
  initial: Filters;
  onClose: () => void;
  onApply: (f: Filters) => void;
}) {
  const [draft, setDraft] = useState<Filters>(initial);

  useEffect(() => {
    if (open) setDraft(initial);
  }, [open, initial]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const toggleType = (v: OppType) =>
    setDraft((d) => ({
      ...d,
      types: d.types.includes(v) ? d.types.filter((t) => t !== v) : [...d.types, v],
    }));
  const toggleResource = (v: string) =>
    setDraft((d) => ({
      ...d,
      resources: d.resources.includes(v) ? d.resources.filter((r) => r !== v) : [...d.resources, v],
    }));

  const hasFilters = countFilters(draft) > 0;

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ease-out ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Opportunity filters"
        className={`relative flex w-[840px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-xl border border-[#1f2123]/10 bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05),0_4px_6px_-4px_rgba(0,0,0,0.05)] transition-all duration-200 ease-out ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-1.5 px-4 pt-4">
          <h2 className="flex-1 text-base font-semibold leading-none text-[#1f2123]">Opportunity filters</h2>
          <button onClick={onClose} className="text-[#687178] hover:text-[#1f2123]" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Type */}
          <p className="text-sm font-medium text-[#1f2123]">Type</p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {TYPE_FILTER_OPTIONS.map((o) => (
              <FilterCheckbox
                key={o.value}
                label={o.label}
                checked={draft.types.includes(o.value)}
                onToggle={() => toggleType(o.value)}
              />
            ))}
          </div>

          <div className="my-4 h-px bg-[#1f2123]/10" />

          {/* Resource type */}
          <p className="text-sm font-medium text-[#1f2123]">Resource type</p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {RESOURCE_OPTIONS.map((r) => (
              <FilterCheckbox
                key={r}
                label={r}
                checked={draft.resources.includes(r)}
                onToggle={() => toggleResource(r)}
              />
            ))}
          </div>

          <div className="my-4 h-px bg-[#1f2123]/10" />

          {/* Creation date */}
          <p className="text-sm font-medium text-[#1f2123]">Creation date</p>
          <div className="mt-4 flex items-end gap-4">
            <div className="flex flex-1 flex-col gap-2">
              <label className="text-sm font-medium text-[#687178]">Start date</label>
              <DatePicker
                value={draft.start}
                onChange={(v) => setDraft((d) => ({ ...d, start: v }))}
                placeholder="DD/MM/YYYY"
              />
            </div>
            <span className="pb-2 text-sm text-[#687178]">to</span>
            <div className="flex flex-1 flex-col gap-2">
              <label className="text-sm font-medium text-[#687178]">End date</label>
              <DatePicker
                value={draft.end}
                onChange={(v) => setDraft((d) => ({ ...d, end: v }))}
                placeholder="DD/MM/YYYY"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#1f2123]/10 bg-[#f2f6f9]/50 p-4">
          <button
            onClick={onClose}
            className="h-7 rounded-md border border-[#dee3e7] bg-white px-3 text-sm font-medium text-[#1f2123] shadow-[0_1px_2px_0_#0000000d] hover:bg-[#f2f6f9]"
          >
            Cancel
          </button>
          <button
            disabled={!hasFilters}
            onClick={() => onApply(draft)}
            className="h-7 rounded-md bg-[#1f2123] px-3 text-sm font-medium text-white shadow-[0_1px_2px_0_#0000000d] hover:bg-[#1f2123]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Dismiss ---------------------------------- */

const DISMISS_REASONS = [
  "Not relevant to this client",
  "Already actioned elsewhere",
  "Client not interested",
  "Timing isn't right",
  "Duplicate or low-quality signal",
  "Other",
];

function DismissModal({
  target,
  onClose,
  onConfirm,
}: {
  target: { ids: string[]; title: string; subtitle: string } | null;
  onClose: () => void;
  onConfirm: (reason: string, note: string) => void;
}) {
  const open = !!target;
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (open) {
      setReason("");
      setNote("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ease-out ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Dismiss opportunity"
        className={`relative flex w-[480px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-xl border border-[#1f2123]/10 bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05),0_4px_6px_-4px_rgba(0,0,0,0.05)] transition-all duration-200 ease-out ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {target && (
          <>
            {/* Header */}
            <div className="flex items-center gap-1.5 px-4 pt-4">
              <h2 className="flex-1 text-base font-semibold leading-none text-[#1f2123]">
                {target.ids.length > 1 ? "Dismiss opportunity for all clients" : "Dismiss opportunity"}
              </h2>
              <button onClick={onClose} className="text-[#687178] hover:text-[#1f2123]" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-4 p-4">
              <p className="text-sm text-[#687178]">
                <span className="font-medium text-[#1f2123]">{target.title}</span> — {target.subtitle}
              </p>

              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-[#1f2123]">Why are you dismissing this?</p>
                <div className="flex flex-col gap-3">
                  {DISMISS_REASONS.map((r) => {
                    const selected = reason === r;
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setReason(r)}
                        className="flex items-center gap-3 text-left"
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                            selected ? "border-[#1f2123]" : "border-[#dee3e7]"
                          }`}
                        >
                          {selected && <span className="h-2 w-2 rounded-full bg-[#1f2123]" />}
                        </span>
                        <span className="text-sm text-[#1f2123]">{r}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#687178]">
                  Add a note <span className="font-normal">(optional)</span>
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Context for the NBA engine…"
                  className="min-h-[72px] w-full resize-y rounded-md border border-[#dee3e7] bg-white p-3 text-sm leading-5 text-[#1f2123] placeholder:text-[#9ea5ac] focus:border-[#1f2123]/30 focus:outline-none focus:ring-2 focus:ring-[#1f2123]/10"
                />
              </div>

              <p className="rounded-md bg-[#f2f6f9]/60 px-3 py-2 text-xs text-[#687178]">
                This opportunity will be removed from your active list and the feedback sent to the NBA engine. It
                stays accessible as an actioned record.
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-[#1f2123]/10 bg-[#f2f6f9]/50 p-4">
              <button
                onClick={onClose}
                className="h-7 rounded-md border border-[#dee3e7] bg-white px-3 text-sm font-medium text-[#1f2123] shadow-[0_1px_2px_0_#0000000d] hover:bg-[#f2f6f9]"
              >
                Cancel
              </button>
              <button
                disabled={!reason}
                onClick={() => onConfirm(reason, note)}
                className="h-7 rounded-md bg-[#d2031b] px-3 text-sm font-medium text-white shadow-[0_1px_2px_0_#0000000d] hover:bg-[#b00216] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Dismiss opportunity
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------- Group drawer ------------------------------- */

function GroupDrawer({
  group,
  open,
  onClose,
  onOpenClient,
  onBulkDismiss,
  onBulkTask,
}: {
  group: SignalGroup | null;
  open: boolean;
  onClose: () => void;
  onOpenClient: (o: Opportunity) => void;
  onBulkDismiss: () => void;
  onBulkTask: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const d = group ? buildDetail(group.items[0]) : null;

  return (
    <div className={`fixed inset-0 z-30 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ease-out ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={group?.name}
        className={`absolute right-0 top-0 flex h-full w-[480px] flex-col bg-white shadow-[-8px_0_24px_0_rgba(0,0,0,0.08)] transition-transform duration-300 will-change-transform ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {group && d && (
          <>
            {/* Top navigation */}
            <div className="flex h-12 shrink-0 items-center border-b border-[#1f2123]/10 px-4">
              <button onClick={onClose} className="text-[#687178] hover:text-[#1f2123]" aria-label="Close">
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>

            {/* Header */}
            <div className="flex shrink-0 flex-col gap-2 px-4 pb-4 pt-4">
              <h2 className="text-2xl font-semibold leading-none tracking-[-0.6px] text-[#1f2123]">{group.name}</h2>
              <div className="flex items-center gap-2">
                <TypeBadge type={group.type} />
                <span className="text-sm text-[#687178]">· {group.items.length} impacted clients</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto px-4 py-4">
              {/* Signal context */}
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-[#1f2123]">Current situation</h3>
                <p className="text-sm leading-5 text-[#687178]">{d.situation}</p>
              </div>
              <div className="mt-6 flex flex-col gap-1">
                <h3 className="text-sm font-medium text-[#1f2123]">Potential benefits</h3>
                <ul className="list-disc pl-5 text-sm leading-5 text-[#687178] marker:text-[#687178]">
                  {d.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 rounded-md border border-[#1f2123]/10 bg-[#f2f6f9] p-4">
                <p className="text-sm font-medium text-[#1f2123]">Recommended actions</p>
                <p className="mt-1 text-sm leading-5 text-[#687178]">{d.recommendation}</p>
              </div>

              {/* Impacted clients */}
              <div className="mt-6 h-px bg-[#1f2123]/10" />
              <p className="mb-3 mt-6 text-sm font-medium text-[#1f2123]">
                Impacted clients ({group.items.length})
              </p>
              <div className="flex flex-col gap-2">
                {group.items.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onOpenClient(c)}
                    className="flex w-full items-center justify-between gap-2 rounded-md border border-[#1f2123]/10 px-3 py-2.5 text-left transition-colors hover:bg-[#f2f6f9]/60"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="shrink-0 text-[#687178]">
                        {c.accountKind === "portfolio" ? (
                          <Briefcase className="h-4 w-4" strokeWidth={1.75} />
                        ) : (
                          <User className="h-4 w-4" strokeWidth={1.75} />
                        )}
                      </span>
                      <div className="min-w-0">
                        <div className="truncate text-sm text-[#1f2123]">{c.client}</div>
                        <div className="truncate text-xs tabular-nums text-[#687178]">{c.account}</div>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span
                        className={`text-xs ${
                          c.expiryTone === "urgent"
                            ? "text-[#d2031b]"
                            : c.expiryTone === "expired"
                            ? "text-[#9ea5ac]"
                            : "text-[#687178]"
                        }`}
                      >
                        {c.expiry}
                      </span>
                      <ChevronRight className="h-4 w-4 text-[#9ea5ac]" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer — bulk actions */}
            <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-t border-[#1f2123]/10 px-4">
              <button
                onClick={onBulkDismiss}
                className="h-7 rounded-md px-2.5 text-sm font-medium text-[#687178] transition-colors hover:bg-[#fde8ea] hover:text-[#d2031b]"
              >
                Dismiss all
              </button>
              <button
                onClick={onBulkTask}
                className="inline-flex h-7 items-center gap-1.5 rounded-md bg-[#1f2123] px-2.5 text-sm font-medium text-white shadow-[0_1px_2px_0_#0000000d] hover:bg-[#1f2123]/90"
              >
                <ListChecks className="h-4 w-4" />
                Generate task for all
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/* ---------------------------------- Tweaks ---------------------------------- */

type GroupStyle = "drawer" | "expand" | "select";

const DESIGN_OPTIONS: { key: GroupStyle; title: string; desc: string }[] = [
  { key: "drawer", title: "Drawer", desc: "Drill into a signal via a side panel" },
  { key: "expand", title: "Expand table", desc: "Expand the signal row inline" },
  { key: "select", title: "Bulk select", desc: "Flat list with checkboxes for bulk actions" },
];

function TweaksPanel({
  value,
  onChange,
}: {
  value: GroupStyle;
  onChange: (v: GroupStyle) => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="fixed bottom-6 right-6 z-20 w-64 overflow-hidden rounded-xl border border-[#1f2123]/10 bg-white shadow-[0_12px_32px_-8px_rgba(0,0,0,0.22)]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 px-3 py-2.5 hover:bg-[#f2f6f9]/60"
      >
        <span className="flex items-center gap-1.5">
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#1f2123]" />
          <span className="text-xs font-semibold text-[#1f2123]">Tweaks · Group design</span>
        </span>
        <ChevronDown className={`h-4 w-4 text-[#9ea5ac] transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && (
        <div className="flex flex-col gap-0.5 border-t border-[#1f2123]/10 p-2">
          {DESIGN_OPTIONS.map((o) => {
            const selected = value === o.key;
            return (
              <button
                key={o.key}
                onClick={() => onChange(o.key)}
                className={`flex flex-col gap-0.5 rounded-md px-2.5 py-2 text-left transition-colors ${
                  selected ? "bg-[#f2f6f9]" : "hover:bg-[#f2f6f9]/60"
                }`}
              >
                <span className="flex items-center gap-2 text-sm font-medium text-[#1f2123]">
                  <span
                    className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
                      selected ? "border-[#1f2123]" : "border-[#dee3e7]"
                    }`}
                  >
                    {selected && <span className="h-1.5 w-1.5 rounded-full bg-[#1f2123]" />}
                  </span>
                  {o.title}
                </span>
                <span className="pl-[22px] text-xs text-[#9ea5ac]">{o.desc}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------- Page ----------------------------------- */

export default function Opportunities() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTargetIds, setTaskTargetIds] = useState<string[]>([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastContent, setToastContent] = useState({ title: "", description: "" });
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [dismissTarget, setDismissTarget] = useState<{ ids: string[]; title: string; subtitle: string } | null>(
    null,
  );
  const [actioned, setActioned] = useState<Record<string, ActionRecord>>(SEED_ACTIONED);

  const [tab, setTab] = useState<"active" | "actioned">("active");

  // Active list view — Tweaks toggle: grouped by signal vs one row per client
  const [listView, setListView] = useState<"signal" | "client">("signal");
  // Grouped drill-in design — Tweaks toggle: drawer vs expand-in-table
  const [groupStyle, setGroupStyle] = useState<GroupStyle>("drawer");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [selectedGroup, setSelectedGroup] = useState<SignalGroup | null>(null);
  const [groupOpen, setGroupOpen] = useState(false);

  const toggleExpand = (name: string) =>
    setExpandedGroups((s) => {
      const n = new Set(s);
      n.has(name) ? n.delete(name) : n.add(name);
      return n;
    });

  // Type column sorting (cycles: off → asc → desc → off)
  const [typeDir, setTypeDir] = useState<"asc" | "desc" | null>(null);
  const cycleTypeSort = () => setTypeDir((d) => (d === null ? "asc" : d === "asc" ? "desc" : null));
  const sortByType = <T extends { type: OppType }>(arr: T[]): T[] =>
    typeDir
      ? [...arr].sort((a, b) => {
          const c = TYPE_META[a.type].label.localeCompare(TYPE_META[b.type].label);
          return typeDir === "asc" ? c : -c;
        })
      : arr;

  const rawActiveItems = OPPORTUNITIES.filter((o) => !actioned[o.id] && matchesFilters(o, filters));
  const activeItems = sortByType(rawActiveItems);
  const activeGroups = sortByType(groupBySignal(rawActiveItems));
  const actionedRows = sortByType(
    OPPORTUNITIES.filter((o) => actioned[o.id] && matchesFilters(o, filters)),
  );
  const activeFilterCount = countFilters(filters);

  // Multi-select (Bulk select design)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const clearSelection = () => setSelectedIds(new Set());
  const toggleSelect = (id: string) =>
    setSelectedIds((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const allSelected = activeItems.length > 0 && selectedIds.size === activeItems.length;
  const toggleSelectAll = () =>
    setSelectedIds(allSelected ? new Set() : new Set(activeItems.map((o) => o.id)));

  const showToast = (title: string, description: string) => {
    setToastContent({ title, description });
    setToastOpen(true);
  };

  const [clientParent, setClientParent] = useState<string | null>(null);
  const openClient = (o: Opportunity, parent: string | null = null) => {
    setClientParent(parent);
    setSelected(o);
    setDrawerOpen(true);
  };
  const openGroup = (g: SignalGroup) => {
    setSelectedGroup(g);
    setGroupOpen(true);
  };
  const actionIds = (
    ids: string[],
    rec: { action: string; reason?: string; note?: string; at: string; by: string },
  ) =>
    setActioned((a) => {
      const next = { ...a };
      ids.forEach((id) => (next[id] = rec));
      return next;
    });

  const handleDismiss = (reason: string, note: string) => {
    if (!dismissTarget) return;
    (document.activeElement as HTMLElement | null)?.blur();
    actionIds(dismissTarget.ids, {
      action: "dismissed",
      reason,
      note,
      at: new Date().toISOString().slice(0, 10),
      by: "Tariq Ali",
    });
    // Feedback signal into the NBA engine (mocked)
    console.log("[NBA feedback]", { opportunityIds: dismissTarget.ids, reason, note });
    const n = dismissTarget.ids.length;
    setDismissTarget(null);
    setDrawerOpen(false);
    setGroupOpen(false);
    clearSelection();
    showToast(
      n > 1 ? `${n} opportunities dismissed` : "Opportunity dismissed",
      "Feedback sent to the NBA engine",
    );
  };

  const handleCreateTask = (description: string) => {
    setTaskTargetIds(selected ? [selected.id] : []);
    setTaskDescription(description);
    setMsgOpen(false);
    setDrawerOpen(false);
    setTaskOpen(true);
  };

  const handleSaveTask = () => {
    if (taskTargetIds.length) {
      actionIds(taskTargetIds, { action: "task", at: new Date().toISOString().slice(0, 10), by: "Tariq Ali" });
    }
    const n = taskTargetIds.length;
    setTaskOpen(false);
    setGroupOpen(false);
    clearSelection();
    showToast("Task added", n > 1 ? `Task created for ${n} clients` : "Task has been added successfully");
  };

  // Individual actions (from a row's Action menu)
  const rowMessage = (o: Opportunity) => {
    setSelected(o);
    setMsgOpen(true);
  };
  const rowDismiss = (o: Opportunity) =>
    setDismissTarget({ ids: [o.id], title: o.name, subtitle: o.client });

  // Bulk actions on a whole signal group
  const bulkDismiss = (g: SignalGroup) =>
    setDismissTarget({
      ids: g.items.map((i) => i.id),
      title: g.name,
      subtitle: `${g.items.length} impacted clients`,
    });
  const bulkTask = (g: SignalGroup) => {
    setTaskTargetIds(g.items.map((i) => i.id));
    setTaskDescription(
      `Opportunity: ${g.name}\nSignal: ${TYPE_META[g.type].label}\nImpacted clients (${g.items.length}):\n${g.items
        .map((i) => `• ${i.client} (${i.account})`)
        .join("\n")}`,
    );
    setTaskOpen(true);
  };

  // Bulk actions on the current multi-selection (Bulk select design)
  const selectedItems = () => activeItems.filter((o) => selectedIds.has(o.id));
  const bulkDismissSelected = () => {
    const items = selectedItems();
    setDismissTarget({
      ids: items.map((o) => o.id),
      title: `${items.length} selected ${items.length === 1 ? "opportunity" : "opportunities"}`,
      subtitle: "Bulk dismiss",
    });
  };
  const bulkTaskSelected = () => {
    const items = selectedItems();
    setTaskTargetIds(items.map((o) => o.id));
    setTaskDescription(
      `Bulk task for ${items.length} selected ${items.length === 1 ? "opportunity" : "opportunities"}:\n${items
        .map((o) => `• ${o.client} — ${o.name}`)
        .join("\n")}`,
    );
    setTaskOpen(true);
  };

  useEffect(() => {
    if (!toastOpen) return;
    const t = setTimeout(() => setToastOpen(false), 4000);
    return () => clearTimeout(t);
  }, [toastOpen]);

  return (
    <div className="flex h-screen w-full bg-white font-sans text-[#1f2123] [font-family:Inter,sans-serif]">
      <Sidebar />

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-16 items-center gap-3 border-b border-[#1f2123]/10 px-5">
          <button className="text-[#9ea5ac] hover:text-[#1f2123]">
            <PanelLeft className="h-4 w-4" />
          </button>
          <nav className="flex items-center gap-1.5 text-sm">
            <span className="text-[#9ea5ac]">Home</span>
            <ChevronRight className="h-3.5 w-3.5 text-[#9ea5ac]" />
            <span className="font-medium text-[#1f2123]">Opportunities</span>
          </nav>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto px-8 py-6">
          <h1 className="mb-5 text-2xl font-semibold tracking-tight text-[#1f2123]">Opportunities</h1>

          <div className="rounded-xl border border-[#1f2123]/10 bg-white shadow-[0_1px_2px_0_#0000000d]">
            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-[#1f2123]/10 px-4 pt-3">
              {([
                [
                  "active",
                  "Active",
                  listView === "client" || groupStyle === "select"
                    ? activeItems.length
                    : activeGroups.length,
                ],
                ["actioned", "Actioned", actionedRows.length],
              ] as const).map(([key, label, count]) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`-mb-px flex items-center gap-2 border-b-2 px-3 pb-2.5 text-sm transition-colors ${
                    tab === key
                      ? "border-[#1f2123] font-medium text-[#1f2123]"
                      : "border-transparent text-[#687178] hover:text-[#1f2123]"
                  }`}
                >
                  {label}
                  <span
                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs ${
                      tab === key ? "bg-[#1f2123] text-white" : "bg-[#f2f6f9] text-[#687178]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between p-4">
              <button
                onClick={() => setFilterOpen(true)}
                className="inline-flex h-7 items-center gap-2 rounded-md border border-[#dee3e7] bg-white px-3 text-sm font-medium text-[#1f2123] shadow-[0_1px_2px_0_#0000000d] hover:bg-[#f2f6f9]"
              >
                <SlidersHorizontal className="h-4 w-4 text-[#687178]" />
                Filter
                {activeFilterCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1f2123] px-1.5 text-xs font-medium text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* View tabs — Group / Client (hidden in Bulk select, which is already flat) */}
              {tab === "active" && groupStyle !== "select" && (
                <div className="flex rounded-md bg-[#f2f6f9] p-0.5">
                  {([
                    ["signal", "Group"],
                    ["client", "Client"],
                  ] as const).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setListView(key)}
                      className={`h-7 rounded-md px-3 text-sm font-medium transition-colors ${
                        listView === key
                          ? "bg-white text-[#1f2123] shadow-[0_1px_2px_0_#0000000d]"
                          : "text-[#687178] hover:text-[#1f2123]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bulk action bar (Bulk select design) */}
            {tab === "active" && listView === "signal" && groupStyle === "select" && selectedIds.size > 0 && (
              <div className="flex items-center gap-2 border-y border-[#1f2123]/10 bg-[#f2f6f9]/60 px-4 py-2">
                <span className="text-sm font-medium text-[#1f2123]">{selectedIds.size} selected</span>
                <button
                  onClick={bulkTaskSelected}
                  className="inline-flex h-7 items-center gap-1.5 rounded-md bg-[#1f2123] px-2.5 text-sm font-medium text-white hover:bg-[#1f2123]/90"
                >
                  <ListChecks className="h-4 w-4" />
                  Generate task
                </button>
                <button
                  onClick={bulkDismissSelected}
                  className="h-7 rounded-md px-2.5 text-sm font-medium text-[#687178] transition-colors hover:bg-[#fde8ea] hover:text-[#d2031b]"
                >
                  Dismiss
                </button>
                <button
                  onClick={clearSelection}
                  className="ml-auto text-xs font-medium text-[#687178] hover:text-[#1f2123]"
                >
                  Clear selection
                </button>
              </div>
            )}

            {/* Table */}
            <table className="w-full table-fixed border-collapse text-left">
              <colgroup>
                {tab === "actioned" ? (
                  <>
                    <col className="w-[220px]" />
                    <col className="w-[180px]" />
                    <col className="w-[170px]" />
                    <col className="w-[110px]" />
                    <col className="w-[180px]" />
                    <col className="w-[120px]" />
                    <col className="w-[120px]" />
                  </>
                ) : listView === "signal" && groupStyle === "expand" ? (
                  <>
                    <col className="w-[330px]" />
                    <col className="w-[230px]" />
                    <col className="w-[150px]" />
                    <col className="w-[120px]" />
                    <col className="w-[130px]" />
                    <col className="w-[140px]" />
                  </>
                ) : listView === "signal" && groupStyle === "select" ? (
                  <>
                    <col className="w-[36px]" />
                    <col className="w-[372px]" />
                    <col className="w-[231px]" />
                    <col className="w-[140px]" />
                    <col className="w-[146px]" />
                    <col className="w-[175px]" />
                  </>
                ) : listView === "signal" ? (
                  <>
                    <col className="w-[380px]" />
                    <col className="w-[250px]" />
                    <col className="w-[160px]" />
                    <col className="w-[150px]" />
                    <col className="w-[160px]" />
                  </>
                ) : (
                  <>
                    <col className="w-[408px]" />
                    <col className="w-[231px]" />
                    <col className="w-[140px]" />
                    <col className="w-[146px]" />
                    <col className="w-[175px]" />
                  </>
                )}
              </colgroup>
              <thead>
                <tr className="border-y border-[#1f2123]/10">
                  {tab === "actioned" ? (
                    <>
                      <th className="px-3 py-3 text-sm font-medium text-[#1f2123]">Name</th>
                      <th className="px-3 py-3 text-sm font-medium text-[#1f2123]">Linked to</th>
                      <th className="px-3 py-3 text-sm font-medium text-[#1f2123]">Type</th>
                      <th className="px-3 py-3 text-sm font-medium text-[#1f2123]">Created on</th>
                      <th className="px-3 py-3 text-sm font-medium text-[#1f2123]">Action taken</th>
                      <th className="px-3 py-3 text-sm font-medium text-[#1f2123]">Actioned by</th>
                      <th className="px-3 py-3 text-sm font-medium text-[#1f2123]">Actioned on</th>
                    </>
                  ) : listView === "signal" && groupStyle === "select" ? (
                    <>
                      <th className="py-3 pl-4 pr-0">
                        <button
                          onClick={toggleSelectAll}
                          aria-label="Select all"
                          className={`flex h-4 w-4 items-center justify-center rounded-[4px] border transition-colors ${
                            allSelected ? "border-[#1f2123] bg-[#1f2123]" : "border-[#dee3e7] bg-white"
                          }`}
                        >
                          {allSelected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                        </button>
                      </th>
                      <th className="px-3 py-3"><SortableHead label="Name" /></th>
                      <th className="px-3 py-3"><SortableHead label="Linked to" /></th>
                      <th className="px-3 py-3"><SortableHead label="Created on" /></th>
                      <th className="px-3 py-3"><SortableHead label="Expiry date" /></th>
                      <th className="px-3 py-3"><SortableHead label="Type" dir={typeDir} onClick={cycleTypeSort} /></th>
                    </>
                  ) : listView === "signal" ? (
                    <>
                      <th className="px-3 py-3"><SortableHead label="Signal" /></th>
                      <th className="px-3 py-3"><SortableHead label="Impacted clients" /></th>
                      <th className="px-3 py-3"><SortableHead label="Type" dir={typeDir} onClick={cycleTypeSort} /></th>
                      <th className="px-3 py-3"><SortableHead label="Created on" /></th>
                      <th className="px-3 py-3"><SortableHead label="Expiry date" /></th>
                      {groupStyle === "expand" && <th className="px-3 py-3" />}
                    </>
                  ) : (
                    <>
                      <th className="px-3 py-3"><SortableHead label="Name" /></th>
                      <th className="px-3 py-3"><SortableHead label="Linked to" /></th>
                      <th className="px-3 py-3"><SortableHead label="Created on" /></th>
                      <th className="px-3 py-3"><SortableHead label="Expiry date" /></th>
                      <th className="px-3 py-3"><SortableHead label="Type" dir={typeDir} onClick={cycleTypeSort} /></th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* ----- Active · By signal (grouped) ----- */}
                {tab === "active" && listView === "signal" && groupStyle !== "select" && activeGroups.length === 0 && (
                  <tr>
                    <td
                      colSpan={groupStyle === "expand" ? 6 : 5}
                      className="px-3 py-12 text-center text-sm text-[#687178]"
                    >
                      No opportunities match your filters.
                    </td>
                  </tr>
                )}

                {/* Drawer style — click a group → group drawer */}
                {tab === "active" &&
                  listView === "signal" &&
                  groupStyle === "drawer" &&
                  activeGroups.map((g) => {
                    const urgent = groupExpiry(g.items);
                    const latest = [...g.items].sort(
                      (a, b) => parseDMY(b.createdOn).getTime() - parseDMY(a.createdOn).getTime(),
                    )[0];
                    return (
                      <tr
                        key={g.name}
                        onClick={() => openGroup(g)}
                        className={`h-[68px] cursor-pointer border-b border-[#1f2123]/10 last:border-b-0 transition-colors hover:bg-[#f2f6f9]/50 ${
                          groupOpen && selectedGroup?.name === g.name ? "bg-[#f2f6f9]" : ""
                        }`}
                      >
                        <td className="px-3">
                          <span className="text-sm font-medium text-[#1f2123]">{g.name}</span>
                        </td>
                        <td className="px-3">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {g.items.slice(0, 3).map((c) => (
                                <span
                                  key={c.id}
                                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#e8eef6] text-[10px] font-semibold text-[#193cb8]"
                                >
                                  {c.client
                                    .split(" ")
                                    .map((w) => w[0])
                                    .join("")
                                    .slice(0, 2)}
                                </span>
                              ))}
                              {g.items.length > 3 && (
                                <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#f2f6f9] text-[10px] font-semibold text-[#687178]">
                                  +{g.items.length - 3}
                                </span>
                              )}
                            </div>
                            <span className="text-sm font-medium text-[#1f2123]">
                              {g.items.length} {g.items.length === 1 ? "client" : "clients"}
                            </span>
                          </div>
                        </td>
                        <td className="px-3">
                          <TypeBadge type={g.type} />
                        </td>
                        <td className="px-3">
                          <span className="text-sm tabular-nums text-[#1f2123]">{latest.createdOn}</span>
                        </td>
                        <td className="px-3">
                          <span
                            className={`text-sm ${
                              urgent.expiryTone === "urgent"
                                ? "text-[#d2031b]"
                                : urgent.expiryTone === "expired"
                                ? "text-[#9ea5ac]"
                                : "text-[#1f2123]"
                            }`}
                          >
                            {urgent.expiry}
                          </span>
                        </td>
                      </tr>
                    );
                  })}

                {/* Expand — click a group → expand sub-rows in the table */}
                {tab === "active" &&
                  listView === "signal" &&
                  groupStyle === "expand" &&
                  activeGroups.flatMap((g) => {
                    const expanded = expandedGroups.has(g.name);
                    const urgent = groupExpiry(g.items);
                    const latest = [...g.items].sort(
                      (a, b) => parseDMY(b.createdOn).getTime() - parseDMY(a.createdOn).getTime(),
                    )[0];

                    const groupTr = (
                      <tr
                        key={g.name}
                        onClick={() => toggleExpand(g.name)}
                        className={`cursor-pointer border-b border-[#1f2123]/10 transition-colors hover:bg-[#f2f6f9]/50 ${
                          expanded ? "bg-[#f2f6f9]/50" : ""
                        }`}
                      >
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <ChevronRight
                              className={`h-4 w-4 shrink-0 text-[#9ea5ac] transition-transform ${
                                expanded ? "rotate-90" : ""
                              }`}
                            />
                            <div className="flex min-w-0 flex-col">
                              <span className="truncate text-sm font-semibold text-[#1f2123]">{g.name}</span>
                              <span className="text-xs text-[#9ea5ac]">
                                {g.items.length} opportunities · same signal
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-3">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {g.items.slice(0, 3).map((c) => (
                                <span
                                  key={c.id}
                                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#e8eef6] text-[10px] font-semibold text-[#193cb8]"
                                >
                                  {c.client
                                    .split(" ")
                                    .map((w) => w[0])
                                    .join("")
                                    .slice(0, 2)}
                                </span>
                              ))}
                              {g.items.length > 3 && (
                                <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#f2f6f9] text-[10px] font-semibold text-[#687178]">
                                  +{g.items.length - 3}
                                </span>
                              )}
                            </div>
                            <span className="text-sm font-medium text-[#1f2123]">{g.items.length}</span>
                          </div>
                        </td>
                        <td className="px-3">
                          <TypeBadge type={g.type} />
                        </td>
                        <td className="px-3">
                          <span className="text-sm tabular-nums text-[#1f2123]">{latest.createdOn}</span>
                        </td>
                        <td className="px-3">
                          <span
                            className={`text-sm ${
                              urgent.expiryTone === "urgent"
                                ? "text-[#d2031b]"
                                : urgent.expiryTone === "expired"
                                ? "text-[#9ea5ac]"
                                : "text-[#1f2123]"
                            }`}
                          >
                            {urgent.expiry}
                          </span>
                        </td>
                        <td className="px-3 text-right">
                          <ActionMenu
                            label="Take action"
                            primary
                            items={[
                              { label: "Generate task for all", onClick: () => bulkTask(g) },
                              { label: "Dismiss all", onClick: () => bulkDismiss(g), destructive: true },
                            ]}
                          />
                        </td>
                      </tr>
                    );

                    if (!expanded) return [groupTr];

                    const clientTrs = g.items.map((c) => (
                      <tr
                        key={c.id}
                        onClick={() => openClient(c, g.name)}
                        className="cursor-pointer border-b border-[#1f2123]/10 bg-white transition-colors hover:bg-[#f2f6f9]/40"
                      >
                        <td className="px-3 py-2.5">
                          <div className="flex flex-col pl-6">
                            <span className="truncate text-sm text-[#1f2123]">{c.name}</span>
                            <span className="truncate text-xs text-[#9ea5ac]">{c.dataPoint}</span>
                          </div>
                        </td>
                        <td className="px-3">
                          <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e8eef6] text-[10px] font-semibold text-[#193cb8]">
                              {c.client
                                .split(" ")
                                .map((w) => w[0])
                                .join("")
                                .slice(0, 2)}
                            </span>
                            <div className="flex min-w-0 flex-col leading-5">
                              <span className="truncate text-sm text-[#1f2123]">{c.client}</span>
                              <span className="truncate text-xs tabular-nums text-[#687178]">{c.account}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-3" />
                        <td className="px-3">
                          <span className="text-sm tabular-nums text-[#687178]">{c.createdOn}</span>
                        </td>
                        <td className="px-3">
                          <span
                            className={`text-sm ${
                              c.expiryTone === "urgent"
                                ? "text-[#d2031b]"
                                : c.expiryTone === "expired"
                                ? "text-[#9ea5ac]"
                                : "text-[#1f2123]"
                            }`}
                          >
                            {c.expiry}
                          </span>
                        </td>
                        <td className="px-3">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              title="Generate message"
                              aria-label="Generate message"
                              onClick={(e) => {
                                e.stopPropagation();
                                rowMessage(c);
                              }}
                              className="flex h-7 w-7 items-center justify-center rounded-md text-[#687178] transition-colors hover:bg-[#f2f6f9] hover:text-[#1f2123]"
                            >
                              <MessageSquareText className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              title="Dismiss"
                              aria-label="Dismiss"
                              onClick={(e) => {
                                e.stopPropagation();
                                rowDismiss(c);
                              }}
                              className="flex h-7 w-7 items-center justify-center rounded-md text-[#687178] transition-colors hover:bg-[#fde8ea] hover:text-[#d2031b]"
                            >
                              <Ban className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ));

                    return [groupTr, ...clientTrs];
                  })}

                {/* ----- Active · Bulk select (flat + checkboxes) ----- */}
                {tab === "active" && listView === "signal" && groupStyle === "select" && activeItems.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-3 py-12 text-center text-sm text-[#687178]">
                      No opportunities match your filters.
                    </td>
                  </tr>
                )}
                {tab === "active" &&
                  listView === "signal" &&
                  groupStyle === "select" &&
                  activeItems.map((o) => {
                    const checked = selectedIds.has(o.id);
                    return (
                      <tr
                        key={o.id}
                        onClick={() => openClient(o)}
                        className={`h-[68px] cursor-pointer border-b border-[#1f2123]/10 last:border-b-0 transition-colors hover:bg-[#f2f6f9]/50 ${
                          checked || (drawerOpen && selected?.id === o.id) ? "bg-[#f2f6f9]" : ""
                        }`}
                      >
                        <td
                          className="py-3 pl-4 pr-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSelect(o.id);
                          }}
                        >
                          <button
                            type="button"
                            aria-label="Select"
                            className={`flex h-4 w-4 items-center justify-center rounded-[4px] border transition-colors ${
                              checked ? "border-[#1f2123] bg-[#1f2123]" : "border-[#dee3e7] bg-white"
                            }`}
                          >
                            {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                          </button>
                        </td>
                        <td className="px-3">
                          <span className="text-sm text-[#1f2123]">{o.name}</span>
                        </td>
                        <td className="px-3">
                          <div className="flex items-center gap-2">
                            <span className="shrink-0 text-[#687178]">
                              {o.accountKind === "portfolio" ? (
                                <Briefcase className="h-4 w-4" strokeWidth={1.75} />
                              ) : (
                                <User className="h-4 w-4" strokeWidth={1.75} />
                              )}
                            </span>
                            <div className="flex flex-col gap-1 leading-5">
                              <span className="truncate text-sm text-[#1f2123]">{o.client}</span>
                              <span className="truncate text-sm tabular-nums text-[#687178]">{o.account}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-3">
                          <span className="text-sm tabular-nums text-[#1f2123]">{o.createdOn}</span>
                        </td>
                        <td className="px-3">
                          <span
                            className={`text-sm ${
                              o.expiryTone === "urgent"
                                ? "text-[#d2031b]"
                                : o.expiryTone === "expired"
                                ? "text-[#9ea5ac]"
                                : "text-[#1f2123]"
                            }`}
                          >
                            {o.expiry}
                          </span>
                        </td>
                        <td className="px-3">
                          <TypeBadge type={o.type} />
                        </td>
                      </tr>
                    );
                  })}

                {/* ----- Active · By client (flat, 1 row per client) ----- */}
                {tab === "active" && listView === "client" && activeItems.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-3 py-12 text-center text-sm text-[#687178]">
                      No opportunities match your filters.
                    </td>
                  </tr>
                )}
                {tab === "active" &&
                  listView === "client" &&
                  activeItems.map((o) => (
                    <tr
                      key={o.id}
                      onClick={() => openClient(o)}
                      className={`h-[68px] cursor-pointer border-b border-[#1f2123]/10 last:border-b-0 transition-colors hover:bg-[#f2f6f9]/50 ${
                        drawerOpen && selected?.id === o.id ? "bg-[#f2f6f9]" : ""
                      }`}
                    >
                      <td className="px-3">
                        <span className="text-sm text-[#1f2123]">{o.name}</span>
                      </td>
                      <td className="px-3">
                        <div className="flex items-center gap-2">
                          <span className="shrink-0 text-[#687178]">
                            {o.accountKind === "portfolio" ? (
                              <Briefcase className="h-4 w-4" strokeWidth={1.75} />
                            ) : (
                              <User className="h-4 w-4" strokeWidth={1.75} />
                            )}
                          </span>
                          <div className="flex flex-col gap-1 leading-5">
                            <span className="truncate text-sm text-[#1f2123]">{o.client}</span>
                            <span className="truncate text-sm tabular-nums text-[#687178]">{o.account}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3">
                        <span className="text-sm tabular-nums text-[#1f2123]">{o.createdOn}</span>
                      </td>
                      <td className="px-3">
                        <span
                          className={`text-sm ${
                            o.expiryTone === "urgent"
                              ? "text-[#d2031b]"
                              : o.expiryTone === "expired"
                              ? "text-[#9ea5ac]"
                              : "text-[#1f2123]"
                          }`}
                        >
                          {o.expiry}
                        </span>
                      </td>
                      <td className="px-3">
                        <TypeBadge type={o.type} />
                      </td>
                    </tr>
                  ))}

                {/* ----- Actioned: per client ----- */}
                {tab === "actioned" && actionedRows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-3 py-12 text-center text-sm text-[#687178]">
                      No actioned opportunities yet.
                    </td>
                  </tr>
                )}
                {tab === "actioned" &&
                  actionedRows.map((o) => {
                    const rec = actioned[o.id];
                    return (
                      <tr
                        key={o.id}
                        onClick={() => openClient(o)}
                        className={`h-[68px] cursor-pointer border-b border-[#1f2123]/10 last:border-b-0 transition-colors hover:bg-[#f2f6f9]/50 ${
                          drawerOpen && selected?.id === o.id ? "bg-[#f2f6f9]" : ""
                        }`}
                      >
                        <td className="px-3">
                          <span className="text-sm text-[#1f2123]">{o.name}</span>
                        </td>
                        <td className="px-3">
                          <div className="flex items-center gap-2">
                            <span className="shrink-0 text-[#687178]">
                              {o.accountKind === "portfolio" ? (
                                <Briefcase className="h-4 w-4" strokeWidth={1.75} />
                              ) : (
                                <User className="h-4 w-4" strokeWidth={1.75} />
                              )}
                            </span>
                            <div className="flex flex-col gap-1 leading-5">
                              <span className="truncate text-sm text-[#1f2123]">{o.client}</span>
                              <span className="truncate text-sm tabular-nums text-[#687178]">{o.account}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-3">
                          <TypeBadge type={o.type} />
                        </td>
                        <td className="px-3">
                          <span className="text-sm tabular-nums text-[#1f2123]">{o.createdOn}</span>
                        </td>
                        <td className="px-3">
                          <div className="flex flex-col items-start gap-1">
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                                ACTION_META[rec.action]?.className ?? "bg-[#f2f6f9] text-[#687178]"
                              }`}
                            >
                              {ACTION_META[rec.action]?.label ?? rec.action}
                            </span>
                            {rec.reason && <span className="truncate text-xs text-[#9ea5ac]">{rec.reason}</span>}
                          </div>
                        </td>
                        <td className="px-3">
                          <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1f2123] text-[10px] font-semibold text-white">
                              {rec.by
                                .split(" ")
                                .map((w) => w[0])
                                .join("")
                                .slice(0, 2)}
                            </span>
                            <span className="truncate text-sm text-[#1f2123]">{rec.by}</span>
                          </div>
                        </td>
                        <td className="px-3">
                          <span className="text-sm tabular-nums text-[#1f2123]">{formatDMY(rec.at)}</span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#687178]">Rows per page</span>
                <div className="relative">
                  <select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="h-8 appearance-none rounded-md border border-[#dee3e7] bg-white pl-3 pr-8 text-sm text-[#1f2123] shadow-[0_1px_2px_0_#0000000d] focus:outline-none"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <ChevronsUpDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9ea5ac]" />
                </div>
              </div>

              <div className="flex items-center gap-1">
                <PageBtn disabled><ChevronsLeft className="h-4 w-4" /></PageBtn>
                <PageBtn disabled>
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>Prev</span>
                </PageBtn>
                <PageBtn>
                  <span>Next</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </PageBtn>
                <PageBtn><ChevronsRight className="h-4 w-4" /></PageBtn>
              </div>
            </div>
          </div>
        </main>
      </div>

      <GroupDrawer
        group={selectedGroup}
        open={groupOpen}
        onClose={() => setGroupOpen(false)}
        onOpenClient={(c) => openClient(c, selectedGroup?.name ?? null)}
        onBulkDismiss={() => selectedGroup && bulkDismiss(selectedGroup)}
        onBulkTask={() => selectedGroup && bulkTask(selectedGroup)}
      />
      <OpportunityDrawer
        opp={selected}
        record={selected ? actioned[selected.id] ?? null : null}
        open={drawerOpen}
        parentName={clientParent}
        onBack={() => setDrawerOpen(false)}
        onClose={() => {
          setDrawerOpen(false);
          if (clientParent) setGroupOpen(false);
        }}
        onGenerateMessage={() => setMsgOpen(true)}
        onDismiss={() =>
          selected && setDismissTarget({ ids: [selected.id], title: selected.name, subtitle: selected.client })
        }
      />
      <GenerateMessageModal
        opp={selected}
        open={msgOpen}
        onClose={() => setMsgOpen(false)}
        onCreateTask={handleCreateTask}
      />
      <AddTaskDrawer
        opp={selected}
        description={taskDescription}
        open={taskOpen}
        onClose={() => setTaskOpen(false)}
        onSave={handleSaveTask}
      />
      <SuccessToast
        open={toastOpen}
        title={toastContent.title}
        description={toastContent.description}
        onClose={() => setToastOpen(false)}
      />
      <DismissModal target={dismissTarget} onClose={() => setDismissTarget(null)} onConfirm={handleDismiss} />

      {tab === "active" && listView === "signal" && (
        <TweaksPanel value={groupStyle} onChange={setGroupStyle} />
      )}
      <FilterDialog
        open={filterOpen}
        initial={filters}
        onClose={() => setFilterOpen(false)}
        onApply={(f) => {
          setFilters(f);
          setFilterOpen(false);
        }}
      />
    </div>
  );
}

function PageBtn({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      disabled={disabled}
      className="inline-flex h-7 items-center gap-1 rounded-md border border-[#dee3e7] bg-white px-2.5 text-sm font-medium text-[#1f2123] shadow-[0_1px_2px_0_#0000000d] enabled:hover:bg-[#f2f6f9] disabled:cursor-not-allowed disabled:text-[#9ea5ac] disabled:opacity-60"
    >
      {children}
    </button>
  );
}
