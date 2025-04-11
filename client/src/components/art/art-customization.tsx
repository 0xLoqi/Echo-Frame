import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { frameOptions, sizeOptions } from "@/lib/art-data";
import { Link } from "wouter";

interface ArtCustomizationProps {
  artwork: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
  };
}

const ArtCustomization: React.FC<ArtCustomizationProps> = ({ artwork }) => {
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState(sizeOptions[2].id); // Default to "large"
  const [selectedFrame, setSelectedFrame] = useState(frameOptions[0].id); // Default to "black"

  // Calculate price based on selected size
  const calculatePrice = () => {
    const sizeOption = sizeOptions.find((size) => size.id === selectedSize);
    return sizeOption ? sizeOption.price : 49.99;
  };

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
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1532372576444-dda954194ad0"
            alt="Art in modern living room"
            className="rounded-2xl shadow-xl w-full"
          />
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent hover:border-primary transition-colors duration-300"></div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-2xl font-semibold mb-4">Perfect Fit For Your Home</h3>
        <p className="text-neutral-600 mb-6">
          Our AR preview technology lets you see exactly how your artwork will
          look on your walls. Experiment with different sizes and frames to find
          the perfect match for your space.
        </p>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-neutral-800 font-medium">Size</label>
            <span className="text-sm text-primary font-medium">
              {getSizeLabel()}
            </span>
          </div>
          <div className="flex gap-2 mb-4">
            {sizeOptions.map((size) => (
              <Button
                key={size.id}
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
            ))}
          </div>

          <div className="flex justify-between mb-2">
            <label className="text-neutral-800 font-medium">Frame</label>
            <span className="text-sm text-primary font-medium">
              {getFrameLabel()}
            </span>
          </div>
          <div className="flex gap-2">
            {frameOptions.map((frame) => (
              <Button
                key={frame.id}
                size="icon"
                variant="outline"
                className={`p-2 rounded-md ${
                  selectedFrame === frame.id ? "border-2 border-primary" : ""
                }`}
                style={{ 
                  backgroundColor: frame.id === "none" ? "white" : frame.color,
                  color: frame.id === "white" ? "#333" : "white"
                }}
                onClick={() => setSelectedFrame(frame.id)}
              >
                {frame.id === "none" && "None"}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-6 p-4 bg-neutral-100 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="text-[#00CCAA] text-xl mt-1">
              <i className="fas fa-camera"></i>
            </div>
            <div>
              <h4 className="font-medium mb-1">AR Preview</h4>
              <p className="text-sm text-neutral-600">
                Use your phone camera to see how this art looks on your wall in
                real-time.
              </p>
              <Button
                onClick={handleARView}
                size="sm"
                className="mt-2 px-4 py-2 bg-[#00CCAA] hover:bg-opacity-90 text-white rounded-lg shadow-sm text-sm"
              >
                <i className="fas fa-mobile-screen mr-1"></i>
                Try AR View
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-neutral-100 rounded-xl mb-6">
          <p className="art-description text-neutral-800 italic font-['Playfair_Display',_serif]">
            "{artwork.description}"
          </p>
        </div>

        <Link href="/checkout">
          <Button className="w-full py-6 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl shadow-md hover:shadow-lg transition">
            <i className="fas fa-shopping-cart mr-2"></i>
            Add to Cart - ${calculatePrice().toFixed(2)}
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ArtCustomization;
