// // features/(admin)/menu/api/useMenuItems.ts
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { Payload } from "../../generate-menu/libs/types";
// import { queryKeys } from "@/shared/keys/query-keys";

// export const useMenuItems = (categoryId: string) => {
//   const queryClient = useQueryClient();

//   // 1️⃣ Fetch: جلب عناصر المنيو
//   const useAdminMenuItems = useQuery({
//     queryKey: queryKeys.menu.menuItems(String(categoryId)),
//     queryFn: async () => {
//       const res = await fetch(
//         `/api/admin/menu/menu_items?categoryId=${categoryId}`,
//       );
//       if (!res.ok) throw new Error("Failed to fetch menu items");
//       return res.json();
//     },
//     enabled: !!categoryId,
//   });

//   // 2️⃣ Add: إضافة عنصر جديد (تحديث يدوي للكاش)
//   const useAddMenuItem = () =>
//     useMutation({
//       mutationFn: async ({ restaurantId, categoryId, meals }: Payload) => {
//         const itemsToSave = Array.isArray(meals) ? meals : [meals];
//         const res = await fetch("/api/admin/menu/menu_items", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             restaurantId,
//             categoryId,
//             items: itemsToSave,
//           }),
//         });

//         if (!res.ok) {
//           const error = await res.json();
//           throw new Error(error.error || "Failed to save menu");
//         }
//         return res.json(); // ننتظر مصفوفة العناصر الجديدة من السيرفر
//       },
//       onSuccess: (newItems, variables) => {
//         const catId = String(variables.categoryId);
//         const cacheKey = queryKeys.menu.menuItems(catId);

//         // تحديث الكاش: إضافة العناصر الجديدة في بداية المصفوفة
//         queryClient.setQueryData(cacheKey, (oldItems: any[] | undefined) => {
//           return oldItems ? [...newItems, ...oldItems] : [...newItems];
//         });

//         queryClient.invalidateQueries({ queryKey: cacheKey });
//         toast.success("✅ Menu saved successfully!");
//       },
//       onError: (error: any) => {
//         toast.error("❌ Failed to save menu", { description: error.message });
//       },
//     });

//   // 3️⃣ Update: تعديل عنصر (تحديث يدوي للكاش مثل حل المطاعم)
// const useUpdateMenuItem = () => {
//   return useMutation({
//     mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
//       const res = await fetch(`/api/admin/menu/menu_items/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updates),
//       });
//       if (!res.ok) throw new Error("Update failed");
//       return res.json();
//     },
//     onSuccess: (updatedItem, variables) => {
//   // 1. طباعة الكائن بالكامل
//   console.log("🟢 1. Full Response from Server:", updatedItem);
//   console.log("🔵 2. Mutation Variables (What you sent):", variables);

//   // 2. الوصول للكاش الفعلي
//   const allQueries = queryClient.getQueryCache().getAll();
//   console.log("🟡 3. All Active Queries in Cache:", allQueries.map(q => ({
//     key: q.queryKey,
//     status: q.state.status,
//     data: q.state.data
//   })));

//   // 3. تحديد المفتاح المستهدف
//   const finalCatId = String(updatedItem?.category_id || variables?.updates?.category_id || categoryId);
//   const targetKey = queryKeys.menu.menuItems(finalCatId);
//   console.log("🎯 4. Target Key we are looking for:", targetKey);

//   // 4. محاولة التحديث اليدوي مع طباعة النتيجة
//   queryClient.setQueryData(targetKey, (oldData: any) => {
//     console.log("📦 5. Old Data found for this key:", oldData);
//     if (!oldData) {
//       console.warn("⚠️ 6. NO DATA FOUND IN CACHE FOR THIS KEY!");
//       return oldData;
//     }
//     const newData = oldData.map((item: any) =>
//       String(item.id) === String(updatedItem.id) ? { ...item, ...updatedItem } : item
//     );
//     console.log("✅ 7. New Data after Map:", newData);
//     return newData;
//   });

//   queryClient.invalidateQueries({ queryKey: targetKey });
// },
//     onError: (error: Error) => {
//       toast.error("Update failed: " + error.message);
//     }
//   });
// };

//   // 4️⃣ Delete: حذف عنصر (تحديث يدوي للكاش)
//   const useDeleteMenuItem = () =>
//     useMutation({
//       mutationFn: async (id: string) => {
//         const res = await fetch(`/api/admin/menu/menu_items/${id}`, {
//           method: "DELETE",
//         });
//         if (!res.ok) throw new Error("Failed to delete item");
//         return id; // نرجع الـ ID المحذوف
//       },
//       onSuccess: (deletedId) => {
//         const cacheKey = queryKeys.menu.menuItems(String(categoryId));

