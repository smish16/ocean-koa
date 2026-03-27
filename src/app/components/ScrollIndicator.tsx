import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <div className="text-white/60 text-sm uppercase tracking-widest">Scroll</div>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="w-6 h-6 text-white/60" />
      </motion.div>
    </motion.div>
  );
}
