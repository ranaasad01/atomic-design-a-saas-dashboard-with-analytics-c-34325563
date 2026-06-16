"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { User, Bell, CreditCard, Puzzle, Camera, Mail, Lock, Globe, Check, ChevronRight, Shield, Zap, Star, AlertCircle, Code2 as Github, MessageCircle as Twitter, Hash as Slack, Chrome, Activity, ArrowRight, Info } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = "profile" | "notifications" | "billing" | "integrations";

interface ToggleState {
  emailDigest: boolean;
  productUpdates: boolean;
  securityAlerts: boolean;
  usageReports: boolean;
  teamActivity: boolean;
  marketingEmails: boolean;
  slackNotifs: boolean;
  mobileNotifs: boolean;
}

interface ProfileState {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  company: string;
  website: string;
  bio: string;
  timezone: string;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className={`bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-slate-300 mb-1.5">
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 resize-none"
    />
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 appearance-none cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-slate-900">
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  const shouldReduce = useReducedMotion();
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-slate-800/50 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-200">{label}</p>
        {description && (
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 ${
          checked ? "bg-indigo-500" : "bg-slate-700"
        }`}
      >
        <motion.span
          animate={shouldReduce ? {} : { x: checked ? 20 : 2 }}
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
        />
      </button>
    </div>
  );
}

// ─── Tab: Profile ─────────────────────────────────────────────────────────────

