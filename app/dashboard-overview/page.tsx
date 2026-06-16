"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
} from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ShoppingCart, ArrowUpRight, ArrowDownRight, MoreHorizontal, Eye, Download, RefreshCw, Calendar, Filter, Bell, CheckCircle, AlertCircle, Clock, Star } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const kpiCards = [
  {
    id: "mrr",
    label: "Monthly Recurring Revenue",
    value: "$52,840",
    rawValue: 52840,
    change: 12.4,
    icon: DollarSign,
    color: "#6366f1",
    bg: "from-indigo-500/20 to-indigo-600/5",
    border: "border-indigo-500/20",
  },
  {
    id: "users",
    label: "Active Users",
    value: "14,382",
    rawValue: 14382,
    change: 8.1,
    icon: Users,
    color: "#8b5cf6",
    bg: "from-violet-500/20 to-violet-600/5",
    border: "border-violet-500/20",
  },
  {
    id: "churn",
    label: "Churn Rate",
    value: "1.8%",
    rawValue: 1.8,
    change: -0.4,
    icon: Activity,
    color: "#10b981",
    bg: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-500/20",
    invertChange: true,
  },
  {
    id: "orders",
    label: "New Subscriptions",
    value: "1,204",
    rawValue: 1204,
    change: 5.7,
    icon: ShoppingCart,
    color: "#06b6d4",
    bg: "from-cyan-500/20 to-cyan-600/5",
    border: "border-cyan-500/20",
  },
];

const revenueData = [
  { month: "Jan", mrr: 38200, arr: 458400, newBiz: 12000 },
  { month: "Feb", mrr: 40100, arr: 481200, newBiz: 13500 },
  { month: "Mar", mrr: 41800, arr: 501600, newBiz: 11200 },
  { month: "Apr", mrr: 43500, arr: 522000, newBiz: 14800 },
  { month: "May", mrr: 45200, arr: 542400, newBiz: 16100 },
  { month: "Jun", mrr: 46900, arr: 562800, newBiz: 13700 },
  { month: "Jul", mrr: 48100, arr: 577200, newBiz: 15400 },
  { month: "Aug", mrr: 49600, arr: 595200, newBiz: 17200 },
  { month: "Sep", mrr: 50800, arr: 609600, newBiz: 14900 },
  { month: "Oct", mrr: 51400, arr: 616800, newBiz: 16600 },
  { month: "Nov", mrr: 52100, arr: 625200, newBiz: 18300 },
  { month: "Dec", mrr: 52840, arr: 634080, newBiz: 19100 },
];

const userGrowthData = [
  { week: "W1", signups: 320, active: 8200, churned: 45 },
  { week: "W2", signups: 410, active: 8540, churned: 38 },
  { week: "W3", signups: 380, active: 8870, churned: 52 },
  { week: "W4", signups: 490, active: 9280, churned: 41 },
  { week: "W5", signups: 520, active: 9740, churned: 36 },
  { week: "W6", signups: 460, active: 10140, churned: 48 },
  { week: "W7", signups: 610, active: 10680, churned: 33 },
  { week: "W8", signups: 580, active: 11200, churned: 44 },
  { week: "W9", signups: 640, active: 11790, churned: 29 },
  { week: "W10", signups: 720, active: 12460, churned: 37 },
  { week: "W11", signups: 810, active: 13210, churned: 31 },
  { week: "W12", signups: 890, active: 14382, churned: 28 },
];

const planDistribution = [
  { name: "Starter", value: 38, color: "#6366f1" },
  { name: "Growth", value: 31, color: "#8b5cf6" },
  { name: "Pro", value: 21, color: "#06b6d4" },
  { name: "Enterprise", value: 10, color: "#10b981" },
];

