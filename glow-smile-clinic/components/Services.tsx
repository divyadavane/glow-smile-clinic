"use client";

import { services } from "@/lib/data";
import { motion, useReducedMotion } from "framer-motion";

const accentMap: Record<string, { bg: string; text: string; ring: string }> = {
  ink: { bg: "bg-ink", text: "text-porcelain", ring: "ring-ink/15" },
  sage: { bg: "bg-sage", text: "text-ink", ring: "ring-sage/25" },
  bloom: { bg: "bg-bloom", text: "text-ink", ring: "ring-bloom/25" },
};

const imageMap: Record<string, string> = {
  dental: "/images/dental-care.png",
  hair: "/images/hair-treatment.png",
  skin: "/images/skin-care.png",
};

export default function Services() {
  const shouldReduceMotion = useReducedMotion();

  const headerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const cardContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0.01 : 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="services" className="relative bg-transparent py-24 sm:py-32 overflow-hidden">
      {/* Background layer behind the 3D canvas */}
      <div className="absolute inset-0 bg-porcelain z-0 pointer-events-none" />

      {/* Content layer in front of the 3D canvas */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <p className="eyebrow text-glow-dark mb-4">What we treat</p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink text-balance">
            Three practices, one unhurried approach.
          </h2>
          <p className="mt-5 text-ink/65 text-lg leading-relaxed">
            Every visit starts with listening. Whether it's a chipped tooth,
            thinning hair, or a skin concern you've been putting off, Dr.
            Aditya walks you through the reasoning before recommending a
            plan.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={cardContainerVariants}
        >
          {services.map((service) => {
            const accent = accentMap[service.accent];
            return (
              <motion.article
                key={service.id}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? undefined : {
                  y: -8,
                  boxShadow: "0 30px 60px -25px rgba(11,43,44,0.18)",
                  transition: { type: "spring", stiffness: 350, damping: 25 }
                }}
                className="group relative rounded-[28px] border border-ink/10 bg-porcelain-100 p-8 flex flex-col transition-shadow duration-500"
              >
                <div
                  className={`absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ring-1 ${accent.ring}`}
                  aria-hidden="true"
                />
                
                {/* Custom Generated Image with scale effect on hover */}
                <div className="relative w-full aspect-[4/3] rounded-2xl mb-7 overflow-hidden bg-porcelain-300">
                  <img
                    src={imageMap[service.id]}
                    alt={service.tag}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent pointer-events-none" />
                </div>

                <p className={`eyebrow text-ink/45 mb-2`}>{service.tag}</p>
                <h3 className="font-display text-2xl text-ink mb-3 leading-snug">
                  {service.title}
                </h3>
                <p className="text-ink/65 leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="mt-auto space-y-2.5 pt-5 border-t border-ink/10">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-ink/75"
                    >
                      <svg
                        className="mt-1 shrink-0"
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          d="M2 6.5L5 9.5L11 3.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-glow-dark"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:gap-3 transition-all"
                >
                  Ask about {service.tag.toLowerCase()}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
