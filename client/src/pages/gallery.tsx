import { useState } from "react";
import { motion } from "framer-motion";
import ArtGallery from "@/components/art/art-gallery";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Gallery() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="py-12 pt-24 bg-neutral-100 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Beautiful Artwork
          </h1>
          <p className="text-neutral-600 mb-8">
            Explore our curated collection of AI-generated masterpieces. Find the
            perfect piece for your space or get inspired for your own creation.
          </p>

          <div className="relative mb-12">
            <Input
              type="search"
              placeholder="Search by style, color, or theme..."
              className="rounded-full py-6 pl-12 pr-4 shadow-md border-0 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Button className="absolute right-1 top-1 bottom-1 rounded-full bg-primary text-white">
              Search
            </Button>
          </div>
        </motion.div>

        <ArtGallery
          title=""
          description=""
        />
      </div>
    </div>
  );
}
