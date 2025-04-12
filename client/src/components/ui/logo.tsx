import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      <motion.div
        className="relative w-auto h-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src="/attached_assets/Echo and Frame.png"
          alt="Echo & Frame Logo"
          className="h-full object-contain"
        />
      </motion.div>
    </div>
  );
}; 