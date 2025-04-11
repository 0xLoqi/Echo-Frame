import { StyleSettings } from "@shared/schema";
import { artImages } from "./mock-images";

// Style influences
export const artisticInfluences = [
  { id: "vangogh", label: "Van Gogh's Impressionism" },
  { id: "ghibli", label: "Studio Ghibli Animation" },
  { id: "cyberpunk", label: "Cyberpunk Futurism" },
  { id: "artnouveau", label: "Art Nouveau" },
  { id: "ukiyoe", label: "Japanese Ukiyo-e" },
  { id: "minimalism", label: "Modern Minimalism" },
  { id: "surrealism", label: "Surrealism" },
  { id: "popart", label: "Pop Art" },
  { id: "vaporwave", label: "Vaporwave" },
];

// Default style settings
export const defaultStyleSettings: StyleSettings = {
  abstractToRealistic: 50,
  warmToCool: 30,
  minimalToDetailed: 70,
  artisticInfluence: "vangogh",
};

// Available frame options
export const frameOptions = [
  { id: "black", label: "Modern Black", color: "#000000" },
  { id: "white", label: "Clean White", color: "#FFFFFF" },
  { id: "natural", label: "Natural Wood", color: "#9c7642" },
  { id: "none", label: "No Frame", color: "transparent" },
];

// Available sizes
export const sizeOptions = [
  { id: "small", label: "8\" × 10\"", price: 39.99 },
  { id: "medium", label: "16\" × 20\"", price: 59.99 },
  { id: "large", label: "24\" × 36\"", price: 89.99 },
  { id: "xlarge", label: "30\" × 40\"", price: 119.99 },
];

// Art style categories for gallery
export const artStyles = [
  { id: "all", label: "All Styles" },
  { id: "abstract", label: "Abstract" },
  { id: "landscape", label: "Landscapes" },
  { id: "portrait", label: "Portraits" },
  { id: "surreal", label: "Surreal" },
];

// Sample prompts for placeholder
export const samplePrompts = [
  "A dreamy cottage under cosmic skies",
  "Cyberpunk samurai in neon Tokyo",
  "Vintage botanical illustrations",
  "Abstract painting with vibrant colors and geometric shapes",
  "Serene mountain lake at sunset with reflections",
  "Underwater city with bioluminescent sea creatures",
];

// Sample art descriptions (for previews)
export const sampleDescriptions = [
  "An ethereal landscape where cosmic energies dance across a serene horizon.",
  "A vibrant cityscape where cyberpunk aesthetics meet technological dreams.",
  "Flowing forms and gentle colors create a meditative visual experience.",
  "An enchanted woodland scene with magical lighting and fantastical elements.",
  "Powerful brushstrokes capture the emotion and energy of metropolitan life.",
];

// Generate a random description for new art
export const getRandomDescription = () => {
  return sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)];
};

// Get a random sample prompt
export const getRandomPrompt = () => {
  return samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
};

// Function to generate a title from a prompt
export const generateTitleFromPrompt = (prompt: string): string => {
  // Split into words and capitalize first 3-4 words
  const words = prompt.split(' ');
  const titleWords = words.slice(0, Math.min(4, words.length));
  
  // Capitalize each word
  return titleWords
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Get a random art image URL
export const getRandomArtImage = () => {
  return artImages[Math.floor(Math.random() * artImages.length)];
};

// Gallery items with preset data for initial load
export const initialGalleryItems = [
  {
    id: 1,
    title: "Diamond Serpent",
    description: "A mesmerizing snake adorned with diamonds, its gem-like eyes gleaming against a rich red backdrop.",
    imageUrl: artImages[0],
    price: 49.99,
    style: "surreal",
    prompt: "Cosmic dreamscape with ethereal energies and vibrant colors",
    styleSettings: {
      abstractToRealistic: 30,
      warmToCool: 60,
      minimalToDetailed: 75,
      artisticInfluence: "surrealism"
    }
  },
  {
    id: 2,
    title: "Neon Futurism",
    description: "A vibrant cityscape where cyberpunk aesthetics meet technological dreams.",
    imageUrl: artImages[1],
    price: 49.99,
    style: "surreal",
    prompt: "Neon cyberpunk city with futuristic technology and bright colors",
    styleSettings: {
      abstractToRealistic: 60,
      warmToCool: 20,
      minimalToDetailed: 90,
      artisticInfluence: "cyberpunk"
    }
  },
  {
    id: 3,
    title: "Serene Abstraction",
    description: "Flowing forms and gentle colors create a meditative visual experience.",
    imageUrl: artImages[2],
    price: 49.99,
    style: "abstract",
    prompt: "Flowing abstract forms with gentle pastel colors for meditation",
    styleSettings: {
      abstractToRealistic: 10,
      warmToCool: 70,
      minimalToDetailed: 30,
      artisticInfluence: "minimalism"
    }
  },
  {
    id: 4,
    title: "Mystical Forest",
    description: "An enchanted woodland scene with magical lighting and fantastical elements.",
    imageUrl: artImages[3],
    price: 49.99,
    style: "landscape",
    prompt: "Mystical forest with magical lighting and fantasy elements",
    styleSettings: {
      abstractToRealistic: 75,
      warmToCool: 40,
      minimalToDetailed: 85,
      artisticInfluence: "ghibli"
    }
  },
  {
    id: 5,
    title: "Urban Rhythm",
    description: "Powerful brushstrokes capture the emotion and energy of metropolitan life.",
    imageUrl: artImages[4],
    price: 49.99,
    style: "abstract",
    prompt: "Urban cityscape with dynamic brushstrokes capturing energy",
    styleSettings: {
      abstractToRealistic: 50,
      warmToCool: 30,
      minimalToDetailed: 65,
      artisticInfluence: "vangogh"
    }
  },
  {
    id: 6,
    title: "Dreamy Portrait",
    description: "Ethereal portrait style with soft focus and luminous colors.",
    imageUrl: artImages[5],
    price: 49.99,
    style: "portrait",
    prompt: "Ethereal portrait with soft focus and luminous colors",
    styleSettings: {
      abstractToRealistic: 65,
      warmToCool: 60,
      minimalToDetailed: 45,
      artisticInfluence: "artnouveau"
    }
  },
  {
    id: 7,
    title: "Geometric Wonder",
    description: "Bold geometric patterns create an optical illusion of depth and movement.",
    imageUrl: artImages[6],
    price: 49.99,
    style: "abstract",
    prompt: "Bold geometric patterns creating optical illusion of depth",
    styleSettings: {
      abstractToRealistic: 20,
      warmToCool: 50,
      minimalToDetailed: 80,
      artisticInfluence: "popart"
    }
  },
  {
    id: 8,
    title: "Nostalgic Sunset",
    description: "A warm, hazy sunset vista with nostalgic retro-futuristic elements.",
    imageUrl: artImages[7],
    price: 49.99,
    style: "landscape",
    prompt: "Warm hazy sunset with nostalgic retro-futuristic elements",
    styleSettings: {
      abstractToRealistic: 70,
      warmToCool: 25,
      minimalToDetailed: 60,
      artisticInfluence: "vaporwave"
    }
  }
];

// Generate order ID
export const generateOrderId = () => {
  return `ART-${Math.floor(100000 + Math.random() * 900000)}`;
};