function ProfileTab() {
  const [profile, setProfile] = useState<ProfileState>({
    firstName: "Alex",
    lastName: "Morgan",
    email: "alex.morgan@pulseanalytics.io",
    role: "Product Manager",
    company: "Pulse Analytics",
    website: "https://pulseanalytics.io",
    bio: "Building data-driven products that help SaaS teams grow faster. Passionate about metrics, experimentation, and clean UX.",
    timezone: "America/New_York",
  });
  const [saved, setSaved] = useState(false);

  const set = (key: keyof ProfileState) => (val: string) =>
    setProfile((p) => ({ ...p, [key]: val }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const timezones = [
    { label: "Eastern Time (UTC-5)", value: "America/New_York" },
    { label: "Central Time (UTC-6)", value: "America/Chicago" },
    { label: "Mountain Time (UTC-7)", value: "America/Denver" },
    { label: "Pacific Time (UTC-8)", value: "America/Los_Angeles" },
    { label: "UTC", value: "UTC" },
    { label: "London (UTC+0)", value: "Europe/London" },
    { label: "Paris (UTC+1)", value: "Europe/Paris" },
    { label: "Tokyo (UTC+9)", value: "Asia/Tokyo" },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Avatar */}
      <SectionCard>
        <h2 className="text-base font-semibold text-slate-100 mb-5">
          Profile Photo
        </h2>
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/25">
              AM
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <Camera className="w-3.5 h-3.5" />
            </motion.button>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-200">Alex Morgan</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Product Manager · Pulse Analytics
            </p>
            <div className="flex items-center gap-2 mt-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-xs px-3 py-1.5 bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 rounded-lg hover:bg-indigo-500/25 transition-colors"
              >
                Upload new photo
              </motion.button>
              <button className="text-xs px-3 py-1.5 text-slate-500 hover:text-slate-300 transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Personal Info */}
      <SectionCard>
        <h2 className="text-base font-semibold text-slate-100 mb-5">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>First Name</Label>
            <Input value={profile.firstName} onChange={set("firstName")} placeholder="First name" />
          </div>
          <div>
            <Label>Last Name</Label>
            <Input value={profile.lastName} onChange={set("lastName")} placeholder="Last name" />
          </div>
          <div className="sm:col-span-2">
            <Label>Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={profile.email}
                onChange={(e) => set("email")(e.target.value)}
                className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
              />
            </div>
          </div>
          <div>
            <Label>Job Title</Label>
            <Input value={profile.role} onChange={set("role")} placeholder="e.g. Product Manager" />
          </div>
          <div>
            <Label>Company</Label>
            <Input value={profile.company} onChange={set("company")} placeholder="Company name" />
          </div>
          <div className="sm:col-span-2">
            <Label>Website</Label>
            <div className="relative">
              <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="url"
                value={profile.website}
                onChange={(e) => set("website")(e.target.value)}
                className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <Label>Bio</Label>
            <Textarea
              value={profile.bio}
              onChange={set("bio")}
              placeholder="Tell your team a bit about yourself…"
              rows={3}
            />
            <p className="text-xs text-slate-600 mt-1.5">
              {profile.bio.length}/200 characters
            </p>
          </div>
          <div className="sm:col-span-2">
            <Label>Timezone</Label>
            <Select value={profile.timezone} onChange={set("timezone")} options={timezones} />
          </div>
        </div>
      </SectionCard>

      {/* Password */}
      <SectionCard>
        <h2 className="text-base font-semibold text-slate-100 mb-1">
          Password & Security
        </h2>
        <p className="text-sm text-slate-500 mb-5">
          Last changed 3 months ago. We recommend updating your password regularly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Label>Current Password</Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value="••••••••••"
                onChange={() => {}}
                className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
              />
            </div>
          </div>
          <div>
            <Label>New Password</Label>
            <Input value="" onChange={() => {}} type="password" placeholder="Min. 8 characters" />
          </div>
          <div>
            <Label>Confirm New Password</Label>
            <Input value="" onChange={() => {}} type="password" placeholder="Repeat new password" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 p-3 bg-amber-500/8 border border-amber-500/20 rounded-xl">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <p className="text-xs text-amber-300/80">
            Two-factor authentication is not enabled.{" "}
            <button className="underline hover:text-amber-200 transition-colors">
              Enable 2FA
            </button>{" "}
            for extra security.
          </p>
        </div>
      </SectionCard>

      {/* Save */}
      <div className="flex items-center justify-end gap-3">
        <button className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition-colors">
          Discard changes
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
            saved
              ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
              : "bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/25"
          }`}
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved!
            </>
          ) : (
            "Save Changes"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Tab: Notifications ───────────────────────────────────────────────────────

function NotificationsTab() {
  const [toggles, setToggles] = useState<ToggleState>({
    emailDigest: true,
    productUpdates: true,
    securityAlerts: true,
    usageReports: false,
    teamActivity: true,
    marketingEmails: false,
    slackNotifs: true,
    mobileNotifs: false,
  });

  const set = (key: keyof ToggleState) => (val: boolean) =>
    setToggles((t) => ({ ...t, [key]: val }));

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <SectionCard>
        <h2 className="text-base font-semibold text-slate-100 mb-1">
          Email Notifications
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          Choose which emails you'd like to receive at{" "}
          <span className="text-indigo-400">alex.morgan@pulseanalytics.io</span>
        </p>
        <div>
          <Toggle
            checked={toggles.emailDigest}
            onChange={set("emailDigest")}
            label="Weekly digest"
            description="A summary of your key metrics every Monday morning."
          />
          <Toggle
            checked={toggles.productUpdates}
            onChange={set("productUpdates")}
            label="Product updates"
            description="New features, improvements, and release notes from Pulse."
          />
          <Toggle
            checked={toggles.securityAlerts}
            onChange={set("securityAlerts")}
            label="Security alerts"
            description="Immediate notification of suspicious login attempts or changes."
          />
          <Toggle
            checked={toggles.usageReports}
            onChange={set("usageReports")}
            label="Monthly usage reports"
            description="Detailed breakdown of your team's platform usage each month."
          />
          <Toggle
            checked={toggles.teamActivity}
            onChange={set("teamActivity")}
            label="Team activity"
            description="When teammates join, leave, or change their roles."
          />
          <Toggle
            checked={toggles.marketingEmails}
            onChange={set("marketingEmails")}
            label="Marketing & promotions"
            description="Tips, case studies, and special offers from Pulse Analytics."
          />
        </div>
      </SectionCard>

      <SectionCard>
        <h2 className="text-base font-semibold text-slate-100 mb-1">
          Other Channels
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          Receive alerts through connected integrations and mobile.
        </p>
        <div>
          <Toggle
            checked={toggles.slackNotifs}
            onChange={set("slackNotifs")}
            label="Slack notifications"
            description="Push critical alerts to your connected Slack workspace."
          />
          <Toggle
            checked={toggles.mobileNotifs}
            onChange={set("mobileNotifs")}
            label="Mobile push notifications"
            description="Get notified on your phone via the Pulse mobile app."
          />
        </div>
      </SectionCard>

      <SectionCard>
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-slate-200">
              Notification frequency
            </p>
            <p className="text-sm text-slate-500 mt-0.5">
              Real-time alerts are sent immediately. Digest emails batch
              notifications to reduce inbox noise. You can unsubscribe from any
              email using the link at the bottom of each message.
            </p>
          </div>
        </div>
      </SectionCard>
    </motion.div>
  );
}

// ─── Tab: Billing ─────────────────────────────────────────────────────────────

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    description: "For indie hackers and small projects.",
    features: ["Up to 3 team members", "10k events/month", "7-day data retention", "Basic charts"],
    color: "slate",
  },
  {
    id: "growth",
    name: "Growth",
    price: 49,
    description: "For growing SaaS teams that need more.",
    features: ["Up to 15 team members", "500k events/month", "90-day data retention", "Advanced analytics", "Slack integration", "Priority support"],
    color: "indigo",
    current: true,
  },
  {
    id: "scale",
    name: "Scale",
    price: 149,
    description: "For high-volume products at scale.",
    features: ["Unlimited team members", "Unlimited events", "1-year data retention", "Custom dashboards", "All integrations", "Dedicated CSM", "SLA guarantee"],
    color: "violet",
  },
];

const INVOICES = [
  { id: "INV-2024-012", date: "Dec 1, 2024", amount: "$49.00", status: "Paid" },
  { id: "INV-2024-011", date: "Nov 1, 2024", amount: "$49.00", status: "Paid" },
  { id: "INV-2024-010", date: "Oct 1, 2024", amount: "$49.00", status: "Paid" },
  { id: "INV-2024-009", date: "Sep 1, 2024", amount: "$49.00", status: "Paid" },
];

function BillingTab() {
  const [selectedPlan, setSelectedPlan] = useState("growth");

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Current plan banner */}
      <SectionCard>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                Current Plan
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100">Growth — $49/mo</h2>
            <p className="text-sm text-slate-500 mt-1">
              Your plan renews on{" "}
              <span className="text-slate-300">January 1, 2025</span>. You have
              used <span className="text-slate-300">312k / 500k</span> events
              this month.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-xs text-slate-500">Usage</p>
              <p className="text-sm font-semibold text-slate-200">62%</p>
            </div>
            <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "62%" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
              />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Plan selector */}
      <SectionCard>
        <h2 className="text-base font-semibold text-slate-100 mb-5">
          Choose a Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <motion.button
                key={plan.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative text-left p-5 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? "border-indigo-500/60 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                    : "border-slate-700/60 bg-slate-800/30 hover:border-slate-600/60"
                }`}
              >
                {plan.current && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 rounded-full">
                    Current
                  </span>
                )}
                <p className="text-sm font-bold text-slate-100">{plan.name}</p>
                <p className="text-2xl font-bold text-slate-100 mt-1">
                  {plan.price === 0 ? "Free" : `$${plan.price}`}
                  {plan.price > 0 && (
                    <span className="text-sm font-normal text-slate-500">/mo</span>
                  )}
                </p>
                <p className="text-xs text-slate-500 mt-1 mb-3">
                  {plan.description}
                </p>
                <ul className="space-y-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                {isSelected && (
                  <motion.div
                    layoutId="plan-selected"
                    className="absolute inset-0 rounded-xl border-2 border-indigo-500/50 pointer-events-none"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
        <div className="flex items-center justify-end mt-5 gap-3">
          <button className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
            Cancel subscription
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-colors"
          >
            Upgrade Plan
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </SectionCard>

      {/* Payment method */}
      <SectionCard>
        <h2 className="text-base font-semibold text-slate-100 mb-4">
          Payment Method
        </h2>
        <div className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 bg-gradient-to-br from-blue-600 to-blue-800 rounded-md flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">
                Visa ending in 4242
              </p>
              <p className="text-xs text-slate-500">Expires 08 / 2026</p>
            </div>
          </div>
          <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
            Update
          </button>
        </div>
      </SectionCard>

      {/* Invoice history */}
      <SectionCard>
        <h2 className="text-base font-semibold text-slate-100 mb-4">
          Invoice History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-800/60">
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Invoice
                </th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Date
                </th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Amount
                </th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody>
              {INVOICES.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-slate-800/40 last:border-0 hover:bg-slate-800/20 transition-colors"
                >
                  <td className="py-3 text-slate-300 font-mono text-xs">
                    {inv.id}
                  </td>
                  <td className="py-3 text-slate-400">{inv.date}</td>
                  <td className="py-3 text-slate-200 font-medium">
                    {inv.amount}
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-full">
                      <Check className="w-3 h-3" />
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-xs text-slate-500 hover:text-indigo-400 transition-colors">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </motion.div>
  );
}

