export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "restaurant_owner";
  avatar?: string; // from avatar_url
  phone?: string;
  createdAt: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  image?: string;        // image_url
  cuisine?: string;
  city: string;
  country: string;
  address?: string;
  lat?: number;
  lng?: number;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  isOpen: boolean;
  isActive: boolean;
  ownerId?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}