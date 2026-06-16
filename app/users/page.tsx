"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Search, ChevronDown, ChevronRight, Users, UserPlus, UserMinus, ArrowUp, ArrowDown, ArrowUpDown, Star, Circle, Mail, Calendar } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_USERS = [
  {
    id: "u1",
    name: "Sophia Hartwell",
    email: "sophia.hartwell@acme.io",
    plan: "Enterprise",
    status: "Active",
    joined: "2024-01-08",
    avatar: "SH",
    avatarColor: "#6366f1",
  },
  {
    id: "u2",
    name: "Marcus Chen",
    email: "m.chen@brightloop.com",
    plan: "Pro",
    status: "Active",
    joined: "2024-01-15",
    avatar: "MC",
    avatarColor: "#8b5cf6",
  },
  {
    id: "u3",
    name: "Priya Nair",
    email: "priya@nairventures.co",
    plan: "Starter",
    status: "Active",
    joined: "2024-02-03",
    avatar: "PN",
    avatarColor: "#06b6d4",
  },
  {
    id: "u4",
    name: "James Okafor",
    email: "james.okafor@stackrise.dev",
    plan: "Pro",
    status: "Churned",
    joined: "2024-02-11",
    avatar: "JO",
    avatarColor: "#10b981",
  },
  {
    id: "u5",
    name: "Elena Vasquez",
    email: "elena.v@luminary.ai",
    plan: "Enterprise",
    status: "Active",
    joined: "2024-02-19",
    avatar: "EV",
    avatarColor: "#f59e0b",
  },
  {
    id: "u6",
    name: "Tom Brinkley",
    email: "tom@brinkleyco.com",
    plan: "Starter",
    status: "Inactive",
    joined: "2024-03-01",
    avatar: "TB",
    avatarColor: "#ef4444",
  },
  {
    id: "u7",
    name: "Aisha Kamara",
    email: "aisha.kamara@nexaflow.io",
    plan: "Pro",
    status: "Active",
    joined: "2024-03-14",
    avatar: "AK",
    avatarColor: "#6366f1",
  },
  {
    id: "u8",
    name: "Luca Ferretti",
    email: "luca@ferretti.design",
    plan: "Starter",
    status: "Active",
    joined: "2024-03-22",
    avatar: "LF",
    avatarColor: "#8b5cf6",
  },
  {
    id: "u9",
    name: "Rachel Kim",
    email: "rachel.kim@orbitdata.com",
    plan: "Enterprise",
    status: "Active",
    joined: "2024-04-05",
    avatar: "RK",
    avatarColor: "#06b6d4",
  },
  {
    id: "u10",
    name: "David Osei",
    email: "d.osei@growthlab.ng",
    plan: "Pro",
    status: "Churned",
    joined: "2024-04-18",
    avatar: "DO",
    avatarColor: "#10b981",
  },
  {
    id: "u11",
    name: "Nina Patel",
    email: "nina.patel@cloudcraft.in",
    plan: "Pro",
    status: "Active",
    joined: "2024-05-02",
    avatar: "NP",
    avatarColor: "#f59e0b",
  },
  {
    id: "u12",
    name: "Carlos Mendez",
    email: "carlos@mendezstudio.mx",
    plan: "Starter",
    status: "Inactive",
    joined: "2024-05-17",
    avatar: "CM",
    avatarColor: "#ef4444",
  },
  {
    id: "u13",
    name: "Yuki Tanaka",
    email: "yuki.tanaka@pixelwave.jp",
    plan: "Enterprise",
    status: "Active",
    joined: "2024-05-29",
    avatar: "YT",
    avatarColor: "#6366f1",
  },
  {
    id: "u14",
    name: "Fatima Al-Rashid",
    email: "fatima@alrashid.ae",
    plan: "Pro",
    status: "Active",
    joined: "2024-06-08",
    avatar: "FA",
    avatarColor: "#8b5cf6",
  },
  {
    id: "u15",
    name: "Ben Whitmore",
    email: "ben.whitmore@launchpad.uk",
    plan: "Starter",
    status: "Active",
    joined: "2024-06-21",
    avatar: "BW",
    avatarColor: "#06b6d4",
  },
  {
    id: "u16",
    name: "Zoe Andersen",
    email: "zoe@andersen.dk",
    plan: "Pro",
    status: "Churned",
    joined: "2024-07-03",
    avatar: "ZA",
    avatarColor: "#10b981",
  },
  {
    id: "u17",
    name: "Omar Hassan",
    email: "omar.hassan@techbridge.eg",
    plan: "Enterprise",
    status: "Active",
    joined: "2024-07-15",
    avatar: "OH",
    avatarColor: "#f59e0b",
  },
  {
    id: "u18",
    name: "Isabelle Dupont",
    email: "isabelle@dupont.fr",
    plan: "Starter",
    status: "Active",
    joined: "2024-07-28",
    avatar: "ID",
    avatarColor: "#6366f1",
  },
  {
    id: "u19",
    name: "Kwame Asante",
    email: "kwame.asante@boldstack.gh",
    plan: "Pro",
    status: "Active",
    joined: "2024-08-09",
    avatar: "KA",
    avatarColor: "#8b5cf6",
  },
  {
    id: "u20",
    name: "Mia Johansson",
    email: "mia.j@northlight.se",
    plan: "Enterprise",
    status: "Active",
    joined: "2024-08-22",
    avatar: "MJ",
    avatarColor: "#06b6d4",
  },
];