// ─── Tab: Integrations ────────────────────────────────────────────────────────

const INTEGRATIONS = [
  {
    id: "github",
    name: "GitHub",
    description: "Link deployments to commits and track release impact on metrics.",
    icon: Github,
    connected: true,
    connectedAs: "alex-morgan",
    color: "from-slate-600 to-slate-800",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Send real-time alerts and weekly digests to any Slack channel.",
    icon: Slack,
    connected: true,
    connectedAs: "#pulse-alerts",
    color: "from-purple-600 to-purple-800",
  },
  {
    id: "twitter",
    name: "Twitter / X",
    description: "Monitor brand mentions and correlate social spikes with traffic.",
    icon: Twitter,
    connected: false,
    connectedAs: "",
    color: "from-sky-500 to-sky-700",
  },
  {
    id: "chrome",
    name: "Chrome Extension",
    description: "Access your key metrics from any tab without leaving your workflow.",
    icon: Chrome,
    connected: false,
    connectedAs: "",
    color: "from-yellow-500 to-orange-600",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Automate workflows by triggering Zaps on metric thresholds.",
    icon: Zap,
    connected: true,
    connectedAs: "3 active Zaps",
    color: "from-orange-500 to-orange-700",
  },
  {
    id: "shield",
    name: "SSO / SAML",
    description: "Enable single sign-on for your entire team via your identity provider.",
    icon: Shield,
    connected: false,
    connectedAs: "",
    color: "from-emerald-600 to-emerald-800",
  },
];

