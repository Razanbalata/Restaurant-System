import { Restaurant } from "@/features/(customer)/get-restaurants/libs/types";
import { queryKeys } from "@/shared/keys/query-keys";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRestaurants = () => {
  const queryClient = useQueryClient();

  const useAdminRestaurants = useQuery({
    queryKey: queryKeys.owner.restaurants(),
    queryFn: async () => {
      const res = await fetch(`/api/admin/restaurants`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Failed to fetch restaurants");
      }
      return res.json();
    },
  });

  const useAddRestaurant = () => {
    return useMutation({
      mutationFn: async (newRestaurant: Partial<Restaurant>) => {
        const res = await fetch("/api/admin/restaurants", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRestaurant),
        });
        if (!res.ok) throw new Error("Failed to add restaurant");
        const data = await res.json();
        return data.restaurant;
      },
      onSuccess: () => {
        toast.success("Restaurant added successfully!");
        queryClient.invalidateQueries({ queryKey: queryKeys.owner.restaurants() });
      },
    });
  };

  const useUpdateRestaurant = () => {
    return useMutation<Restaurant, Error, { id: string; updates: Partial<Restaurant> }>({
      mutationFn: async ({ id, updates }) => {
        const res = await fetch(`/api/admin/restaurants/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
        if (!res.ok) throw new Error("Failed to update restaurant");
        return res.json();
      },
      onSuccess: (updated) => {
        queryClient.setQueryData(queryKeys.owner.restaurant(String(updated.id)), updated);
        queryClient.invalidateQueries({ queryKey: queryKeys.owner.restaurants() });
        toast.success("Restaurant updated successfully!");
      },
    });
  };

 // useRestaurants.ts

const useDeleteRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, hard }: { id: string; hard: boolean }) => {
      console.log("📡 HOOK: Starting Fetch...", { id, hard });
      const res = await fetch(`/api/admin/restaurants/${id}${hard ? '?hard=true' : ''}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json();
        console.error("📡 HOOK: Fetch Failed", err);
        throw new Error(err.error || "Failed");
      }
      return res.json();
    },
   onSuccess: (data, variables) => {
  console.log("🎉 HOOK SUCCESS: Server responded");

  queryClient.invalidateQueries({
    queryKey: queryKeys.owner.restaurants(),
  });

  queryClient.invalidateQueries({
    queryKey: queryKeys.owner.restaurant(String(variables.id)),
  });

  if (variables.hard) {
    toast.success("Restaurant deleted permanently!");
  } else {
    const statusMsg = data.is_active ? "Restaurant Activated! 🟢" : "Restaurant Archived! 🟡";
    toast.success(statusMsg);
  }

  console.log("✨ Both Cache Keys (List & Individual) are invalidated!");
},
    onError: (error) => {
      console.error("🔴 HOOK ERROR:", error.message);
    }
  });
};

  return {
    useAdminRestaurants,
    useAddRestaurant,
    useDeleteRestaurant,
    useUpdateRestaurant,
  };
};