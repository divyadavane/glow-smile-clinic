"use client";

import { motion, useReducedMotion } from "framer-motion";

const philosophy = [
  {
    label: "Explain first",
    detail:
      "You'll always understand what's happening in your mouth or on your skin, and why, before a single instrument comes out.",
  },
  {
    label: "Treat gently",
    detail:
      "Techniques and pacing are adjusted for anxious patients and children — comfort is part of the treatment plan, not an afterthought.",
  },
  {
    label: "Respect fully",
    detail:
      "Every patient is welcomed exactly as they are, regardless of identity, background, or how many questions they need to ask.",
  },
];

export default function AboutDoctor() {
  const shouldReduceMotion = useReducedMotion();

  const photoVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const philosophyContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0.01 : 0.12,
      },
    },
  };

  const philosophyCard = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="doctor" className="relative bg-transparent py-24 sm:py-32 overflow-hidden">
      {/* Background layer behind the 3D canvas */}
      <div className="absolute inset-0 bg-ink z-0 pointer-events-none" />

      {/* Decorative glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-glow/[0.06] blur-3xl z-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content layer in front of the 3D canvas */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-5 gap-14 items-start">
        <motion.div 
          className="lg:col-span-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={photoVariants}
        >
          {/* Custom generated image portrait of the doctor */}
          <div className="aspect-[4/5] rounded-[28px] bg-gradient-to-br from-ink-600 to-ink-700 border border-porcelain/10 relative overflow-hidden group shadow-lg">
            <img
              src="/images/dr-aditya.png"
              alt="Dr. Aditya Bhange"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

        <div className="lg:col-span-3">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textVariants}
          >
            <p className="eyebrow text-glow-light mb-4">Meet your doctor</p>
            <h2 className="font-display text-4xl sm:text-5xl text-porcelain text-balance">
              Dr. Aditya Bhange
            </h2>
            <p className="mt-6 text-porcelain/75 text-lg leading-relaxed max-w-xl">
              Dr. Aditya founded Glow &amp; Smile Clinic to bring hospital-level
              dental, hair, and skin care to Dahanu without the cold,
              transactional feel that keeps people from seeking treatment
              early. He&apos;s known locally for a quiet, humble manner — the kind
              of doctor who sits down, listens fully, and only then reaches
              for a plan.
            </p>
            <p className="mt-4 text-porcelain/75 text-lg leading-relaxed max-w-xl">
              His patients consistently describe the same thing: clarity. No
              rushed appointments, no unexplained procedures — just a steady,
              experienced hand and a habit of treating every question as
              worth answering properly.
            </p>
          </motion.div>

          <motion.div 
            className="mt-10 grid sm:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={philosophyContainer}
          >
            {philosophy.map((p, i) => (
              <motion.div
                key={p.label}
                variants={philosophyCard}
                whileHover={shouldReduceMotion ? undefined : {
                  y: -5,
                  backgroundColor: "rgba(250, 247, 241, 0.08)",
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="rounded-2xl border border-porcelain/10 p-5 bg-porcelain/[0.03] transition-colors duration-300 cursor-default"
              >
                <span className="font-mono text-xs text-glow-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg text-porcelain mt-2 mb-2">
                  {p.label}
                </h3>
                <p className="text-porcelain/60 text-sm leading-relaxed">
                  {p.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
