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
  { label: "مطاعمي", icon: BarChartRounded, path: "/dashboard" },
  { label: "لوحة التحكم", icon: DashboardRounded, path: "/restaurantDetails", requiresRestaurant: true },
  { label: "الطلبات الحية", icon: ShoppingCartRounded, path: "/orders", requiresRestaurant: true },
  { label: "إدارة المنيو", icon: RestaurantMenuRounded, path: "/menu", requiresRestaurant: true },
];


export const customerMenu = [
  { label: 'استكشف المطاعم', icon: RestaurantMenuRounded, path: '/dashboard' },
  { label: 'طلباتي الحالية', icon: ShoppingBagRounded, path: '/order' },
  { label: 'سجل الطلبات', icon: HistoryRounded, path: '/cart' },
];
