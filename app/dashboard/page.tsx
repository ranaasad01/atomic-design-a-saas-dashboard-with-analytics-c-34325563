"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, CheckCircle, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS, ChartPeriod } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mrrData = [
  { month: "Jan", mrr: 28400, users: 1120 },
  { month: "Feb", mrr: 31200, users: 1240 },
  { month: "Mar", mrr: 33800, users: 1380 },
  { month: "Apr", mrr: 36100, users: 1490 },
  { month: "May", mrr: 38700, users: 1620 },
  { month: "Jun", mrr: 41500, users: 1780 },
  { month: "Jul", mrr: 43200, users: 1890 },
  { month: "Aug", mrr: 46800, users: 2040 },
  { month: "Sep", mrr: 49100, users: 2190 },
  { month: "Oct", mrr: 51400, users: 2340 },
  { month: "Nov", mrr: 53900, users: 2510 },
  { month: "Dec", mrr: 57200, users: 2680 },
];

const weeklySignups = [
  { week: "W1 Nov", signups: 142, churned: 18 },
  { week: "W2 Nov", signups: 168, churned: 22 },
  { week: "W3 Nov", signups: 155, churned: 15 },
  { week: "W4 Nov", signups: 191, churned: 20 },
  { week: "W1 Dec", signups: 204, churned: 17 },
  { week: "W2 Dec", signups: 223, churned: 24 },
  { week: "W3 Dec", signups: 198, churned: 19 },
  { week: "W4 Dec", signups: 241, churned: 21 },
];

const transactions = [
  {
    id: "TXN-8821",
    customer: "Acme Corp",
    email: "billing@acme.io",
    plan: "Enterprise",
    amount: 1299,
    status: "paid",
    date: "Dec 28, 2024",
  },
  {
    id: "TXN-8820",
    customer: "Notion Labs",
    email: "finance@notion.so",
    plan: "Pro",
    amount: 299,
    status: "paid",
    date: "Dec 27, 2024",
  },
  {
    id: "TXN-8819",
    customer: "Stripe Inc",
    email: "accounts@stripe.com",
    plan: "Enterprise",
    amount: 1299,
    status: "pending",
    date: "Dec 27, 2024",
  },
  {
    id: "TXN-8818",
    customer: "Linear App",
    email: "billing@linear.app",
    plan: "Pro",
    amount: 299,
    status: "paid",
    date: "Dec 26, 2024",
  },
  {
    id: "TXN-8817",
    customer: "Vercel Inc",
    email: "finance@vercel.com",
    plan: "Starter",
    amount: 49,
    status: "failed",
    date: "Dec 26, 2024",
  },
  {
    id: "TXN-8816",
    customer: "Figma Design",
    email: "billing@figma.com",
    plan: "Pro",
    amount: 299,
    status: "paid",
    date: "Dec 25, 2024",
  },
  {
    id: "TXN-8815",
    customer: "Loom Video",
    email: "accounts@loom.com",
    plan: "Starter",
    amount: 49,
    status: "paid",
    date: "Dec 25, 2024",
  },
];

