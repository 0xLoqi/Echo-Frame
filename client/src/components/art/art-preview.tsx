import { motion } from "framer-motion";

interface ArtPreviewProps {
  imageUrl: string;
  isNew?: boolean;
  className?: string;
}

const ArtPreview: React.FC<ArtPreviewProps> = ({
  imageUrl,
  isNew = false,
  className = "",
}) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <img
        src={imageUrl}
        alt="Generated artwork"
        className="w-full h-full object-cover"
      />

      {isNew && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-4 right-4"
        >
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <span className="text-sm font-medium">
              <i className="fas fa-sparkles text-[#FF6B6B]"></i> Just Created
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ArtPreview;
