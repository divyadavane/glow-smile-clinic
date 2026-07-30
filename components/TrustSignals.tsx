"use client";

import { trustSignals } from "@/lib/data";
import { motion, useReducedMotion } from "framer-motion";

const icons = [
  // sterilisation
  <path
    key="s"
    d="M12 2v6M8 5l1.5 2.5M16 5l-1.5 2.5M4 12h16M6 12v6a2 2 0 002 2h8a2 2 0 002-2v-6"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  // pride / inclusivity
  <path
    key="l"
    d="M12 21s-7-4.35-9.5-8.5C.8 8.9 2.6 5 6.2 5c2 0 3.2 1.1 3.8 2 .6-.9 1.8-2 3.8-2 3.6 0 5.4 3.9 3.7 7.5C19 16.65 12 21 12 21z"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  // equipment
  <path
    key="e"
    d="M4 6h16M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2M9 12h6"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  // pricing
  <path
    key="p"
    d="M12 2v20M17 6H9.5a2.5 2.5 0 000 5h5a2.5 2.5 0 010 5H6"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
];

export default function TrustSignals() {
  const shouldReduceMotion = useReducedMotion();

  const headerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const gridContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0.01 : 0.1,
      },
    },
  };

  const cellVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="trust" className="relative bg-transparent py-24 sm:py-32 overflow-hidden">
      {/* Background layer behind the 3D canvas */}
      <div className="absolute inset-0 bg-porcelain z-0 pointer-events-none" />

      {/* Content layer in front of the 3D canvas */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          className="max-w-2xl mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <p className="eyebrow text-glow-dark mb-4">Why patients stay</p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink text-balance">
            Small studio care, hospital-grade standards.
          </h2>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 rounded-[28px] overflow-hidden border border-ink/10 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={gridContainerVariants}
        >
          {trustSignals.map((t, i) => (
            <motion.div
              key={t.title}
              variants={cellVariants}
              className="bg-porcelain-100 p-8 flex flex-col gap-5 hover:bg-porcelain-200 transition-colors duration-300"
            >
              <motion.span
                className="w-11 h-11 rounded-full bg-ink flex items-center justify-center text-glow-light"
                whileHover={shouldReduceMotion ? undefined : {
                  rotate: [0, -8, 8, 0],
                  transition: { duration: 0.5, ease: "easeInOut" }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  {icons[i]}
                </svg>
              </motion.span>
              <div>
                <h3 className="font-display text-lg text-ink mb-2">
                  {t.title}
                </h3>
                <p className="text-sm text-ink/60 leading-relaxed">
                  {t.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
