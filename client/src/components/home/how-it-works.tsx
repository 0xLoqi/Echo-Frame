import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const steps = [
    {
      number: 1,
      title: "Describe Your Vision",
      description:
        "Enter a prompt, upload a photo, or use voice input to tell us what you'd like to create.",
      example: '"A dreamy cottage under cosmic skies with ethereal atmosphere"',
      color: "bg-primary",
    },
    {
      number: 2,
      title: "Customize Your Style",
      description:
        "Adjust sliders to refine your art style, color mood, and complexity until it's perfect.",
      color: "bg-[#FF6B6B]",
    },
    {
      number: 3,
      title: "Order & Display",
      description:
        "Choose your size, frame style, and finishes. Preview how it will look in your space.",
      color: "bg-[#00CCAA]",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <section id="how-it-works" className="py-16 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How It Works
          </h2>
          <p className="text-center text-neutral-600 max-w-2xl mx-auto mb-16">
            Creating your custom artwork is simple, fun, and magical. Just follow
            these steps:
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : ""}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              className="relative bg-white rounded-2xl shadow-lg p-6 border border-neutral-200"
              variants={item}
            >
              <div
                className={`absolute -top-6 left-6 ${step.color} text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg`}
              >
                {step.number}
              </div>
              <div className="pt-6">
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-neutral-600 mb-4">{step.description}</p>
                {step.example && (
                  <div className="bg-neutral-100 rounded-xl p-4 text-sm text-neutral-700 italic">
                    {step.example}
                  </div>
                )}
                {step.number === 2 && (
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 bg-gradient-to-r from-primary to-[#FF6B6B] rounded-full"></div>
                    <div className="text-xs text-neutral-500">
                      Abstract ↔ Realistic
                    </div>
                  </div>
                )}
                {step.number === 3 && (
                  <div className="bg-neutral-100 rounded-xl p-2">
                    <img
                      src="https://images.unsplash.com/photo-1532372576444-dda954194ad0"
                      alt="Framed artwork in home"
                      className="w-full h-20 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
