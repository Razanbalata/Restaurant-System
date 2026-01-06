"use client";
import { useState } from "react";
import { useRestaurants } from "../api/useRestaurants";

export default function RestaurantSearch() {
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("");

  const { data, isLoading, error } = useRestaurants(city);

  const handleSearch = () => setCity(cityInput.trim());

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">بحث عن المطاعم</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={cityInput.charAt(0).toUpperCase() + cityInput.slice(1) } // input مربوط بـ cityInput
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="أدخل اسم المدينة"
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          بحث
        </button>
      </div>

      {isLoading && <p>جاري التحميل...</p>}

      {!isLoading && data?.length === 0 && city && (
        <p>لم يتم العثور على مطاعم في {city}</p>
      )}

      <ul className="space-y-2">
        {data?.map((r) => (
          <li key={r.id} className="border p-2 rounded shadow-sm">
            <h2 className="font-semibold">{r.name}</h2>
            <p>
              {r.city}, {r.country}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
