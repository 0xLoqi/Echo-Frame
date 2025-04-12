import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ArtCustomization from "@/components/art/art-customization";
import { initialGalleryItems } from "@/lib/art-data";

export default function ArtDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const [artwork, setArtwork] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showFullscreen, setShowFullscreen] = useState(false);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        // In a real app, we would fetch from API
        // For now, find in our sample data
        const foundArtwork = initialGalleryItems.find(
          (item) => item.id === Number(id)
        );

        if (foundArtwork) {
          setArtwork(foundArtwork);
        } else {
          toast({
            title: "Artwork not found",
            description: "The requested artwork could not be found.",
            variant: "destructive",
          });
          setLocation("/gallery");
        }
      } catch (error) {
        console.error("Error fetching artwork:", error);
        toast({
          title: "Error",
          description: "There was an error loading the artwork.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id, toast, setLocation]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center min-h-screen">
        <div className="animate-spin text-primary text-4xl">
          <i className="fas fa-circle-notch"></i>
        </div>
      </div>
    );
  }

  if (!artwork) {
    return null; // We'll redirect in the useEffect
  }

  return (
    <div className="py-12 pt-24 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            <div className="relative h-[450px] overflow-hidden rounded-xl shadow-lg">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full rounded-xl object-contain"
              />
              <Button
                onClick={() => setShowFullscreen(true)}
                size="icon"
                variant="ghost"
                className="absolute bottom-4 right-4 p-2 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90"
              >
                <i className="fas fa-expand"></i>
              </Button>
            </div>

            <div className="mt-6 flex gap-4">
              <Button variant="outline" className="flex-1">
                <i className="far fa-heart mr-2"></i>
                Save
              </Button>
              <Button variant="outline" className="flex-1">
                <i className="fas fa-share-nodes mr-2"></i>
                Share
              </Button>
              <Link href="/create">
                <Button variant="outline" className="flex-1">
                  <i className="fas fa-wand-magic-sparkles mr-2"></i>
                  Remix
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            <h1 className="text-3xl font-bold mb-3">{artwork.title}</h1>
            <p className="text-xl italic font-['Playfair_Display',_serif] text-neutral-600 mb-6">
              {artwork.description}
            </p>

            <div className="mb-6 p-4 bg-neutral-100 rounded-lg">
              <h3 className="font-medium mb-2">Original Prompt</h3>
              <p className="text-neutral-600 italic">"{artwork.prompt}"</p>
            </div>

            <div className="mb-8">
              <h3 className="font-medium mb-3">Art Style Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-neutral-100 rounded-lg">
                  <div className="text-sm text-neutral-500">Abstract to Realistic</div>
                  <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${artwork.styleSettings.abstractToRealistic}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="p-3 bg-neutral-100 rounded-lg">
                  <div className="text-sm text-neutral-500">Warm to Cool</div>
                  <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FF6B6B] rounded-full"
                      style={{
                        width: `${artwork.styleSettings.warmToCool}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="p-3 bg-neutral-100 rounded-lg">
                  <div className="text-sm text-neutral-500">Minimal to Detailed</div>
                  <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00CCAA] rounded-full"
                      style={{
                        width: `${artwork.styleSettings.minimalToDetailed}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="p-3 bg-neutral-100 rounded-lg">
                  <div className="text-sm text-neutral-500">Artistic Influence</div>
                  <div className="font-medium mt-1 capitalize">
                    {artwork.styleSettings.artisticInfluence}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/checkout">
              <Button size="lg" className="w-full py-6 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg">
                <i className="fas fa-shopping-cart mr-2"></i>
                Order Print - Starting at $49.99
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="py-12 border-t border-neutral-200">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Customize Your Art Print
          </h2>
          <ArtCustomization artwork={artwork} />
        </div>

        <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
          <DialogContent className="max-w-4xl w-[95vw] p-1 bg-neutral-900">
            <div className="relative max-h-[80vh] overflow-hidden">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-contain"
              />
              <Button
                onClick={() => setShowFullscreen(false)}
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 p-2 rounded-full bg-white/30 hover:bg-white/50 text-white"
              >
                <i className="fas fa-xmark"></i>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
