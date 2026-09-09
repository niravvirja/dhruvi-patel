import { motion } from "motion/react";

/**
 * Menu label that rolls upward on hover while a duplicate rises into place.
 */
export function RollingLabel({ label }: { label: string }) {
  return (
    <span className="relative block h-[1.35em] overflow-hidden">
      <motion.span
        className="block"
        variants={{ rest: { y: "0%" }, hover: { y: "-50%" } }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="block h-[1.35em] leading-[1.35em]">{label}</span>
        <span className="block h-[1.35em] leading-[1.35em]">{label}</span>
      </motion.span>
    </span>
  );
}
