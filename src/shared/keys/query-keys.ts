// src/shared/query-keys.ts

export const queryKeys = {
  user: {
    all: ["user"] as const,
    me: () => ["user", "me"] as const,
  },

  restaurants: {
    all: ["restaurants"] as const,
    list: (filters?: { city?: string }) =>
      ["restaurants", filters || "all"] as const,
    details: (id: string) => ["restaurants", id] as const,
  },

  cart: {
    all: ["cart"] as const,
  },
  orders: {
    all: ["orders"] as const,
    details: (orderId: string) => ["orders", orderId] as const,
  },
};
