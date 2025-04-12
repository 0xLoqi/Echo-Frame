import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const isVideo = imageUrl.endsWith('.mp4');

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={isNew ? { opacity: 0, scale: 0.8 } : {}}
      animate={isNew ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {isVideo ? (
        <motion.video
          src={imageUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          initial={false}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
      ) : (
        <motion.img
          src={imageUrl}
          alt="Generated artwork"
          className="w-full h-full object-cover"
          initial={false}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
      )}

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
    </motion.div>
  );
};

export default ArtPreview;
