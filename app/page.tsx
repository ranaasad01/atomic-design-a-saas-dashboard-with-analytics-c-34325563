"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION, BRAND_COLORS } from "@/lib/data";
import { Activity, ArrowRight, TrendingUp, Users, Star, Check, Sparkles, BarChart2, Bell, Shield, Zap, Globe, ChevronRight, ArrowUp, ArrowDown, Eye, Clock } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ─── Inline mock data ────────────────────────────────────────────────────────

const revenueData = [
  { month: "Jan", mrr: 28000, arr: 336000 },
  { month: "Feb", mrr: 31500, arr: 378000 },
  { month: "Mar", mrr: 34200, arr: 410400 },
  { month: "Apr", mrr: 37800, arr: 453600 },
  { month: "May", mrr: 41000, arr: 492000 },
  { month: "Jun", mrr: 44500, arr: 534000 },
  { month: "Jul", mrr: 48200, arr: 578400 },
  { month: "Aug", mrr: 52000, arr: 624000 },
];

const userGrowthData = [
  { week: "W1", active: 1200, new: 340 },
  { week: "W2", active: 1450, new: 410 },
  { week: "W3", active: 1680, new: 390 },
  { week: "W4", active: 1920, new: 480 },
  { week: "W5", active: 2100, new: 520 },
  { week: "W6", active: 2380, new: 610 },
  { week: "W7", active: 2650, new: 580 },
  { week: "W8", active: 2940, new: 670 },
];

const channelData = [
  { name: "Organic", value: 38, color: BRAND_COLORS.chartColors[0] },
  { name: "Paid", value: 27, color: BRAND_COLORS.chartColors[1] },
  { name: "Referral", value: 19, color: BRAND_COLORS.chartColors[2] },
  { name: "Direct", value: 16, color: BRAND_COLORS.chartColors[3] },
];

const kpiCards = [
  {
    label: "Monthly Recurring Revenue",
    value: "$52,000",
    change: +18.4,
    icon: TrendingUp,
    color: "indigo",
  },
  {
    label: "Active Users",
    value: "2,940",
    change: +11.2,
    icon: Users,
    color: "violet",
  },
  {
    label: "Avg. Session Duration",
    value: "4m 38s",
    change: +6.7,
    icon: Clock,
    color: "cyan",
  },
  {
    label: "Churn Rate",
    value: "1.8%",
    change: -0.4,
    icon: Activity,
    color: "emerald",
  },
];

const features = [
  {
    icon: BarChart2,
    title: "Real-Time Analytics",
    description:
      "Watch your metrics update live as events stream in. No more waiting for overnight batch jobs — see what's happening right now.",
    color: "indigo",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description:
      "Set threshold-based alerts for any metric. Get notified via Slack, email, or webhook the moment something needs your attention.",
    color: "violet",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified. All data encrypted at rest and in transit. Role-based access control with SSO support.",
    color: "cyan",
  },
  {
    icon: Zap,
    title: "Instant Integrations",
    description:
      "Connect Stripe, Segment, HubSpot, Salesforce, and 80+ tools in minutes. No engineering required.",
    color: "emerald",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description:
      "Data residency in US, EU, and APAC. 99.99% uptime SLA backed by multi-region redundancy.",
    color: "amber",
  },
  {
    icon: Eye,
    title: "Cohort Analysis",
    description:
      "Understand retention at a granular level. Slice cohorts by plan, acquisition channel, geography, or any custom attribute.",
    color: "rose",
  },
];

