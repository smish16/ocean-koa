import { useState, useEffect, useRef } from "react";
import { motion, useSpring } from "motion/react";
import koaImage from "../../assets/koa.png";

interface KoaCharacterProps {
  showSpeechBubble?: boolean;
}

export function KoaCharacter({ showSpeechBubble = false }: KoaCharacterProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const koaRef = useRef<HTMLDivElement>(null);

  // Smooth spring animations for eye movement
  const eyeX = useSpring(0, { stiffness: 150, damping: 15 });
  const eyeY = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (koaRef.current) {
        const rect = koaRef.current.getBoundingClientRect();
        const koaCenterX = rect.left + rect.width / 2;
        const koaCenterY = rect.top + rect.height / 2;

        // Calculate angle and distance from Koa to cursor
        const deltaX = e.clientX - koaCenterX;
        const deltaY = e.clientY - koaCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 50, 8);

        // Move pupils based on cursor position (limited range)
        eyeX.set(Math.cos(angle) * distance);
        eyeY.set(Math.sin(angle) * distance);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [eyeX, eyeY]);

  return (
    <div
      ref={koaRef}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-auto cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Koa Image */}
      <motion.div
        className="relative w-32 h-32 md:w-48 md:h-48"
        animate={{
          y: [-8, 8, -8],
          rotate: [-2, 2, -2],
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.3, ease: "easeOut" },
        }}
      >
        <img
          src={koaImage}
          alt="Koa the Ocean Explorer"
          className="w-full h-full object-contain drop-shadow-2xl"
        />

        {/* Animated pupils overlay (for eye tracking effect) */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            x: eyeX,
            y: eyeY,
          }}
        >
          {/* Left pupil highlight */}
          <div
            className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full opacity-80"
            style={{
              left: "37%",
              top: "32%",
              transform: "translate(-50%, -50%)",
            }}
          />
          {/* Right pupil highlight */}
          <div
            className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full opacity-80"
            style={{
              left: "63%",
              top: "32%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </motion.div>

        {/* Breathing/bobbing bubbles */}
        <motion.div
          className="absolute -top-4 -right-2 w-3 h-3 bg-white/40 rounded-full"
          animate={{
            y: [-20, -40],
            opacity: [0.4, 0],
            scale: [0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.div
          className="absolute -top-2 -left-1 w-2 h-2 bg-white/30 rounded-full"
          animate={{
            y: [-15, -35],
            opacity: [0.3, 0],
            scale: [0.5, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5,
          }}
        />
      </motion.div>

      {/* Speech Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{
          opacity: isHovered || showSpeechBubble ? 1 : 0,
          scale: isHovered || showSpeechBubble ? 1 : 0.8,
          y: isHovered || showSpeechBubble ? 0 : 10,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute -top-24 md:-top-28 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
      >
        <div className="relative bg-white rounded-2xl px-5 py-3 md:px-6 md:py-3 shadow-xl border-2 border-cyan-400">
          <p className="text-sm md:text-base font-bold text-gray-800">
            Hi, I'm Koa! Ready to explore? 🌊
          </p>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-cyan-400 transform rotate-45" />
        </div>
      </motion.div>

      {/* Glow effect when hovered */}
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl -z-10"
        animate={{
          opacity: isHovered ? 0.7 : 0.3,
          scale: isHovered ? 1.3 : 1.1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: "radial-gradient(circle, rgba(129, 230, 217, 0.8), transparent 70%)",
        }}
      />
    </div>
  );
}