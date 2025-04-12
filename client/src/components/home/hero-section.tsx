import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { frameImages } from "@/config/frame-images";

const GRADIENT_COLORS = {
  primary: {
    from: "[#7c5cff]",
    to: "[#9370FF]",
    hover: {
      from: "[#6a4aff]",
      to: "[#8560FF]"
    }
  },
  text: {
    from: "[#7c5cff]",
    to: "[#FF6B6B]"
  }
};

const fadeInUpAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const frameAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center py-24 pt-32 overflow-hidden bg-gradient-to-b from-[#f5f0ff] to-white">
      {frameImages.map((img, index) => (
        <motion.img
          key={index}
          src={img.src}
          alt={img.alt}
          className={img.className}
          {...frameAnimation}
          transition={{ ...frameAnimation.transition, delay: index * 0.1 }}
        />
      ))}

      <div className="relative container mx-auto px-4 z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          <motion.h1 
            {...fadeInUpAnimation}
            className="text-4xl md:text-6xl font-bold mb-8"
          >
            Transform Your Ideas{" "}
            <span className="block">Into{" "}
              <span className={`bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#FF6B6B]`}>
                Art You Can Feel
              </span>
            </span>
          </motion.h1>

          <motion.p
            {...fadeInUpAnimation}
            transition={{ ...fadeInUpAnimation.transition, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-600 mb-10 max-w-2xl"
          >
            Create unique artwork in seconds. Express your creativity,
            customize your style, and bring beautiful prints to your home in minutes.
          </motion.p>

          <motion.div
            {...fadeInUpAnimation}
            transition={{ ...fadeInUpAnimation.transition, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/create">
              <Button 
                size="lg"
                className="px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              >
                Create Your Masterpiece
                <i className="fas fa-wand-magic-sparkles ml-2"></i>
              </Button>
            </Link>
            <Link href="/gallery" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className={`w-full sm:w-auto px-8 py-6 rounded-full text-lg border-2 
                border-${GRADIENT_COLORS.primary.from} text-${GRADIENT_COLORS.primary.from} 
                hover:bg-${GRADIENT_COLORS.primary.from}/10`}
              >
                Explore Gallery
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
