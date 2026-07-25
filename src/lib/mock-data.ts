/** Mock intelligence data for the Xai dashboard preview. */

export type TrendPoint = { t: string; value: number; baseline: number };

export const insightTrend: TrendPoint[] = [
  { t: "Mon", value: 42, baseline: 38 },
  { t: "Tue", value: 55, baseline: 40 },
  { t: "Wed", value: 48, baseline: 42 },
  { t: "Thu", value: 71, baseline: 45 },
  { t: "Fri", value: 83, baseline: 50 },
  { t: "Sat", value: 76, baseline: 52 },
  { t: "Sun", value: 92, baseline: 55 },
];

export const throughputBars: TrendPoint[] = [
  { t: "00", value: 18, baseline: 22 },
  { t: "04", value: 12, baseline: 18 },
  { t: "08", value: 47, baseline: 34 },
  { t: "12", value: 88, baseline: 52 },
  { t: "16", value: 64, baseline: 58 },
  { t: "20", value: 39, baseline: 44 },
];

export type Kpi = {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  spark: number[];
};

export const kpis: Kpi[] = [
  {
    label: "Insights generated",
    value: "1,284",
    delta: "+12.4%",
    positive: true,
    spark: [20, 28, 24, 40, 38, 56, 64, 72],
  },
  {
    label: "Active automations",
    value: "37",
    delta: "+4",
    positive: true,
    spark: [12, 14, 13, 18, 22, 24, 30, 37],
  },
  {
    label: "Avg. latency",
    value: "248ms",
    delta: "-18ms",
    positive: true,
    spark: [60, 54, 52, 48, 44, 40, 36, 33],
  },
  {
    label: "Data sources",
    value: "9",
    delta: "+2",
    positive: true,
    spark: [4, 4, 5, 5, 6, 7, 8, 9],
  },
];

export type InsightRow = {
  id: string;
  title: string;
  source: string;
  confidence: number;
  status: "shipped" | "reviewing" | "draft";
  impact: "high" | "medium" | "low";
  updated: string;
};

export const insightRows: InsightRow[] = [
  {
    id: "INS-2041",
    title: "Churn risk concentrated in Q3 enterprise cohort",
    source: "Warehouse · Stripe",
    confidence: 94,
    status: "shipped",
    impact: "high",
    updated: "2m ago",
  },
  {
    id: "INS-2038",
    title: "Activation lift when onboarding ≤ 3 steps",
    source: "Product · Amplitude",
    confidence: 88,
    status: "reviewing",
    impact: "high",
    updated: "11m ago",
  },
  {
    id: "INS-2035",
    title: "Pricing page drop-off at second scroll fold",
    source: "Web · GA4",
    confidence: 81,
    status: "reviewing",
    impact: "medium",
    updated: "34m ago",
  },
  {
    id: "INS-2030",
    title: "Support load spikes 2h after release window",
    source: "Tickets · Zendesk",
    confidence: 76,
    status: "draft",
    impact: "medium",
    updated: "1h ago",
  },
  {
    id: "INS-2024",
    title: "Inventory drift correlates with promo density",
    source: "Ops · Snowflake",
    confidence: 69,
    status: "draft",
    impact: "low",
    updated: "3h ago",
  },
];

export type Automation = {
  name: string;
  trigger: string;
  action: string;
  runs: number;
  success: number;
  active: boolean;
};

export const automations: Automation[] = [
  {
    name: "Churn guard",
    trigger: "Churn risk ≥ 80",
    action: "Notify CS + open task",
    runs: 1284,
    success: 99.2,
    active: true,
  },
  {
    name: "Pricing optimizer",
    trigger: "Drop-off spike",
    action: "A/B test variant",
    runs: 412,
    success: 96.8,
    active: true,
  },
  {
    name: "Release monitor",
    trigger: "Support load +120%",
    action: "Page on-call + rollback",
    runs: 96,
    success: 100,
    active: true,
  },
  {
    name: "Inventory rebalance",
    trigger: "Drift > 2σ",
    action: "Reorder forecast",
    runs: 538,
    success: 94.1,
    active: false,
  },
];

export const flowStages = [
  {
    index: "01",
    key: "ingest",
    title: "Ingest",
    subtitle: "Raw data, every source",
    description:
      "Streams from warehouses, product events, and external APIs land in a unified schema — schema-aware, time-aligned, and continuously synced.",
    metric: "9 sources · 4.2B rows",
  },
  {
    index: "02",
    key: "analyze",
    title: "Analyze",
    subtitle: "Models find the signal",
    description:
      "Xai runs statistical baselines, anomaly detection, and causal models in parallel — surfacing only the changes that matter, ranked by impact.",
    metric: "248ms p50",
  },
  {
    index: "03",
    key: "generate",
    title: "Generate",
    subtitle: "Insight, then action",
    description:
      "Each finding becomes a structured insight with confidence, evidence, and a recommended next step — ready to review or automate.",
    metric: "1,284 insights / wk",
  },
] as const;

export type DataSource = {
  name: string;
  type: string;
  status: "healthy" | "syncing" | "warning";
  rows: string;
  lastSync: string;
  health: number;
};

