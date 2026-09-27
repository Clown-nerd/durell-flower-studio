import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -8% 0px" }}
      transition={reduceMotion ? undefined : { duration: 0.76, delay: delay / 1000, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

