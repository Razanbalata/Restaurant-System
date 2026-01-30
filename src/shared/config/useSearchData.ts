import { useRestaurant } from '@/app/providers/RestaurantContext';
import { useRestaurants } from '@/features/(admin)/restaurant/get-restaurants/api/useRestaurants';
import { useCategories } from '@/features/(admin)/menu/categories/api/useCategories';
import { useMenuItems } from '@/features/(admin)/menu/menu_items/api/useMenuItems';
import { useOrders } from '@/features/(admin)/order/getOrder/api/useOrders';
import { useRestaurantsForCustomer } from '@/features/(customer)/get-restaurants/api/useRestaurants';
import { useMenu } from '@/features/(customer)/menu/get-menu/useMenu';
import { useGetOrders } from '@/features/(customer)/order/getOrder/api/useGetOrder';
import { useCartStore } from '@/features/(customer)/cart/model/useCartStore';
import { useMe } from '@/features/user/api/use-me';

export function useSearchData() {
  const { data: user } = useMe(); // بيانات المستخدم

  const { selectedRestaurant } = useRestaurant(); // المطعم المحدد حالياً للأونر
  // ===================== Owner =====================
  const {  useAdminRestaurants } = useRestaurants();
  const { data: adminRestaurants } = useAdminRestaurants;
  const { useAdminCategories } = useCategories(selectedRestaurant?.id || '');
  const { data: adminCategories } = useAdminCategories;
   
  const { useAdminMenuItems } = useMenuItems(adminCategories?.id || '');
  const { data: adminMenuItems } = useAdminMenuItems;
  
  const { useOrdersQuery } = useOrders(selectedRestaurant?.id || '');
  const { data: orders } = useOrdersQuery;

  // ===================== Customer =====================
  const { data: restaurants } = useRestaurantsForCustomer();
  const { data: menuItems } = useMenu(selectedRestaurant?.id || '');
  const { data: customerOrders } = useGetOrders();
  const { items: cartItems } = useCartStore();

  return {
    user,

    // بيانات الأونر
    admin: {
      restaurants: adminRestaurants || [],
      categories: adminCategories || [],
      menuItems: adminMenuItems || [],
      orders: orders || [],
    },

    // بيانات الزبون
    customer: {
      restaurants: restaurants || [],
      menuItems: menuItems || [],
      orders: customerOrders || [],
      cartItems: cartItems || [],
    },
  };
}
