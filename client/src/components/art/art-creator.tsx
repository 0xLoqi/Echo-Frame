import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Paintbrush, Wand2, Upload, Mic, RefreshCw, Heart, Share, ShoppingCart, Sparkles, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SliderCard from "@/components/ui/slider-card";
import ArtPreview from "./art-preview";
import {
  artisticInfluences,
  defaultStyleSettings,
  samplePrompts,
  getRandomPrompt,
  getRandomArtImage,
  getRandomDescription,
  generateTitleFromPrompt,
} from "@/lib/art-data";
import { StyleSettings } from "@shared/schema";

interface ArtCreatorProps {
  onArtCreated?: (artwork: any) => void;
}

const ArtCreator: React.FC<ArtCreatorProps> = ({ onArtCreated }) => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState<string>(getRandomPrompt());
  const [styleSettings, setStyleSettings] = useState<StyleSettings>({
    ...defaultStyleSettings,
  });
  const [generating, setGenerating] = useState<boolean>(false);
  const [currentArt, setCurrentArt] = useState<any>(null);
  const [variations, setVariations] = useState<string[]>([]);
  const [selectedVariation, setSelectedVariation] = useState<number>(0);

  // Generate art with animation
  const generateArt = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe what you'd like to create",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);

    try {
      // Simulating API call with timeout
      setTimeout(() => {
        // Mock art generation
        const generatedArt = {
          id: Date.now(),
          imageUrl: getRandomArtImage(),
          title: generateTitleFromPrompt(prompt),
          description: getRandomDescription(),
          prompt: prompt,
          styleSettings: { ...styleSettings },
          variations: [
            getRandomArtImage(),
            getRandomArtImage(),
            getRandomArtImage(),
          ],
        };

        setCurrentArt(generatedArt);
        setVariations(generatedArt.variations);
        setGenerating(false);

        if (onArtCreated) {
          onArtCreated(generatedArt);
        }

        toast({
          title: "Artwork created!",
          description: "Your vision has been brought to life.",
        });
      }, 3000);
    } catch (error) {
      console.error("Error generating art:", error);
      toast({
        title: "Generation failed",
        description: "Please try again with a different prompt",
        variant: "destructive",
      });
      setGenerating(false);
    }
  };

  // Update style settings
  const updateStyleSetting = (
    key: keyof StyleSettings,
    value: number | string
  ) => {
    setStyleSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row">
        {/* Creation Controls Panel */}
        <div className="lg:w-1/3 p-6 md:p-8 bg-neutral-100 border-r border-neutral-200">
          <div className="mb-8">
            <label className="block text-neutral-800 font-medium mb-2">
              Describe Your Vision
            </label>
            <Textarea
              className="w-full p-4 rounded-xl bg-white border border-neutral-200 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition"
              placeholder={samplePrompts[0]}
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <SliderCard
              label="Artistic Style"
              description=""
              leftLabel="Abstract"
              rightLabel="Realistic"
              value={styleSettings.abstractToRealistic}
              onChange={(value) =>
                updateStyleSetting("abstractToRealistic", value)
              }
            />

            <SliderCard
              label="Color Mood"
              description=""
              leftLabel="Warm"
              rightLabel="Cool"
              value={styleSettings.warmToCool}
              onChange={(value) => updateStyleSetting("warmToCool", value)}
            />

            <SliderCard
              label="Complexity"
              description=""
              leftLabel="Minimal"
              rightLabel="Detailed"
              value={styleSettings.minimalToDetailed}
              onChange={(value) =>
                updateStyleSetting("minimalToDetailed", value)
              }
            />
          </div>

          <div className="mb-6">
            <label className="block text-neutral-800 font-medium mb-2">
              Artistic Influence
            </label>
            <div className="relative">
              <Select
                value={styleSettings.artisticInfluence}
                onValueChange={(value) =>
                  updateStyleSetting("artisticInfluence", value)
                }
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Choose an influence..." />
                </SelectTrigger>
                <SelectContent>
                  {artisticInfluences.map((influence) => (
                    <SelectItem key={influence.id} value={influence.id}>
                      {influence.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-6">
            <Button
              onClick={generateArt}
              disabled={generating}
              className="group relative w-full py-6 bg-primary hover:bg-opacity-90 text-white rounded-xl shadow-lg hover:shadow-xl transition text-center font-medium"
            >
              <span
                className={`flex justify-center items-center ${
                  generating ? "opacity-0" : "opacity-100"
                } transition-opacity`}
              >
                <Wand2 className="mr-2 h-5 w-5" />
                Create Your Artwork
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center bg-primary rounded-xl ${
                  generating ? "opacity-100" : "opacity-0"
                } transition-opacity`}
              >
                <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                Working Magic...
              </span>
            </Button>
          </div>

          <div className="border-t border-neutral-200 pt-6">
            <div className="flex justify-between mb-4">
              <span className="text-neutral-800 font-medium">
                Advanced Options
              </span>
              <button className="text-primary">
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>

            <div className="flex gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 p-6 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition text-sm"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Reference
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coming soon! Upload your own reference images.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 p-6 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition text-sm"
                    >
                      <Mic className="mr-2 h-4 w-4" />
                      Voice to Art
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coming soon! Describe your art using voice input.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Art Preview Area */}
        <div className="lg:w-2/3 p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Your Creative Canvas</h3>
            <div className="flex gap-3">
              <Button
                size="icon"
                variant="ghost"
                className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition"
                onClick={() => generating || generateArt()}
                disabled={generating}
              >
                <RefreshCw className="h-5 w-5 text-neutral-600" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition"
                disabled={!currentArt}
              >
                <Heart className="h-5 w-5 text-neutral-600" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition"
                disabled={!currentArt}
              >
                <Share className="h-5 w-5 text-neutral-600" />
              </Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentArt ? currentArt.id : "empty"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-neutral-100 rounded-2xl h-96 sm:h-[500px] flex items-center justify-center relative overflow-hidden"
            >
              {!currentArt && !generating && (
                <div className="text-center p-6">
                  <div className="text-5xl mb-4 text-neutral-300">
                    <Paintbrush className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-medium text-neutral-500 mb-2">
                    Your Canvas Awaits
                  </h3>
                  <p className="text-neutral-400 max-w-md">
                    Enter a prompt and adjust the style settings to create your
                    masterpiece
                  </p>
                </div>
              )}

              {generating && (
                <div className="text-center p-6">
                  <motion.div
                    animate={{
                      rotate: 360,
                      opacity: [0.5, 1, 0.5],
                      scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="mb-4 text-primary"
                  >
                    <Wand2 className="h-16 w-16 mx-auto" />
                  </motion.div>
                  <h3 className="text-xl font-medium text-neutral-600 mb-2">
                    Creating Your Masterpiece...
                  </h3>
                  <p className="text-neutral-500 max-w-md">
                    Our AI is bringing your vision to life
                  </p>
                </div>
              )}

              {currentArt && !generating && (
                <ArtPreview
                  imageUrl={currentArt.imageUrl}
                  isNew={true}
                  className="polaroid-reveal"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {currentArt && variations.length > 0 && (
            <div className="mt-6">
              <div className="grid grid-cols-3 gap-3">
                {variations.map((url, index) => (
                  <div
                    key={index}
                    className={`bg-neutral-100 rounded-xl h-24 overflow-hidden cursor-pointer ${
                      index === selectedVariation
                        ? "border-2 border-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedVariation(index);
                      setCurrentArt({
                        ...currentArt,
                        imageUrl: url,
                      });
                    }}
                  >
                    <img
                      src={url}
                      alt={`Variation ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link href={`/art/${currentArt.id}`}>
                  <Button className="px-6 py-6 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full shadow-md hover:shadow-lg transition">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Order Print
                  </Button>
                </Link>
                <div className="text-xs text-neutral-500 mt-2">
                  Available in multiple sizes and frame options
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtCreator;
