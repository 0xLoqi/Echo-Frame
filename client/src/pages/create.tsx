import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import SimplifiedArtCreator from "@/components/art/simplified-art-creator";
import { Card } from "@/components/ui/card";
import { Image, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-neutral-100 py-4">
      <div className="container max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#FF6B6B]">
              Create Your Masterpiece
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <SimplifiedArtCreator onArtCreated={handleArtCreated} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-3"
        >
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-neutral-500 hover:text-primary"
            onClick={() => setLocation('/gallery')}
          >
            <Image className="h-3 w-3 mr-1" /> View Gallery
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
