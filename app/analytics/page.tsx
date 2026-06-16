"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { TrendingUp, TrendingDown, Users, Eye, MousePointerClick, Clock, Calendar, ArrowUpRight, ArrowDownRight, Filter, Download, RefreshCw } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS, type ChartPeriod } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const dauData: Record<ChartPeriod, { date: string; dau: number; sessions: number; newUsers: number }[]> = {
  "7d": [
    { date: "Mon", dau: 4210, sessions: 6800, newUsers: 312 },
    { date: "Tue", dau: 4580, sessions: 7200, newUsers: 340 },
    { date: "Wed", dau: 5020, sessions: 8100, newUsers: 410 },
    { date: "Thu", dau: 4870, sessions: 7900, newUsers: 390 },
    { date: "Fri", dau: 5340, sessions: 8600, newUsers: 455 },
    { date: "Sat", dau: 3980, sessions: 6200, newUsers: 280 },
    { date: "Sun", dau: 3650, sessions: 5800, newUsers: 245 },
  ],
  "30d": [
    { date: "Jan 1", dau: 3100, sessions: 5000, newUsers: 210 },
    { date: "Jan 5", dau: 3400, sessions: 5500, newUsers: 240 },
    { date: "Jan 10", dau: 3800, sessions: 6100, newUsers: 290 },
    { date: "Jan 15", dau: 4200, sessions: 6800, newUsers: 330 },
    { date: "Jan 20", dau: 4600, sessions: 7400, newUsers: 370 },
    { date: "Jan 25", dau: 4900, sessions: 7900, newUsers: 400 },
    { date: "Jan 30", dau: 5200, sessions: 8400, newUsers: 430 },
  ],
  "90d": [
    { date: "Oct", dau: 2800, sessions: 4500, newUsers: 180 },
    { date: "Nov", dau: 3500, sessions: 5600, newUsers: 240 },
    { date: "Dec", dau: 4100, sessions: 6600, newUsers: 310 },
    { date: "Jan", dau: 5200, sessions: 8400, newUsers: 430 },
  ],
  "1y": [
    { date: "Feb", dau: 1800, sessions: 2900, newUsers: 120 },
    { date: "Mar", dau: 2100, sessions: 3400, newUsers: 145 },
    { date: "Apr", dau: 2400, sessions: 3900, newUsers: 170 },
    { date: "May", dau: 2900, sessions: 4700, newUsers: 200 },
    { date: "Jun", dau: 3200, sessions: 5200, newUsers: 225 },
    { date: "Jul", dau: 3600, sessions: 5800, newUsers: 255 },
    { date: "Aug", dau: 3900, sessions: 6300, newUsers: 280 },
    { date: "Sep", dau: 4100, sessions: 6600, newUsers: 300 },
    { date: "Oct", dau: 4400, sessions: 7100, newUsers: 330 },
    { date: "Nov", dau: 4700, sessions: 7600, newUsers: 360 },
    { date: "Dec", dau: 4900, sessions: 7900, newUsers: 385 },
    { date: "Jan", dau: 5200, sessions: 8400, newUsers: 430 },
  ],
};

const trafficSources = [
  { name: "Organic Search", value: 38, color: BRAND_COLORS.chartColors[0] },
  { name: "Paid Ads", value: 24, color: BRAND_COLORS.chartColors[1] },
  { name: "Referral", value: 18, color: BRAND_COLORS.chartColors[2] },
  { name: "Direct", value: 14, color: BRAND_COLORS.chartColors[3] },
  { name: "Social", value: 6, color: BRAND_COLORS.chartColors[4] },
];

const pageViewsData = [
  { page: "/dashboard", views: 18420, bounce: "24%", avgTime: "4m 12s" },
  { page: "/analytics", views: 12380, bounce: "31%", avgTime: "5m 48s" },
  { page: "/revenue", views: 9870, bounce: "28%", avgTime: "3m 55s" },
  { page: "/users", views: 8640, bounce: "35%", avgTime: "2m 30s" },
  { page: "/settings", views: 5210, bounce: "42%", avgTime: "1m 58s" },
  { page: "/sign-in", views: 4890, bounce: "55%", avgTime: "0m 48s" },
];

const conversionFunnelData = [
  { stage: "Visitors", count: 52400, pct: 100 },
  { stage: "Sign-ups", count: 8640, pct: 16.5 },
  { stage: "Activated", count: 5210, pct: 9.9 },
  { stage: "Paid", count: 1840, pct: 3.5 },
];

const summaryStats = [
  {
    label: "Daily Active Users",
    value: "5,234",
    change: 12.4,
    icon: Users,
    color: "indigo",
  },
  {
    label: "Page Views",
    value: "84,120",
    change: 8.7,
    icon: Eye,
    color: "violet",
  },
  {
    label: "Avg. Click-through",
    value: "3.82%",
    change: -1.2,
    icon: MousePointerClick,
    color: "cyan",
  },
  {
    label: "Avg. Session Time",
    value: "4m 38s",
    change: 5.1,
    icon: Clock,
    color: "emerald",
  },
];

