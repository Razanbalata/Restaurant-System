// // import { useMutation, useQueryClient } from "@tanstack/react-query";
// // import { queryKeys } from "@/shared/keys/query-keys";

// // export const useGenerateAndSaveMenu = (restaurantId: string) => {
// //   const queryClient = useQueryClient();

// //   return useMutation({
// //     mutationFn: async ({ name, category }: { name: string; category?: string }) => {
// //       // Using the new built-in route that generates and saves together
// //       const res = await fetch(`/api/admin/menu/generate-menu`, {
// //         method: "POST",
// //         body: JSON.stringify({ 
// //           restaurantName: name, 
// //           category, 
// //           restaurantId // Very important for saving in database
// //         }),
// //       });

// //       if (!res.ok) throw new Error("Failed to generate and save menu");
// //       const data = await res.json();
// //       return data; // The data here are the meals that were actually saved in Supabase
// //     },
// //     onSuccess: (data) => {
// //       console.log("✅ Menu generated and saved successfully",data);
// //       // Update restaurant or menu data in cache immediately
// //       queryClient.invalidateQueries({ 
// //         queryKey: queryKeys.restaurants.details(restaurantId) 
// //       });
// //     }   
// //   });
// // };


// import { useMutation } from "@tanstack/react-query";
// import { AIGeneratedMeal } from "../libs/types";

// type GenerateMealsInput = {
//   prompt: string;
//   category?: string;
// };

// type GenerateMealsResponse = {
//   meals: AIGeneratedMeal[];
// };

// export async function generateMeals(payload: {
//   prompt: string;
//   category?: string;
// }) {
//   const res = await fetch("/api/admin/menu/generate", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(error.error || "AI generation failed");
//   }

//   return res.json(); // { meals: AIGeneratedMeal[] }
// }


// export const useGenerateMenu = () => {
//   return useMutation<GenerateMealsResponse, Error, GenerateMealsInput>({
//     mutationFn: generateMeals,
//   });
// };



import { useMutation } from "@tanstack/react-query";
import {
  GenerateMenuPayload,
  GenerateMenuResponse,
} from "../libs/types";

export const useGenerateMenu = () => {
  return useMutation<GenerateMenuResponse, Error, GenerateMenuPayload>({
    mutationFn: async (payload) => {
      const res = await fetch("/api/admin/menu/generate-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || "AI generation failed");
      }

      return res.json(); // { menu: [...] }
    },
  });
};







