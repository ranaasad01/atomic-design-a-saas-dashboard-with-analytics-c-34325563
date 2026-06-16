"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users, ArrowUpRight, ArrowDownRight, CreditCard, CheckCircle, Clock, AlertCircle, ChevronDown, Download } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const monthlyData = [
  { month: "Jan", revenue: 38200, expenses: 21000, profit: 17200 },
  { month: "Feb", revenue: 41500, expenses: 22400, profit: 19100 },
  { month: "Mar", revenue: 44800, expenses: 23100, profit: 21700 },
  { month: "Apr", revenue: 43200, expenses: 24500, profit: 18700 },
  { month: "May", revenue: 47600, expenses: 25200, profit: 22400 },
  { month: "Jun", revenue: 52100, expenses: 26800, profit: 25300 },
  { month: "Jul", revenue: 55400, expenses: 27300, profit: 28100 },
  { month: "Aug", revenue: 58900, expenses: 28100, profit: 30800 },
  { month: "Sep", revenue: 61200, expenses: 29400, profit: 31800 },
  { month: "Oct", revenue: 64700, expenses: 30200, profit: 34500 },
  { month: "Nov", revenue: 68300, expenses: 31500, profit: 36800 },
  { month: "Dec", revenue: 72100, expenses: 32800, profit: 39300 },
];

const planData = [
  { name: "Enterprise", value: 48, revenue: 346080, color: BRAND_COLORS.primary },
  { name: "Pro", value: 31, revenue: 223740, color: BRAND_COLORS.secondary },
  { name: "Starter", value: 21, revenue: 151380, color: BRAND_COLORS.chartColors[2] },
];

const kpiCards = [
  {
    label: "Annual Recurring Revenue",
    shortLabel: "ARR",
    value: "$721,200",
    rawValue: 721200,
    change: 18.4,
    icon: DollarSign,
    color: "indigo",
    description: "vs. $608,900 last year",
  },
  {
    label: "Monthly Recurring Revenue",
    shortLabel: "MRR",
    value: "$72,100",
    rawValue: 72100,
    change: 5.5,
    icon: TrendingUp,
    color: "violet",
    description: "vs. $68,300 last month",
  },
  {
    label: "Avg. Revenue Per User",
    shortLabel: "ARPU",
    value: "$148.60",
    rawValue: 148.6,
    change: 3.2,
    icon: Users,
    color: "cyan",
    description: "across 485 active accounts",
  },
  {
    label: "Net Revenue Retention",
    shortLabel: "NRR",
    value: "118%",
    rawValue: 118,
    change: 2.1,
    icon: CreditCard,
    color: "emerald",
    description: "expansion > churn",
  },
];

type TxStatus = "completed" | "pending" | "failed";

interface Transaction {
  id: string;
  customer: string;
  plan: string;
  amount: number;
  date: string;
  status: TxStatus;
  type: string;
}

