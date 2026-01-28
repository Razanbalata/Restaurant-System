import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/keys/query-keys";
import { useMutation } from "@tanstack/react-query";
import { useCart } from "@/features/(customer)/cart/api/useCart";
import { toast } from "sonner";
import { error } from "console";

export const usePlaceOrder = () => {
  const cart = useCart();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderBody: any) => {
      const res = await fetch("/api/customer/orders", {
        method: "POST", // السيرفر سيعرف من أنت عبر الكوكيز/التوكن
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderBody),
      });
      if (!res.ok) throw new Error("فشل إنشاء الطلب");
      return res.json();
    },
    onSuccess: () => {
      // تفريغ السلة من الكاش فوراً
      cart.clearCart();
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      toast.success("تم إرسال الطلب وتفريغ السلة بنجاح!")
    },
    onError: (error: Error) => {
  // الخيار الأفضل: دمج الرسالة داخل النص
  toast.error(`حدث خطأ أثناء إرسال الطلب: ${error.message}`);
  
}
  });
};
