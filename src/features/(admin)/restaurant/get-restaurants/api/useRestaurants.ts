import { Restaurant } from "@/features/(customer)/get-restaurants/libs/types";
import { queryKeys } from "@/shared/keys/query-keys";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {toast} from "sonner"

export const useRestaurants = () => {
  // ✅ 1. Fetch owner's restaurants
  const useAdminRestaurants = useQuery({
    queryKey: ["admin-restaurants"],
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
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (newRestaurant: {
        name: string;
        description?: string;
        city?: string;
        country?: string;
      }) => {
        const res = await fetch("/api/admin/restaurants", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...newRestaurant }),
        });
        if (!res.ok) {
          throw new Error("Failed to add restaurant");
        }
        const data = await res.json();
        return data.restaurant;
      },
      onSuccess: (variables) => {
        toast.success("Restaurant added successfully!")
        queryClient.invalidateQueries({
          queryKey: ["admin-restaurants"],
        });
      },
      onError(error: Error) {
        toast.error("An error occurred while adding the restaurant", {
          description: error.message, // Show details below title
        });
      },
    });
  };

  const useUpdateRestaurant = () => {
    const queryClient = useQueryClient();

    return useMutation<
      Restaurant,
      Error,
      { id: string; updates: Partial<Restaurant> }
    >({
      mutationFn: async ({ id, updates }) => {
        const res = await fetch(`/api/admin/restaurants/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        });
        if (!res.ok) {
          throw new Error("Failed to update restaurant");
        }
        const data = await res.json();
        return data.restaurant;
      },
      onSuccess: () => {
        toast.success("Restaurant updated successfully!")
        queryClient.invalidateQueries({
          queryKey: ["admin-restaurants"],
        });
      },
     onError(error: Error) {
        toast.error("An error occurred while updating the restaurant", {
          description: error.message, // عرض التفاصيل تحت العنوان
        });
      },
    });
  };

  const useDeleteRestaurant = () => {
    const queryClient = useQueryClient(); // 2. جلب النسخة الأصلية من الـ client

    return useMutation({
      mutationFn: async (id: string) => {
        const res = await fetch(`/api/admin/restaurants/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete restaurant");
      },

      onSuccess: () => {
        toast.success("Restaurant deleted successfully!")
        // 3. الحل الأفضل للحذف هو عمل invalidate لكل الـ restaurants
        // لضمان اختفاء العنصر من أي قائمة يظهر فيها
        queryClient.invalidateQueries({
          queryKey: ["admin-restaurants"],
        });
      },
      onError(error: Error) {
        toast.error("An error occurred while deleting the restaurant", {
          description: error.message, // عرض التفاصيل تحت العنوان
        });
      },
    });
  };

  return {
    useAdminRestaurants,
    useAddRestaurant,
    useDeleteRestaurant,
    useUpdateRestaurant,
  };
};
