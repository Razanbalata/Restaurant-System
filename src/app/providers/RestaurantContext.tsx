"use client";

import { createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

// ===== 1️⃣ Define Restaurant Type =====
export interface Restaurant {
  id: string;
  name: string;
  city?: string;
  image?: string;
  // أي حقل آخر تحتاجينه
}

// ===== 2️⃣ Define Context Type =====
interface RestaurantContextType {
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant: Dispatch<SetStateAction<Restaurant | null>>;
  isReady: boolean;
  selectRestaurant: (restaurant: Restaurant, redirect?: boolean) => void;
}

// ===== 3️⃣ Create Context =====
const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

// ===== 4️⃣ Provider Component =====
export const RestaurantProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("selectedRestaurant");
    if (saved) {
      try {
        setSelectedRestaurant(JSON.parse(saved));
      } catch {
        localStorage.removeItem("selectedRestaurant");
        setSelectedRestaurant(null);
      }
    }
    setIsReady(true);
  }, []);

  // Sync to localStorage whenever selectedRestaurant changes
  useEffect(() => {
    if (isReady) {
      if (selectedRestaurant) {
        localStorage.setItem("selectedRestaurant", JSON.stringify(selectedRestaurant));
      } else {
        localStorage.removeItem("selectedRestaurant");
      }
    }
  }, [selectedRestaurant, isReady]);

  // Function to select a restaurant + optional redirect
  const selectRestaurant = (restaurant: Restaurant, redirect: boolean = true) => {
    setSelectedRestaurant(restaurant);
    if (redirect) {
      router.push(`/owner/restaurants/${restaurant.id}`);
    }
  };

  return (
    <RestaurantContext.Provider
      value={{ selectedRestaurant, setSelectedRestaurant, isReady, selectRestaurant }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

// ===== 5️⃣ Custom Hook =====
export const useRestaurant = (): RestaurantContextType => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used inside RestaurantProvider");
  }
  return context;
};
