export type MenuSource = "AI" | "MANUAL";
export type MenuStatus = "DRAFT" | "PUBLISHED";

export interface Menu {
  id: string;
  restaurantId: string;
  source: MenuSource;
  status: MenuStatus;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  aiGenerated: boolean;
}
