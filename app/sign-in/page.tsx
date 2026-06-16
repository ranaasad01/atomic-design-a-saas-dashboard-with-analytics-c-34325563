"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, fadeIn, scaleIn, staggerContainer } from "@/lib/motion";
import { APP_NAME, BRAND_COLORS } from "@/lib/data";
import { Activity, Mail, Lock, Eye, EyeOff, ArrowRight, Check, Sparkles, Code2 as Github, AlertCircle } from 'lucide-react';

const FEATURES = [
  "Real-time analytics across all your metrics",
  "AI-powered growth recommendations",
  "Automated churn prediction & alerts",
  "Revenue forecasting with 95% accuracy",
];

const TESTIMONIAL = {
  quote:
    "Pulse Analytics cut our reporting time by 80%. We spotted a churn spike before it hit our MRR — saved us $40k that quarter.",
  author: "Sarah Chen",
  role: "Head of Growth, Loopify",
  avatar: "/images/sarah-chen-head-of-growth.jpg",
};

export default function SignInPage() {
  const shouldReduce = useReducedMotion();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 1800);
  };

  return (
    <main className="min-h-screen bg-slate-950 flex">
      {/* ── Left panel: form ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-16 lg:px-16 xl:px-24">
        <motion.div
          variants={shouldReduce ? {} : staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Logo */}
          <motion.div variants={shouldReduce ? {} : fadeInUp} className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white group-hover:text-indigo-300 transition-colors duration-200">
                {APP_NAME}
              </span>
            </Link>
          </motion.div>

          {/* Heading */}
          <motion.div variants={shouldReduce ? {} : fadeInUp} className="mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
              Welcome back
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Sign in to your dashboard and pick up right where you left off.
            </p>
          </motion.div>

          {/* Social sign-in */}
          <motion.div variants={shouldReduce ? {} : fadeInUp} className="mb-6">
            <motion.button
              type="button"
              whileHover={shouldReduce ? {} : { scale: 1.015, y: -1 }}
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-slate-700/70 bg-slate-900/60 text-slate-200 text-sm font-medium hover:bg-slate-800/80 hover:border-slate-600/70 transition-all duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </motion.button>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={shouldReduce ? {} : fadeIn}
            className="relative flex items-center gap-3 mb-6"
          >
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-xs text-slate-500 font-medium">
              or sign in with email
            </span>
            <div className="flex-1 h-px bg-slate-800" />
          </motion.div>

          {/* Form */}
          <motion.form
            variants={shouldReduce ? {} : fadeInUp}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            {/* Error banner */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Success banner */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-sm"
              >
                <Check className="w-4 h-4 shrink-0" />
                Signed in successfully! Redirecting to your dashboard…
              </motion.div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-300"
              >
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading || success}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700/60 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/60 transition-all duration-200 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-300"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading || success}
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-900/70 border border-slate-700/60 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/60 transition-all duration-200 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors duration-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2.5 cursor-pointer group w-fit">
              <button
                type="button"
                role="checkbox"
                aria-checked={rememberMe}
                onClick={() => setRememberMe((v) => !v)}
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 shrink-0 ${
                  rememberMe
                    ? "bg-indigo-600 border-indigo-600"
                    : "bg-slate-900/70 border-slate-700/60 group-hover:border-slate-500"
                }`}
              >
                {rememberMe && <Check className="w-3 h-3 text-white" />}
              </button>
              <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-200">
                Remember me for 30 days
              </span>
            </label>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading || success}
              whileHover={shouldReduce || isLoading || success ? {} : { scale: 1.015, y: -1 }}
              whileTap={shouldReduce || isLoading || success ? {} : { scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="mt-1 w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Signing in…
                </>
              ) : success ? (
                <>
                  <Check className="w-4 h-4" />
                  Signed in!
                </>
              ) : (
                <>
                  Sign in to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Sign up link */}
          <motion.p
            variants={shouldReduce ? {} : fadeIn}
            className="mt-6 text-center text-sm text-slate-500"
          >
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200"
            >
              Start your free trial
            </Link>
          </motion.p>

          {/* Trust badges */}
          <motion.div
            variants={shouldReduce ? {} : fadeIn}
            className="mt-10 flex items-center justify-center gap-6 flex-wrap"
          >
            {["SOC 2 Type II", "GDPR Ready", "256-bit SSL"].map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 text-xs text-slate-500"
              >
                <Check className="w-3 h-3 text-emerald-500" />
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Right panel: brand / social proof ── */}
      <div className="hidden lg:flex flex-1 flex-col justify-between relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 border-l border-slate-800/50 px-12 py-16">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-violet-600/8 rounded-full blur-3xl" />
        </div>

        {/* Top: headline + features */}
        <motion.div
          variants={shouldReduce ? {} : staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col gap-8 mt-8"
        >
          <motion.div variants={shouldReduce ? {} : fadeInUp}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3 h-3" />
              Trusted by 2,400+ SaaS teams
            </span>
            <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight tracking-tight">
              Your metrics,{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                finally clear.
              </span>
            </h2>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed max-w-sm">
              From MRR to churn to activation rates — Pulse Analytics gives your
              team a single source of truth, updated in real time.
            </p>
          </motion.div>

          <motion.ul
            variants={shouldReduce ? {} : staggerContainer}
            className="flex flex-col gap-3"
          >
            {FEATURES.map((feat) => (
              <motion.li
                key={feat}
                variants={shouldReduce ? {} : fadeInUp}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-indigo-400" />
                </span>
                <span className="text-sm text-slate-300">{feat}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Bottom: testimonial card */}
        <motion.div
          variants={shouldReduce ? {} : scaleIn}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          <div className="rounded-2xl bg-slate-900/70 border border-slate-700/50 backdrop-blur-sm p-6 shadow-xl shadow-slate-950/40">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg
                  key={s}
                  className="w-4 h-4 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-sm text-slate-300 leading-relaxed mb-5">
              &ldquo;{TESTIMONIAL.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <img
                src={TESTIMONIAL.avatar}
                alt={TESTIMONIAL.author}
                className="w-9 h-9 rounded-full object-cover border border-slate-700/60"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <div>
                <p className="text-sm font-semibold text-white">
                  {TESTIMONIAL.author}
                </p>
                <p className="text-xs text-slate-500">{TESTIMONIAL.role}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}