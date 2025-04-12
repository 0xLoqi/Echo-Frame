import { motion } from "framer-motion";
import { galleryVideos } from "@/lib/mock-images";

const VideoGallery = () => {
  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Single row with larger videos */}
      <div className="flex gap-6 animate-scroll">
        {/* Original videos */}
        {galleryVideos.map((video, index) => (
          <motion.video
            key={`video-${index}`}
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="h-[400px] w-[600px] object-cover rounded-xl shadow-lg hover:scale-105 transition-transform"
          />
        ))}
        {/* Duplicate videos for seamless loop */}
        {galleryVideos.map((video, index) => (
          <motion.video
            key={`video-dup-${index}`}
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="h-[400px] w-[600px] object-cover rounded-xl shadow-lg hover:scale-105 transition-transform"
          />
        ))}
      </div>
    </div>
  );
};

export default VideoGallery; 