import { motion } from "motion/react";

interface LightRay {
  id: number;
  x: number;
  width: number;
  opacity: number;
  delay: number;
}

export function LightRays() {
  const rays: LightRay[] = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: (i * 15) + Math.random() * 10,
    width: 40 + Math.random() * 80,
    opacity: 0.1 + Math.random() * 0.2,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {rays.map((ray) => (
        <motion.div
          key={ray.id}
          className="absolute top-0 origin-top"
          style={{
            left: `${ray.x}%`,
            width: ray.width,
            height: '100%',
            background: `linear-gradient(to bottom, 
              rgba(255, 255, 255, ${ray.opacity}), 
              rgba(100, 200, 255, ${ray.opacity * 0.6}) 40%,
              transparent 80%
            )`,
            transform: 'skewX(-8deg)',
            filter: 'blur(20px)',
          }}
          animate={{
            opacity: [ray.opacity, ray.opacity * 0.5, ray.opacity],
            scaleX: [1, 1.1, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: ray.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
