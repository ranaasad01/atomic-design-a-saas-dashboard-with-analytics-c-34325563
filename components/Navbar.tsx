"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { APP_NAME, navLinks } from "@/lib/data";
import { Activity, Bell, User, Menu, X, ChevronDown, Sparkles } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const notifications = [
    { id: 1, text: "Revenue milestone: $50k MRR reached 🎉", time: "2m ago" },
    { id: 2, text: "New user signup spike detected", time: "18m ago" },
    { id: 3, text: "Churn rate dropped below 2%", time: "1h ago" },
  ];

  return (
    <motion.header
      initial={shouldReduce ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/60 shadow-lg shadow-slate-950/40"
          : "bg-slate-950/70 backdrop-blur-md border-b border-slate-800/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={shouldReduce ? {} : { scale: 1.08, rotate: 5 }}
              transition={{ duration: 0.2 }}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30"
            >
              <Activity className="w-4 h-4 text-white" />
            </motion.div>
            <span className="font-bold text-lg tracking-tight text-white group-hover:text-indigo-300 transition-colors duration-200">
              {APP_NAME}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 text-[10px] font-semibold uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5" />
              Beta
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link key={link.href} href={link.href}>
                  <motion.span
                    whileHover={shouldReduce ? {} : { y: -1 }}
                    transition={{ duration: 0.15 }}
                    className={`relative inline-flex items-center px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "text-indigo-300 bg-indigo-500/10"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-lg bg-indigo-500/10 border border-indigo-500/20"
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      />
                    )}
                  </motion.span>
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={shouldReduce ? {} : { scale: 1.05 }}
                whileTap={shouldReduce ? {} : { scale: 0.95 }}
                onClick={() => setNotifOpen((v) => !v)}
                className="relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-800/70 transition-colors duration-200"
                aria-label="Notifications"
              >
                <Bell className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 border-2 border-slate-950" />
              </motion.button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={shouldReduce ? {} : { opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-2 w-80 rounded-xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/60 shadow-2xl shadow-slate-950/60 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-slate-800/60">
                      <p className="text-sm font-semibold text-slate-100">
                        Notifications
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {notifications.length} unread
                      </p>
                    </div>
                    <ul className="divide-y divide-slate-800/40">
                      {notifications.map((n) => (
                        <li
                          key={n.id}
                          className="px-4 py-3 hover:bg-slate-800/40 transition-colors duration-150 cursor-pointer"
                        >
                          <p className="text-sm text-slate-200">{n.text}</p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {n.time}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <div className="px-4 py-2.5 border-t border-slate-800/60">
                      <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        View all notifications →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User avatar */}
            <motion.button
              whileHover={shouldReduce ? {} : { scale: 1.05 }}
              whileTap={shouldReduce ? {} : { scale: 0.95 }}
              className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-lg hover:bg-slate-800/70 transition-colors duration-200 group"
              aria-label="User menu"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-slate-300 group-hover:text-slate-100 transition-colors">
                Alex Kim
              </span>
              <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-slate-500 group-hover:text-slate-400 transition-colors" />
            </motion.button>

            {/* Mobile menu toggle */}
            <motion.button
              whileTap={shouldReduce ? {} : { scale: 0.92 }}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-800/70 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-slate-800/50"
          >
            <nav className="px-4 py-3 flex flex-col gap-1 bg-slate-950/95 backdrop-blur-xl">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link key={link.href} href={link.href}>
                    <span
                      className={`flex items-center px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-indigo-300 bg-indigo-500/10 border border-indigo-500/20"
                          : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                      }`}
                      {...(link.label === "Explore Analytics" ? { style: { color: "#206ccf", backgroundColor: "#1e293b" } } : {})}
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}