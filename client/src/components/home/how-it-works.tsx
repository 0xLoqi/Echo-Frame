import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { 
  FloatingAnimation, 
  PulseAnimation, 
  RotateAnimation 
} from "@/components/ui/motion-effects";
import { TypeAnimation } from "@/components/ui/type-animation";

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const steps = [
    {
      number: 1,
      title: "👄 Describe Your Vision",
      description:
        "Enter a prompt, upload a photo, or use voice input to tell us what you'd like to create.",
      example: '"A dreamy cottage under cosmic skies with ethereal atmosphere"',
      color: "bg-[#EF4444]"
    },
    {
      number: 2,
      title: "🎨 Customize Your Style",
      description:
        "Adjust sliders to refine your art style, color mood, and complexity until it's perfect.",
      color: "bg-[#F59E0B]"
    },
    {
      number: 3,
      title: "🛒 Order & Display",
      description:
        "Choose your size, frame style, and finishes. Preview how it will look in your space.",
      color: "bg-[#10B981]"
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
  };

  // Path for step connector
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { 
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-neutral-900 scroll-mt-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100 
          }}
          ref={ref}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#FF6B6B]">
                How It Works
              </span>
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-center text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Creating your custom artwork is simple, fun, and magical. Just follow
            these steps:
          </motion.p>
        </motion.div>

        {/* Animated path connecting steps (visible on desktop) */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          <motion.svg
            width="100%"
            height="80"
            viewBox="0 0 1000 80"
            fill="none"
            className="absolute top-40 left-0 right-0 z-0 opacity-30"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.path
              d="M100,40 C250,0 350,80 500,40 C650,0 750,80 900,40"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="transparent"
              variants={pathVariants}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(250, 100%, 65%)" />
                <stop offset="100%" stopColor="#FF6B6B" />
              </linearGradient>
            </defs>
          </motion.svg>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10"
          variants={container}
          initial="hidden"
          animate={controls}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 border border-neutral-200 dark:border-neutral-700 transform transition-all hover:shadow-xl hover:-translate-y-1"
              variants={item}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <PulseAnimation duration={3} className="absolute -top-6 left-4">
                <div
                  className={`${step.color} text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl shadow-lg`}
                >
                  {step.number}
                </div>
              </PulseAnimation>
              
              <div className="pt-8">
                <h3 className="text-xl font-semibold mb-3 dark:text-white">{step.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-6">{step.description}</p>
                
                {step.number === 1 && (
                  <motion.div 
                    className="bg-neutral-100 dark:bg-neutral-700 rounded-xl p-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    <TypeAnimation />
                  </motion.div>
                )}
                
                {step.number === 2 && (
                  <motion.div 
                    className="flex flex-col gap-3 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-2 relative">
                      <div className="h-2 flex-1 bg-gradient-to-r from-primary to-[#FF6B6B] rounded-full"></div>
                      <motion.div 
                        className="absolute h-4 w-4 bg-white dark:bg-neutral-800 rounded-full border-2 border-primary shadow-sm"
                        style={{ left: '30%' }}
                        animate={{ 
                          x: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                      <div className="text-xs text-neutral-500 dark:text-neutral-300">
                        Abstract ↔ Realistic
                      </div>
                    </div>
                    <div className="flex items-center gap-2 relative">
                      <div className="h-2 flex-1 bg-gradient-to-r from-[#00CCAA] to-[#FF9F45] rounded-full"></div>
                      <motion.div 
                        className="absolute h-4 w-4 bg-white dark:bg-neutral-800 rounded-full border-2 border-[#00CCAA] shadow-sm"
                        style={{ left: '30%' }}
                        animate={{ 
                          x: [0, -5, 5, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: 0.3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                      <div className="text-xs text-neutral-500 dark:text-neutral-300">
                        Warm ↔ Cool
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {step.number === 3 && (
                  <motion.div 
                    className="mt-4 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    <div className="bg-neutral-100 dark:bg-neutral-700 rounded-xl p-2 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1532372576444-dda954194ad0"
                        alt="Framed artwork in home"
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <motion.div 
                        className="absolute top-0 left-0 right-0 bottom-0 rounded-xl"
                        animate={{ 
                          boxShadow: ["0px 0px 0px 0px rgba(239, 68, 68, 0)", "0px 0px 0px 3px rgba(239, 68, 68, 0.2)", "0px 0px 0px 0px rgba(239, 68, 68, 0)"]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <RotateAnimation className="inline-block" duration={8}>
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-full p-2 mx-auto">
              <div className="bg-gradient-to-r from-primary to-[#FF6B6B] p-3 rounded-full text-white">
                <i className="fas fa-wand-magic-sparkles text-xl"></i>
              </div>
            </div>
          </RotateAnimation>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
