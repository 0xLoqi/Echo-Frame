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
    description: "A snake with diamonds all over its body, sparkling with gem-like eyes, shining like stars against a red background.",
    imageUrl: "/assets/-2b5c5_A_snake_with_diamonds_all_over_its_body__sparkling_with_gem_like_eyes__shining_like_stars_against_a_red_background__exquisite_and_luxurious_design__elegant_curves_and_complex_d.png",
    price: 49.99,
    style: "surreal",
    prompt: "A snake with diamonds all over its body, sparkling with gem-like eyes, shining like stars against a red background",
    styleSettings: {
      abstractToRealistic: 70,
      warmToCool: 80,
      minimalToDetailed: 90,
      artisticInfluence: "surrealism"
    }
  },
  {
    id: 2,
    title: "Cosmic Garden",
    description: "A highly detailed astronaut in a realistic space suit standing at the center of a vast field of pink cosmos flowers on Mars.",
    imageUrl: "/assets/2ad607_A_highly_detailed_astronaut_in_a_realistic__well_textured_space_suit_standing_at_the_center_of_a_vast_field_of_pink_cosmos_flowers_on_Mars__The_astronaut_s_suit_appears_natural.png",
    price: 49.99,
    style: "surreal",
    prompt: "A highly detailed astronaut in a realistic space suit standing at the center of a vast field of pink cosmos flowers on Mars",
    styleSettings: {
      abstractToRealistic: 85,
      warmToCool: 60,
      minimalToDetailed: 95,
      artisticInfluence: "cyberpunk"
    }
  },
  {
    id: 3,
    title: "Digital Bloom",
    description: "Flowers growing out of a white computer, surrounded by flowers and grass in a whimsical clay sculpture style.",
    imageUrl: "/assets/69c998_Flowers_grew_out_of_a_white_computer__surrounded_by_flowers_and_grass_in_the_style_of_cinema4d_rendering_and_in_the_style_of_clay_sculpture__kawaii_aesthetic__spring_garden__br.png",
    price: 49.99,
    style: "abstract",
    prompt: "Flowers growing out of a white computer, surrounded by flowers and grass in the style of clay sculpture",
    styleSettings: {
      abstractToRealistic: 40,
      warmToCool: 65,
      minimalToDetailed: 75,
      artisticInfluence: "minimalism"
    }
  },
  {
    id: 4,
    title: "Retro UFO Encounter",
    description: "A group of 1950s characters looking up at the sky in terror as a mysterious UFO hovers in the background.",
    imageUrl: "/assets/764477_Retro_50s_characters_looking_up_at_the_sky__terrified__UFO_in_the_background_.png",
    price: 49.99,
    style: "surreal",
    prompt: "Retro 50s characters looking up at the sky, terrified, UFO in the background",
    styleSettings: {
      abstractToRealistic: 75,
      warmToCool: 40,
      minimalToDetailed: 85,
      artisticInfluence: "popart"
    }
  },
  {
    id: 5,
    title: "Electronic Masquerade",
    description: "An electronic band wearing striking Margiela-inspired masks, creating an enigmatic and futuristic presence.",
    imageUrl: "/assets/-6e8ff_An_electronic_band_consisting_of_two_men_and_one_woman__they_are_wearing_masks_that_resemble_Kanye_West_s_2013_Margiela_masks_.png",
    price: 49.99,
    style: "portrait",
    prompt: "An electronic band consisting of two men and one woman, they are wearing masks that resemble Kanye West's 2013 Margiela masks",
    styleSettings: {
      abstractToRealistic: 90,
      warmToCool: 20,
      minimalToDetailed: 80,
      artisticInfluence: "vaporwave"
    }
  },
  {
    id: 6,
    title: "Skeletal Serenade",
    description: "A haunting black and white portrait of a skeletal queen in a white gown, performing on stage with regal grace.",
    imageUrl: "/assets/-36113_A_skeletal_queen_singing_on_stage__wearing_a_white_gown_and_crown_with_a_microphone_in_hand__Black_and_white_photography__a_beautiful_dress_made_of_teeth_and_lace_.png",
    price: 49.99,
    style: "portrait",
    prompt: "A skeletal queen singing on stage, wearing a white gown and crown with a microphone in hand",
    styleSettings: {
      abstractToRealistic: 65,
      warmToCool: 50,
      minimalToDetailed: 85,
      artisticInfluence: "surrealism"
    }
  },
  {
    id: 7,
    title: "Retro Roller",
    description: "Close-up of cute girl's legs wearing roller skates on a checkered gradient grass floor, surrounded by flowers in a dreamy Alice in Wonderland aesthetic.",
    imageUrl: "/assets/127f58_Close_up_of_cute_girl__s_legs_wearing_roller_skates_scrolling_on_a_checkered_gradient_grass_floor__There_are_flowers_around__Fisheye_lens__Alice_in_wonderland_aesthetic.png",
    price: 49.99,
    style: "portrait",
    prompt: "Close-up of cute girl's legs wearing roller skates scrolling on a checkered gradient grass floor with flowers around",
    styleSettings: {
      abstractToRealistic: 80,
      warmToCool: 60,
      minimalToDetailed: 70,
      artisticInfluence: "artnouveau"
    }
  },
  {
    id: 8,
    title: "Midnight Ritual",
    description: "Ominous cloaked, faceless figures circling a bonfire at a beach, hovering off the ground in an eerie twilight scene.",
    imageUrl: "attached_assets/-5afe0_Ominous_cloaked__faceless_figures_circling_a_bonfire_at_a_beach__hovering_off_the_ground__their_feet_are_not_visible__candid_photograph_taken_on_a_smartphone_at_right_before_da.png",
    price: 49.99,
    style: "surreal",
    prompt: "Ominous cloaked, faceless figures circling a bonfire at a beach, hovering off the ground",
    styleSettings: {
      abstractToRealistic: 75,
      warmToCool: 30,
      minimalToDetailed: 85,
      artisticInfluence: "darkart"
    }
  }
];

// Generate order ID
export const generateOrderId = () => {
  return `ART-${Math.floor(100000 + Math.random() * 900000)}`;
};
