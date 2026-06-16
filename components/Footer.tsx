"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { APP_NAME, APP_TAGLINE, footerLinks } from "@/lib/data";
import { Activity, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Heart } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  const shouldReduce = useReducedMotion();

  return (
    <footer className="relative border-t border-slate-800/50 bg-slate-950 overflow-hidden">
      {/* Subtle gradient glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-32 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          variants={shouldReduce ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-5 gap-10"
        >
          {/* Brand column */}
          <motion.div
            variants={shouldReduce ? {} : fadeInUp}
            className="md:col-span-2 flex flex-col gap-4"
          >
            <Link href="/" className="flex items-center gap-2.5 w-fit group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-indigo-300 transition-colors duration-200">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              {APP_TAGLINE} The modern analytics platform built for high-growth
              SaaS teams who demand real-time insight.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-2 mt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={shouldReduce ? {} : { scale: 1.1, y: -2 }}
                  whileTap={shouldReduce ? {} : { scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-200 hover:bg-slate-800/70 border border-slate-800/60 hover:border-slate-700/60 transition-colors duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {footerLinks.map((section) => (
            <motion.div
              key={section.section}
              variants={shouldReduce ? {} : fadeInUp}
              className="flex flex-col gap-3"
            >
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                {section.section}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-slate-100 transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={shouldReduce ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-12 pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 flex items-center gap-1.5">
            Built with{" "}
            <Heart className="w-3 h-3 text-indigo-500 fill-indigo-500" /> for
            data-driven teams
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}