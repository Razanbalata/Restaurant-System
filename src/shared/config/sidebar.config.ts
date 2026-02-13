// sidebar.config.ts
import {
  RestaurantMenuRounded,
  ShoppingBagRounded,
  HistoryRounded,
  DashboardRounded,
  ShoppingCartRounded,
  BarChartRounded,
  Settings,
  FavoriteRounded,
} from '@mui/icons-material';

export const adminMenu = [
  { label: "My Restaurants", icon: BarChartRounded, path: "/shared/dashboard" },
  { label: "Dashboard", icon: DashboardRounded, path: "/shared/restaurantDetails", requiresRestaurant: true },
  { label: "Live Orders", icon: ShoppingCartRounded, path: "/admin/orders", requiresRestaurant: true },
  { label: "Menu Management", icon: RestaurantMenuRounded, path: "/shared/menu", requiresRestaurant: true },
  { label: "Settings", icon: Settings, path: "/admin/settings", requiresRestaurant: true },
];


export const customerMenu = [
  { label: 'Explore Restaurants', icon: RestaurantMenuRounded, path: '/shared/dashboard' },
  { label: 'My Current Orders', icon: ShoppingBagRounded, path: '/customer/order' },
  { label: 'Order History', icon: HistoryRounded, path: '/customer/cart' },

];
