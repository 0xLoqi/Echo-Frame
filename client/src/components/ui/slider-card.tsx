import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import GradientSlider from "./gradient-slider";
import { motion } from "framer-motion";

interface SliderCardProps {
  label: string;
  description: string;
  value: number;
  onChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  leftLabel?: string;
  rightLabel?: string;
}

const SliderCard: React.FC<SliderCardProps> = ({
  label,
  description,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  leftLabel,
  rightLabel,
}) => {
  // Convert single value to array for Radix UI Slider
  const valueArray = [value];
  
  // Handle value change by extracting first value from array
  const handleValueChange = (newValue: number[]) => {
    onChange(newValue);
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="mb-4 bg-white border border-neutral-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-between mb-2">
            <Label className="text-neutral-800 font-medium">{label}</Label>
            {leftLabel && rightLabel && (
              <motion.span 
                className="text-sm text-neutral-500"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
              >
                {leftLabel} ↔ {rightLabel}
              </motion.span>
            )}
          </div>
          {description && (
            <p className="text-sm text-neutral-600 mb-3">{description}</p>
          )}
          <GradientSlider
            value={valueArray}
            onValueChange={handleValueChange}
            min={min}
            max={max}
            step={step}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SliderCard;