const colorMap: Record<string, string> = {
  indigo: "from-indigo-500/20 to-indigo-600/5 border-indigo-500/20 text-indigo-400",
  violet: "from-violet-500/20 to-violet-600/5 border-violet-500/20 text-violet-400",
  cyan: "from-cyan-500/20 to-cyan-600/5 border-cyan-500/20 text-cyan-400",
  emerald: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-400",
};

const iconBgMap: Record<string, string> = {
  indigo: "bg-indigo-500/15 text-indigo-400",
  violet: "bg-violet-500/15 text-violet-400",
  cyan: "bg-cyan-500/15 text-cyan-400",
  emerald: "bg-emerald-500/15 text-emerald-400",
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomAreaTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-3 shadow-2xl shadow-slate-950/60">
      <p className="text-xs font-semibold text-slate-400 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="font-semibold text-white">{(entry.value ?? 0).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

function CustomPieTooltip({ active, payload }: {
  active?: boolean;
  payload?: { name: string; value: number; payload: { color: string } }[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0];
  if (!item) return null;
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-3 shadow-2xl shadow-slate-950/60">
      <div className="flex items-center gap-2 text-sm">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.payload?.color }} />
        <span className="text-slate-300">{item.name}:</span>
        <span className="font-semibold text-white">{item.value ?? 0}%</span>
      </div>
    </div>
  );
}

// ─── Period Selector ──────────────────────────────────────────────────────────

