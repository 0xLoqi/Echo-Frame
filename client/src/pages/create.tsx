import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import SimplifiedArtCreator from "@/components/art/simplified-art-creator";
import { Card } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  FadeIn, 
  SlideInLeft, 
  SlideInRight,
  StaggeredList
} from "@/components/ui/motion-effects";
import { LightbulbIcon, Sparkles, Wand2 } from "lucide-react";

export default function Create() {
  const [_, setLocation] = useLocation();
  const [createdArtwork, setCreatedArtwork] = useState<any>(null);
  
  const handleArtCreated = (artwork: any) => {
    setCreatedArtwork(artwork);
  };

  // Redirect to art details page when art is created (if we're not in an iframe)
  useEffect(() => {
    if (createdArtwork && window.self === window.top) {
      // Only redirect if we're not in an iframe
      setTimeout(() => {
        setLocation(`/art/${createdArtwork.id}`);
      }, 2000); // Delay to show the generated art first
    }
  }, [createdArtwork, setLocation]);

  return (
    <div className="py-12 pt-24 bg-gradient-to-b from-white to-neutral-100 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#FF6B6B]">
                Create Your Masterpiece
              </span>
            </h1>
            <p className="text-center text-neutral-600 max-w-2xl mx-auto mb-10">
              Describe your vision, customize the style, and watch as AI brings your ideas to life.
            </p>
          </motion.div>

          <SlideInLeft delay={0.3} duration={0.5}>
            <SimplifiedArtCreator onArtCreated={handleArtCreated} />
          </SlideInLeft>

          <motion.div 
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Tabs defaultValue="tips" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="tips">Creative Tips</TabsTrigger>
                <TabsTrigger value="examples">Example Prompts</TabsTrigger>
              </TabsList>
              <TabsContent value="tips">
                <Card className="p-6 bg-white/50 backdrop-blur-sm border border-neutral-200">
                  <h3 className="text-xl font-medium mb-3 flex items-center">
                    <LightbulbIcon className="h-5 w-5 text-[#FF6B6B] mr-2" />
                    Creative Tips
                  </h3>
                  <p className="text-neutral-600 mb-3">
                    Be specific about what you want to see. Include details about:
                  </p>
                  <StaggeredList staggerDelay={0.1} className="space-y-1">
                    <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                      <li>The subject (landscape, portrait, abstract, etc.)</li>
                      <li>Mood or atmosphere (dreamy, energetic, calm)</li>
                      <li>Color palette (vibrant, monochrome, pastel)</li>
                      <li>Lighting conditions (bright daylight, sunset, moody shadows)</li>
                      <li>Style inspiration (impressionist, cyberpunk, minimalist)</li>
                    </ul>
                  </StaggeredList>
                </Card>
              </TabsContent>
              <TabsContent value="examples">
                <Card className="p-6 bg-white/50 backdrop-blur-sm border border-neutral-200">
                  <h3 className="text-xl font-medium mb-3 flex items-center">
                    <Sparkles className="h-5 w-5 text-[#FF6B6B] mr-2" />
                    Example Prompts
                  </h3>
                  <StaggeredList staggerDelay={0.1} className="space-y-3">
                    <div className="bg-white rounded-lg p-3 border border-neutral-100 shadow-sm">
                      "A dreamy coastal landscape where reality bends into fantasy, with soft pastel colors creating a sense of tranquil wonder."
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-neutral-100 shadow-sm">
                      "Cyberpunk samurai in neon Tokyo, standing on a rainy street with reflections of purple and blue neon signs."
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-neutral-100 shadow-sm">
                      "An enchanted forest at twilight with bioluminescent plants and magical creatures hiding among ancient trees."
                    </div>
                  </StaggeredList>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
