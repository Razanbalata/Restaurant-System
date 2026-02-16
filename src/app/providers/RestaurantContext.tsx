"use client";

import { createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { useRestaurants } from "@/features/(admin)/restaurant/get-restaurants/api/useRestaurants"; // hook API لجلب المطاعم الخاصة بالمالك

export interface Restaurant {
  id: string;
  name: string;
  city?: string;
  image?: string;
}

interface RestaurantContextType {
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant: Dispatch<SetStateAction<Restaurant | null>>;
  isReady: boolean;
  selectRestaurant: (restaurant: Restaurant, redirect?: boolean) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  const { useAdminRestaurants } = useRestaurants();
  const {data:ownerRestaurants ,isLoading} = useAdminRestaurants

  useEffect(() => {
    if (!isLoading && ownerRestaurants) {
      const saved = localStorage.getItem("selectedRestaurant");
      if (saved) {
        try {
          const parsed: Restaurant = JSON.parse(saved);
          const exists = ownerRestaurants.some((r:any) => r.id === parsed.id);
          if (exists) {
            setSelectedRestaurant(parsed);
          } else {
            setSelectedRestaurant(null);
            localStorage.removeItem("selectedRestaurant");
          }
        } catch {
          setSelectedRestaurant(null);
          localStorage.removeItem("selectedRestaurant");
        }
      }
      setIsReady(true);
    }
  }, [isLoading, ownerRestaurants]);

  useEffect(() => {
    if (isReady) {
      if (selectedRestaurant) {
        localStorage.setItem("selectedRestaurant", JSON.stringify(selectedRestaurant));
      } else {
        localStorage.removeItem("selectedRestaurant");
      }
    }
  }, [selectedRestaurant, isReady]);

  const selectRestaurant = (restaurant: Restaurant, redirect: boolean = true) => {
    setSelectedRestaurant(restaurant);
    if (redirect) {
      router.push(`/shared/restaurantsDetails/${restaurant.id}`);
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

export const useRestaurant = (): RestaurantContextType => {
  const context = useContext(RestaurantContext);
  if (!context) throw new Error("useRestaurant must be used inside RestaurantProvider");
  return context;
};