function IntegrationsTab() {
  const [connections, setConnections] = useState<Record<string, boolean>>(
    Object.fromEntries(INTEGRATIONS.map((i) => [i.id, i.connected]))
  );

  const toggle = (id: string) =>
    setConnections((c) => ({ ...c, [id]: !c[id] }));

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <SectionCard>
        <h2 className="text-base font-semibold text-slate-100 mb-1">
          Connected Apps
        </h2>
        <p className="text-sm text-slate-500 mb-5">
          Integrate Pulse Analytics with the tools your team already uses.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {INTEGRATIONS.map((integration) => {
            const Icon = integration.icon;
            const isConnected = connections[integration.id] ?? false;
            return (
              <motion.div
                key={integration.id}
                variants={scaleIn}
                whileHover={{ y: -2 }}
                className="flex items-start gap-4 p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl hover:border-slate-600/60 transition-all duration-200"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center flex-shrink-0 shadow-md`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-200">
                      {integration.name}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => toggle(integration.id)}
                      className={`flex-shrink-0 text-xs px-3 py-1 rounded-lg font-medium transition-all duration-200 ${
                        isConnected
                          ? "bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 hover:bg-red-500/15 hover:border-red-500/25 hover:text-red-400"
                          : "bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 hover:bg-indigo-500/25"
                      }`}
                    >
                      {isConnected ? "Connected" : "Connect"}
                    </motion.button>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {integration.description}
                  </p>
                  {isConnected && integration.connectedAs && (
                    <p className="text-xs text-indigo-400/80 mt-1.5 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      {integration.connectedAs}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard>
        <div className="flex items-start gap-3">
          <Activity className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-slate-200">
              Need a custom integration?
            </p>
            <p className="text-sm text-slate-500 mt-0.5">
              Use the Pulse REST API or webhooks to build your own data pipeline.
              Full API docs and SDKs are available for Node.js, Python, and Go.
            </p>
            <button className="mt-3 flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              View API documentation
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </SectionCard>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "integrations", label: "Integrations", icon: Puzzle },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const shouldReduce = useReducedMotion();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Page header */}
      <div className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-0">
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
              Settings
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your account, preferences, and integrations.
            </p>
          </motion.div>

          {/* Tab bar */}
          <motion.div
            variants={shouldReduce ? {} : fadeIn}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-1 mt-6 overflow-x-auto scrollbar-none"
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={shouldReduce ? {} : { y: -1 }}
                  whileTap={shouldReduce ? {} : { scale: 0.97 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
                    isActive
                      ? "text-indigo-400 border-indigo-500"
                      : "text-slate-500 border-transparent hover:text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "notifications" && <NotificationsTab />}
            {activeTab === "billing" && <BillingTab />}
            {activeTab === "integrations" && <IntegrationsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}