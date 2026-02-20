
export const queryKeys = {
  /* =====================================================
   * AUTH / USER
   * ===================================================== */
  auth: {
    me: () => ["auth", "me"] as const,               
    user: (userId: string) => ["user", userId] as const,
    users: () => ["users"] as const,                  
  },
  /* =====================================================
   * CUSTOMER
   * ===================================================== */
  customer: {
    restaurants: () => ["customer", "restaurants"] as const,
    restaurant: (restaurantId: string) => ["customer", "restaurant", restaurantId] as const,
    menu: (restaurantId?: string) => ["customer", "menu", restaurantId] as const,
    orders: (userId?: string) => ["customer", "orders", userId] as const,
  },

  /* =====================================================
   * OWNER / ADMIN
   * ===================================================== */
  owner: {
    restaurants: () => ["owner", "restaurants"] as const,
    restaurant: (restaurantId?: string) => ["owner", "restaurant", restaurantId] as const,
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
