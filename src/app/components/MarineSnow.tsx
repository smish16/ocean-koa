import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface MarineSnowProps {
  count?: number;
  speed?: "slow" | "medium" | "fast";
  depth?: number;
}

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  sway: number;
}

export function MarineSnow({ count = 50, speed = "medium", depth = 0 }: MarineSnowProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const speedMultiplier = speed === "fast" ? 0.5 : speed === "slow" ? 2 : 1;
    
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: (10 + Math.random() * 10) * speedMultiplier,
      size: 1 + Math.random() * 2,
      opacity: 0.2 + Math.random() * 0.4,
      sway: 20 + Math.random() * 30,
    }));
    setParticles(newParticles);
  }, [count, speed]);

  // Adjust particle appearance based on depth
  const getParticleColor = () => {
    if (depth < 200) return "rgba(255, 255, 255, 0.8)";
    if (depth < 1000) return "rgba(200, 230, 255, 0.6)";
    if (depth < 4000) return "rgba(100, 200, 255, 0.4)";
    return "rgba(100, 255, 218, 0.3)";
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-[1px]"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: getParticleColor(),
            opacity: particle.opacity,
          }}
          initial={{ y: "120vh", x: 0 }}
          animate={{
            y: "-20vh",
            x: [0, particle.sway, -particle.sway, 0],
          }}
          transition={{
            y: {
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            },
            x: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      ))}
    </div>
  );
}