//         // تحديث الكاش: إزالة العنصر المحذوف فوراً من المصفوفة
//         queryClient.setQueryData(cacheKey, (oldItems: any[] | undefined) => {
//           if (!oldItems) return [];
//           return oldItems.filter(
//             (item) => String(item.id) !== String(deletedId),
//           );
//         });

//         toast.success("Item deleted successfully!");
//       },
//       onError(error: Error) {
//         toast.error("An error occurred while deleting", {
//           description: error.message,
//         });
//       },
//     });

//   return {
//     useAdminMenuItems,
//     useAddMenuItem,
//     useUpdateMenuItem,
//     useDeleteMenuItem,
//   };
// };
// features/(admin)/menu/api/useMenuItems.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Payload } from "../../generate-menu/libs/types";
import { queryKeys } from "@/shared/keys/query-keys";

export const useMenuItems = (categoryId: string) => {
  const queryClient = useQueryClient();

  // 1️⃣ Fetch: جلب عناصر المنيو لتصنيف محدد
  const useAdminMenuItems = useQuery({
    queryKey: queryKeys.menu.menuItems(String(categoryId)),
    queryFn: async () => {
      const res = await fetch(`/api/admin/menu/menu_items?categoryId=${categoryId}`);
      if (!res.ok) throw new Error("Failed to fetch menu items");
      return res.json();
    },
    enabled: !!categoryId,
  });

  // دالة مساعدة لتحديث الكاش في "الكل" و "التصنيف"
  const updateAllCaches = (updatedItem: any, restaurantId: string, action: 'update' | 'add' | 'delete') => {
    const restaurantKey = queryKeys.customer.menu(String(restaurantId));
    const catKey = queryKeys.menu.menuItems(String(updatedItem?.category_id || categoryId));

    [restaurantKey, catKey].forEach((key) => {
      queryClient.setQueryData(key, (oldData: any) => {
        if (!oldData || !Array.isArray(oldData)) return action === 'add' ? (Array.isArray(updatedItem) ? updatedItem : [updatedItem]) : [];
        
        if (action === 'update') {
          return oldData.map((item: any) => String(item.id) === String(updatedItem.id) ? { ...item, ...updatedItem } : item);
        } else if (action === 'add') {
          const newItems = Array.isArray(updatedItem) ? updatedItem : [updatedItem];
          return [...newItems, ...oldData];
        } else if (action === 'delete') {
          return oldData.filter((item: any) => String(item.id) !== String(updatedItem));
        }
        return oldData;
      });
      queryClient.invalidateQueries({ queryKey: key });
    });
  };

  // 2️⃣ Add: إضافة عنصر
  const useAddMenuItem = () => useMutation({
    mutationFn: async ({ restaurantId, categoryId, meals }: Payload) => {
      const res = await fetch("/api/admin/menu/menu_items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ restaurantId, categoryId, items: Array.isArray(meals) ? meals : [meals] }),
      });
      if (!res.ok) throw new Error("Save failed");
      return res.json();
    },
    onSuccess: (newItems, variables) => {
      updateAllCaches(newItems, variables.restaurantId, 'add');
      toast.success("Added successfully!");
    }
  });

  // 3️⃣ Update: تعديل عنصر
  const useUpdateMenuItem = () => useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const res = await fetch(`/api/admin/menu/menu_items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    },
    onSuccess: (updatedItem, variables) => {
      const restaurantId = variables.updates.restaurant_id;
      updateAllCaches(updatedItem, restaurantId, 'update');
      console.group("🔍 Hook: Update Success Diagnostic");
  console.log("1. Server Returned:", updatedItem);
  console.log("2. Component Sent:", variables);
  
  const allQueries = queryClient.getQueryCache().getAll().map(q => q.queryKey);
  console.log("3. Current Cache Keys in System:", allQueries);

  // سنحاول عمل invalidate لكل شيء حرفياً لنرى هل ستستجيب الصفحة
  queryClient.invalidateQueries(); 
  console.log("4. Global Invalidation Triggered");
  console.groupEnd();
      
      
      toast.success("Updated successfully!");
    }
  });

  // 4️⃣ Delete: حذف عنصر
  const useDeleteMenuItem = () => useMutation({
    mutationFn: async ({id}: {id: string, restaurantId?: string}) => {
      const res = await fetch(`/api/admin/menu/menu_items/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      return id;
    },
    onSuccess: (deletedId, variables) => {
      updateAllCaches(deletedId, variables.restaurantId || "", 'delete');
      toast.success("Deleted successfully!");
    }
  });

  return { useAdminMenuItems, useAddMenuItem, useUpdateMenuItem, useDeleteMenuItem };
};