const recentTransactions = [
  {
    id: "txn-001",
    customer: "Acme Corp",
    plan: "Enterprise",
    amount: 2400,
    status: "paid",
    date: "Dec 28",
    avatar: "AC",
    avatarColor: "bg-indigo-500",
  },
  {
    id: "txn-002",
    customer: "Bright Labs",
    plan: "Pro",
    amount: 490,
    status: "paid",
    date: "Dec 27",
    avatar: "BL",
    avatarColor: "bg-violet-500",
  },
  {
    id: "txn-003",
    customer: "Nova Systems",
    plan: "Growth",
    amount: 199,
    status: "pending",
    date: "Dec 27",
    avatar: "NS",
    avatarColor: "bg-cyan-500",
  },
  {
    id: "txn-004",
    customer: "Orbit Digital",
    plan: "Starter",
    amount: 49,
    status: "paid",
    date: "Dec 26",
    avatar: "OD",
    avatarColor: "bg-emerald-500",
  },
  {
    id: "txn-005",
    customer: "Flux Media",
    plan: "Pro",
    amount: 490,
    status: "failed",
    date: "Dec 26",
    avatar: "FM",
    avatarColor: "bg-amber-500",
  },
  {
    id: "txn-006",
    customer: "Zenith Cloud",
    plan: "Enterprise",
    amount: 2400,
    status: "paid",
    date: "Dec 25",
    avatar: "ZC",
    avatarColor: "bg-rose-500",
  },
];

const topFeatures = [
  { name: "Analytics Dashboard", usage: 94, trend: 3.2 },
  { name: "User Segmentation", usage: 78, trend: 7.8 },
  { name: "Revenue Reports", usage: 71, trend: 2.1 },
  { name: "API Integrations", usage: 63, trend: 12.4 },
  { name: "Custom Alerts", usage: 55, trend: -1.3 },
];

