import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Create a custom SliderProps type without the value requirement
type SliderRootProps = Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, 'value'>;

interface GradientSliderProps extends SliderRootProps {
  value?: number | number[];
}

const GradientSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  GradientSliderProps
>(({ className, value, ...props }, ref) => {
  // Ensure value is always an array with numbers, or default to [0]
  const valueArray = React.useMemo((): number[] => {
    if (value === undefined) return [0];
    return Array.isArray(value) ? value : [value];
  }, [value]);
  
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      value={valueArray}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gradient-to-r from-primary to-[#FF6B6B]">
        <SliderPrimitive.Range className="absolute h-full bg-transparent" />
      </SliderPrimitive.Track>
      <motion.div
        whileTap={{ scale: 1.2 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-white bg-white shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      </motion.div>
    </SliderPrimitive.Root>
  );
});

GradientSlider.displayName = SliderPrimitive.Root.displayName;

export default GradientSlider;
