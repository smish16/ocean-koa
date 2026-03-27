import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

interface FloatingParticlesProps {
  count?: number;
  type?: "bubbles" | "bioluminescent";
  color?: string;
}

export function FloatingParticles({ 
  count = 20, 
  type = "bubbles",
  color = "rgba(255, 255, 255, 0.6)"
}: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 8,
      size: type === "bubbles" ? 2 + Math.random() * 6 : 1 + Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.5,
    }));
    setParticles(newParticles);
  }, [count, type]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            opacity: particle.opacity,
            boxShadow: type === "bioluminescent" 
              ? `0 0 ${particle.size * 2}px ${color}`
              : 'none',
          }}
          initial={{ y: "120vh" }}
          animate={{ 
            y: "-20vh",
            x: [0, Math.sin(particle.id) * 30, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
            x: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      ))}
    </div>
  );
}
