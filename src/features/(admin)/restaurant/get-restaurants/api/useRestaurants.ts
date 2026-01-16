import { Restaurant } from "@/features/(customer)/get-restaurants/libs/types";
import { queryKeys } from "@/shared/keys/query-keys";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useRestaurants = () => {
  // ✅ 1. جلب المطاعم الخاصة بالمالك
  const useAdminRestaurants = useQuery({
    queryKey: ["admin-restaurants"],
    queryFn: async () => {
      const res = await fetch(`/api/admin/restaurants`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "فشل جلب المطاعم");
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
          throw new Error("فشل إضافة المطعم");
        }
        const data = await res.json();
        console.log("تمت إضافة المطعم:", data.restaurant);
        return data.restaurant;
      },
      onSuccess: (variables) => {
        queryClient.invalidateQueries({
          queryKey: ["admin-restaurants"],
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
          throw new Error("فشل تحديث المطعم");
        }
        const data = await res.json();
        return data.restaurant;
      },
      onSuccess: (restaurant, { updates }) => {
        queryClient.invalidateQueries({
          queryKey: ["admin-restaurants"],
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
        // 3. الحل الأفضل للحذف هو عمل invalidate لكل الـ restaurants
        // لضمان اختفاء العنصر من أي قائمة يظهر فيها
        queryClient.invalidateQueries({
          queryKey: ["admin-restaurants"],
        });

        console.log("تم الحذف وتحديث القائمة بنجاح");
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
