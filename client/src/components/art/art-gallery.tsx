import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArtCard from "./art-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { artStyles, initialGalleryItems } from "@/lib/art-data";

interface ArtGalleryProps {
  title?: string;
  description?: string;
  showFilters?: boolean;
}

const ArtGallery: React.FC<ArtGalleryProps> = ({
  title = "Inspiration Gallery",
  description = "Browse our curated collection of AI-generated art. Find inspiration or order directly.",
  showFilters = true,
}) => {
  const [activeStyle, setActiveStyle] = useState("all");
  const [displayedItems, setDisplayedItems] = useState(initialGalleryItems);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const filterArtworks = (style: string) => {
    setActiveStyle(style);
    if (style === "all") {
      setDisplayedItems(initialGalleryItems);
    } else {
      setDisplayedItems(
        initialGalleryItems.filter((item) => item.style === style)
      );
    }
    setShowLoadMore(style === "all");
  };

  const handleLoadMore = () => {
    // In a real implementation, this would load more items from an API
    // For demonstration, we'll hide the button
    setShowLoadMore(false);
  };

  return (
    <div className="container mx-auto px-4">
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-center text-neutral-600 max-w-2xl mx-auto mb-8">
          {description}
        </p>
      )}

      {showFilters && (
        <div className="flex mb-8 justify-center">
          <div className="inline-flex rounded-full bg-white shadow-md p-1 border border-neutral-200 overflow-x-auto">
            {artStyles.map((style) => (
              <Button
                key={style.id}
                onClick={() => filterArtworks(style.id)}
                variant={activeStyle === style.id ? "default" : "ghost"}
                className={`px-4 py-2 rounded-full ${
                  activeStyle === style.id
                    ? "bg-primary text-white"
                    : "text-neutral-600 hover:bg-neutral-100"
                } transition`}
              >
                {style.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedItems.map((item) => (
              <ArtCard key={item.id} artwork={item} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {showLoadMore && (
        <div className="text-center mt-10">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            className="px-6 py-3 bg-white border border-neutral-200 rounded-full hover:shadow-md transition"
          >
            Load More Artwork
            <i className="fas fa-arrow-down ml-2"></i>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArtGallery;
