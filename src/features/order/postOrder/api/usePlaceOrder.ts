import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/keys/query-keys";
import { useMutation } from "@tanstack/react-query";

export const usePlaceOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const res = await fetch("/api/orders", {
                method: "POST", // السيرفر سيعرف من أنت عبر الكوكيز/التوكن
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) throw new Error("فشل إنشاء الطلب");
            return res.json();
        },
        onSuccess: () => {
            // تفريغ السلة من الكاش فوراً
            queryClient.setQueryData(queryKeys.cart.all, []);
            queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
        },
    });
};