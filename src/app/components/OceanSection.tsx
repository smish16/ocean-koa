import { ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface OceanSectionProps {
  children: ReactNode;
  backgroundColor: string;
  index: number;
}

export function OceanSection({ children, backgroundColor, index }: OceanSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Create blur transition overlay
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [1, 0, 0, 1]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.1, 1, 0.95]
  );

  return (
    <div ref={ref} className="relative min-h-screen">
      {/* Main section content */}
      <motion.div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundColor,
          scale,
        }}
      >
        {children}
      </motion.div>

      {/* Blur transition overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, 
            transparent 0%, 
            ${backgroundColor}DD 50%,
            ${backgroundColor} 100%
          )`,
          backdropFilter: 'blur(20px)',
          opacity,
        }}
      />
    </div>
  );
}
