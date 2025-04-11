import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const testimonials = [
    {
      rating: 5,
      text: "The creative process was so intuitive and fun! I created the perfect piece for my living room in minutes, and the quality of the print exceeded my expectations.",
      name: "Sarah K.",
      title: "Interior Designer",
    },
    {
      rating: 5,
      text: "I bought a piece as a gift for my wife's birthday. The AR preview helped me pick the perfect size. She was blown away by how unique and personal it felt.",
      name: "Michael T.",
      title: "Software Engineer",
    },
    {
      rating: 4.5,
      text: "As an art lover with limited budget, ArtifyAI lets me decorate my apartment with beautiful, unique pieces that feel custom-made for my space.",
      name: "Jamie L.",
      title: "Graduate Student",
    },
  ];

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
    <section className="py-16 bg-gradient-to-b from-neutral-100 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Happy Customers
          </h2>
          <p className="text-center text-neutral-600 max-w-2xl mx-auto mb-16">
            See what our customers are saying about their ArtifyAI experiences.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : ""}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={item}>
              <Card className="bg-white shadow-lg border border-neutral-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-[#FF6B6B] text-lg mr-2">
                      {[...Array(Math.floor(testimonial.rating))].map(
                        (_, i) => (
                          <i key={i} className="fas fa-star"></i>
                        )
                      )}
                      {testimonial.rating % 1 !== 0 && (
                        <i className="fas fa-star-half-alt"></i>
                      )}
                    </div>
                    <span className="text-sm text-neutral-600">
                      {testimonial.rating.toFixed(1)}
                    </span>
                  </div>

                  <p className="text-neutral-700 mb-6">{testimonial.text}</p>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-neutral-200 rounded-full overflow-hidden mr-3">
                      <div className="w-full h-full flex items-center justify-center text-neutral-500">
                        <i className="fas fa-user"></i>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-neutral-500">
                        {testimonial.title}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
