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
import { Heart, Share2, ImageOff } from "lucide-react";

interface ArtCardProps {
  artwork: {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
    price: number;
  };
}

const ArtCard: React.FC<ArtCardProps> = ({ artwork }) => {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isVideo = artwork?.imageUrl?.endsWith('.mp4') || false;
  
  // Robust URL Sanitization with path correction
  const getSanitizedUrl = (url: string | undefined): string => {
    if (!url) return '';
    try {
      // Strip any leading slashes
      const cleanPath = url.replace(/^\/+/, '');
      
      // Check if the URL path is in attached_assets but should be in assets
      let correctedPath = cleanPath;
      if (cleanPath.startsWith('attached_assets/')) {
        // Get the filename after the directory
        const filename = cleanPath.replace('attached_assets/', '');
        
        // Check if it's a file with a hash ID pattern at the start
        if (/^[-]?[0-9a-f]{5,6}_/.test(filename)) {
          correctedPath = `assets/${filename}`;
        }
      }
      
      // Split path and filename
      const parts = correctedPath.split('/');
      const filename = parts.pop() || ''; 
      const directoryPath = parts.join('/'); 
      
      // Encode the filename
      const encodedFilename = encodeURIComponent(filename);
      
      // Return the full path with a leading slash
      return `/${directoryPath}/${encodedFilename}`;
      
    } catch (e) {
      console.error("Error sanitizing URL:", url, e);
      return url; // Fallback to original URL on error
    }
  };

  const sanitizedImageUrl = getSanitizedUrl(artwork.imageUrl);

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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement>) => {
    console.warn("Media Error:", sanitizedImageUrl);
    setImageError(true);
  };

  // Get a placeholder image for better design
  const getPlaceholderImage = () => {
    return "/assets/image_1744333768495.png";
  };

  return (
    <Card className="group overflow-hidden rounded-xl bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-all duration-300">
      <Link href={`/art/${artwork.id}`}>
        <div className="cursor-pointer">
          <div className="relative h-64 overflow-hidden rounded-t-xl bg-neutral-200 dark:bg-neutral-700">
            {sanitizedImageUrl && !imageError ? (
              isVideo ? (
                <motion.video
                  src={sanitizedImageUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7 }}
                  onError={handleImageError}
                />
              ) : (
                <motion.img
                  src={sanitizedImageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7 }}
                  onError={handleImageError}
                />
              )
            ) : (
              <motion.div 
                className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-800"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={getPlaceholderImage()} 
                  alt="Placeholder" 
                  className="w-full h-full object-cover opacity-60"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 bg-neutral-100/70 dark:bg-neutral-800/70">
                  <ImageOff className="h-10 w-10 mb-2 opacity-50" />
                  <p className="text-center px-4 font-medium">Preview unavailable</p>
                </div>
              </motion.div>
            )}
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-1 line-clamp-1">
              {artwork.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2 mb-4">
              {artwork.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-[#7c5cff]">
                ${artwork.price}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-neutral-500 hover:text-[#7c5cff] dark:text-neutral-400 dark:hover:text-[#7c5cff]"
                  onClick={handleFavorite}
                >
                  <Heart className={`h-5 w-5 ${isFavorited ? "fill-[#7c5cff] text-[#7c5cff]" : ""}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-neutral-500 hover:text-[#7c5cff] dark:text-neutral-400 dark:hover:text-[#7c5cff]"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default ArtCard;