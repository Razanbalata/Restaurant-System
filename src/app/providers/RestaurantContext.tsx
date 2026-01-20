"use client";
import { createContext, useContext, useEffect, useState } from "react";

const RestaurantContext = createContext(null);

export const RestaurantProvider = ({ children }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isReady, setIsReady] = useState(false); // حالة جديدة للتأكد من القراءة من localStorage

  // ✅ عند التحميل: نقرأ من localStorage ونضبط الـ Ready
  useEffect(() => {
    const saved = localStorage.getItem("selectedRestaurant");
    if (saved) {
      setSelectedRestaurant(JSON.parse(saved));
    }
    setIsReady(true); // الآن نحن جاهزون
  }, []);

  // ✅ الحفظ عند التغيير
  useEffect(() => {
    if (isReady) { // لا تحفظ إلا إذا كنا جاهزين لكي لا تمسحي البيانات بالخطأ عند أول ريفريش
      if (selectedRestaurant) {
        localStorage.setItem("selectedRestaurant", JSON.stringify(selectedRestaurant));
      } else {
        localStorage.removeItem("selectedRestaurant");
      }
    }
  }, [selectedRestaurant, isReady]);

  return (
    <RestaurantContext.Provider
      value={{ selectedRestaurant, setSelectedRestaurant, isReady }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) throw new Error("useRestaurant must be used inside RestaurantProvider");
  return context;
};