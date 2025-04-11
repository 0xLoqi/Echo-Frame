import { 
  users, artworks, favorites, orders, 
  type User, type Artwork, type Favorite, type Order,
  type InsertUser, type InsertArtwork, type InsertFavorite, type InsertOrder
} from "@shared/schema";
import { artImages } from "../client/src/lib/mock-images";
import { initialGalleryItems } from "../client/src/lib/art-data";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Artwork operations
  getArtwork(id: number): Promise<Artwork | undefined>;
  getAllArtworks(): Promise<Artwork[]>;
  getArtworksByStyle(style: string): Promise<Artwork[]>;
  createArtwork(artwork: InsertArtwork): Promise<Artwork>;
  searchArtworks(query: string): Promise<Artwork[]>;

  // Favorite operations
  getFavorite(id: number): Promise<Favorite | undefined>;
  getUserFavorites(userId: number): Promise<Artwork[]>;
  addFavorite(favorite: InsertFavorite): Promise<Favorite>;
  removeFavorite(id: number): Promise<void>;

  // Order operations
  getOrder(id: number): Promise<Order | undefined>;
  getUserOrders(userId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private artworks: Map<number, Artwork>;
  private favorites: Map<number, Favorite>;
  private orders: Map<number, Order>;
  
  private userIdCounter: number;
  private artworkIdCounter: number;
  private favoriteIdCounter: number;
  private orderIdCounter: number;

  constructor() {
    this.users = new Map();
    this.artworks = new Map();
    this.favorites = new Map();
    this.orders = new Map();
    
    this.userIdCounter = 1;
    this.artworkIdCounter = 1;
    this.favoriteIdCounter = 1;
    this.orderIdCounter = 1;

    // Seed with initial gallery items
    this.seedInitialArtworks();
  }

  // Seed the storage with initial gallery items
  private seedInitialArtworks() {
    initialGalleryItems.forEach(artwork => {
      const id = this.artworkIdCounter++;
      this.artworks.set(id, {
        ...artwork,
        id,
        basePrice: Math.floor(artwork.price * 100),
        createdAt: new Date()
      });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const newUser: User = { ...user, id, createdAt: new Date() };
    this.users.set(id, newUser);
    return newUser;
  }

  // Artwork methods
  async getArtwork(id: number): Promise<Artwork | undefined> {
    return this.artworks.get(id);
  }

  async getAllArtworks(): Promise<Artwork[]> {
    return Array.from(this.artworks.values());
  }

  async getArtworksByStyle(style: string): Promise<Artwork[]> {
    if (style === 'all') {
      return this.getAllArtworks();
    }
    
    return Array.from(this.artworks.values()).filter(
      artwork => artwork.style === style
    );
  }

  async createArtwork(artwork: InsertArtwork): Promise<Artwork> {
    const id = this.artworkIdCounter++;
    const newArtwork: Artwork = {
      ...artwork,
      id,
      createdAt: new Date()
    };
    this.artworks.set(id, newArtwork);
    return newArtwork;
  }

  async searchArtworks(query: string): Promise<Artwork[]> {
    const lowerCaseQuery = query.toLowerCase();
    return Array.from(this.artworks.values()).filter(
      artwork => 
        artwork.title.toLowerCase().includes(lowerCaseQuery) ||
        artwork.description.toLowerCase().includes(lowerCaseQuery) ||
        artwork.prompt.toLowerCase().includes(lowerCaseQuery) ||
        (artwork.style && artwork.style.toLowerCase().includes(lowerCaseQuery))
    );
  }

  // Favorite methods
  async getFavorite(id: number): Promise<Favorite | undefined> {
    return this.favorites.get(id);
  }

  async getUserFavorites(userId: number): Promise<Artwork[]> {
    const userFavorites = Array.from(this.favorites.values()).filter(
      fav => fav.userId === userId
    );
    
    return userFavorites.map(fav => {
      const artwork = this.artworks.get(fav.artworkId);
      if (!artwork) {
        throw new Error(`Artwork with id ${fav.artworkId} not found`);
      }
      return artwork;
    });
  }

  async addFavorite(favorite: InsertFavorite): Promise<Favorite> {
    // Check if already favorited
    const existing = Array.from(this.favorites.values()).find(
      fav => fav.userId === favorite.userId && fav.artworkId === favorite.artworkId
    );
    
    if (existing) {
      return existing;
    }
    
    const id = this.favoriteIdCounter++;
    const newFavorite: Favorite = {
      ...favorite,
      id,
      createdAt: new Date()
    };
    
    this.favorites.set(id, newFavorite);
    return newFavorite;
  }

  async removeFavorite(id: number): Promise<void> {
    this.favorites.delete(id);
  }

  // Order methods
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      order => order.userId === userId
    );
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const id = this.orderIdCounter++;
    const newOrder: Order = {
      ...order,
      id,
      createdAt: new Date()
    };
    
    this.orders.set(id, newOrder);
    return newOrder;
  }
}

// Export singleton instance
export const storage = new MemStorage();
