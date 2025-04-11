import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SliderCard from "@/components/ui/slider-card";
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
      className="w-full transition-all duration-500"
      animate={{ height: 'auto' }}
    >
      <Card className="bg-white border border-neutral-200 shadow-md rounded-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6">
            <motion.div layout>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-neutral-800 font-medium">Describe Your Vision</label>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-neutral-500 hover:text-primary"
                    onClick={getNewRandomPrompt}
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Random
                  </Button>
                </div>
                
                <motion.div 
                  layout
                  className="relative"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <Textarea
                    ref={promptInputRef}
                    placeholder="Enter a detailed description of what you want to create..."
                    className="min-h-24 resize-none border-neutral-200 focus:border-primary"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  
                  <AnimatePresence>
                    {prompt.length > 0 && (
                      <motion.button
                        className="absolute bottom-3 right-3 text-neutral-400 hover:text-neutral-600"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => setPrompt("")}
                      >
                        <i className="fas fa-times-circle"></i>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <div className="space-y-6">
                <motion.div layout>
                  <SliderCard
                    label="Artistic Style"
                    description=""
                    leftLabel="Abstract"
                    rightLabel="Realistic"
                    value={styleSettings.abstractToRealistic}
                    onChange={(value) => updateStyleSetting("abstractToRealistic", value)}
                  />
                </motion.div>
                
                <motion.div layout>
                  <SliderCard
                    label="Color Mood"
                    description=""
                    leftLabel="Warm"
                    rightLabel="Cool"
                    value={styleSettings.warmToCool}
                    onChange={(value) => updateStyleSetting("warmToCool", value)}
                  />
                </motion.div>
              </div>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 space-y-6"
                  >
                    <SliderCard
                      label="Complexity"
                      description=""
                      leftLabel="Minimal"
                      rightLabel="Detailed"
                      value={styleSettings.minimalToDetailed}
                      onChange={(value) => updateStyleSetting("minimalToDetailed", value)}
                    />
                    
                    <div className="space-y-2">
                      <label className="text-neutral-800 font-medium block">Artistic Influence</label>
                      <div className="grid grid-cols-3 gap-2">
                        {artisticInfluences.map((influence: string) => (
                          <motion.div
                            key={influence}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Button
                              variant={
                                styleSettings.artisticInfluence === influence
                                  ? "default"
                                  : "outline"
                              }
                              className={`w-full h-full py-1.5 ${
                                styleSettings.artisticInfluence === influence
                                  ? "bg-primary text-white"
                                  : "bg-white hover:bg-neutral-100"
                              }`}
                              onClick={() =>
                                updateStyleSetting("artisticInfluence", influence)
                              }
                            >
                              {influence}
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <motion.div 
              layout 
              className="flex justify-between items-center mt-6"
            >
              <Button
                variant="outline"
                size="sm"
                className="text-neutral-600 px-3"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                {showAdvanced ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Less options
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    More options
                  </>
                )}
              </Button>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  onClick={generateArt}
                  disabled={generating || !prompt.trim()}
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-md"
                >
                  {generating ? (
                    <div className="flex items-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="mr-2"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </motion.div>
                      Creating...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <PulseAnimation className="mr-2" duration={3}>
                        <Wand2 className="h-4 w-4" />
                      </PulseAnimation>
                      Create Magic
                    </div>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Preview area */}
          <AnimatePresence>
            {currentArt && (
              <motion.div
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="border-t border-neutral-200 p-6 bg-neutral-50">
                  <div className="text-center mb-6">
                    <motion.h3 
                      className="text-xl font-semibold mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {currentArt.title}
                    </motion.h3>
                    <motion.p 
                      className="text-neutral-600 italic max-w-2xl mx-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {currentArt.description}
                    </motion.p>
                  </div>
                  
                  <div className="max-w-md mx-auto">
                    <ArtPreview
                      imageUrl={currentArt.imageUrl}
                      isNew={true}
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button className="bg-neutral-800 hover:bg-neutral-700 text-white mt-4">
                      <Image className="h-4 w-4 mr-2" />
                      View in Gallery
                    </Button>
                  </div>
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