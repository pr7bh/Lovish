"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right" | "none";
}

export function AnimateSection({
  children,
  className,
  delay = 0,
  from = "bottom",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  const variants = {
    hidden: {
      opacity: 0,
      y: from === "bottom" ? 24 : 0,
      x: from === "left" ? -24 : from === "right" ? 24 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
