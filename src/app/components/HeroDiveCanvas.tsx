import { useRef, useEffect } from "react";
import { motion } from "motion/react";

export function HeroDiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Animation variables
    let animationId: number;
    let ripples: Array<{ x: number; y: number; radius: number; maxRadius: number; alpha: number }> = [];
    let time = 0;

    // Create ripple effect
    const createRipple = () => {
      if (Math.random() < 0.05) {
        ripples.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.3,
          radius: 0,
          maxRadius: 50 + Math.random() * 100,
          alpha: 0.3 + Math.random() * 0.3,
        });
      }
    };

    // Animate
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw water surface gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(135, 206, 235, 0.1)");
      gradient.addColorStop(0.5, "rgba(79, 168, 213, 0.05)");
      gradient.addColorStop(1, "rgba(46, 134, 193, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw caustic light patterns
      time += 0.01;
      ctx.save();
      ctx.globalAlpha = 0.1;
      for (let i = 0; i < 5; i++) {
        const x = (Math.sin(time + i) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.7 + i) * 0.3 + 0.3) * canvas.height * 0.4;
        const size = 100 + Math.sin(time + i) * 50;

        const lightGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        lightGradient.addColorStop(0, "rgba(255, 255, 255, 0.6)");
        lightGradient.addColorStop(0.5, "rgba(100, 200, 255, 0.3)");
        lightGradient.addColorStop(1, "rgba(100, 200, 255, 0)");

        ctx.fillStyle = lightGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.restore();

      // Draw ripples
      createRipple();
      ripples = ripples.filter((ripple) => {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.alpha * (1 - ripple.radius / ripple.maxRadius)})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ripple.radius += 1.5;
        return ripple.radius < ripple.maxRadius;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  );
}