const activityFeed = [
  {
    id: 1,
    type: "success",
    message: "Revenue milestone: $52k MRR reached",
    time: "2 min ago",
    icon: Star,
  },
  {
    id: 2,
    type: "info",
    message: "New enterprise signup: Acme Corp",
    time: "18 min ago",
    icon: Users,
  },
  {
    id: 3,
    type: "warning",
    message: "Flux Media payment failed — retry scheduled",
    time: "1 hr ago",
    icon: AlertCircle,
  },
  {
    id: 4,
    type: "success",
    message: "Churn rate dropped to 1.8% this month",
    time: "3 hr ago",
    icon: TrendingDown,
  },
  {
    id: 5,
    type: "info",
    message: "API usage spike detected — 2.4× normal",
    time: "5 hr ago",
    icon: Activity,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

type Period = "7d" | "30d" | "90d" | "1y";

function PeriodSelector({
  value,
  onChange,
}: {
  value: Period;
  onChange: (p: Period) => void;
}) {
  const options: Period[] = ["7d", "30d", "90d", "1y"];
  return (
    <div className="flex items-center gap-1 bg-slate-800/60 rounded-lg p-1 border border-slate-700/40">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
            value === opt
              ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    failed: "bg-rose-500/15 text-rose-400 border-rose-500/25",
  };
  const cls = map[status] ?? "bg-slate-500/15 text-slate-400 border-slate-500/25";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border capitalize ${cls}`}
    >
      {status}
    </span>
  );
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-3 shadow-xl shadow-slate-950/50 text-sm">
      <p className="text-slate-400 text-xs mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: entry.color }}
          />
          <span className="text-slate-300 text-xs">{entry.name}:</span>
          <span className="text-white text-xs font-semibold">
            {typeof entry.value === "number"
              ? entry.value >= 1000
                ? `$${(entry.value / 1000).toFixed(1)}k`
                : entry.value.toLocaleString()
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardOverviewPage() {
  const shouldReduce = useReducedMotion();
  const [revPeriod, setRevPeriod] = useState<Period>("1y");
  const [userPeriod, setUserPeriod] = useState<Period>("90d");

  const revSlice =
    revPeriod === "7d"
      ? revenueData.slice(-2)
      : revPeriod === "30d"
      ? revenueData.slice(-4)
      : revPeriod === "90d"
      ? revenueData.slice(-6)
      : revenueData;

  const userSlice =
    userPeriod === "7d"
      ? userGrowthData.slice(-2)
      : userPeriod === "30d"
      ? userGrowthData.slice(-4)
      : userPeriod === "90d"
      ? userGrowthData.slice(-8)
      : userGrowthData;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* ── Page Header ── */}
      <motion.div
        variants={shouldReduce ? {} : fadeIn}
        initial="hidden"
        animate="visible"
        className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm sticky top-16 z-30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Welcome back — here's what's happening with Pulse Analytics today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/40 transition-all duration-200">
              <Calendar className="w-3.5 h-3.5" />
              Dec 2024
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/40 transition-all duration-200">
              <Filter className="w-3.5 h-3.5" />
              Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/50 transition-all duration-200 shadow-sm shadow-indigo-500/30">
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>
      </motion.div>

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
            const isPositive = card.invertChange
              ? card.change <= 0
              : card.change >= 0;
            return (
              <motion.div
                key={card.id}
                variants={shouldReduce ? {} : fadeInUp}
                whileHover={shouldReduce ? {} : { y: -3, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.bg} border ${card.border} p-5 cursor-default`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${card.color}22` }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: card.color }}
                    />
                  </div>
                  <button className="text-slate-500 hover:text-slate-300 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-2xl font-bold text-white tracking-tight">
                  {card.value}
                </p>
                <p className="text-xs text-slate-400 mt-1 mb-3">
                  {card.label}
                </p>
                <div className="flex items-center gap-1.5">
                  {isPositive ? (
                    <ArrowUpRight
                      className="w-3.5 h-3.5 text-emerald-400"
                    />
                  ) : (
                    <ArrowDownRight
                      className="w-3.5 h-3.5 text-rose-400"
                    />
                  )}
                  <span
                    className={`text-xs font-semibold ${
                      isPositive ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {card.change > 0 ? "+" : ""}
                    {card.change}%
                  </span>
                  <span className="text-xs text-slate-500">vs last month</span>
                </div>
                {/* Decorative glow */}
                <div
                  className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-20"
                  style={{ background: card.color }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Revenue Chart + Plan Distribution ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Revenue Area Chart */}
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="xl:col-span-2 rounded-2xl bg-slate-900/60 border border-slate-800/50 p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Revenue Growth
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  MRR and new business over time
                </p>
              </div>
              <PeriodSelector value={revPeriod} onChange={setRevPeriod} />
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart
                data={revSlice}
                margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={BRAND_COLORS.primary}
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor={BRAND_COLORS.primary}
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="newBizGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={BRAND_COLORS.secondary}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={BRAND_COLORS.secondary}
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
                  tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }}
                />
                <Area
                  type="monotone"
                  dataKey="mrr"
                  name="MRR"
                  stroke={BRAND_COLORS.primary}
                  strokeWidth={2}
                  fill="url(#mrrGrad)"
                  dot={false}
                  activeDot={{ r: 4, fill: BRAND_COLORS.primary }}
                />
                <Area
                  type="monotone"
                  dataKey="newBiz"
                  name="New Business"
                  stroke={BRAND_COLORS.secondary}
                  strokeWidth={2}
                  fill="url(#newBizGrad)"
                  dot={false}
                  activeDot={{ r: 4, fill: BRAND_COLORS.secondary }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Plan Distribution Pie */}
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl bg-slate-900/60 border border-slate-800/50 p-6 flex flex-col"
          >
            <div className="mb-4">
              <h2 className="text-base font-semibold text-white">
                Plan Distribution
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Subscribers by tier
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={planDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {planDistribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Share"]}
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "12px",
                      fontSize: "12px",
                      color: "#e2e8f0",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {planDistribution.map((plan) => (
                <div key={plan.name} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: plan.color }}
                  />
                  <span className="text-xs text-slate-400">{plan.name}</span>
                  <span className="text-xs font-semibold text-white ml-auto">
                    {plan.value}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── User Growth Bar Chart + Activity Feed ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* User Growth */}
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="xl:col-span-2 rounded-2xl bg-slate-900/60 border border-slate-800/50 p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">
                  User Growth
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Weekly signups and active users
                </p>
              </div>
              <PeriodSelector value={userPeriod} onChange={setUserPeriod} />
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={userSlice}
                margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
                barGap={4}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="week"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }}
                />
                <Bar
                  dataKey="signups"
                  name="Signups"
                  fill={BRAND_COLORS.primary}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={28}
                />
                <Bar
                  dataKey="churned"
                  name="Churned"
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Activity Feed */}
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl bg-slate-900/60 border border-slate-800/50 p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Activity Feed
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Recent platform events
                </p>
              </div>
              <button className="text-slate-500 hover:text-slate-300 transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <motion.ul
              variants={shouldReduce ? {} : staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-3 flex-1"
            >
              {activityFeed.map((item) => {
                const Icon = item.icon;
                const colorMap: Record<string, string> = {
                  success: "text-emerald-400 bg-emerald-500/10",
                  info: "text-indigo-400 bg-indigo-500/10",
                  warning: "text-amber-400 bg-amber-500/10",
                };
                const cls =
                  colorMap[item.type] ?? "text-slate-400 bg-slate-500/10";
                return (
                  <motion.li
                    key={item.id}
                    variants={shouldReduce ? {} : fadeInUp}
                    className="flex items-start gap-3"
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${cls}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.message}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
            <button className="mt-4 w-full text-xs text-indigo-400 hover:text-indigo-300 font-medium py-2 rounded-lg border border-slate-800/60 hover:border-indigo-500/30 transition-all duration-200">
              View all activity →
            </button>
          </motion.div>
        </div>

        {/* ── Recent Transactions + Top Features ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Transactions Table */}
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="xl:col-span-2 rounded-2xl bg-slate-900/60 border border-slate-800/50 overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Recent Transactions
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Latest subscription payments
                </p>
              </div>
              <button className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                <Eye className="w-3.5 h-3.5" />
                View all
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800/40">
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx, i) => (
                    <motion.tr
                      key={tx.id}
                      initial={shouldReduce ? false : { opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className="border-b border-slate-800/30 hover:bg-slate-800/30 transition-colors duration-150"
                    >
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg ${tx.avatarColor} flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0`}
                          >
                            {tx.avatar}
                          </div>
                          <span className="text-sm font-medium text-slate-200">
                            {tx.customer}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-700/40">
                          {tx.plan}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <span className="text-sm font-semibold text-white">
                          ${(tx.amount ?? 0).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <StatusBadge status={tx.status} />
                      </td>
                      <td className="px-6 py-3.5 text-right text-xs text-slate-500">
                        {tx.date}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Top Features */}
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl bg-slate-900/60 border border-slate-800/50 p-6"
          >
            <div className="mb-5">
              <h2 className="text-base font-semibold text-white">
                Top Features
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Most-used product features this month
              </p>
            </div>
            <motion.ul
              variants={shouldReduce ? {} : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              {topFeatures.map((feat, i) => {
                const isUp = feat.trend >= 0;
                return (
                  <motion.li
                    key={feat.name}
                    variants={shouldReduce ? {} : fadeInUp}
                    className="flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-300">
                        {feat.name}
                      </span>
                      <div className="flex items-center gap-1">
                        {isUp ? (
                          <TrendingUp className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-rose-400" />
                        )}
                        <span
                          className={`text-[11px] font-semibold ${
                            isUp ? "text-emerald-400" : "text-rose-400"
                          }`}
                        >
                          {isUp ? "+" : ""}
                          {feat.trend}%
                        </span>
                      </div>
                    </div>
                    <div className="relative h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${feat.usage}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.7,
                          delay: i * 0.08,
                          ease: "easeOut",
                        }}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${BRAND_COLORS.primary}, ${BRAND_COLORS.secondary})`,
                        }}
                      />
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {feat.usage}% of active users
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        </div>

        {/* ── Bottom Summary Banner ── */}
        <motion.div
          variants={shouldReduce ? {} : scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl bg-gradient-to-r from-indigo-600/20 via-violet-600/15 to-cyan-600/10 border border-indigo-500/20 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                All systems operational
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                99.98% uptime this month · Last checked 2 min ago · 0 active
                incidents
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-400">
                Live
              </span>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/50 transition-all duration-200 shadow-sm shadow-indigo-500/30">
              <Bell className="w-3.5 h-3.5" />
              Set Alerts
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}