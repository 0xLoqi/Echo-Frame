import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import ArtCreator from "@/components/art/art-creator";
import { Card } from "@/components/ui/card";

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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Create Your Masterpiece
          </h1>
          <p className="text-center text-neutral-600 max-w-2xl mx-auto mb-10">
            Describe your vision, customize the style, and watch as AI brings your ideas to life.
          </p>

          <ArtCreator onArtCreated={handleArtCreated} />

          <div className="mt-10 max-w-2xl mx-auto">
            <Card className="p-6 bg-white/50 backdrop-blur-sm border border-neutral-200">
              <h3 className="text-xl font-medium mb-3">
                <i className="fas fa-lightbulb text-[#FF6B6B] mr-2"></i>
                Creative Tips
              </h3>
              <p className="text-neutral-600 mb-3">
                Be specific about what you want to see. Include details about:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                <li>The subject (landscape, portrait, abstract, etc.)</li>
                <li>Mood or atmosphere (dreamy, energetic, calm)</li>
                <li>Color palette (vibrant, monochrome, pastel)</li>
                <li>Lighting conditions (bright daylight, sunset, moody shadows)</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
