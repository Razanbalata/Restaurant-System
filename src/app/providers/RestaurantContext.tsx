"use client";
import { createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from "react";

// 1. تعريف شكل البيانات (Interface)
interface RestaurantContextType {
  selectedRestaurant: any; // يفضل استبدال any بنوع المطعم لديك (مثلاً Restaurant | null)
  setSelectedRestaurant: Dispatch<SetStateAction<any>>;
  isReady: boolean;
}

// 2. إعطاء الـ Context النوع الصحيح (إما النوع أو undefined كقيمة ابتدائية)
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
    // الآن TypeScript سيفهم أن الـ value مطابقة للـ Interface
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