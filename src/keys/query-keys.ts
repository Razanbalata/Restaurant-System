// // src/lib/queryKeys.ts

// export const queryKeys = {
//   /* =====================================================
//    * AUTH / USER
//    * ===================================================== */

//   // المستخدم الحالي (session)
//   me: () =>
//     ["auth", "me"] as const,

//   // يوزر محدد (لو في Admin)
//   user: (userId: string) =>
//     ["user", userId] as const,

//   // كل المستخدمين (لو في لوحة تحكم)
//   users: () =>
//     ["users"] as const,


//   /* =====================================================
//    * RESTAURANTS
//    * ===================================================== */

//   // مطعم واحد
//   restaurant: (restaurantId: string) =>
//     ["restaurant", restaurantId] as const,

//   // كل المطاعم (Admin / Owner)
//   restaurants: () =>
//     ["restaurants"] as const,

//   // مطاعم المستخدم الحالي
//   myRestaurants: () =>
//     ["restaurants", "my"] as const,


//   /* =====================================================
//    * CATEGORIES
//    * ===================================================== */

//   // كاتيجوريز مطعم معين
//   categories: (restaurantId: string) =>
//     ["categories", restaurantId] as const,

//   // كاتيجوري واحدة
//   category: (categoryId: string) =>
//     ["category", categoryId] as const,

//   // كل الكاتيجوريز (نادراً)
//   allCategories: () =>
//     ["categories"] as const,


//   /* =====================================================
//    * MENU ITEMS
//    * ===================================================== */

//   // عناصر منيو حسب الكاتيجوري
//   menuItems: (categoryId: string) =>
//     ["menu_items", categoryId] as const,

//   // عنصر منيو واحد
//   menuItem: (itemId: string) =>
//     ["menu_item", itemId] as const,

//   // كل عناصر المنيو (Admin)
//   allMenuItems: () =>
//     ["menu_items"] as const,


//   /* =====================================================
//    * AI – GENERATED MENU
//    * ===================================================== */

//   // منيو مولد بالـ AI لمطعم
//   generatedMenu: (restaurantId: string) =>
//     ["ai_menu", restaurantId] as const,

//   // منيو مولد حسب الكاتيجوري
//   generatedMenuByCategory: (
//     restaurantId: string,
//     categoryId: string
//   ) =>
//     ["ai_menu", restaurantId, categoryId] as const,


//   /* =====================================================
//    * DASHBOARD / STATS
//    * ===================================================== */

//   dashboardStats: (restaurantId: string) =>
//     ["dashboard", "stats", restaurantId] as const,

//   salesStats: (restaurantId: string) =>
//     ["dashboard", "sales", restaurantId] as const,


//   /* =====================================================
//    * ORDERS (لو عندك)
//    * ===================================================== */

//   orders: (restaurantId: string) =>
//     ["orders", restaurantId] as const,

//   order: (orderId: string) =>
//     ["order", orderId] as const,


//   /* =====================================================
//    * GENERIC / UTILS
//    * ===================================================== */

//   invalidateAll: () =>
//     ["_all"] as const,
// };
