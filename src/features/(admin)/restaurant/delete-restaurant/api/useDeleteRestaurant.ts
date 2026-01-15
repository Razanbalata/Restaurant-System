// import { useMutation, useQueryClient } from "@tanstack/react-query"; // 1. استخدمي useQueryClient
// import { queryKeys } from "@/shared/keys/query-keys";

// export const useDeleteRestaurant = () => {
//   const queryClient = useQueryClient(); // 2. جلب النسخة الأصلية من الـ client

//   return useMutation({
//     mutationFn: async (id: string) => {
//       const res = await fetch(`/api/restaurants/${id}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) throw new Error("Failed to delete restaurant");
//     },

//     onSuccess: () => {
//       // 3. الحل الأفضل للحذف هو عمل invalidate لكل الـ restaurants 
//       // لضمان اختفاء العنصر من أي قائمة يظهر فيها
//       queryClient.invalidateQueries({
//         queryKey: queryKeys.restaurants.all, 
//       });
      
//       console.log("تم الحذف وتحديث القائمة بنجاح");
//     },
//   });
// };