import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface ZoneIndicatorProps {
  depth: number;
}

export function ZoneIndicator({ depth }: ZoneIndicatorProps) {
  const [currentZone, setCurrentZone] = useState("");
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    let zone = "";
    
    if (depth < 50) {
      zone = "";
    } else if (depth >= 50 && depth < 200) {
      zone = "ENTERING: SUNLIGHT ZONE";
    } else if (depth >= 200 && depth < 1000) {
      zone = "ENTERING: TWILIGHT ZONE";
    } else if (depth >= 1000 && depth < 4000) {
      zone = "ENTERING: MIDNIGHT ZONE";
    } else if (depth >= 4000 && depth < 11000) {
      zone = "ENTERING: ABYSSAL ZONE";
    } else if (depth >= 11000) {
      zone = "ENTERING: THE TRENCH";
    }

    if (zone !== currentZone) {
      setCurrentZone(zone);
      if (zone) {
        setShowIndicator(true);
        const timer = setTimeout(() => setShowIndicator(false), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [depth, currentZone]);

  return (
    <AnimatePresence>
      {showIndicator && currentZone && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed top-24 md:top-32 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="bg-gradient-to-r from-cyan-500/20 via-cyan-400/30 to-cyan-500/20 backdrop-blur-xl border-2 border-cyan-400/50 rounded-full px-6 py-2 shadow-2xl">
            <motion.p
              className="text-sm md:text-base font-bold text-white uppercase tracking-widest font-mono"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {currentZone}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
