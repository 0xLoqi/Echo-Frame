import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import SimplifiedArtCreator from "@/components/art/simplified-art-creator";

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
    <div className="flex items-center justify-center min-h-screen bg-white">
      <SimplifiedArtCreator onArtCreated={handleArtCreated} />
    </div>
  );
}
