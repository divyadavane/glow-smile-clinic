"use client";

import { clinic } from "@/lib/data";
import { motion, useReducedMotion } from "framer-motion";
import AppointmentForm from "./AppointmentForm";

export default function ContactLocation() {
  const shouldReduceMotion = useReducedMotion();

  const headerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const mapVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const detailsContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0.01 : 0.1,
        delayChildren: shouldReduceMotion ? 0.01 : 0.15,
      },
    },
  };

  const detailCardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="contact" className="relative bg-transparent py-24 sm:py-32 overflow-hidden">
      {/* Background layer behind the 3D canvas */}
      <div className="absolute inset-0 bg-ink z-0 pointer-events-none" />

      {/* Decorative glows */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-bloom/[0.08] blur-3xl z-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content layer in front of the 3D canvas */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          className="max-w-2xl mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <p className="eyebrow text-glow-light mb-4">Visit the clinic</p>
          <h2 className="font-display text-4xl sm:text-5xl text-porcelain text-balance">
            Find us in Masoli, or call ahead.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Map + details */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <motion.div
              className="rounded-[24px] overflow-hidden border border-porcelain/10 h-72 sm:h-96"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={mapVariants}
            >
              <iframe
                title="Map to Dr Adidx Glow & Smile Clinic"
                src={`https://maps.google.com/maps?q=${clinic.mapsQuery}&output=embed`}
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0, filter: "grayscale(0.15) contrast(1.05)" }}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={detailsContainerVariants}
            >
              <motion.div
                className="rounded-2xl bg-porcelain/[0.04] border border-porcelain/10 p-6"
                variants={detailCardVariants}
              >
                <p className="eyebrow text-porcelain/45 mb-3">Address</p>
                <p className="text-porcelain/85 leading-relaxed">
                  {clinic.address}
                </p>
                <a
                  href={`https://maps.google.com/maps?q=${clinic.mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-glow-light mt-4"
                >
                  Get directions
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </motion.div>

              <motion.div
                className="rounded-2xl bg-porcelain/[0.04] border border-porcelain/10 p-6"
                variants={detailCardVariants}
              >
                <p className="eyebrow text-porcelain/45 mb-3">Hours</p>
                <ul className="space-y-2">
                  {clinic.hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex justify-between text-sm text-porcelain/85"
                    >
                      <span className="text-porcelain/55">{h.day}</span>
                      <span className="font-medium">{h.time}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-glow-light font-semibold">
                  <span className="w-2 h-2 rounded-full bg-glow animate-pulse" />
                  {clinic.hoursToday}
                </p>
              </motion.div>
            </motion.div>

            <motion.a
              href={clinic.phoneHref}
              className="rounded-2xl bg-glow text-ink px-6 py-5 flex items-center justify-between hover:bg-glow-light transition-colors"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={detailCardVariants}
              whileHover={shouldReduceMotion ? undefined : {
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 20 }
              }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <span>
                <span className="eyebrow block mb-1 opacity-70">
                  Prefer to talk?
                </span>
                <span className="font-display text-2xl">{clinic.phone}</span>
              </span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3 0 .7-.2 1l-2.2 2.3z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
          </div>

          {/* Form */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={formVariants}
          >
            <div className="rounded-[24px] bg-porcelain-100 p-7 sm:p-8">
              <h3 className="font-display text-2xl text-ink mb-1.5">
                Request an appointment
              </h3>
              <p className="text-ink/55 text-sm mb-7">
                Share your details and we&apos;ll confirm a time that works.
              </p>
              <AppointmentForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
