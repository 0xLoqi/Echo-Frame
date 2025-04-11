import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ArtCard from "./art-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { artStyles, initialGalleryItems } from "@/lib/art-data";
import { StaggeredList, PulseAnimation } from "@/components/ui/motion-effects";

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
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const galleryRef = useRef(null);
  const isInView = useInView(galleryRef, { once: true, amount: 0.1 });

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
  };

  const filterVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.2
      }
    },
  };

  return (
    <div className="container mx-auto px-4 overflow-hidden" ref={galleryRef}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-12"
      >
        {title && (
          <motion.h2 
            variants={titleVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#FF6B6B]">
              {title}
            </span>
          </motion.h2>
        )}
        
        {description && (
          <motion.p 
            variants={titleVariants}
            className="text-center text-neutral-600 max-w-2xl mx-auto mb-8"
          >
            {description}
          </motion.p>
        )}
      </motion.div>

      {showFilters && (
        <motion.div 
          className="flex mb-12 justify-center"
          variants={filterVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="inline-flex rounded-full bg-white shadow-md p-1.5 border border-neutral-200 overflow-x-auto">
            {artStyles.map((style, index) => (
              <motion.div
                key={style.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.05 + 0.3, duration: 0.3 }
                }}
                onHoverStart={() => setIsHovered(style.id)}
                onHoverEnd={() => setIsHovered(null)}
              >
                <Button
                  onClick={() => filterArtworks(style.id)}
                  variant={activeStyle === style.id ? "default" : "ghost"}
                  className={`relative px-5 py-2.5 rounded-full ${
                    activeStyle === style.id
                      ? "bg-primary text-white"
                      : "text-neutral-600 hover:bg-neutral-100"
                  } transition`}
                >
                  {activeStyle === style.id && (
                    <motion.span
                      layoutId="activeStyleIndicator"
                      className="absolute inset-0 bg-primary rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {style.label}
                  
                  {/* Active indicator dot */}
                  {activeStyle === style.id && (
                    <motion.span 
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      layoutId="activeDot"
                    >
                      <motion.span 
                        className="absolute inset-0 rounded-full bg-primary opacity-20"
                        animate={{ 
                          scale: [1, 1.8, 1],
                          opacity: [0.2, 0.1, 0.2] 
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                      />
                    </motion.span>
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
        >
          <StaggeredList 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            staggerDelay={0.05}
            itemVariants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              show: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12
                }
              }
            }}
          >
            {displayedItems.map((item) => (
              <ArtCard key={item.id} artwork={item} />
            ))}
          </StaggeredList>
        </motion.div>
      </AnimatePresence>

      {showLoadMore && (
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleLoadMore}
              variant="outline"
              className="px-6 py-3 bg-white border border-neutral-200 rounded-full hover:shadow-md transition"
            >
              Load More Artwork
              <PulseAnimation className="ml-2" duration={2}>
                <i className="fas fa-arrow-down"></i>
              </PulseAnimation>
            </Button>
          </motion.div>
        </motion.div>
      )}
      
      {/* Floating gradient bubbles background effect */}
      <div className="fixed left-0 w-full h-full pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-gradient-to-tr from-primary/10 to-transparent filter blur-xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtGallery;
