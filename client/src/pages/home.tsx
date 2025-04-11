import { motion } from "framer-motion";
import HeroSection from "@/components/home/hero-section";
import VideoGallery from "@/components/home/video-gallery";
import HowItWorks from "@/components/home/how-it-works";
import ArtGallery from "@/components/art/art-gallery";
import ArtCustomization from "@/components/art/art-customization";
import Testimonials from "@/components/home/testimonials";
import CTASection from "@/components/home/cta-section";
import { initialGalleryItems } from "@/lib/art-data";
import { useEffect } from "react";
import { useLocation } from "wouter";
import SimplifiedArtCreator from "@/components/art/simplified-art-creator";

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
    <div className="bg-gradient-to-b from-[#f5f0ff] to-[#fafbff]">
      <HeroSection />
      <VideoGallery />

      <section className="py-16 bg-gradient-to-b from-[#f5f0ff] to-[#f0f5ff]">
        <HowItWorks />
      </section>

      <section id="create" className="py-16 bg-[#f0f5ff] scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-3xl">
              <SimplifiedArtCreator />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="gallery" className="py-16 bg-gradient-to-b from-[#f0f5ff] to-[#f5f0ff] scroll-mt-20">
        <ArtGallery />
      </section>

      <section className="py-16 bg-[#f5f0ff]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-neutral-900">
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
