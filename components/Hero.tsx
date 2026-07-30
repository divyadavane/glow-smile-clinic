"use client";

import { clinic } from "@/lib/data";
import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0.01 : 0.12,
        delayChildren: shouldReduceMotion ? 0.01 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* Ambient background glows */}
      <div
        className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-glow/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-52 -left-40 w-[480px] h-[480px] rounded-full bg-bloom/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div className="noise-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
        {/* Text column */}
        <motion.div
          className="order-2 lg:order-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="eyebrow text-glow-light mb-6" variants={itemVariants}>
            Dahanu, Maharashtra · Dental · Hair · Skin
          </motion.p>
          <motion.h1
            className="font-display text-[2.6rem] leading-[1.05] sm:text-6xl sm:leading-[1.03] text-porcelain text-balance"
            variants={itemVariants}
          >
            A calmer way to take care of your{" "}
            <span className="italic text-glow-light">smile</span>, your{" "}
            <span className="italic text-bloom-light">skin</span>, and your{" "}
            <span className="italic text-sage">confidence</span>.
          </motion.h1>
          <motion.p className="mt-7 text-porcelain/75 text-lg max-w-xl leading-relaxed" variants={itemVariants}>
            Dr. Aditya Bhange brings gentle, unhurried dental and cosmetic
            care to Masoli — explaining every step, respecting every
            patient, and treating anxiety as seriously as the diagnosis.
          </motion.p>

          <motion.div className="mt-9 flex flex-wrap items-center gap-4" variants={itemVariants}>
            <a href="#contact" className="btn-primary bg-glow !text-ink hover:!bg-glow-light" data-cursor="Book">
              Book an appointment
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href={clinic.phoneHref}
              className="btn-secondary !border-porcelain/30 !text-porcelain hover:!border-porcelain"
              data-cursor="Call"
            >
              Call {clinic.phone}
            </a>
          </motion.div>

          <motion.dl className="mt-12 grid grid-cols-3 gap-6 max-w-md" variants={itemVariants}>
            <div>
              <dt className="eyebrow text-porcelain/50">Rating</dt>
              <dd className="font-display text-2xl text-porcelain mt-1">
                {clinic.rating}★
              </dd>
              <dd className="text-xs text-porcelain/50 mt-0.5">
                {clinic.reviewCount} reviews
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-porcelain/50">Today</dt>
              <dd className="font-display text-2xl text-porcelain mt-1">
                8 pm
              </dd>
              <dd className="text-xs text-porcelain/50 mt-0.5">closing time</dd>
            </div>
            <div>
              <dt className="eyebrow text-porcelain/50">Community</dt>
              <dd className="font-display text-2xl text-porcelain mt-1">
                Open
              </dd>
              <dd className="text-xs text-porcelain/50 mt-0.5">
                LGBTQ+ friendly
              </dd>
            </div>
          </motion.dl>
        </motion.div>

        {/* Hero visual — clinic image with animated reveal */}
        <motion.div
          className="order-1 lg:order-2 relative"
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="relative h-[360px] sm:h-[460px] lg:h-[560px] rounded-[32px] overflow-hidden">
            <img
              src="/images/dr-aditya.png"
              alt="Dr. Aditya Bhange at Glow & Smile Clinic"
              className="w-full h-full object-cover object-top"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
            {/* Floating badge */}
            <motion.div
              className="absolute bottom-6 left-6 right-6 rounded-2xl bg-porcelain/10 backdrop-blur-md border border-porcelain/20 px-5 py-4 flex items-center gap-4"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <span className="w-10 h-10 rounded-full bg-glow flex items-center justify-center shrink-0">
                {/* Tooth icon */}
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-ink">
                  <path
                    d="M6.5 2C5 2 3 3.5 3 6c0 1.5.5 2.5 1 4 .4 1.2.5 2.5.5 4 0 1.1.9 2 2 2s1.5-.6 2-1.5l.5-1 .5 1c.5.9 1 1.5 2 1.5s2-.9 2-2c0-1.5.1-2.8.5-4 .5-1.5 1-2.5 1-4 0-2.5-2-4-3.5-4C10.7 2 10 2.8 10 2.8S9.3 2 7.8 2H6.5z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <div>
                <p className="font-display text-porcelain text-sm leading-tight">Dr. Aditya Bhange</p>
                <p className="eyebrow text-porcelain/55 mt-0.5">Dental · Hair · Skin</p>
              </div>
              <div className="ml-auto text-right">
                <p className="font-display text-glow text-lg leading-none">{clinic.rating}★</p>
                <p className="text-xs text-porcelain/50 mt-0.5">{clinic.reviewCount} reviews</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
