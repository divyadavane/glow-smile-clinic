"use client";

import { clinic, reviews } from "@/lib/data";
import { motion, useReducedMotion } from "framer-motion";

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1l2.09 4.5 4.91.5-3.7 3.4.98 5.1-4.28-2.6L3.72 14.5l.98-5.1L1 5l4.91-.5L8 1z"
            fill="#D4A054"
          />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion();

  const headerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const listContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0.01 : 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="reviews" className="relative bg-transparent py-24 sm:py-32 overflow-hidden">
      {/* Background layer behind the 3D canvas */}
      <div className="absolute inset-0 bg-porcelain-300 z-0 pointer-events-none" />

      {/* Content layer in front of the 3D canvas */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
          <motion.div 
            className="max-w-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={headerVariants}
          >
            <p className="eyebrow text-glow-dark mb-4">Patient voices</p>
            <h2 className="font-display text-4xl sm:text-5xl text-ink text-balance">
              Read the words patients actually use.
            </h2>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-5 bg-porcelain-100 rounded-2xl border border-ink/10 px-6 py-5 shrink-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={badgeVariants}
          >
            <span className="font-display text-5xl text-ink">
              {clinic.rating}
            </span>
            <div>
              <Stars />
              <p className="text-sm text-ink/60 mt-1">
                from {clinic.reviewCount} Google reviews
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={listContainerVariants}
        >
          {reviews.map((r) => (
            <motion.figure
              key={r.name}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? undefined : {
                y: -6,
                boxShadow: "0 20px 40px -25px rgba(11,43,44,0.22)",
                borderColor: "rgba(212, 160, 84, 0.4)",
                transition: { type: "spring", stiffness: 350, damping: 25 }
              }}
              className="rounded-2xl bg-porcelain-100 border border-ink/10 p-6 flex flex-col transition-colors duration-400 cursor-default"
            >
              <Stars count={r.rating} />
              <blockquote className="mt-4 text-ink/80 leading-relaxed text-[0.95rem]">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-ink/10 text-sm font-semibold text-ink/70">
                {r.name}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
