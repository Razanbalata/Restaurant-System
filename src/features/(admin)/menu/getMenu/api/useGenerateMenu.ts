import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/keys/query-keys";

export const useGenerateAndSaveMenu = (restaurantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, category }: { name: string; category?: string }) => {
      // Using the new built-in route that generates and saves together
      const res = await fetch(`/api/admin/menu/generate-menu`, {
        method: "POST",
        body: JSON.stringify({ 
          restaurantName: name, 
          category, 
          restaurantId // Very important for saving in database
        }),
      });

      if (!res.ok) throw new Error("Failed to generate and save menu");
      const data = await res.json();
      return data; // The data here are the meals that were actually saved in Supabase
    },
    onSuccess: (data) => {
      console.log("✅ Menu generated and saved successfully",data);
      // Update restaurant or menu data in cache immediately
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.restaurants.details(restaurantId) 
      });
    }   
  });
};