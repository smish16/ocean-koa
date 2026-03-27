import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "motion/react";
import { Sparkles, X } from "lucide-react";

interface CreatureCardProps {
  name: string;
  scientificName: string;
  funFact: string;
  emoji: string;
  position?: "left" | "right";
  depth?: string;
  temperature?: string;
}

export function CreatureCard({
  name,
  scientificName,
  funFact,
  emoji,
  position = "right",
  depth = "Unknown",
  temperature = "Unknown",
}: CreatureCardProps) {
  const [isScanned, setIsScanned] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Effect
  const x = useSpring(0, { stiffness: 300, damping: 30, mass: 0.5 });
  const y = useSpring(0, { stiffness: 300, damping: 30, mass: 0.5 });

  const rotateX = useTransform(y, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`absolute ${
        position === "left" ? "left-4 md:left-16" : "right-4 md:right-16"
      } top-1/4 z-30 perspective-1000`}
      initial={{ opacity: 0, x: position === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* Creature Display - 3D Hotspot */}
      <motion.div
        ref={cardRef}
        className="relative group cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsScanned(!isScanned)}
      >
        {/* Glowing Aura */}
        <div className="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <motion.div
          className="text-6xl md:text-8xl select-none relative z-10"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(50px)" }}
        >
          {emoji}
        </motion.div>

        {/* Explore Button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setIsScanned(!isScanned);
          }}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-2 text-xs md:text-sm font-semibold shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all flex items-center gap-2 pointer-events-auto"
          style={{ transform: "translateZ(30px)" }}
        >
          <Sparkles className="w-4 h-4 text-cyan-300" />
          {isScanned ? "Close" : "Explore"}
        </motion.button>
      </motion.div>

      {/* Premium Glassmorphism Info Card */}
      <AnimatePresence>
        {isScanned && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, rotateX: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, rotateX: -10 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={`absolute top-28 md:top-36 ${
              position === "left" ? "left-0 origin-top-left" : "right-0 origin-top-right"
            } w-80 md:w-96 max-w-[calc(100vw-2rem)] pointer-events-auto`}
          >
            <div className="backdrop-blur-2xl bg-slate-900/40 rounded-3xl p-6 shadow-2xl border border-white/10 relative overflow-hidden group">
              {/* Internal subtle gradient glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              <button
                onClick={() => setIsScanned(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex flex-col mb-4 relative z-10">
                <h3 className="font-bold text-white text-xl md:text-2xl tracking-tight drop-shadow-md">{name}</h3>
                <p className="text-sm text-cyan-300 italic flex items-center gap-2 mt-1">
                  {scientificName}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
                <div className="bg-white/5 rounded-2xl p-3 border border-white/5 backdrop-blur-sm">
                  <span className="text-white/50 text-[10px] uppercase tracking-wider block mb-1">Depth</span>
                  <span className="text-white font-medium text-sm">{depth}</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-3 border border-white/5 backdrop-blur-sm">
                  <span className="text-white/50 text-[10px] uppercase tracking-wider block mb-1">Temp</span>
                  <span className="text-white font-medium text-sm">{temperature}</span>
                </div>
              </div>

              {/* Fun Fact */}
              <div className="relative z-10">
                <p className="text-sm text-white/80 leading-relaxed font-light">{funFact}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}