import React, { ReactNode } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';

// Fade in animation
export const FadeIn = ({ 
  children, 
  delay = 0,
  duration = 0.5,
  className = ""
}: { 
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Slide up animation
export const SlideUp = ({
  children,
  delay = 0,
  duration = 0.5,
  className = ""
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    transition={{ duration, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Slide in from left
export const SlideInLeft = ({
  children,
  delay = 0,
  duration = 0.5,
  className = ""
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Slide in from right
export const SlideInRight = ({
  children,
  delay = 0,
  duration = 0.5,
  className = ""
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
    transition={{ duration, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Scale animation
export const ScaleIn = ({
  children,
  delay = 0,
  duration = 0.5,
  className = ""
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Floating animation
export const FloatingAnimation = ({
  children,
  duration = 2,
  className = ""
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{
      duration,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Pulse animation
export const PulseAnimation = ({
  children,
  duration = 2,
  className = ""
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) => (
  <motion.div
    animate={{ scale: [1, 1.05, 1] }}
    transition={{
      duration,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Staggered list animation
export const StaggeredList = ({
  children,
  staggerDelay = 0.1,
  itemVariants,
  className = ""
}: {
  children: ReactNode;
  staggerDelay?: number;
  itemVariants?: Variants;
  className?: string;
}) => {
  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };

  const defaultItemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="show"
      className={className}
    >
      {React.Children.map(children, child => (
        <motion.div variants={itemVariants || defaultItemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Animated page transition wrapper
export const PageTransition = ({ children }: { children: ReactNode }) => (
  <AnimatePresence mode="wait">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

// Rotate animation
export const RotateAnimation = ({
  children,
  duration = 4,
  className = ""
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      duration,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear"
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Shake animation (for notifications, alerts, etc.)
export const ShakeAnimation = ({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    animate={{ x: [0, -5, 5, -5, 5, 0] }}
    transition={{ duration: 0.5 }}
    className={className}
  >
    {children}
  </motion.div>
);