const kpiCards = [
  {
    label: "Total Revenue",
    value: "$687,400",
    change: 18.4,
    icon: DollarSign,
    color: "from-indigo-500 to-violet-600",
    glow: "shadow-indigo-500/20",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    textColor: "text-indigo-400",
  },
  {
    label: "Monthly Recurring Revenue",
    value: "$57,200",
    change: 6.1,
    icon: TrendingUp,
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    textColor: "text-violet-400",
  },
  {
    label: "Active Users",
    value: "2,680",
    change: 12.7,
    icon: Users,
    color: "from-cyan-500 to-teal-600",
    glow: "shadow-cyan-500/20",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    textColor: "text-cyan-400",
  },
  {
    label: "Churn Rate",
    value: "1.84%",
    change: -0.3,
    icon: Activity,
    color: "from-emerald-500 to-green-600",
    glow: "shadow-emerald-500/20",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    textColor: "text-emerald-400",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const statusConfig: Record<
  string,
  { label: string; icon: React.ElementType; classes: string }
> = {
  paid: {
    label: "Paid",
    icon: CheckCircle,
    classes: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    classes: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  failed: {
    label: "Failed",
    icon: AlertCircle,
    classes: "text-red-400 bg-red-500/10 border-red-500/20",
  },
};

const planBadgeClasses: Record<string, string> = {
  Enterprise: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  Pro: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  Starter: "text-slate-400 bg-slate-500/10 border-slate-500/20",
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-3 shadow-2xl shadow-slate-950/60">
      <p className="text-xs font-semibold text-slate-400 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="font-semibold text-white">
            {entry.name === "mrr"
              ? `$${(entry.value ?? 0).toLocaleString()}`
              : (entry.value ?? 0).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const shouldReduce = useReducedMotion();
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>("1y");
  const [activeTab, setActiveTab] = useState<"mrr" | "users">("mrr");

  const periods: { label: string; value: ChartPeriod }[] = [
    { label: "7D", value: "7d" },
    { label: "30D", value: "30d" },
    { label: "90D", value: "90d" },
    { label: "1Y", value: "1y" },
  ];

  // Slice data based on period selection
  const slicedMrr =
    chartPeriod === "7d"
      ? mrrData.slice(-2)
      : chartPeriod === "30d"
      ? mrrData.slice(-4)
      : chartPeriod === "90d"
      ? mrrData.slice(-6)
      : mrrData;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Page header */}
      <div className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            variants={shouldReduce ? {} : fadeIn}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Dashboard Overview
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Welcome back — here&apos;s what&apos;s happening with Pulse
                Analytics today.
              </p>
            </div>
            <motion.button
              whileHover={shouldReduce ? {} : { scale: 1.03 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors duration-200 shadow-lg shadow-indigo-500/20 self-start sm:self-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ── KPI Cards ── */}
        <motion.div
          variants={shouldReduce ? {} : staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            const isChurn = card.label === "Churn Rate";
            // For churn, a negative change is good
            const isGood = isChurn ? !isPositive : isPositive;
            return (
              <motion.div
                key={card.label}
                variants={shouldReduce ? {} : scaleIn}
                whileHover={
                  shouldReduce ? {} : { y: -4, transition: { duration: 0.2 } }
                }
                className={`relative overflow-hidden rounded-2xl border ${card.border} bg-slate-900/60 backdrop-blur-sm p-5 shadow-xl ${card.glow}`}
              >
                {/* Glow orb */}
                <div
                  className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${card.color} opacity-10 blur-2xl pointer-events-none`}
                />
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl ${card.bg} border ${card.border} flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 ${card.textColor}`} />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border ${
                      isGood
                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                        : "text-red-400 bg-red-500/10 border-red-500/20"
                    }`}
                  >
                    {isGood ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(card.change)}%
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-400 mb-1">
                  {card.label}
                </p>
                <p className="text-2xl font-bold tracking-tight text-white">
                  {card.value}
                </p>
                <p className="text-xs text-slate-500 mt-1">vs. last month</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* MRR Line Chart */}
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="xl:col-span-2 rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-6 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">
                  MRR Growth
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Monthly recurring revenue over time
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Tab toggle */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-800/60 border border-slate-700/40">
                  {(["mrr", "users"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                        activeTab === tab
                          ? "bg-indigo-600 text-white shadow"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {tab === "mrr" ? "MRR" : "Users"}
                    </button>
                  ))}
                </div>
                {/* Period selector */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-800/60 border border-slate-700/40">
                  {periods.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setChartPeriod(p.value)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                        chartPeriod === p.value
                          ? "bg-indigo-600 text-white shadow"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart
                data={slicedMrr}
                margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={BRAND_COLORS.primary}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={BRAND_COLORS.primary}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) =>
                    activeTab === "mrr"
                      ? `$${(v / 1000).toFixed(0)}k`
                      : `${(v / 1000).toFixed(1)}k`
                  }
                  width={48}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey={activeTab}
                  stroke={
                    activeTab === "mrr"
                      ? BRAND_COLORS.primary
                      : BRAND_COLORS.secondary
                  }
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill:
                      activeTab === "mrr"
                        ? BRAND_COLORS.primary
                        : BRAND_COLORS.secondary,
                    strokeWidth: 2,
                    stroke: "#0f172a",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Weekly Signups Bar Chart */}
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-6 shadow-xl"
          >
            <div className="mb-6">
              <h2 className="text-base font-semibold text-white">
                Weekly Signups
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                New vs. churned users per week
              </p>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={weeklySignups}
                margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                barCategoryGap="30%"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="week"
                  tick={{ fill: "#64748b", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={32}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }}
                  iconType="circle"
                  iconSize={8}
                />
                <Bar
                  dataKey="signups"
                  fill={BRAND_COLORS.primary}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={28}
                />
                <Bar
                  dataKey="churned"
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* ── Recent Transactions Table ── */}
        <motion.div
          variants={shouldReduce ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm shadow-xl overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-5 border-b border-slate-800/50">
            <div>
              <h2 className="text-base font-semibold text-white">
                Recent Transactions
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Latest billing activity across all plans
              </p>
            </div>
            <motion.button
              whileHover={shouldReduce ? {} : { scale: 1.03 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-600 text-xs font-medium transition-colors duration-200 self-start sm:self-auto"
            >
              View all transactions
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800/50">
                  {["Transaction", "Customer", "Plan", "Amount", "Status", "Date"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <motion.tbody
                variants={shouldReduce ? {} : staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {(transactions ?? []).map((tx) => {
                  const status = statusConfig[tx.status] ?? statusConfig["paid"];
                  const StatusIcon = status.icon;
                  const planClass =
                    planBadgeClasses[tx.plan] ?? planBadgeClasses["Starter"];
                  return (
                    <motion.tr
                      key={tx.id}
                      variants={shouldReduce ? {} : fadeInUp}
                      whileHover={
                        shouldReduce
                          ? {}
                          : {
                              backgroundColor: "rgba(99,102,241,0.04)",
                              transition: { duration: 0.15 },
                            }
                      }
                      className="border-b border-slate-800/30 last:border-0 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 text-xs font-mono text-slate-400">
                        {tx.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">
                          {tx.customer}
                        </div>
                        <div className="text-xs text-slate-500">{tx.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-medium ${planClass}`}
                        >
                          {tx.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">
                        ${(tx.amount ?? 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${status.classes}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {tx.date}
                      </td>
                    </motion.tr>
                  );
                })}
              </motion.tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="sm:hidden divide-y divide-slate-800/40">
            {(transactions ?? []).map((tx) => {
              const status = statusConfig[tx.status] ?? statusConfig["paid"];
              const StatusIcon = status.icon;
              const planClass =
                planBadgeClasses[tx.plan] ?? planBadgeClasses["Starter"];
              return (
                <motion.div
                  key={tx.id}
                  variants={shouldReduce ? {} : fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="px-4 py-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">
                      {tx.id}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${status.classes}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {tx.customer}
                      </p>
                      <p className="text-xs text-slate-500">{tx.email}</p>
                    </div>
                    <p className="text-sm font-bold text-white">
                      ${(tx.amount ?? 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-medium ${planClass}`}
                    >
                      {tx.plan}
                    </span>
                    <span className="text-xs text-slate-500">{tx.date}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Bottom Stats Row ── */}
        <motion.div
          variants={shouldReduce ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            {
              label: "Avg. Revenue Per User",
              value: "$21.34",
              sub: "Up from $19.80 last month",
              positive: true,
            },
            {
              label: "Trial Conversion Rate",
              value: "34.2%",
              sub: "Industry avg. is 25%",
              positive: true,
            },
            {
              label: "Support Tickets Open",
              value: "12",
              sub: "3 high priority",
              positive: false,
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={shouldReduce ? {} : scaleIn}
              whileHover={
                shouldReduce ? {} : { y: -3, transition: { duration: 0.2 } }
              }
              className="rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-5 shadow-lg"
            >
              <p className="text-xs font-medium text-slate-400 mb-2">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p
                className={`text-xs flex items-center gap-1 ${
                  stat.positive ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                {stat.positive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}