const testimonials = [
  {
    quote:
      "Pulse Analytics replaced three separate tools for us. Our team finally has a single source of truth for every growth metric that matters.",
    author: "Sarah Chen",
    role: "Head of Growth",
    company: "Loom",
    avatar: "/images/sarah-chen-head-of-growth.jpg",
    rating: 5,
  },
  {
    quote:
      "We spotted a churn spike within 20 minutes of it starting. Before Pulse, we'd have caught it three days later in a weekly report.",
    author: "Marcus Webb",
    role: "CEO & Co-founder",
    company: "Notion",
    avatar: "/images/marcus-webb-ceo-cofounder.jpg",
    rating: 5,
  },
  {
    quote:
      "The cohort retention charts alone justified the subscription. We restructured our entire onboarding flow based on what Pulse showed us.",
    author: "Priya Nair",
    role: "VP Product",
    company: "Linear",
    avatar: "/images/priya-nair-vp-product.jpg",
    rating: 5,
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "Perfect for early-stage SaaS teams getting started with analytics.",
    features: [
      "Up to 10,000 tracked events/mo",
      "5 dashboards",
      "7-day data retention",
      "Email alerts",
      "Slack integration",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$149",
    period: "/mo",
    description: "For scaling teams that need deeper insight and more integrations.",
    features: [
      "Up to 500,000 tracked events/mo",
      "Unlimited dashboards",
      "90-day data retention",
      "Smart alerts + webhooks",
      "All 80+ integrations",
      "Cohort & funnel analysis",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Dedicated infrastructure, SLAs, and white-glove onboarding.",
    features: [
      "Unlimited events",
      "Unlimited retention",
      "Custom data residency",
      "SSO & RBAC",
      "Dedicated CSM",
      "SLA guarantee",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

const colorMap: Record<string, string> = {
  indigo: "from-indigo-500/20 to-indigo-600/5 border-indigo-500/20 text-indigo-400",
  violet: "from-violet-500/20 to-violet-600/5 border-violet-500/20 text-violet-400",
  cyan: "from-cyan-500/20 to-cyan-600/5 border-cyan-500/20 text-cyan-400",
  emerald: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-400",
  amber: "from-amber-500/20 to-amber-600/5 border-amber-500/20 text-amber-400",
  rose: "from-rose-500/20 to-rose-600/5 border-rose-500/20 text-rose-400",
};

const iconBgMap: Record<string, string> = {
  indigo: "bg-indigo-500/15 text-indigo-400",
  violet: "bg-violet-500/15 text-violet-400",
  cyan: "bg-cyan-500/15 text-cyan-400",
  emerald: "bg-emerald-500/15 text-emerald-400",
  amber: "bg-amber-500/15 text-amber-400",
  rose: "bg-rose-500/15 text-rose-400",
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}:{" "}
          <span className="text-white">
            {typeof entry.value === "number"
              ? entry.name.toLowerCase().includes("mrr") || entry.name.toLowerCase().includes("arr")
                ? `$${(entry.value ?? 0).toLocaleString()}`
                : (entry.value ?? 0).toLocaleString()
              : entry.value}
          </span>
        </p>
      ))}
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduce = useReducedMotion();
  const [activeChart, setActiveChart] = useState<"mrr" | "users">("mrr");

  return (
    <main className="bg-slate-950 text-white overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 pb-24 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-violet-600/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-cyan-600/6 rounded-full blur-[80px]" />
        </div>
        {/* Grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            variants={shouldReduce ? {} : fadeIn}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-sm font-medium mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Now in public beta — free for 14 days
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.div>

          <motion.h1
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6"
          >
            <span className="text-white">Analytics that</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              drive real growth
            </span>
          </motion.h1>

          <motion.p
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {APP_DESCRIPTION} Stop guessing. Start knowing.
          </motion.p>

          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/dashboard">
              <motion.span
                whileHover={shouldReduce ? {} : { scale: 1.04, y: -2 }}
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-base shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow duration-300 cursor-pointer"
              >
                View Live Dashboard
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
            <Link href="/analytics">
              <motion.span
                whileHover={shouldReduce ? {} : { scale: 1.03, y: -1 }}
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 font-semibold text-base hover:bg-slate-800 hover:border-slate-600 transition-all duration-200 cursor-pointer"
              >
                Explore Analytics
              </motion.span>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={shouldReduce ? {} : fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-14 text-slate-500 text-sm"
          >
            {["SOC 2 Certified", "GDPR Compliant", "99.99% Uptime", "No credit card required"].map(
              (badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  {badge}
                </span>
              )
            )}
          </motion.div>
        </div>

        {/* Hero chart preview */}
        <motion.div
          variants={shouldReduce ? {} : scaleIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.45 }}
          className="relative z-10 w-full max-w-4xl mx-auto mt-16"
        >
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-sm shadow-2xl shadow-slate-950/60 overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-800/60 bg-slate-900/80">
              <span className="w-3 h-3 rounded-full bg-rose-500/70" />
              <span className="w-3 h-3 rounded-full bg-amber-500/70" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
              <span className="ml-4 text-xs text-slate-500 font-mono">pulse.analytics / dashboard</span>
            </div>
            {/* Chart tabs */}
            <div className="flex items-center gap-2 px-5 pt-5 pb-2">
              {(["mrr", "users"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveChart(tab)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeChart === tab
                      ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/25"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab === "mrr" ? "MRR Growth" : "User Growth"}
                </button>
              ))}
            </div>
            <div className="px-5 pb-5 h-56">
              <ResponsiveContainer width="100%" height="100%">
                {activeChart === "mrr" ? (
                  <AreaChart data={revenueData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="mrr" name="MRR" stroke="#6366f1" strokeWidth={2.5} fill="url(#mrrGrad)" dot={false} activeDot={{ r: 5, fill: "#6366f1" }} />
                  </AreaChart>
                ) : (
                  <AreaChart data={userGrowthData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="newGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="active" name="Active" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#activeGrad)" dot={false} activeDot={{ r: 5, fill: "#8b5cf6" }} />
                    <Area type="monotone" dataKey="new" name="New" stroke="#06b6d4" strokeWidth={2} fill="url(#newGrad)" dot={false} activeDot={{ r: 4, fill: "#06b6d4" }} />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── KPI STRIP ────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-800/40 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduce ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {kpiCards.map((card) => {
              const Icon = card.icon;
              const isPositive = card.change > 0;
              const isNegativeGood = card.label === "Churn Rate";
              const good = isNegativeGood ? !isPositive : isPositive;
              return (
                <motion.div
                  key={card.label}
                  variants={shouldReduce ? {} : scaleIn}
                  whileHover={shouldReduce ? {} : { y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="relative rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-6 overflow-hidden group cursor-default"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${iconBgMap[card.color] ?? "bg-indigo-500/15 text-indigo-400"}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-slate-400 mb-1">{card.label}</p>
                    <p className="text-3xl font-bold text-white tracking-tight mb-2">{card.value}</p>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                        good
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-rose-500/10 text-rose-400"
                      }`}
                    >
                      {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      {Math.abs(card.change)}% vs last month
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Zap className="w-3 h-3" />
              Everything you need
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Built for modern SaaS teams
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              From real-time event streaming to cohort retention — {APP_NAME} gives your team the
              full picture without the complexity.
            </p>
          </motion.div>

          <motion.div
            variants={shouldReduce ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  variants={shouldReduce ? {} : fadeInUp}
                  whileHover={shouldReduce ? {} : { y: -5 }}
                  transition={{ duration: 0.2 }}
                  className={`relative rounded-2xl border bg-gradient-to-br p-6 overflow-hidden group cursor-default ${colorMap[feat.color] ?? colorMap["indigo"]}`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${iconBgMap[feat.color] ?? iconBgMap["indigo"]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feat.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CHARTS SHOWCASE ──────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30 border-y border-slate-800/40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Activity className="w-3 h-3" />
              Live data visualizations
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Every metric, beautifully charted
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              Drag-and-drop dashboards with 20+ chart types. Share with your team or embed in your
              weekly investor update.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue bar chart */}
            <motion.div
              variants={shouldReduce ? {} : slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-2 rounded-2xl border border-slate-800/60 bg-slate-900/70 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-semibold text-white">Revenue by Month</h3>
                  <p className="text-xs text-slate-500 mt-0.5">MRR vs ARR trajectory</p>
                </div>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full font-semibold">
                  ↑ 85.7% YTD
                </span>
              </div>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="mrr" name="MRR" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Pie chart */}
            <motion.div
              variants={shouldReduce ? {} : slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="rounded-2xl border border-slate-800/60 bg-slate-900/70 p-6"
            >
              <div className="mb-6">
                <h3 className="text-base font-semibold text-white">Acquisition Channels</h3>
                <p className="text-xs text-slate-500 mt-0.5">Traffic source breakdown</p>
              </div>
              <div className="h-36 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={42}
                      outerRadius={64}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, "Share"]}
                      contentStyle={{
                        background: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        color: "#f1f5f9",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {channelData.map((ch) => (
                  <div key={ch.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-slate-400">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: ch.color }} />
                      {ch.name}
                    </span>
                    <span className="font-semibold text-slate-200">{ch.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Line chart full width */}
            <motion.div
              variants={shouldReduce ? {} : fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-3 rounded-2xl border border-slate-800/60 bg-slate-900/70 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-semibold text-white">User Growth Trend</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Active users vs new signups (8-week view)</p>
                </div>
                <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full font-semibold">
                  +145% active users
                </span>
              </div>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userGrowthData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="active" name="Active" stroke="#8b5cf6" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "#8b5cf6" }} />
                    <Line type="monotone" dataKey="new" name="New" stroke="#06b6d4" strokeWidth={2} strokeDasharray="5 3" dot={false} activeDot={{ r: 4, fill: "#06b6d4" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Star className="w-3 h-3" />
              Loved by growth teams
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Trusted by 1,200+ SaaS companies
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              From seed-stage startups to Series C companies — teams that care about growth use
              {" "}{APP_NAME}.
            </p>
          </motion.div>

          <motion.div
            variants={shouldReduce ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.author}
                variants={shouldReduce ? {} : fadeInUp}
                whileHover={shouldReduce ? {} : { y: -5 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-7 flex flex-col gap-5"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-800/60">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover bg-slate-800"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%231e293b'/%3E%3Ccircle cx='20' cy='16' r='7' fill='%236366f1'/%3E%3Cellipse cx='20' cy='34' rx='12' ry='8' fill='%236366f1'/%3E%3C/svg%3E";
                    }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{t.author}</p>
                    <p className="text-xs text-slate-500">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30 border-y border-slate-800/40">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3 h-3" />
              Simple pricing
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Start free, scale as you grow
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              No hidden fees. No per-seat pricing. Just one plan that grows with your data.
            </p>
          </motion.div>

          <motion.div
            variants={shouldReduce ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={shouldReduce ? {} : scaleIn}
                whileHover={shouldReduce ? {} : { y: -5 }}
                transition={{ duration: 0.2 }}
                className={`relative rounded-2xl border p-7 flex flex-col gap-6 ${
                  plan.highlighted
                    ? "border-indigo-500/50 bg-gradient-to-b from-indigo-500/10 to-slate-900/80 shadow-xl shadow-indigo-500/10"
                    : "border-slate-800/60 bg-slate-900/60"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold shadow-lg">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{plan.description}</p>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  {plan.period && (
                    <span className="text-slate-400 text-sm mb-1.5">{plan.period}</span>
                  )}
                </div>
                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard">
                  <motion.span
                    whileHover={shouldReduce ? {} : { scale: 1.03 }}
                    whileTap={shouldReduce ? {} : { scale: 0.97 }}
                    className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                        : "bg-slate-800/80 text-slate-200 border border-slate-700/60 hover:bg-slate-800 hover:border-slate-600"
                    }`}
                  >
                    {plan.cta}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={shouldReduce ? {} : scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative rounded-3xl border border-indigo-500/25 bg-gradient-to-br from-indigo-600/15 via-violet-600/10 to-slate-900/80 p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-indigo-600/15 rounded-full blur-[80px]" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/30">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
                Ready to see your data clearly?
              </h2>
              <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10">
                Join 1,200+ SaaS teams already using {APP_NAME} to make faster, smarter growth
                decisions. Set up in under 5 minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/dashboard">
                  <motion.span
                    whileHover={shouldReduce ? {} : { scale: 1.05, y: -2 }}
                    whileTap={shouldReduce ? {} : { scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-base shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow duration-300 cursor-pointer"
                  >
                    Start your free trial
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
                <Link href="/analytics">
                  <motion.span
                    whileHover={shouldReduce ? {} : { scale: 1.03 }}
                    className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-semibold text-base transition-colors duration-200 cursor-pointer"
                  >
                    See a live demo
                    <ChevronRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </div>
              <p className="text-xs text-slate-500 mt-6">
                No credit card required · Cancel anytime · Free 14-day trial
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}