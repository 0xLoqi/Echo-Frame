import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-[#FF6B6B] text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Masterpiece?
          </h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Transform your ideas into beautiful art that's uniquely yours. Start
            creating in minutes.
          </p>

          <Link href="/create">
            <Button
              size="lg"
              className="inline-block px-8 py-8 bg-white text-primary rounded-full font-medium shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              Start Creating Now
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </Link>

          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-2">
                <i className="fas fa-truck-fast"></i>
              </div>
              <span>Free Shipping</span>
            </motion.div>

            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-2">
                <i className="fas fa-heart"></i>
              </div>
              <span>Satisfaction Guaranteed</span>
            </motion.div>

            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-2">
                <i className="fas fa-tree"></i>
              </div>
              <span>Eco-Friendly Materials</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