export const dataSources: DataSource[] = [
  { name: "Snowflake Warehouse", type: "Warehouse", status: "healthy", rows: "4.2B", lastSync: "2s ago", health: 99 },
  { name: "Stripe", type: "Billing", status: "healthy", rows: "128M", lastSync: "5s ago", health: 98 },
  { name: "Amplitude", type: "Product", status: "syncing", rows: "2.1B", lastSync: "now", health: 95 },
  { name: "GA4", type: "Web", status: "healthy", rows: "890M", lastSync: "12s ago", health: 97 },
  { name: "Zendesk", type: "Support", status: "warning", rows: "12M", lastSync: "3m ago", health: 82 },
  { name: "Segment", type: "Event", status: "healthy", rows: "1.8B", lastSync: "1s ago", health: 99 },
];


/* ------------------------------------------------------------------ */
/*  Admin prototype data                                               */
/* ------------------------------------------------------------------ */

export type AccessRequest = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  useCase: string;
  status: "pending" | "approved" | "invited" | "declined";
  submittedAt: string;
};

export const accessRequests: AccessRequest[] = [
  { id: "REQ-1042", name: "Maya Chen", email: "maya.chen@northwind.io", company: "Northwind Analytics", role: "Head of Data", useCase: "Warehouse anomaly detection for finance cohort", status: "pending", submittedAt: "12m ago" },
  { id: "REQ-1041", name: "David Okafor", email: "d.okafor@brightline.co", company: "Brightline", role: "VP Engineering", useCase: "Product analytics + churn automation", status: "pending", submittedAt: "1h ago" },
  { id: "REQ-1039", name: "Sara Lindqvist", email: "sara@kaptur.se", company: "Kaptur", role: "Data Lead", useCase: "Replace 6 dashboards with one workspace", status: "approved", submittedAt: "3h ago" },
  { id: "REQ-1037", name: "Tom Reyes", email: "tom@altavista.ai", company: "Altavista AI", role: "CTO", useCase: "Causal inference on marketing mix", status: "invited", submittedAt: "6h ago" },
  { id: "REQ-1034", name: "Priya Nair", email: "priya@summitfin.com", company: "Summit Financial", role: "Director of Insights", useCase: "Risk signal automation for trading desk", status: "approved", submittedAt: "1d ago" },
  { id: "REQ-1030", name: "Lukas Brandt", email: "lukas@meridian.de", company: "Meridian GmbH", role: "Product Manager", useCase: "Activation funnel optimization", status: "declined", submittedAt: "2d ago" },
];

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member" | "viewer";
  status: "active" | "invited" | "suspended";
  lastActive: string;
  insights: number;
};

export const adminUsers: AdminUser[] = [
  { id: "U-201", name: "Ava Reyes", email: "ava@xai.app", role: "admin", status: "active", lastActive: "now", insights: 284 },
  { id: "U-198", name: "Marcus Webb", email: "marcus@northwind.io", role: "member", status: "active", lastActive: "4m ago", insights: 142 },
  { id: "U-187", name: "Sara Lindqvist", email: "sara@kaptur.se", role: "member", status: "active", lastActive: "1h ago", insights: 98 },
  { id: "U-176", name: "David Okafor", email: "d.okafor@brightline.co", role: "viewer", status: "invited", lastActive: "—", insights: 0 },
  { id: "U-164", name: "Priya Nair", email: "priya@summitfin.com", role: "member", status: "active", lastActive: "3h ago", insights: 211 },
  { id: "U-150", name: "Tom Reyes", email: "tom@altavista.ai", role: "viewer", status: "suspended", lastActive: "2d ago", insights: 12 },
];

export type ActivityEvent = {
  id: string;
  type: "insight" | "automation" | "user" | "source";
  message: string;
  actor: string;
  time: string;
};

export const activityFeed: ActivityEvent[] = [
  { id: "E-5012", type: "insight", message: "New insight INS-2041 shipped to Churn guard", actor: "Ava Reyes", time: "2m ago" },
  { id: "E-5011", type: "automation", message: "Pricing optimizer ran 412 times (96.8% success)", actor: "system", time: "14m ago" },
  { id: "E-5010", type: "user", message: "Sara Lindqvist accepted invite", actor: "Sara Lindqvist", time: "38m ago" },
  { id: "E-5009", type: "source", message: "Snowflake sync completed (4.2B rows)", actor: "system", time: "1h ago" },
  { id: "E-5008", type: "insight", message: "INS-2038 moved to reviewing", actor: "Marcus Webb", time: "2h ago" },
  { id: "E-5007", type: "automation", message: "Release monitor triggered rollback", actor: "system", time: "3h ago" },
];

export const NAV_LINKS = [
  { label: "Flow", href: "#flow" },
  { label: "Workspace", href: "#workspace" },
  { label: "Core", href: "#core" },
  { label: "Automations", href: "#automations" },
] as const;

export const FOOTER_LINKS = [
  { label: "Flow", href: "#flow" },
  { label: "Workspace", href: "#workspace" },
  { label: "Core", href: "#core" },
  { label: "Automations", href: "#automations" },
] as const;
