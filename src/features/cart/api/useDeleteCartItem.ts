import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/keys/query-keys"; 

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cartItemId: number) => {
      const res = await fetch("/api/cart", { // ✅ تأكد من المسار /api/cart
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId }),
      });
      if (!res.ok) throw new Error("فشل حذف العنصر");
      return res.json();
    },

    // تحديث الشاشة فوراً قبل رد السيرفر
    onMutate: async (cartItemId) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.cart.all });
      const previousCart = queryClient.getQueryData(queryKeys.cart.all);

      // حذف العنصر من الكاش يدوياً
      queryClient.setQueryData(queryKeys.cart.all, (old: any[] | undefined) => {
        return old?.filter((item) => item.id !== cartItemId) || [];
      });

      return { previousCart };
    },

    // إذا فشل الحذف نرجع العنصر مكانه
    onError: (err, cartItemId, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(queryKeys.cart.all, context.previousCart);
      }
    },

    // في النهاية نحدث البيانات من السيرفر للتأكد
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
};
