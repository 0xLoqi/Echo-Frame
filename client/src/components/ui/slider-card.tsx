import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import GradientSlider from "./gradient-slider";

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
        <GradientSlider
          value={value}
          onValueChange={onChange}
          min={min}
          max={max}
          step={step}
        />
      </CardContent>
    </Card>
  );
};

export default SliderCard;