const GROWTH_DATA = [
  { month: "Jan", newUsers: 42, churned: 5 },
  { month: "Feb", newUsers: 67, churned: 8 },
  { month: "Mar", newUsers: 89, churned: 6 },
  { month: "Apr", newUsers: 74, churned: 11 },
  { month: "May", newUsers: 112, churned: 9 },
  { month: "Jun", newUsers: 98, churned: 7 },
  { month: "Jul", newUsers: 134, churned: 12 },
  { month: "Aug", newUsers: 156, churned: 10 },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type SortField = "name" | "plan" | "status" | "joined";
type SortDir = "asc" | "desc";
type StatusFilter = "All" | "Active" | "Inactive" | "Churned";
type PlanFilter = "All" | "Starter" | "Pro" | "Enterprise";

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({
  icon: Icon,
  label,
  value,
  change,
  iconBg,
  delay = 0,
  shouldReduce,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: number;
  iconBg: string;
  delay?: number;
  shouldReduce: boolean | null;
}) {
  const positive = change >= 0;
  return (
    <motion.div
      variants={shouldReduce ? {} : scaleIn}
      custom={delay}
      whileHover={shouldReduce ? {} : { y: -3, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="relative overflow-hidden rounded-2xl bg-slate-900/70 border border-slate-800/60 p-6 flex flex-col gap-4 shadow-lg shadow-slate-950/30"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-transparent pointer-events-none" />
      <div className="flex items-start justify-between relative z-10">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
          style={{ background: iconBg }}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            positive
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-red-500/15 text-red-400"
          }`}
        >
          {positive ? (
            <ArrowUp className="w-3 h-3" />
          ) : (
            <ArrowDown className="w-3 h-3" />
          )}
          {Math.abs(change)}%
        </span>
      </div>
      <div className="relative z-10">
        <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
        <p className="text-sm text-slate-400 mt-1">{label}</p>
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active:
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
    Inactive:
      "bg-amber-500/15 text-amber-400 border border-amber-500/25",
    Churned: "bg-red-500/15 text-red-400 border border-red-500/25",
  };
  const dots: Record<string, string> = {
    Active: "bg-emerald-400",
    Inactive: "bg-amber-400",
    Churned: "bg-red-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        styles[status] ?? "bg-slate-700 text-slate-300"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          dots[status] ?? "bg-slate-400"
        }`}
      />
      {status}
    </span>
  );
}

function PlanBadge({ plan }: { plan: string }) {
  const styles: Record<string, string> = {
    Starter: "bg-slate-700/60 text-slate-300 border border-slate-600/40",
    Pro: "bg-indigo-500/15 text-indigo-300 border border-indigo-500/25",
    Enterprise:
      "bg-violet-500/15 text-violet-300 border border-violet-500/25",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
        styles[plan] ?? "bg-slate-700 text-slate-300"
      }`}
    >
      {plan === "Enterprise" && <Star className="w-3 h-3" />}
      {plan}
    </span>
  );
}

function SortIcon({
  field,
  active,
  dir,
}: {
  field: string;
  active: boolean;
  dir: SortDir;
}) {
  if (!active) return <ArrowUpDown className="w-3.5 h-3.5 text-slate-600" />;
  return dir === "asc" ? (
    <ArrowUp className="w-3.5 h-3.5 text-indigo-400" />
  ) : (
    <ArrowDown className="w-3.5 h-3.5 text-indigo-400" />
  );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-3 shadow-xl text-sm">
      <p className="text-slate-300 font-semibold mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-sm"
            style={{ background: entry.color }}
          />
          <span className="text-slate-400 capitalize">{entry.name}:</span>
          <span className="text-white font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const shouldReduce = useReducedMotion();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [planFilter, setPlanFilter] = useState<PlanFilter>("All");
  const [sortField, setSortField] = useState<SortField>("joined");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;

  const totalUsers = MOCK_USERS.length;
  const activeUsers = MOCK_USERS.filter((u) => u.status === "Active").length;
  const newThisMonth = MOCK_USERS.filter((u) =>
    u.joined.startsWith("2024-08")
  ).length;
  const churned = MOCK_USERS.filter((u) => u.status === "Churned").length;

  const filtered = useMemo(() => {
    let rows = [...MOCK_USERS];
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "All") {
      rows = rows.filter((u) => u.status === statusFilter);
    }
    if (planFilter !== "All") {
      rows = rows.filter((u) => u.plan === planFilter);
    }
    rows.sort((a, b) => {
      const av = a[sortField] ?? "";
      const bv = b[sortField] ?? "";
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [search, statusFilter, planFilter, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
    setPage(1);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setPage(1);
  }

  function handleStatusFilter(e: React.ChangeEvent<HTMLSelectElement>) {
    setStatusFilter(e.target.value as StatusFilter);
    setPage(1);
  }

  function handlePlanFilter(e: React.ChangeEvent<HTMLSelectElement>) {
    setPlanFilter(e.target.value as PlanFilter);
    setPage(1);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Page header */}
      <div className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
              <span>Pulse </span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-indigo-400 font-medium">Users</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              User Management
            </h1>
            <p className="mt-2 text-slate-400 text-base max-w-xl">
              Track signups, monitor plan distribution, and manage your entire
              user base from one place.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* KPI Cards */}
        <motion.div
          variants={shouldReduce ? {} : staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          <KpiCard
            icon={Users}
            label="Total Users"
            value={totalUsers.toLocaleString()}
            change={12}
            iconBg="linear-gradient(135deg,#6366f1,#8b5cf6)"
            delay={0}
            shouldReduce={shouldReduce}
          />
          <KpiCard
            icon={Circle}
            label="Active Users"
            value={activeUsers.toLocaleString()}
            change={8}
            iconBg="linear-gradient(135deg,#10b981,#06b6d4)"
            delay={0.05}
            shouldReduce={shouldReduce}
          />
          <KpiCard
            icon={UserPlus}
            label="New This Month"
            value={newThisMonth.toLocaleString()}
            change={23}
            iconBg="linear-gradient(135deg,#f59e0b,#ef4444)"
            delay={0.1}
            shouldReduce={shouldReduce}
          />
          <KpiCard
            icon={UserMinus}
            label="Churned Users"
            value={churned.toLocaleString()}
            change={-5}
            iconBg="linear-gradient(135deg,#ef4444,#f59e0b)"
            delay={0.15}
            shouldReduce={shouldReduce}
          />
        </motion.div>

        {/* Growth Chart */}
        <motion.div
          variants={shouldReduce ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl bg-slate-900/70 border border-slate-800/60 p-6 shadow-lg shadow-slate-950/30"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">
                User Growth
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                New signups vs. churned users over the last 8 months
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ background: BRAND_COLORS.primary }}
                />
                New Users
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ background: BRAND_COLORS.chartColors[5] }}
                />
                Churned
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={GROWTH_DATA}
                barCategoryGap="30%"
                barGap={4}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={32}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(99,102,241,0.06)" }}
                />
                <Bar
                  dataKey="newUsers"
                  name="newUsers"
                  fill={BRAND_COLORS.primary}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="churned"
                  name="churned"
                  fill={BRAND_COLORS.chartColors[5]}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Table Section */}
        <motion.div
          variants={shouldReduce ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl bg-slate-900/70 border border-slate-800/60 shadow-lg shadow-slate-950/30 overflow-hidden"
        >
          {/* Table toolbar */}
          <div className="p-5 border-b border-slate-800/50 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2 flex-1 max-w-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by name or email…"
                  value={search}
                  onChange={handleSearch}
                  className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={handleStatusFilter}
                  className="appearance-none bg-slate-800/60 border border-slate-700/50 rounded-xl pl-3 pr-8 py-2.5 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Churned">Churned</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={planFilter}
                  onChange={handlePlanFilter}
                  className="appearance-none bg-slate-800/60 border border-slate-700/50 rounded-xl pl-3 pr-8 py-2.5 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
                >
                  <option value="All">All Plans</option>
                  <option value="Starter">Starter</option>
                  <option value="Pro">Pro</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
              </div>
              <span className="text-xs text-slate-500 px-2">
                {filtered.length} user{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800/50">
                  {(
                    [
                      { label: "User", field: "name" as SortField },
                      { label: "Plan", field: "plan" as SortField },
                      { label: "Status", field: "status" as SortField },
                      { label: "Joined", field: "joined" as SortField },
                    ] as { label: string; field: SortField }[]
                  ).map((col) => (
                    <th
                      key={col.field}
                      className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer select-none hover:text-slate-300 transition-colors"
                      onClick={() => toggleSort(col.field)}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {col.label}
                        <SortIcon
                          field={col.field}
                          active={sortField === col.field}
                          dir={sortDir}
                        />
                      </span>
                    </th>
                  ))}
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-16 text-center text-slate-500"
                    >
                      No users match your filters.
                    </td>
                  </tr>
                ) : (
                  paginated.map((user, idx) => (
                    <motion.tr
                      key={user.id}
                      variants={shouldReduce ? {} : fadeIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: idx * 0.04 }}
                      whileHover={
                        shouldReduce ? {} : { backgroundColor: "rgba(99,102,241,0.04)" }
                      }
                      className="border-b border-slate-800/30 last:border-0 transition-colors"
                    >
                      {/* User */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md"
                            style={{ background: user.avatarColor }}
                          >
                            {user.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-slate-100">
                              {user.name}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      {/* Plan */}
                      <td className="px-5 py-4">
                        <PlanBadge plan={user.plan} />
                      </td>
                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge status={user.status} />
                      </td>
                      {/* Joined */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 text-slate-400 text-xs">
                          <Calendar className="w-3.5 h-3.5 text-slate-600" />
                          {user.joined}
                        </span>
                      </td>
                      {/* Contact */}
                      <td className="px-5 py-4">
                        <motion.button
                          whileHover={
                            shouldReduce ? {} : { scale: 1.05 }
                          }
                          whileTap={shouldReduce ? {} : { scale: 0.95 }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/40 text-slate-400 hover:text-indigo-300 hover:border-indigo-500/30 hover:bg-indigo-500/10 text-xs font-medium transition-all duration-200"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          Email
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-5 py-4 border-t border-slate-800/50 flex items-center justify-between gap-4 flex-wrap">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="text-slate-300 font-medium">
                {filtered.length === 0
                  ? 0
                  : (page - 1) * PAGE_SIZE + 1}
                –
                {Math.min(page * PAGE_SIZE, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="text-slate-300 font-medium">
                {filtered.length}
              </span>{" "}
              users
            </p>
            <div className="flex items-center gap-1.5">
              <motion.button
                whileHover={shouldReduce ? {} : { scale: 1.05 }}
                whileTap={shouldReduce ? {} : { scale: 0.95 }}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/40 text-slate-400 hover:text-white hover:bg-slate-700/60 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium transition-all"
              >
                Previous
              </motion.button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <motion.button
                  key={p}
                  whileHover={shouldReduce ? {} : { scale: 1.05 }}
                  whileTap={shouldReduce ? {} : { scale: 0.95 }}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                    p === page
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                      : "bg-slate-800/60 border border-slate-700/40 text-slate-400 hover:text-white hover:bg-slate-700/60"
                  }`}
                >
                  {p}
                </motion.button>
              ))}
              <motion.button
                whileHover={shouldReduce ? {} : { scale: 1.05 }}
                whileTap={shouldReduce ? {} : { scale: 0.95 }}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/40 text-slate-400 hover:text-white hover:bg-slate-700/60 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium transition-all"
              >
                Next
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}