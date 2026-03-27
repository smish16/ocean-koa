import { motion } from "motion/react";
import { Waves } from "lucide-react";

interface DepthMeterProps {
  depth: number;
  maxDepth?: number;
}

export function DepthMeter({ depth, maxDepth = 11000 }: DepthMeterProps) {
  const progress = (depth / maxDepth) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:block"
    >
      {/* Glassmorphism container */}
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        
        <div className="relative space-y-4">
          {/* Icon */}
          <div className="flex items-center justify-center mb-4">
            <Waves className="w-6 h-6 text-white/80" />
          </div>

          {/* Depth value */}
          <div className="text-center">
            <div className="text-3xl font-bold text-white tracking-tighter">
              {Math.round(depth)}m
            </div>
            <div className="text-xs text-white/60 uppercase tracking-wider mt-1">
              Depth
            </div>
          </div>

          {/* Vertical progress bar */}
          <div className="relative w-1 h-48 bg-white/10 rounded-full mx-auto overflow-hidden">
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-400 via-blue-400 to-blue-600 rounded-full"
              style={{ height: `${progress}%` }}
              initial={{ height: 0 }}
              animate={{ height: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-white/20 blur-sm" />
            </motion.div>
            
            {/* Progress indicator dot */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
              style={{ 
                top: `${100 - progress}%`,
                boxShadow: '0 0 10px rgba(255,255,255,0.8)'
              }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Max depth label */}
          <div className="text-center text-xs text-white/40 uppercase tracking-wider">
            {maxDepth}m Max
          </div>
        </div>
      </div>
    </motion.div>
  );
}
