export const APP_NAME = "Pulse Analytics";
export const APP_TAGLINE = "Clarity in every metric.";
export const APP_DESCRIPTION =
  "The modern analytics platform that turns your SaaS data into actionable growth insights.";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Analytics", href: "/analytics" },
  { label: "Users", href: "/users" },
  { label: "Revenue", href: "/revenue" },
  { label: "Settings", href: "/settings" },
];

export const footerLinks: { section: string; links: NavLink[] }[] = [
  {
    section: "Product",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Analytics", href: "/analytics" },
      { label: "Revenue", href: "/revenue" },
      { label: "Users", href: "/users" },
    ],
  },
  {
    section: "Account",
    links: [
      { label: "Settings", href: "/settings" },
      { label: "Sign In", href: "/sign-in" },
    ],
  },
  {
    section: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

export interface KpiCard {
  label: string;
  value: string;
  change: number;
  unit?: string;
}

export type ChartPeriod = "7d" | "30d" | "90d" | "1y";

export const BRAND_COLORS = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  dark: "#1e1b4b",
  light: "#f8fafc",
  border: "#e2e8f0",
  chartColors: [
    "#6366f1",
    "#8b5cf6",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
  ],
} as const;