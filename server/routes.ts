import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertArtworkSchema, insertFavoriteSchema, insertOrderSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for artworks
  app.get("/api/artworks", async (_req, res) => {
    try {
      const artworks = await storage.getAllArtworks();
      res.json(artworks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artworks" });
    }
  });

  app.get("/api/artworks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const artwork = await storage.getArtwork(parseInt(id));
      
      if (!artwork) {
        return res.status(404).json({ message: "Artwork not found" });
      }
      
      res.json(artwork);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artwork" });
    }
  });

  app.post("/api/artworks", async (req, res) => {
    try {
      const validatedData = insertArtworkSchema.parse(req.body);
      const artwork = await storage.createArtwork(validatedData);
      res.status(201).json(artwork);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid artwork data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create artwork" });
      }
    }
  });

  // API routes for favorites
  app.post("/api/favorites", async (req, res) => {
    try {
      const validatedData = insertFavoriteSchema.parse(req.body);
      const favorite = await storage.addFavorite(validatedData);
      res.status(201).json(favorite);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid favorite data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to add favorite" });
      }
    }
  });

  app.get("/api/favorites/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const favorites = await storage.getUserFavorites(parseInt(userId));
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  });

  app.delete("/api/favorites/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.removeFavorite(parseInt(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove favorite" });
    }
  });

  // API routes for orders
  app.post("/api/orders", async (req, res) => {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedData);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid order data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create order" });
      }
    }
  });

  app.get("/api/orders/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const orders = await storage.getUserOrders(parseInt(userId));
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  // API route for generating art
  app.post("/api/generate-art", async (req, res) => {
    try {
      const { prompt, styleSettings } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ message: "Prompt is required" });
      }
      
      // In a real app, this would call an AI service
      // For now, return a mock response after a delay
      setTimeout(() => {
        const mockGeneratedArt = {
          imageUrl: `https://images.unsplash.com/photo-1655635949212-1d8f4f103ea1?t=${Date.now()}`,
          variations: [
            `https://images.unsplash.com/photo-1664995397375-9a8b7208d957?t=${Date.now()}`,
            `https://images.unsplash.com/photo-1658457459786-dfeae5cbc258?t=${Date.now()}`,
            `https://images.unsplash.com/photo-1670121125613-75ed568640c3?t=${Date.now()}`
          ]
        };
        
        res.json(mockGeneratedArt);
      }, 2000);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate artwork" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
