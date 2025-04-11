import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
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
        whileHover={{ y: -5 }}
        className="art-card group h-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className="bg-white rounded-xl shadow-md overflow-hidden transition h-full hover:shadow-xl">
          <div className="relative h-64 overflow-hidden">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full h-full object-cover transition group-hover:scale-105"
            />

            <div
              className={`art-card-overlay absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 transition-opacity ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex justify-between items-center">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleFavorite}
                  className="p-2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition text-white"
                >
                  <i
                    className={`${
                      isFavorited ? "fas" : "far"
                    } fa-heart text-white`}
                  ></i>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleShare}
                  className="p-2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition text-white"
                >
                  <i className="fas fa-share-nodes text-white"></i>
                </Button>
              </div>
            </div>
          </div>

          <CardContent className="p-4">
            <h3 className="font-medium text-lg mb-1 text-neutral-800">
              {artwork.title}
            </h3>
            <p className="text-sm text-neutral-600 mb-3 art-description italic font-['Playfair_Display',_serif]">
              {artwork.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-primary">
                ${artwork.price.toFixed(2)}+
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleRemix}
                className="px-3 py-1 text-sm rounded-full bg-neutral-100 hover:bg-neutral-200 transition"
              >
                <i className="fas fa-wand-magic-sparkles mr-1"></i>
                Remix
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};

export default ArtCard;
