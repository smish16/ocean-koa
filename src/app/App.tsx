import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { KoaCharacter } from "./components/KoaCharacter";
import { SubmarineHUD } from "./components/SubmarineHUD";
import { CreatureCard } from "./components/CreatureCard";
import { MarineSnow } from "./components/MarineSnow";
import { LightRays } from "./components/LightRays";
import { ScrollIndicator } from "./components/ScrollIndicator";
import { GrainOverlay } from "./components/GrainOverlay";
import { HeroDiveCanvas } from "./components/HeroDiveCanvas";
import { ZoneIndicator } from "./components/ZoneIndicator";
import { LoadingScreen } from "./components/LoadingScreen";

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Calculate depth and pressure based on scroll
  const depth = Math.round(scrollProgress * 11000);
  const pressure = Math.round(scrollProgress * 1100 + 1);

  // Transform scroll to different color stops
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      "#00BCD4", // Cyan (surface)
      "#0277BD", // Ocean Blue (sunlight zone)
      "#1565C0", // Deep blue (twilight zone)
      "#283593", // Indigo (midnight zone)
      "#1A237E", // Deep Indigo (abyssal zone)
      "#000000", // Pure black (deepest)
    ]
  );

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.div
        className="relative w-full overflow-x-hidden"
        style={{ backgroundColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Fixed UI Elements */}
        <SubmarineHUD depth={depth} pressure={pressure} />
        <ZoneIndicator depth={depth} />
        <GrainOverlay />

        {/* Hero Section - Ocean Surface */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <KoaCharacter showSpeechBubble={scrollProgress < 0.05} />
          {/* Canvas animation background */}
          <HeroDiveCanvas />

          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 -z-10"
            style={{
              background: "linear-gradient(to bottom, #00BCD4 0%, #0097A7 50%, #0277BD 100%)",
            }}
          />

          {/* Light rays from surface */}
          <LightRays />

          {/* Marine snow */}
          <MarineSnow count={30} speed="slow" depth={depth} />

          {/* Hero text */}
          <div className="relative z-10 text-center px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            >
              <motion.div
                className="text-cyan-600 text-sm md:text-base uppercase tracking-[0.3em] mb-4 font-mono"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Ocean Odyssey
              </motion.div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight mb-4"
                style={{
                  textShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
                }}
              >
                The Great Descent
                <br />
                <span className="text-cyan-400">with Koa</span>
              </h1>
              <motion.p
                className="text-lg md:text-xl text-white/90 tracking-wide max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, type: "spring" }}
              >
                Dive from the sunlit shore to the deepest abyss
              </motion.p>
            </motion.div>
          </div>

          <ScrollIndicator />
        </section>

        {/* Sunlight Zone - 0-200m */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, #0277BD 0%, #1565C0 100%)",
            }}
          />

          {/* Light rays */}
          <LightRays />

          {/* Marine snow */}
          <MarineSnow count={40} speed="medium" depth={200} />

          <CreatureCard
            name="Sunny the Turtle"
            scientificName="Chelonia mydas"
            funFact="Sea turtles can hold their breath for hours! They slow their heart rate to conserve oxygen while diving deep."
            emoji="🐢"
            position="right"
            depth="50m"
            temperature="20°C"
          />

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="text-cyan-300 text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-mono">
                0-200m Deep
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">
                The Epipelagic
              </h2>
              <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-xl mx-auto">
                Where light penetrates and life thrives. Koa meets Sunny the Turtle
                in this vibrant zone that hosts 90% of all marine life.
              </p>
            </motion.div>
          </div>

          {/* Blur transition */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, #1A5F9EDD)",
              backdropFilter: "blur(30px)",
            }}
          />
        </section>

        {/* Twilight Zone - 200-1000m */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, #1565C0 0%, #283593 100%)",
            }}
          />

          {/* Marine snow */}
          <MarineSnow count={35} speed="medium" depth={600} />

          <CreatureCard
            name="Glow the Jellyfish"
            scientificName="Pelagia noctiluca"
            funFact="This jellyfish glows in the dark! It produces bioluminescent light to confuse predators and attract prey."
            emoji="🪼"
            position="left"
            depth="600m"
            temperature="5°C"
          />

          {/* Glowing particles */}
          <motion.div
            className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(147, 197, 253, 0.4), transparent)",
              filter: "blur(30px)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="text-blue-300 text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-mono">
                200-1,000m Deep
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">
                The Mesopelagic
              </h2>
              <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-xl mx-auto">
                Light fades into perpetual dusk. Koa meets Glow the Jellyfish as
                mysterious creatures begin to illuminate the darkness.
              </p>
            </motion.div>
          </div>

          {/* Blur transition */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, #0D3B66DD)",
              backdropFilter: "blur(30px)",
            }}
          />
        </section>

        {/* Midnight Zone - 1000-4000m */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, #283593 0%, #1A237E 100%)",
            }}
          />

          {/* Marine snow - slower and sparser */}
          <MarineSnow count={20} speed="slow" depth={2500} />

          <CreatureCard
            name="Sparky the Anglerfish"
            scientificName="Melanocetus johnsonii"
            funFact="The anglerfish's glowing lure is actually a fishing rod! It dangles a bioluminescent bulb to attract prey in the pitch-black depths."
            emoji="🐟"
            position="right"
            depth="2,500m"
            temperature="2°C"
          />

          {/* Multiple glowing orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(100, 255, 218, 0.3), transparent)",
              filter: "blur(40px)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(138, 43, 226, 0.3), transparent)",
              filter: "blur(35px)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="text-cyan-300 text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-mono">
                1,000-4,000m Deep
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">
                The Bathypelagic
              </h2>
              <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-xl mx-auto">
                Pitch black. Eternal darkness reigns. Koa meets Sparky the Anglerfish
                where only bioluminescence pierces the void.
              </p>
            </motion.div>
          </div>

          {/* Blur transition */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, #051923DD)",
              backdropFilter: "blur(30px)",
            }}
          />
        </section>

        {/* The Trench - 11,000m (Hadal Zone) */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, #1A237E 0%, #000000 100%)",
            }}
          />
          {/* Very sparse marine snow */}
          <MarineSnow count={10} speed="slow" depth={11000} />

          <CreatureCard
            name="Squishy the Dumbo Octopus"
            scientificName="Grimpoteuthis"
            funFact="Named after Disney's Dumbo! Its ear-like fins help it glide through the deepest ocean trenches where few creatures dare to go."
            emoji="🐙"
            position="left"
            depth="11,000m"
            temperature="1°C"
          />

          {/* Single faint glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(100, 255, 218, 0.15), transparent)",
              filter: "blur(50px)",
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="text-gray-500 text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-mono">
                11,000m Deep
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">
                The Hadal Abyss
              </h2>
              <p className="text-base md:text-lg text-white/70 leading-relaxed mb-6 max-w-xl mx-auto">
                The ocean trenches. Koa reaches the seabed and meets Squishy the
                Dumbo Octopus. Where the Earth swallows itself.
              </p>
              <motion.div
                className="text-gray-600 text-sm font-mono"
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                [ END OF JOURNEY ]
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Final spacer */}
        <div className="h-screen bg-black" />
      </motion.div>
    </>
  );
}