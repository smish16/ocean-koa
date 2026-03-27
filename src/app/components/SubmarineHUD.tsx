import { motion } from "motion/react";
import { Gauge, Droplet } from "lucide-react";

interface SubmarineHUDProps {
  depth: number;
  pressure: number;
  maxDepth?: number;
  maxPressure?: number;
}

export function SubmarineHUD({
  depth,
  pressure,
  maxDepth = 11000,
  maxPressure = 1100,
}: SubmarineHUDProps) {
  const depthProgress = (depth / maxDepth) * 100;
  const pressureProgress = (pressure / maxPressure) * 100;

  return (
    <>
      {/* Desktop HUD - Top corners */}
      <div className="hidden md:block">
        {/* Depth Meter - Top Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="fixed top-6 left-6 z-50"
        >
          <div className="relative">
            {/* HUD Frame */}
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md border-2 border-cyan-500/50 rounded-lg p-3 shadow-2xl"
              style={{
                boxShadow: "0 0 20px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.1)",
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />

              <div className="flex items-center gap-3">
                <Gauge className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-xs text-cyan-400 uppercase tracking-wider font-mono">
                    Depth
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">
                    {depth.toLocaleString()}
                    <span className="text-sm text-cyan-300 ml-1">m</span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-2 w-48 h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full relative"
                  style={{ width: `${depthProgress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${depthProgress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </motion.div>
              </div>
            </div>

            {/* Scan line effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.1), transparent)",
              }}
              animate={{
                y: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>

        {/* Pressure Meter - Top Right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="fixed top-6 right-6 z-50"
        >
          <div className="relative">
            {/* HUD Frame */}
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md border-2 border-orange-500/50 rounded-lg p-3 shadow-2xl"
              style={{
                boxShadow: "0 0 20px rgba(249, 115, 22, 0.3), inset 0 0 20px rgba(249, 115, 22, 0.1)",
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-orange-400" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-orange-400" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-orange-400" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-orange-400" />

              <div className="flex items-center gap-3">
                <Droplet className="w-5 h-5 text-orange-400" />
                <div>
                  <div className="text-xs text-orange-400 uppercase tracking-wider font-mono">
                    Pressure
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">
                    {pressure.toLocaleString()}
                    <span className="text-sm text-orange-300 ml-1">ATM</span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-2 w-48 h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full relative"
                  style={{ width: `${pressureProgress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pressureProgress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </motion.div>
              </div>
            </div>

            {/* Scan line effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent, rgba(249, 115, 22, 0.1), transparent)",
              }}
              animate={{
                y: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5,
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Mobile HUD - Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
      >
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md border-2 border-cyan-500/50 rounded-lg p-3 shadow-2xl">
          <div className="grid grid-cols-2 gap-4">
            {/* Depth */}
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-[10px] text-cyan-400 uppercase tracking-wider font-mono">
                  Depth
                </div>
                <div className="text-lg font-bold text-white font-mono">
                  {depth.toLocaleString()}
                  <span className="text-xs text-cyan-300 ml-1">m</span>
                </div>
              </div>
            </div>

            {/* Pressure */}
            <div className="flex items-center gap-2">
              <Droplet className="w-4 h-4 text-orange-400" />
              <div>
                <div className="text-[10px] text-orange-400 uppercase tracking-wider font-mono">
                  Pressure
                </div>
                <div className="text-lg font-bold text-white font-mono">
                  {pressure.toLocaleString()}
                  <span className="text-xs text-orange-300 ml-1">ATM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
