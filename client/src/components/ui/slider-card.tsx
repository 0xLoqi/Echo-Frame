import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface SliderCardProps {
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
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
  // Handle value change from slider array to single number
  const handleValueChange = (values: number[]) => {
    if (values.length > 0) {
      onChange(values[0]);
    }
  };

  return (
    <Card className="mb-4 bg-white border border-neutral-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between mb-2">
          <Label className="text-neutral-800 font-medium">{label}</Label>
          {leftLabel && rightLabel && (
            <span className="text-sm text-neutral-500">
              {leftLabel} ↔ {rightLabel}
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm text-neutral-600 mb-3">{description}</p>
        )}
        <div className="py-2">
          <Slider
            value={[value]}
            onValueChange={handleValueChange}
            min={min}
            max={max}
            step={step}
            className="bg-gradient-to-r from-primary to-[#FF6B6B]"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SliderCard;
