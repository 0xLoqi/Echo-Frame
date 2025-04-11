import { motion } from "framer-motion";
import HeroSection from "@/components/home/hero-section";
import HowItWorks from "@/components/home/how-it-works";
import ArtGallery from "@/components/art/art-gallery";
import ArtCustomization from "@/components/art/art-customization";
import Testimonials from "@/components/home/testimonials";
import CTASection from "@/components/home/cta-section";
import { initialGalleryItems } from "@/lib/art-data";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [location, setLocation] = useLocation();

  // Handle anchor links
  useEffect(() => {
    // Check if the URL has a hash
    if (location.includes("#")) {
      const id = location.split("#")[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div>
      <HeroSection />

      <section id="create" className="py-16 bg-gradient-to-b from-white to-neutral-100 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Create Your Masterpiece
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <iframe
              src="/create"
              className="w-full h-[600px] border-0 rounded-3xl shadow-xl"
              title="Art Creator"
            ></iframe>
          </motion.div>
        </div>
      </section>

      <HowItWorks />

      <section id="gallery" className="py-16 bg-neutral-100 scroll-mt-20">
        <ArtGallery />
      </section>

      <section className="py-16 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Visualize In Your Space
            </h2>
            <p className="text-center text-neutral-600 max-w-2xl mx-auto mb-16">
              See exactly how your art will look in your home before you buy.
            </p>
          </motion.div>

          <ArtCustomization artwork={initialGalleryItems[0]} />
        </div>
      </section>

      <Testimonials />
      
      <CTASection />
    </div>
  );
}
