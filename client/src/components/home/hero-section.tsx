import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Transform Your Ideas Into{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7c5cff] to-[#FF6B6B]">
              Stunning Artwork
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl"
          >
            Create unique AI-generated art in seconds. Express your creativity,
            customize your style, and bring beautiful prints to your walls.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/create">
              <Button size="lg" className="bg-gradient-to-r from-[#7c5cff] to-[#9370FF] hover:from-[#6a4aff] hover:to-[#8560FF] text-white px-8 py-6 rounded-full text-lg">
                Create Your Masterpiece
              </Button>
            </Link>
            <Link href="/gallery">
              <Button size="lg" variant="outline" className="px-8 py-6 rounded-full text-lg border-2 border-[#7c5cff] text-[#7c5cff] hover:bg-[#7c5cff]/10">
                Explore Gallery
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#f5f0ff] to-white dark:from-neutral-900 dark:to-neutral-900"></div>
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-gradient-to-tr from-[#7c5cff]/10 to-transparent filter blur-xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${200 + Math.random() * 200}px`,
              height: `${200 + Math.random() * 200}px`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ))}
      </div>
    </section>
  );
}
