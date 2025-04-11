import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SliderCard from "@/components/ui/slider-card";
import GradientSlider from "@/components/ui/gradient-slider";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
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
import { ChevronDown, ChevronUp, Wand2, Sparkles, RefreshCw, Image } from "lucide-react";
import { 
  FadeIn, 
  SlideInLeft, 
  SlideInRight,
  PulseAnimation,
  StaggeredList
} from "@/components/ui/motion-effects";

interface SimplifiedArtCreatorProps {
  onArtCreated?: (artwork: any) => void;
}

const SimplifiedArtCreator: React.FC<SimplifiedArtCreatorProps> = ({ onArtCreated }) => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState<string>(getRandomPrompt());
  const [styleSettings, setStyleSettings] = useState<StyleSettings>({
    ...defaultStyleSettings,
  });
  const [generating, setGenerating] = useState<boolean>(false);
  const [currentArt, setCurrentArt] = useState<any>(null);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const promptInputRef = useRef<HTMLTextAreaElement>(null);
  
  // Update style setting while handling array values from slider
  const updateStyleSetting = (key: keyof StyleSettings, value: any) => {
    // If value is an array (from the slider), take the first value
    const actualValue = Array.isArray(value) ? value[0] : value;
    
    setStyleSettings((prev) => ({
      ...prev,
      [key]: actualValue,
    }));
  };

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
        const generatedArt = {
          id: Math.floor(Math.random() * 1000) + 1,
          title: generateTitleFromPrompt(prompt),
          description: getRandomDescription(),
          imageUrl: getRandomArtImage(),
          prompt: prompt,
          styleSettings: styleSettings,
          variations: [
            getRandomArtImage(),
            getRandomArtImage(),
            getRandomArtImage(),
            getRandomArtImage(),
          ],
          price: Math.floor(Math.random() * 50) + 20,
        };

        setCurrentArt(generatedArt);
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
      setGenerating(false);
      toast({
        title: "Error generating art",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  // Generate random prompt
  const getNewRandomPrompt = () => {
    const newPrompt = getRandomPrompt();
    setPrompt(newPrompt);
    if (promptInputRef.current) {
      promptInputRef.current.focus();
    }
  };

  return (
    <motion.div
      layout
      className="w-full"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0.8 }}
    >
      <Card className="bg-white border border-neutral-200 shadow-md rounded-xl overflow-hidden">
        <CardContent className="p-4">
          {/* Prompt Input */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-neutral-600 text-sm font-medium">Describe your vision</label>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-xs text-neutral-500 hover:text-primary h-6 px-2"
                onClick={getNewRandomPrompt}
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Random
              </Button>
            </div>
            
            <div className="relative">
              <Textarea
                ref={promptInputRef}
                placeholder="Describe what you want to create..."
                className="resize-none border-neutral-200 focus:border-primary h-14 py-2 text-sm"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              
              <AnimatePresence>
                {prompt.length > 0 && (
                  <motion.button
                    className="absolute bottom-2 right-2 text-neutral-400 hover:text-neutral-600"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setPrompt("")}
                  >
                    <i className="fas fa-times-circle text-sm"></i>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-neutral-600 text-sm font-medium">Style</label>
                <div className="text-xs text-neutral-500 flex justify-between w-full max-w-[160px]">
                  <span>Abstract</span>
                  <span>Realistic</span>
                </div>
              </div>
              <GradientSlider
                value={[styleSettings.abstractToRealistic]}
                onValueChange={(value) => updateStyleSetting("abstractToRealistic", value)}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-neutral-600 text-sm font-medium">Color Mood</label>
                <div className="text-xs text-neutral-500 flex justify-between w-full max-w-[160px]">
                  <span>Warm</span>
                  <span>Cool</span>
                </div>
              </div>
              <GradientSlider
                value={[styleSettings.warmToCool]}
                onValueChange={(value) => updateStyleSetting("warmToCool", value)}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Advanced Options Toggle & Create Button */}
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-neutral-600 h-7 px-2"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" />
                  Less options
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" />
                  More options
                </>
              )}
            </Button>
            
            <Button
              onClick={generateArt}
              disabled={generating || !prompt.trim()}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white rounded-full h-8 px-4 shadow-sm"
            >
              {generating ? (
                <div className="flex items-center text-xs">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="mr-1"
                  >
                    <RefreshCw className="h-3 w-3" />
                  </motion.div>
                  Creating...
                </div>
              ) : (
                <div className="flex items-center text-xs">
                  <PulseAnimation className="mr-1" duration={3}>
                    <Wand2 className="h-3 w-3" />
                  </PulseAnimation>
                  Create Magic
                </div>
              )}
            </Button>
          </div>

          {/* Advanced Options */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-neutral-100"
              >
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-neutral-600 text-sm font-medium">Detail Level</label>
                      <div className="text-xs text-neutral-500 flex justify-between w-full max-w-[160px]">
                        <span>Minimal</span>
                        <span>Detailed</span>
                      </div>
                    </div>
                    <GradientSlider
                      value={[styleSettings.minimalToDetailed]}
                      onValueChange={(value) => updateStyleSetting("minimalToDetailed", value)}
                      min={0}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="text-neutral-600 text-sm font-medium block mb-1">Artistic Influence</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {artisticInfluences.map((influence) => (
                        <Button
                          key={influence.id}
                          variant={
                            styleSettings.artisticInfluence === influence.id
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className={`text-xs py-0.5 h-7 ${
                            styleSettings.artisticInfluence === influence.id
                              ? "bg-primary text-white"
                              : "bg-white hover:bg-neutral-100"
                          }`}
                          onClick={() =>
                            updateStyleSetting("artisticInfluence", influence.id)
                          }
                        >
                          {influence.id}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Generated Art Preview */}
          <AnimatePresence>
            {currentArt && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-3 border-t border-neutral-200"
              >
                <div className="text-center mb-3">
                  <h3 className="text-base font-medium">{currentArt.title}</h3>
                </div>
                
                <div className="rounded-md overflow-hidden shadow-md">
                  <ArtPreview
                    imageUrl={currentArt.imageUrl}
                    isNew={true}
                    className="w-full"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SimplifiedArtCreator;