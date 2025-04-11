import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PulseAnimation,
  FloatingAnimation
} from "@/components/ui/motion-effects";

interface ArtCardProps {
  artwork: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
  };
}

const ArtCard: React.FC<ArtCardProps> = ({ artwork }) => {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    setIsAnimating(true);
    
    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 1000);
    
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited
        ? "Artwork removed from your favorites"
        : "Artwork saved to your favorites",
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Share functionality",
      description: "Sharing options will appear here",
    });
  };

  const handleRemix = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Remix this art",
      description: "Opening this artwork for remixing...",
    });
  };

  return (
    <Link href={`/art/${artwork.id}`}>
      <motion.div
        whileHover={{ y: -10 }}
        whileTap={{ scale: 0.98 }}
        className="art-card group h-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 15 
        }}
      >
        <Card className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-2xl transition duration-300">
          <div className="relative h-64 overflow-hidden rounded-t-xl">
            <motion.img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.7 }}
            />
            
            {/* Price badge */}
            <motion.div
              className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FloatingAnimation duration={3}>
                <span className="text-sm font-medium text-primary">
                  ${artwork.price.toFixed(2)}+
                </span>
              </FloatingAnimation>
            </motion.div>

            {/* Overlay */}
            <motion.div
              className="art-card-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="flex justify-between items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleFavorite}
                    className="p-2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition text-white"
                  >
                    <AnimatePresence mode="wait">
                      {isAnimating && isFavorited ? (
                        <motion.div
                          key="heart-animation"
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.5, 1] }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <i className="fas fa-heart text-red-500"></i>
                        </motion.div>
                      ) : (
                        <motion.i
                          key="heart-icon"
                          className={`${
                            isFavorited ? "fas" : "far"
                          } fa-heart ${isFavorited ? "text-red-500" : "text-white"}`}
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, isFavorited ? 1.2 : 1, 1] }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleShare}
                    className="p-2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition text-white"
                  >
                    <i className="fas fa-share-nodes text-white"></i>
                  </Button>
                </motion.div>
              </motion.div>
              
              <motion.div
                className="mt-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3 className="font-medium text-lg text-white mb-1">
                  {artwork.title}
                </h3>
                <p className="text-sm text-white/80 line-clamp-2 italic font-['Playfair_Display',_serif]">
                  {artwork.description}
                </p>
              </motion.div>
            </motion.div>
          </div>

          <CardContent className="p-4">
            <div className="min-h-[80px]">
              <h3 className="font-medium text-lg mb-1 text-neutral-800">
                {artwork.title}
              </h3>
              <p className="text-sm text-neutral-600 mb-3 art-description italic font-['Playfair_Display',_serif] line-clamp-2">
                {artwork.description}
              </p>
            </div>
            
            <motion.div 
              className="flex justify-end items-center mt-2"
              whileHover={{ scale: 1.02 }}
            >
              <Button
                size="sm"
                variant="ghost"
                onClick={handleRemix}
                className="px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-primary/10 to-primary/20 hover:from-primary/20 hover:to-primary/30 transition shadow-sm"
              >
                <PulseAnimation className="mr-2" duration={3}>
                  <i className="fas fa-wand-magic-sparkles text-primary"></i>
                </PulseAnimation>
                Remix
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};

export default ArtCard;
