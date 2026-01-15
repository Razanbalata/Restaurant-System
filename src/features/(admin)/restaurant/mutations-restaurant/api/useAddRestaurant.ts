// import { useMutation,QueryClient, useQueryClient } from "@tanstack/react-query";
// import { queryKeys } from "@/shared/keys/query-keys";
// import { Restaurant } from "../../get-restaurants/libs/types"; 

// export const useAddRestaurant = () => {
//   const queryClient = useQueryClient();
//   return useMutation ({
//     mutationFn:async (newRestaurant:{ name: string; description?: string; city?: string }) => {
//       const res = await fetch("/api/restaurants", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({...newRestaurant,owner_id: ownerId}),    
//       }
//         );
//         if (!res.ok) {
//             throw new Error("فشل إضافة المطعم");
//         }
//         const data = await res.json();
//         console.log("تمت إضافة المطعم:", data.restaurant);
//         return data.restaurant;
//     },
//     onSuccess: (variables) => {
//         queryClient.invalidateQueries({
//         queryKey: queryKeys.restaurants.list(variables.city),
//       });
//       }
//   })
// };


//   // const createRestaurant = useMutation(
//   //   async (newRestaurant: { name: string; description?: string; city?: string }) => {
//   //     const res = await fetch(`/api/restaurants`, {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ ...newRestaurant, owner_id: ownerId }),
//   //     });

//   //     if (!res.ok) {
//   //       const err = await res.json();
//   //       throw new Error(err?.error || "فشل إنشاء المطعم");
//   //     }
//   //     return res.json();
//   //   },
//   //   {
//   //     onSuccess: () => queryClient.invalidateQueries(["restaurants", ownerId]),
//   //   }
//   // );