const periods: { label: string; value: ChartPeriod }[] = [
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "90 Days", value: "90d" },
  { label: "1 Year", value: "1y" },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const shouldReduce = useReducedMotion();
  const [period, setPeriod] = useState<ChartPeriod>("30d");
  const [activeMetric, setActiveMetric] = useState<"dau" | "sessions" | "newUsers">("dau");

  const chartData = useMemo(() => dauData[period] ?? [], [period]);

  const metricOptions: { key: "dau" | "sessions" | "newUsers"; label: string; color: string }[] = [
    { key: "dau", label: "Daily Active Users", color: BRAND_COLORS.chartColors[0] },
    { key: "sessions", label: "Sessions", color: BRAND_COLORS.chartColors[2] },
    { key: "newUsers", label: "New Users", color: BRAND_COLORS.chartColors[3] },
  ];

  const selectedMetric = metricOptions.find((m) => m.key === activeMetric) ?? metricOptions[0];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Page header */}
      <div className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            variants={shouldReduce ? {} : staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <motion.div variants={shouldReduce ? {} : fadeInUp}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                  Analytics
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Audience &amp; Traffic
              </h1>
              <p className="mt-1 text-slate-400 text-sm">
                Deep-dive into user behavior, traffic sources, and engagement trends.
              </p>
            </motion.div>

            <motion.div
              variants={shouldReduce ? {} : fadeInUp}
              className="flex items-center gap-2"
            >
              <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-300 text-sm hover:bg-slate-700/60 hover:text-white transition-all duration-200">
                <Filter className="w-3.5 h-3.5" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-300 text-sm hover:bg-slate-700/60 hover:text-white transition-all duration-200">
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
              <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all duration-200 shadow-lg shadow-indigo-500/25">
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Summary Stat Cards */}
        <motion.div
          variants={shouldReduce ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {summaryStats.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.change >= 0;
            return (
              <motion.div
                key={stat.label}
                variants={shouldReduce ? {} : scaleIn}
                whileHover={shouldReduce ? {} : { y: -3, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 ${colorMap[stat.color] ?? colorMap["indigo"]}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBgMap[stat.color] ?? iconBgMap["indigo"]}`}>
                    <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                  </div>
                  <span
                    className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isPositive
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(stat.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Date Range Filter + Metric Selector */}
        <motion.div
          variants={shouldReduce ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col sm:flex-row sm:items-center gap-3"
        >
          <div className="flex items-center gap-1.5 bg-slate-900/60 border border-slate-800/60 rounded-xl p-1">
            <Calendar className="w-4 h-4 text-slate-500 ml-2" />
            {periods.map((p) => (
              <button
                key={p.value}
                onClick={() => setPeriod(p.value)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  period === p.value
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/60 border border-slate-800/60 rounded-xl p-1">
            {metricOptions.map((m) => (
              <button
                key={m.key}
                onClick={() => setActiveMetric(m.key)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeMetric === m.key
                    ? "bg-slate-700 text-white"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* DAU Area Chart */}
        <motion.div
          variants={shouldReduce ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl border border-slate-800/60 bg-slate-900/50 p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <div>
              <h2 className="text-base font-semibold text-white">
                {selectedMetric?.label ?? "Daily Active Users"} Trend
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Showing data for the selected period
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: selectedMetric?.color ?? BRAND_COLORS.chartColors[0] }}
              />
              <span className="text-xs text-slate-400">{selectedMetric?.label}</span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="dauGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={selectedMetric?.color ?? BRAND_COLORS.chartColors[0]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={selectedMetric?.color ?? BRAND_COLORS.chartColors[0]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)}
              />
              <Tooltip content={<CustomAreaTooltip />} />
              <Area
                type="monotone"
                dataKey={activeMetric}
                stroke={selectedMetric?.color ?? BRAND_COLORS.chartColors[0]}
                strokeWidth={2.5}
                fill="url(#dauGradient)"
                dot={false}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Traffic Sources + Conversion Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Donut / Pie Chart */}
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/50 p-6"
          >
            <div className="mb-4">
              <h2 className="text-base font-semibold text-white">Traffic Source Breakdown</h2>
              <p className="text-xs text-slate-500 mt-0.5">Where your visitors come from</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={trafficSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {trafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              <div className="flex flex-col gap-2 min-w-[160px]">
                {trafficSources.map((src) => (
                  <div key={src.name} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: src.color }} />
                      <span className="text-xs text-slate-400">{src.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-white">{src.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Conversion Funnel Bar Chart */}
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/50 p-6"
          >
            <div className="mb-4">
              <h2 className="text-base font-semibold text-white">Conversion Funnel</h2>
              <p className="text-xs text-slate-500 mt-0.5">Visitor → Paid conversion stages</p>
            </div>

            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={conversionFunnelData}
                layout="vertical"
                margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
                />
                <YAxis
                  type="category"
                  dataKey="stage"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={72}
                />
                <Tooltip
                  cursor={{ fill: "rgba(99,102,241,0.06)" }}
                  content={({ active, payload }) => {
                    if (!active || !payload || payload.length === 0) return null;
                    const d = payload[0];
                    if (!d) return null;
                    return (
                      <div className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-3 shadow-2xl">
                        <p className="text-xs text-slate-400 mb-1">{d.payload?.stage}</p>
                        <p className="text-sm font-semibold text-white">{(d.value as number ?? 0).toLocaleString()} users</p>
                        <p className="text-xs text-indigo-400">{d.payload?.pct}% of visitors</p>
                      </div>
                    );
                  }}
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} fill={BRAND_COLORS.chartColors[0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {conversionFunnelData.map((stage) => (
                <div key={stage.stage} className="flex items-center justify-between bg-slate-800/40 rounded-lg px-3 py-2">
                  <span className="text-xs text-slate-400">{stage.stage}</span>
                  <span className="text-xs font-semibold text-indigo-300">{stage.pct}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top Pages Table */}
        <motion.div
          variants={shouldReduce ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl border border-slate-800/60 bg-slate-900/50 overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-slate-800/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold text-white">Top Pages by Views</h2>
              <p className="text-xs text-slate-500 mt-0.5">Most visited routes in the selected period</p>
            </div>
            <span className="text-xs text-slate-500 bg-slate-800/50 px-2.5 py-1 rounded-full border border-slate-700/40">
              {pageViewsData.length} pages
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800/50">
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Page</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Views</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Bounce Rate</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Avg. Time</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Share</th>
                </tr>
              </thead>
              <tbody>
                {(pageViewsData ?? []).map((row, i) => {
                  const totalViews = pageViewsData.reduce((acc, r) => acc + r.views, 0);
                  const share = totalViews > 0 ? ((row.views / totalViews) * 100).toFixed(1) : "0.0";
                  const barWidth = totalViews > 0 ? (row.views / totalViews) * 100 : 0;
                  return (
                    <motion.tr
                      key={row.page}
                      initial={shouldReduce ? false : { opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.35 }}
                      className="border-b border-slate-800/30 hover:bg-slate-800/30 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-indigo-300 text-xs bg-indigo-500/10 px-2 py-0.5 rounded">
                          {row.page}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-white">
                        {(row.views ?? 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right text-slate-400">{row.bounce}</td>
                      <td className="px-6 py-4 text-right text-slate-400">{row.avgTime}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-500 rounded-full"
                              style={{ width: `${barWidth}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-400 w-10 text-right">{share}%</span>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Engagement Insights Row */}
        <motion.div
          variants={shouldReduce ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            {
              label: "Returning Visitors",
              value: "62.4%",
              sub: "vs 58.1% last period",
              positive: true,
              color: "indigo",
            },
            {
              label: "Mobile Traffic",
              value: "47.8%",
              sub: "vs 44.2% last period",
              positive: true,
              color: "violet",
            },
            {
              label: "Avg. Pages / Session",
              value: "3.6",
              sub: "vs 3.9 last period",
              positive: false,
              color: "cyan",
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={shouldReduce ? {} : scaleIn}
              whileHover={shouldReduce ? {} : { y: -2 }}
              className="rounded-2xl border border-slate-800/60 bg-slate-900/50 p-5 flex flex-col gap-2"
            >
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{item.label}</p>
              <p className="text-3xl font-bold text-white tracking-tight">{item.value}</p>
              <div className="flex items-center gap-1.5">
                {item.positive ? (
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                )}
                <span className={`text-xs font-medium ${item.positive ? "text-emerald-400" : "text-red-400"}`}>
                  {item.sub}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </main>
  );
}