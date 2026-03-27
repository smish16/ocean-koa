import { motion } from "motion/react";
import { Activity } from "lucide-react";

interface PressureIndicatorProps {
  pressure: number;
  maxPressure?: number;
}

export function PressureIndicator({ pressure, maxPressure = 1100 }: PressureIndicatorProps) {
  const progress = (pressure / maxPressure) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:block"
    >
      {/* Glassmorphism container */}
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        
        <div className="relative space-y-4">
          {/* Icon */}
          <div className="flex items-center justify-center mb-4">
            <Activity className="w-6 h-6 text-white/80" />
          </div>

          {/* Pressure value */}
          <div className="text-center">
            <div className="text-3xl font-bold text-white tracking-tighter">
              {Math.round(pressure)}
            </div>
            <div className="text-xs text-white/60 uppercase tracking-wider mt-1">
              Atm
            </div>
          </div>

          {/* Vertical pressure bar */}
          <div className="relative w-1 h-48 bg-white/10 rounded-full mx-auto overflow-hidden">
            <motion.div
              className="absolute bottom-0 left-0 right-0 rounded-full"
              style={{ 
                height: `${progress}%`,
                background: `linear-gradient(to top, rgba(239, 68, 68, 0.9), rgba(249, 115, 22, 0.8), rgba(234, 179, 8, 0.7))`
              }}
              initial={{ height: 0 }}
              animate={{ height: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Intense glow effect */}
              <motion.div 
                className="absolute inset-0 blur-md"
                style={{
                  background: `linear-gradient(to top, rgba(239, 68, 68, 0.6), rgba(249, 115, 22, 0.5), rgba(234, 179, 8, 0.4))`
                }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>

          {/* Max pressure label */}
          <div className="text-center text-xs text-white/40 uppercase tracking-wider">
            {maxPressure} Max
          </div>
        </div>
      </div>
    </motion.div>
  );
}
