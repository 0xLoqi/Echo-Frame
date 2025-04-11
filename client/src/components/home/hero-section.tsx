import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { artImages } from "@/lib/mock-images";

const HeroSection = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center">
          <motion.div
            className="md:w-1/2 md:pr-12 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Transform Your Ideas Into{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#FF6B6B]">
                Stunning Artwork
              </span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-800 mb-8">
              Create unique AI-generated art in seconds. Express your creativity,
              customize your style, and bring beautiful prints to your walls.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/create">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  Create Your Masterpiece
                </Button>
              </Link>
              <Link href="/gallery">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white hover:bg-neutral-100 text-neutral-800 rounded-full shadow-md hover:shadow-lg border border-neutral-200 transition transform hover:-translate-y-1"
                >
                  Explore Gallery
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 transform translate-y-8">
                  <motion.div variants={item}>
                    <img
                      src={artImages[0]}
                      alt="AI Generated Artwork"
                      className="rounded-xl shadow-lg w-full h-56 object-cover"
                    />
                  </motion.div>
                  <motion.div variants={item}>
                    <img
                      src={artImages[1]}
                      alt="AI Generated Artwork"
                      className="rounded-xl shadow-lg w-full h-40 object-cover"
                    />
                  </motion.div>
                </div>
                <div className="space-y-4">
                  <motion.div variants={item}>
                    <img
                      src={artImages[2]}
                      alt="AI Generated Artwork"
                      className="rounded-xl shadow-lg w-full h-40 object-cover"
                    />
                  </motion.div>
                  <motion.div variants={item}>
                    <img
                      src={artImages[3]}
                      alt="AI Generated Artwork"
                      className="rounded-xl shadow-lg w-full h-56 object-cover"
                    />
                  </motion.div>
                </div>
              </div>
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white rounded-full p-4 shadow-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <div className="bg-gradient-to-r from-primary to-[#FF6B6B] p-4 rounded-full text-white">
                  <i className="fas fa-wand-magic-sparkles text-2xl"></i>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
