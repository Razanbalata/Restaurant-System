// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { queryKeys } from "@/shared/keys/query-keys";

// export const useUpdateCart = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ cartItemId, newQuantity }: { cartItemId: number; newQuantity: number }) => {
//       const res = await fetch("/api/cart", {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ cartItemId, newQuantity }),
//       });
//       if (!res.ok) throw new Error("فشل تحديث الكمية");
//       return res.json();
//     },

//     // 1. بمجرد استدعاء الدالة (قبل وصول رد السيرفر)
//     onMutate: async (newUpdate) => {
//       // إلغاء أي جلب بيانات جارٍ للسلة حتى لا يحدث تضارب
//       await queryClient.cancelQueries({ queryKey: queryKeys.cart.all });

//       // حفظ نسخة احتياطية من البيانات الحالية (للطوارئ)
//       const previousCart = queryClient.getQueryData(queryKeys.cart.all);

//       // تحديث الكاش يدوياً بشكل "متفائل"
//       queryClient.setQueryData(queryKeys.cart.all, (old: any[] | undefined) => {
//         if (!old) return [];
//         return old.map((item) =>
//           item.id === newUpdate.cartItemId
//             ? { ...item, quantity: newUpdate.newQuantity }
//             : item
//         );
//       });

//       // إرجاع النسخة الاحتياطية لاستخدامها في حال الفشل
//       return { previousCart };
//     },

//     // 2. في حال فشل الطلب (مثلاً انقطع الإنترنت)
//     onError: (err, newUpdate, context) => {
//       if (context?.previousCart) {
//         queryClient.setQueryData(queryKeys.cart.all, context.previousCart);
//       }
//       alert("حدث خطأ أثناء التحديث، تم استعادة القيمة السابقة.");
//     },

//     // 3. في كل الأحوال (سواء نجح أو فشل) تأكد من مطابقة السيرفر
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
//     },
//   });
// };