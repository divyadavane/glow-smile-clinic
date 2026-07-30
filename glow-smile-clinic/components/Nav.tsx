"use client";

import { useEffect, useState } from "react";
import { clinic } from "@/lib/data";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const links = [
  { href: "#services", label: "Services" },
  { href: "#doctor", label: "The Doctor" },
  { href: "#reviews", label: "Reviews" },
  { href: "#trust", label: "Why Us" },
  { href: "#contact", label: "Visit" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: shouldReduceMotion ? 0.01 : 0.3, ease: [0.16, 1, 0.3, 1] as const },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: shouldReduceMotion ? 0.01 : 0.4, ease: [0.16, 1, 0.3, 1] as const },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: shouldReduceMotion ? 0.01 : 0.25, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const linkStaggerContainer = {
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0.01 : 0.06,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-porcelain-200/90 backdrop-blur-md shadow-[0_1px_0_rgba(11,43,44,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-20">
        <a href="#top" className="flex items-baseline gap-2 group">
          <span className="font-display italic text-xl sm:text-2xl text-ink tracking-tight">
            Adidx
          </span>
          <span className="eyebrow text-ink/60 hidden sm:inline">
            Glow &amp; Smile Clinic
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink/75 hover:text-ink transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-glow after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={clinic.phoneHref}
            className="hidden sm:inline-flex btn-secondary !py-2.5 !px-4 text-sm"
          >
            {clinic.phone}
          </a>
          <a href="#contact" className="btn-primary !py-2.5 !px-5 text-sm">
            Book Visit
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 -mr-2 text-ink"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden bg-porcelain-200 border-t border-ink/10 px-5 py-6 overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <motion.div className="flex flex-col gap-5" variants={linkStaggerContainer} initial="hidden" animate="visible">
              {links.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-display text-ink"
                  variants={linkVariants}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href={clinic.phoneHref}
                className="btn-secondary justify-center mt-2"
                variants={linkVariants}
              >
                Call {clinic.phone}
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
