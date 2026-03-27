import { motion } from "motion/react";
import { Waves, Activity } from "lucide-react";

interface MobileMetricsProps {
  depth: number;
  pressure: number;
}

export function MobileMetrics({ depth, pressure }: MobileMetricsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden"
    >
      <div className="flex gap-4">
        {/* Depth */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-5 py-3 shadow-2xl">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          <div className="relative flex items-center gap-3">
            <Waves className="w-5 h-5 text-white/80" />
            <div>
              <div className="text-2xl font-bold text-white tracking-tighter">
                {Math.round(depth)}m
              </div>
              <div className="text-[10px] text-white/60 uppercase tracking-wider">
                Depth
              </div>
            </div>
          </div>
        </div>

        {/* Pressure */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-5 py-3 shadow-2xl">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          <div className="relative flex items-center gap-3">
            <Activity className="w-5 h-5 text-white/80" />
            <div>
              <div className="text-2xl font-bold text-white tracking-tighter">
                {Math.round(pressure)}
              </div>
              <div className="text-[10px] text-white/60 uppercase tracking-wider">
                Atm
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
