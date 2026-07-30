"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * ClinicCursor — A custom cursor with:
 * - A small "tooth" SVG dot that sits exactly at the pointer
 * - A soft golden-glow ring that lazily trails behind with spring physics
 * - Context-aware label that appears when hovering CTAs ("Book", "Call", etc.)
 * - Hidden on touch devices (pointer: coarse)
 * - Fully disabled when prefers-reduced-motion is active
 */
export default function ClinicCursor() {
  const shouldReduceMotion = useReducedMotion();
  const isMounted = useRef(false);
  const isTouch = useRef(false);

  // Raw pointer position — updated instantly
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Trailing ring uses spring physics for a soft lag effect
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.4 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.4 });

  // Label state — displayed when hovering interactive elements
  const labelRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    isMounted.current = true;

    // Detect touch devices — hide cursor on touch
    isTouch.current = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch.current || shouldReduceMotion) return;

    // Hide the native OS cursor
    document.documentElement.style.cursor = "none";

    const onMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onEnterInteractive = (e: Event) => {
      const el = e.target as HTMLElement;
      const isBtn = el.matches("a, button, [role='button']");
      if (!isBtn) return;

      const label = el.getAttribute("data-cursor") || el.textContent?.trim().slice(0, 10) || "";
      if (labelRef.current) labelRef.current.textContent = label;
      if (dotRef.current) dotRef.current.classList.add("cursor-active");
      if (ringRef.current) ringRef.current.classList.add("cursor-active");
    };

    const onLeaveInteractive = () => {
      if (labelRef.current) labelRef.current.textContent = "";
      if (dotRef.current) dotRef.current.classList.remove("cursor-active");
      if (ringRef.current) ringRef.current.classList.remove("cursor-active");
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onEnterInteractive);
    document.addEventListener("pointerout", onLeaveInteractive);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onEnterInteractive);
      document.removeEventListener("pointerout", onLeaveInteractive);
    };
  }, [mouseX, mouseY, shouldReduceMotion]);

  // Don't render on SSR or reduced-motion
  if (shouldReduceMotion) return null;

  return (
    <>
      {/* Trailing soft glow ring — follows with spring lag */}
      <motion.div
        ref={ringRef}
        aria-hidden="true"
        className="clinic-cursor-ring"
        style={{
          translateX: ringX,
          translateY: ringY,
        }}
      />

      {/* Dot — sits exactly at the pointer tip */}
      <motion.div
        ref={dotRef}
        aria-hidden="true"
        className="clinic-cursor-dot"
        style={{
          translateX: mouseX,
          translateY: mouseY,
        }}
      >
        {/* Tooth SVG icon */}
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M6.5 2C5 2 3 3.5 3 6c0 1.5.5 2.5 1 4 .4 1.2.5 2.5.5 4 0 1.1.9 2 2 2s1.5-.6 2-1.5l.5-1 .5 1c.5.9 1 1.5 2 1.5s2-.9 2-2c0-1.5.1-2.8.5-4 .5-1.5 1-2.5 1-4 0-2.5-2-4-3.5-4C10.7 2 10 2.8 10 2.8S9.3 2 7.8 2H6.5z"
            fill="currentColor"
          />
        </svg>
        <span ref={labelRef} className="cursor-label" />
      </motion.div>
    </>
  );
}
