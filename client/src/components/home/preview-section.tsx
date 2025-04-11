import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { interiorImages } from "@/lib/mock-images";
import { frameOptions, sizeOptions } from "@/lib/art-data";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { 
  FloatingAnimation, 
  PulseAnimation, 
  SlideInLeft,
  SlideInRight
} from "@/components/ui/motion-effects";

const PreviewSection = () => {
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState(sizeOptions[2].id); // Default to "large"
  const [selectedFrame, setSelectedFrame] = useState(frameOptions[0].id); // Default to "black"
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFrameHovered, setIsFrameHovered] = useState(false);
  const controls = useAnimation();

  // Initialize animation when component mounts
  useEffect(() => {
    controls.start({
      boxShadow: [
        "0px 0px 0px 0px rgba(93, 79, 255, 0)",
        "0px 0px 0px 4px rgba(93, 79, 255, 0.2)",
        "0px 0px 0px 0px rgba(93, 79, 255, 0)"
      ],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop"
      }
    });
  }, [controls]);

  // Get size label
  const getSizeLabel = () => {
    const sizeOption = sizeOptions.find((size) => size.id === selectedSize);
    return sizeOption ? sizeOption.label : "";
  };

  // Get frame label
  const getFrameLabel = () => {
    const frameOption = frameOptions.find((frame) => frame.id === selectedFrame);
    return frameOption ? frameOption.label : "";
  };

  // Try AR view
  const handleARView = () => {
    toast({
      title: "AR View Coming Soon",
      description: "This feature will be available in a future update!",
      variant: "default",
    });
  };

  // Change preview image with animation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % interiorImages.length);
  };

  return (
    <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
      <SlideInLeft className="relative" delay={0.1} duration={0.7}>
        <motion.div 
          className="relative overflow-hidden rounded-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={interiorImages[currentImageIndex]}
                alt="Art in modern living room"
                className="rounded-2xl shadow-xl w-full"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Animated Frame Overlay */}
          <motion.div 
            className={`absolute inset-0 pointer-events-none rounded-2xl border-8 ${
              selectedFrame === 'none' ? 'border-transparent' : `border-${selectedFrame === 'white' ? 'white' : frameOptions.find(f => f.id === selectedFrame)?.color || 'black'}`
            }`}
            animate={controls}
          />
          
          {/* Floating Size Indicator */}
          <FloatingAnimation className="absolute top-4 left-4" duration={2.5}>
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md text-sm font-medium">
              {getSizeLabel()}
            </div>
          </FloatingAnimation>
          
          <PulseAnimation className="absolute bottom-4 right-4" duration={3}>
            <Button 
              size="icon"
              variant="ghost"
              className="rounded-full bg-white/80 backdrop-blur-md shadow-md hover:bg-white/90 z-10"
              onClick={nextImage}
            >
              <i className="fas fa-arrows-rotate"></i>
            </Button>
          </PulseAnimation>
        </motion.div>
      </SlideInLeft>

      <SlideInRight className="space-y-6" delay={0.3} duration={0.7}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#FF6B6B]">
              Perfect Fit For Your Home
            </span>
          </h3>
          <p className="text-neutral-600 mb-6">
            Our AR preview technology lets you see exactly how your artwork will
            look on your walls. Experiment with different sizes and frames to find
            the perfect match for your space.
          </p>
        </motion.div>

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-neutral-800 font-medium">Size</label>
              <motion.span 
                className="text-sm text-primary font-medium"
                key={selectedSize}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {getSizeLabel()}
              </motion.span>
            </div>
            <div className="flex gap-2 mb-4">
              {sizeOptions.map((size, index) => (
                <motion.div
                  key={size.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Button
                    variant={selectedSize === size.id ? "default" : "outline"}
                    className={`px-3 py-1 text-sm ${
                      selectedSize === size.id
                        ? "bg-primary text-white"
                        : "border border-neutral-200"
                    } rounded-md`}
                    onClick={() => setSelectedSize(size.id)}
                  >
                    {size.label}
                  </Button>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-between mb-2">
              <label className="text-neutral-800 font-medium">Frame</label>
              <motion.span 
                className="text-sm text-primary font-medium"
                key={selectedFrame}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {getFrameLabel()}
              </motion.span>
            </div>
            <div className="flex gap-2">
              {frameOptions.map((frame, index) => (
                <motion.div
                  key={frame.id}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  onHoverStart={() => setIsFrameHovered(true)}
                  onHoverEnd={() => setIsFrameHovered(false)}
                >
                  <Button
                    size="icon"
                    variant="outline"
                    className={`p-2 rounded-md ${
                      selectedFrame === frame.id ? 'border-2 border-primary shadow-md' : ''
                    }`}
                    style={{ 
                      backgroundColor: frame.id === "none" ? "white" : frame.color,
                      color: frame.id === "white" ? "#333" : "white"
                    }}
                    onClick={() => setSelectedFrame(frame.id)}
                  >
                    {frame.id === "none" && "None"}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="p-4 bg-neutral-100 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="flex items-start gap-3">
              <FloatingAnimation className="text-[#00CCAA] text-xl mt-1" duration={2}>
                <i className="fas fa-camera"></i>
              </FloatingAnimation>
              <div>
                <h4 className="font-medium mb-1">AR Preview</h4>
                <p className="text-sm text-neutral-600">
                  Use your phone camera to see how this art looks on your wall in
                  real-time.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleARView}
                    size="sm"
                    className="mt-2 px-4 py-2 bg-[#00CCAA] hover:bg-opacity-90 text-white rounded-lg shadow-sm text-sm"
                  >
                    <i className="fas fa-mobile-screen mr-1"></i>
                    Try AR View
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="p-4 bg-neutral-100 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ 
              scale: 1.02, 
              background: "linear-gradient(to right, rgba(245,245,245,1), rgba(250,250,250,1))" 
            }}
          >
            <motion.p 
              className="art-description text-neutral-800 italic font-['Playfair_Display',_serif]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              "A dreamlike coastal landscape where reality bends into fantasy, with soft pastel colors creating a sense of tranquil wonder."
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/gallery">
              <Button 
                size="lg" 
                className="w-full py-6 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl shadow-md hover:shadow-lg transition"
              >
                <PulseAnimation duration={2.5} className="mr-2">
                  <i className="fas fa-shopping-cart"></i>
                </PulseAnimation>
                Browse Gallery
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </SlideInRight>
    </div>
  );
};

export default PreviewSection;
