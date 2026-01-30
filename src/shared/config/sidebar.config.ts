// sidebar.config.ts
import {
  RestaurantMenuRounded,
  ShoppingBagRounded,
  HistoryRounded,
  DashboardRounded,
  ShoppingCartRounded,
  BarChartRounded,
  FavoriteRounded,
} from '@mui/icons-material';

export const adminMenu = [
  { label: "My Restaurants", icon: BarChartRounded, path: "/dashboard" },
  { label: "Dashboard", icon: DashboardRounded, path: "/restaurantDetails", requiresRestaurant: true },
  { label: "Live Orders", icon: ShoppingCartRounded, path: "/orders", requiresRestaurant: true },
  { label: "Menu Management", icon: RestaurantMenuRounded, path: "/menu", requiresRestaurant: true },
];


export const customerMenu = [
  { label: 'Explore Restaurants', icon: RestaurantMenuRounded, path: '/dashboard' },
  { label: "Menu Management", icon: RestaurantMenuRounded, path: "/menu", requiresRestaurant: true },
  { label: 'My Current Orders', icon: ShoppingBagRounded, path: '/order' },
  { label: 'Order History', icon: HistoryRounded, path: '/cart' },
];
