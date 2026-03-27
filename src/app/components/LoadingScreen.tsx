import { motion } from "motion/react";
import { Waves } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-b from-cyan-500 to-blue-600 z-[200] flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 1500);
      }}
    >
      <div className="text-center">
        {/* Animated waves icon */}
        <motion.div
          className="mb-6 flex justify-center"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <Waves className="w-16 h-16 text-white" />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Ocean Odyssey
        </motion.h2>

        {/* Loading text */}
        <motion.p
          className="text-white/80 text-lg font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Preparing dive...
        </motion.p>

        {/* Loading bar */}
        <div className="mt-8 w-64 h-1 bg-white/20 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Floating bubbles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "-5%",
          }}
          animate={{
            y: [0, -window.innerHeight * 1.1],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </motion.div>
  );
}
