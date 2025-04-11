import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import ArtPreview from "./art-preview";
import {
  artisticInfluences,
  defaultStyleSettings,
  getRandomPrompt,
  getRandomArtImage,
  getRandomDescription,
  generateTitleFromPrompt,
} from "@/lib/art-data";
import { StyleSettings } from "@shared/schema";
import { ChevronDown, ChevronUp, Wand2, Sparkles, RefreshCw, Mic } from "lucide-react";
import { 
  PulseAnimation
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

  // Voice input simulation
  const handleVoiceInput = () => {
    toast({
      title: "Voice input activated",
      description: "Tell us what you want to create...",
    });
    // In a real implementation, this would connect to the Web Speech API
    setTimeout(() => {
      setPrompt("Abstract painting with vibrant colors and geometric shapes");
      toast({
        title: "Voice captured",
        description: "You can edit the text or continue with creation",
      });
    }, 1500);
  };

  return (
    <Card className="max-w-lg bg-white border border-[#e9e0ff] shadow-lg rounded-xl overflow-hidden">
      <CardContent className="p-6">
        <h1 className="text-2xl font-semibold text-center text-[#7c5cff] mb-5">
          Create Your Masterpiece
        </h1>

        {/* Prompt Input */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <label className="text-gray-700 font-medium">Describe your vision</label>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-500 hover:text-[#7c5cff]"
                onClick={handleVoiceInput}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-500 hover:text-[#7c5cff]"
                onClick={getNewRandomPrompt}
              >
                <RefreshCw className="h-4 w-4" />
                <span className="ml-1">Random</span>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <Textarea
              ref={promptInputRef}
              placeholder="Enter a detailed description of what you want to create..."
              className="resize-none border-[#e9e0ff] focus:border-[#7c5cff] p-3 bg-[#f5f0ff] h-24"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            
            <AnimatePresence>
              {prompt.length > 0 && (
                <motion.button
                  className="absolute bottom-3 right-3 text-gray-400 hover:text-gray-600"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setPrompt("")}
                >
                  <i className="fas fa-times-circle"></i>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-5">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-700 font-medium">Style</label>
              <div className="text-sm text-gray-500 flex justify-between w-full max-w-[180px]">
                <span>Abstract</span>
                <span>Realistic</span>
              </div>
            </div>
            <Slider
              value={[styleSettings.abstractToRealistic]}
              onValueChange={(value) => updateStyleSetting("abstractToRealistic", value)}
              min={0}
              max={100}
              step={1}
              className="w-full bg-gradient-to-r from-[#ffda85] to-[#a8e8ff]"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-700 font-medium">Color Mood</label>
              <div className="text-sm text-gray-500 flex justify-between w-full max-w-[180px]">
                <span>Warm</span>
                <span>Cool</span>
              </div>
            </div>
            <Slider
              value={[styleSettings.warmToCool]}
              onValueChange={(value) => updateStyleSetting("warmToCool", value)}
              min={0}
              max={100}
              step={1}
              className="w-full bg-gradient-to-r from-[#ffa585] to-[#85c6ff]"
            />
          </div>
        </div>

        {/* Advanced Options Toggle & Create Button */}
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600"
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
          
          <Button
            onClick={generateArt}
            disabled={generating || !prompt.trim()}
            className="bg-[#7c5cff] hover:bg-[#6c4aff] text-white rounded-full px-6 shadow"
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
                  <Sparkles className="h-4 w-4" />
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
              className="mt-5 pt-5 border-t border-[#e9e0ff]"
            >
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-gray-700 font-medium">Detail Level</label>
                    <div className="text-sm text-gray-500 flex justify-between w-full max-w-[180px]">
                      <span>Minimal</span>
                      <span>Detailed</span>
                    </div>
                  </div>
                  <Slider
                    value={[styleSettings.minimalToDetailed]}
                    onValueChange={(value) => updateStyleSetting("minimalToDetailed", value)}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full bg-gradient-to-r from-[#e9e0ff] to-[#a8e8ff]"
                  />
                </div>
                
                <div>
                  <label className="text-gray-700 font-medium block mb-2">Artistic Influence</label>
                  <div className="grid grid-cols-3 gap-2">
                    {artisticInfluences.map((influence) => (
                      <Button
                        key={influence.id}
                        variant={
                          styleSettings.artisticInfluence === influence.id
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        className={`text-sm ${
                          styleSettings.artisticInfluence === influence.id
                            ? "bg-[#7c5cff] text-white"
                            : "bg-white hover:bg-[#f5f0ff] border-[#e9e0ff]"
                        }`}
                        onClick={() =>
                          updateStyleSetting("artisticInfluence", influence.id)
                        }
                      >
                        {influence.label.split(' ')[0]}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="mt-6 pt-6 border-t border-[#e9e0ff]"
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{currentArt.title}</h3>
                <p className="text-gray-600 mt-1 italic">{currentArt.description}</p>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-lg">
                <ArtPreview
                  imageUrl={currentArt.imageUrl}
                  isNew={true}
                  className="w-full"
                />
              </div>
              
              <div className="flex justify-center mt-4">
                <Button variant="outline" className="border-[#7c5cff] text-[#7c5cff] hover:bg-[#f5f0ff]">
                  View in Gallery
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default SimplifiedArtCreator;