const transactions: Transaction[] = [
  { id: "TXN-8821", customer: "Acme Corp", plan: "Enterprise", amount: 2400, date: "Dec 28, 2024", status: "completed", type: "Renewal" },
  { id: "TXN-8820", customer: "Bright Labs", plan: "Pro", amount: 490, date: "Dec 27, 2024", status: "completed", type: "Upgrade" },
  { id: "TXN-8819", customer: "Nexus AI", plan: "Enterprise", amount: 2400, date: "Dec 26, 2024", status: "completed", type: "New" },
  { id: "TXN-8818", customer: "Orbit SaaS", plan: "Starter", amount: 99, date: "Dec 26, 2024", status: "pending", type: "New" },
  { id: "TXN-8817", customer: "Vanta Systems", plan: "Pro", amount: 490, date: "Dec 25, 2024", status: "completed", type: "Renewal" },
  { id: "TXN-8816", customer: "Helix Data", plan: "Enterprise", amount: 2400, date: "Dec 24, 2024", status: "failed", type: "Renewal" },
  { id: "TXN-8815", customer: "Prism Cloud", plan: "Pro", amount: 490, date: "Dec 23, 2024", status: "completed", type: "New" },
  { id: "TXN-8814", customer: "Zenith IO", plan: "Starter", amount: 99, date: "Dec 22, 2024", status: "completed", type: "New" },
  { id: "TXN-8813", customer: "Forge Analytics", plan: "Enterprise", amount: 2400, date: "Dec 21, 2024", status: "completed", type: "Upgrade" },
  { id: "TXN-8812", customer: "Cascade Tech", plan: "Pro", amount: 490, date: "Dec 20, 2024", status: "pending", type: "Renewal" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

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

function StatusBadge({ status }: { status: TxStatus }) {
  const cfg: Record<TxStatus, { label: string; icon: React.ReactNode; cls: string }> = {
    completed: {
      label: "Completed",
      icon: <CheckCircle className="w-3 h-3" />,
      cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    pending: {
      label: "Pending",
      icon: <Clock className="w-3 h-3" />,
      cls: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    failed: {
      label: "Failed",
      icon: <AlertCircle className="w-3 h-3" />,
      cls: "bg-red-500/10 text-red-400 border-red-500/20",
    },
  };
  const { label, icon, cls } = cfg[status] ?? cfg.pending;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {icon}
      {label}
    </span>
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-3 shadow-2xl shadow-slate-950/60 min-w-[160px]">
      <p className="text-xs font-semibold text-slate-400 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-slate-300">{entry.name}</span>
          </span>
          <span className="font-semibold text-white">
            ${(entry.value ?? 0).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

interface DonutLabelProps {
  cx?: number;
  cy?: number;
}

function DonutCenterLabel({ cx = 0, cy = 0 }: DonutLabelProps) {
  return (
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
      <tspan x={cx} dy="-0.4em" fontSize="22" fontWeight="700" fill="#f8fafc">
        $721k
      </tspan>
      <tspan x={cx} dy="1.4em" fontSize="11" fill="#94a3b8">
        Total ARR
      </tspan>
    </text>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RevenuePage() {
  const shouldReduce = useReducedMotion();
  const [period, setPeriod] = useState<"monthly" | "quarterly">("monthly");
  const [txFilter, setTxFilter] = useState<"all" | TxStatus>("all");

  const filteredTx = txFilter === "all"
    ? transactions
    : transactions.filter((t) => t.status === txFilter);

  const totalRevenue = monthlyData.reduce((s, d) => s + d.revenue, 0);
  const totalExpenses = monthlyData.reduce((s, d) => s + d.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const margin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : "0.0";

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* ── Page Header ── */}
      <section className="relative border-b border-slate-800/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-slate-950 to-violet-950/20 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-48 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
          <motion.div
            variants={shouldReduce ? {} : staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          >
            <motion.div variants={shouldReduce ? {} : fadeInUp}>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                  <DollarSign className="w-3 h-3" />
                  Revenue
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Revenue Overview
              </h1>
              <p className="mt-1.5 text-slate-400 text-sm max-w-xl">
                Full-year financial performance, plan breakdown, and transaction history for Pulse Analytics.
              </p>
            </motion.div>
            <motion.div variants={shouldReduce ? {} : fadeIn} className="flex items-center gap-2">
              <motion.button
                whileHover={shouldReduce ? {} : { scale: 1.03 }}
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/70 border border-slate-700/50 text-slate-300 text-sm font-medium hover:bg-slate-700/70 hover:text-white transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </motion.button>
              <div className="flex items-center gap-1 bg-slate-800/60 border border-slate-700/40 rounded-lg p-1">
                {(["monthly", "quarterly"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 capitalize ${
                      period === p
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ── KPI Cards ── */}
        <motion.div
          variants={shouldReduce ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            return (
              <motion.div
                key={card.shortLabel}
                variants={shouldReduce ? {} : scaleIn}
                whileHover={shouldReduce ? {} : { y: -3, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className={`relative rounded-2xl border bg-gradient-to-br p-5 overflow-hidden ${colorMap[card.color] ?? colorMap.indigo}`}
              >
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/3 pointer-events-none" />
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBgMap[card.color] ?? iconBgMap.indigo}`}>
                    <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                  </div>
                  <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                    isPositive
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}>
                    {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(card.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-white tracking-tight">{card.value}</p>
                <p className="text-xs font-semibold text-slate-300 mt-0.5">{card.shortLabel}</p>
                <p className="text-[11px] text-slate-500 mt-1">{card.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Summary Strip ── */}
        <motion.div
          variants={shouldReduce ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { label: "Total Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}k`, sub: "FY 2024", positive: true },
            { label: "Total Expenses", value: `$${(totalExpenses / 1000).toFixed(0)}k`, sub: "FY 2024", positive: false },
            { label: "Net Profit Margin", value: `${margin}%`, sub: `$${(totalProfit / 1000).toFixed(0)}k profit`, positive: true },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl bg-slate-900/60 border border-slate-800/50 px-5 py-4 flex flex-col gap-1"
            >
              <p className="text-xs text-slate-500 font-medium">{item.label}</p>
              <p className={`text-xl font-bold ${item.positive ? "text-white" : "text-red-400"}`}>{item.value}</p>
              <p className="text-[11px] text-slate-600">{item.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* ComposedChart */}
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="xl:col-span-2 rounded-2xl bg-slate-900/60 border border-slate-800/50 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">Revenue vs Expenses</h2>
                <p className="text-xs text-slate-500 mt-0.5">Monthly breakdown with profit trend line</p>
              </div>
              <span className="text-xs text-slate-500 bg-slate-800/60 border border-slate-700/40 px-2.5 py-1 rounded-lg">
                FY 2024
              </span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={monthlyData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={BRAND_COLORS.primary} stopOpacity={0.85} />
                    <stop offset="100%" stopColor={BRAND_COLORS.primary} stopOpacity={0.4} />
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.75} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
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
                  wrapperStyle={{ fontSize: "12px", color: "#94a3b8", paddingTop: "12px" }}
                />
                <Bar dataKey="revenue" name="Revenue" fill="url(#revenueGrad)" radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="expenses" name="Expenses" fill="url(#expenseGrad)" radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Line
                  type="monotone"
                  dataKey="profit"
                  name="Profit"
                  stroke={BRAND_COLORS.chartColors[3]}
                  strokeWidth={2.5}
                  dot={{ fill: BRAND_COLORS.chartColors[3], r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Donut Chart */}
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-2xl bg-slate-900/60 border border-slate-800/50 p-6 flex flex-col"
          >
            <div className="mb-4">
              <h2 className="text-base font-semibold text-white">Revenue by Plan</h2>
              <p className="text-xs text-slate-500 mt-0.5">ARR distribution across tiers</p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={planData}
                    cx="50%"
                    cy="50%"
                    innerRadius={62}
                    outerRadius={88}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {planData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                    <DonutCenterLabel />
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Share"]}
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "10px",
                      fontSize: "12px",
                      color: "#f8fafc",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5 mt-2">
              {planData.map((plan) => (
                <div key={plan.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: plan.color }} />
                    <span className="text-sm text-slate-300">{plan.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-white">
                      ${(plan.revenue / 1000).toFixed(0)}k
                    </span>
                    <span className="text-xs text-slate-500 ml-1.5">{plan.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Transactions Table ── */}
        <motion.div
          variants={shouldReduce ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl bg-slate-900/60 border border-slate-800/50 overflow-hidden"
        >
          {/* Table Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-5 border-b border-slate-800/50">
            <div>
              <h2 className="text-base font-semibold text-white">Recent Transactions</h2>
              <p className="text-xs text-slate-500 mt-0.5">Latest billing events and renewals</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={txFilter}
                  onChange={(e) => setTxFilter(e.target.value as "all" | TxStatus)}
                  className="appearance-none bg-slate-800/70 border border-slate-700/50 text-slate-300 text-xs font-medium rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 cursor-pointer hover:bg-slate-700/70 transition-colors duration-200"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800/40">
                  {["Transaction ID", "Customer", "Plan", "Type", "Amount", "Date", "Status"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(filteredTx ?? []).map((tx, idx) => (
                  <motion.tr
                    key={tx.id}
                    initial={shouldReduce ? {} : { opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    whileHover={shouldReduce ? {} : { backgroundColor: "rgba(99,102,241,0.04)" }}
                    className="border-b border-slate-800/30 last:border-0 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-indigo-400 whitespace-nowrap">{tx.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-200 whitespace-nowrap">{tx.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                        tx.plan === "Enterprise"
                          ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                          : tx.plan === "Pro"
                          ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
                          : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                      }`}>
                        {tx.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{tx.type}</td>
                    <td className="px-6 py-4 font-semibold text-white whitespace-nowrap">
                      ${(tx.amount ?? 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{tx.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={tx.status} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filteredTx.length === 0 && (
              <div className="py-12 text-center text-slate-500 text-sm">
                No transactions match the selected filter.
              </div>
            )}
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-slate-800/40 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Showing {filteredTx.length} of {transactions.length} transactions
            </p>
            <motion.button
              whileHover={shouldReduce ? {} : { scale: 1.03 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200 flex items-center gap-1"
            >
              View all transactions
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}