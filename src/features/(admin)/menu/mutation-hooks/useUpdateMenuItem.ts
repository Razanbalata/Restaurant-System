// import { queryKeys } from "@/shared/keys/query-keys";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// export const useUpdateMenuItem = (restaurantId: string) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ id, updatedData }: { id: string; updatedData: any }) => {
//       const res = await fetch(`/api/restaurants/${restaurantId}/menu/${id}`, {
//         method: "PATCH",
//         body: JSON.stringify(updatedData),
//       });
//       if (!res.ok) throw new Error("Update failed");
//       console.log("🍽️ Menu item updated successfully",res);
//       return res.json();
//     },
//     onSuccess: () => {
//       // تحديث الكاش فوراً ليعكس التعديل في الواجهة
//       queryClient.invalidateQueries({ queryKey: queryKeys.restaurants.details(restaurantId) });
//     },
//   });
// };