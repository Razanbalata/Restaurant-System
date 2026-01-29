"use client";
import { createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from "react";

// 1. Define the data shape (Interface)
interface RestaurantContextType {
  selectedRestaurant: any; // Prefer replacing any with your restaurant type (e.g. Restaurant | null)
  setSelectedRestaurant: Dispatch<SetStateAction<any>>;
  isReady: boolean;
}

// 2. Give the Context the correct type (either the type or undefined as initial value)
const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("selectedRestaurant");
    if (saved) {
      try {
        setSelectedRestaurant(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse restaurant", e);
      }
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      if (selectedRestaurant) {
        localStorage.setItem("selectedRestaurant", JSON.stringify(selectedRestaurant));
      } else {
        localStorage.removeItem("selectedRestaurant");
      }
    }
  }, [selectedRestaurant, isReady]);

  return (
    // Now TypeScript will understand that the value matches the Interface
    <RestaurantContext.Provider
      value={{ selectedRestaurant, setSelectedRestaurant, isReady }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used inside RestaurantProvider");
  }
  return context;
};