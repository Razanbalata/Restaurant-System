// // // src/shared/query-keys.ts

// // export const queryKeys = {
// //   user: {
// //     all: ["user"] as const,
// //     me: () => ["user", "me"] as const,
// //   },

// //   restaurants: {
// //     all: ["restaurants"] as const,
// //     list: (filters?: { city?: string }) =>
// //       ["restaurants", filters || "all"] as const,
// //     details: (id: string) => ["restaurants", id] as const,
// //   },

// //   cart: {
// //     all: ["cart"] as const,
// //   },
// //   orders: {
// //     all: ["orders"] as const,
// //     details: (orderId: string) => ["orders", orderId] as const,
// //   },


// //   customer: {
// //     // قائمة المطاعم، مع إمكانية تمرير params
// //     restaurants: () => ["customer", "restaurants"],
// //     // تفاصيل مطعم واحد
// //     restaurantPlugin: (id: string) => ["customer", "restaurant", id],
// //     // قائمة المنيو لمطعم معين
// //     menu: (restaurantId: string) => ["customer", "menu", restaurantId],
// //     // جميع الطلبات للزبون
// //     orders: (userId?: string) => ["customer", "orders", userId],
// //   },


// // };
// // src/shared/keys/queryKeys.ts

// export const queryKeys = {
//   /* =====================================================
//    * AUTH / USER
//    * ===================================================== */
//   auth: {
//     me: () => ["auth", "me"] as const,
//     user: (userId: string) => ["user", userId] as const,
//     users: () => ["users"] as const,
//   },

//   /* =====================================================
//    * CUSTOMER
//    * ===================================================== */
//   customer: {
//     restaurants: () => ["customer", "restaurants"] as const,
//     restaurant: (id: string) => ["customer", "restaurant", id] as const,
//     menu: (restaurantId: string) => ["customer", "menu", restaurantId] as const,
//     orders: (userId?: string) => ["customer", "orders", userId] as const,
//   },

//   /* =====================================================
//    * OWNER / ADMIN
//    * ===================================================== */
//   owner: {
//     restaurants: () => ["owner", "restaurants"] as const,
//     restaurant: (id: string) => ["owner", "restaurant", id] as const,
//     menu: (restaurantId: string) => ["owner", "menu", restaurantId] as const,
//     orders: (restaurantId: string) => ["owner", "orders", restaurantId] as const,
//     dashboard: (restaurantId: string) => ["owner", "dashboard", restaurantId] as const,
//   },

//   /* =====================================================
//    * GENERIC / UTILS
//    * ===================================================== */
//   invalidateAll: () => ["_all"] as const,
// };
export const queryKeys = {
  /* =====================================================
   * AUTH / USER
   * ===================================================== */
  auth: {
    me: () => ["auth", "me"] as const,                  // بيانات المستخدم الحالي
    user: (userId: string) => ["user", userId] as const, // بيانات مستخدم محدد
    users: () => ["users"] as const,                   // كل المستخدمين (Admin panel)
  },

  /* =====================================================
   * CUSTOMER
   * ===================================================== */
  customer: {
    restaurants: () => ["customer", "restaurants"] as const,
    restaurant: (restaurantId: string) => ["customer", "restaurant", restaurantId] as const,
    menu: (restaurantId: string) => ["customer", "menu", restaurantId] as const,
    orders: (userId?: string) => ["customer", "orders", userId] as const,
  },

  /* =====================================================
   * OWNER / ADMIN
   * ===================================================== */
  owner: {
    restaurants: () => ["owner", "restaurants"] as const,
    restaurant: (restaurantId: string) => ["owner", "restaurant", restaurantId] as const,
    menu: (restaurantId: string) => ["owner", "menu", restaurantId] as const,
    orders: (restaurantId: string) => ["owner", "orders", restaurantId] as const,
    dashboard: (restaurantId: string) => ["owner", "dashboard", restaurantId] as const,
  },

  /* =====================================================
   * MENU / CATEGORIES
   * ===================================================== */
  menu: {
    categories: (restaurantId: string) => ["categories", restaurantId] as const,
    menuItems: (categoryId: string) => ["menu_items", categoryId] as const,
    generatedMenu: (restaurantId: string) => ["ai_menu", restaurantId] as const,
    generatedMenuByCategory: (restaurantId: string, categoryId: string) => ["ai_menu", restaurantId, categoryId] as const,
  },

  /* =====================================================
   * RESTAURANTS ADMIN
   * ===================================================== */
  adminRestaurants: () => ["admin-restaurants"] as const,
  adminRestaurant: (restaurantId: string) => ["admin-restaurant", restaurantId] as const,

  /* =====================================================
   * ORDERS
   * ===================================================== */
  orders: {
    customer: (userId?: string) => ["customer", "orders", userId] as const,
    owner: (restaurantId: string) => ["owner", "orders", restaurantId] as const,
    order: (orderId: string) => ["order", orderId] as const,
  },

  /* =====================================================
   * GENERIC / UTILS
   * ===================================================== */
  invalidateAll: () => ["_all"] as const,
};
