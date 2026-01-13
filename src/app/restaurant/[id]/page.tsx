// app/restaurant/[id]/page.tsx
import RestaurantDetailPage from '@/features/restaurant/get-restaurants/ui/RestaurantDetails';

// في Next.js 13/14، الـ params بتوصل كـ Promise أو Object
async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // هنا يجب أن تجلبي بيانات المطعم من Supabase بناءً على الـ id
  // مثال سريع (يفضل استخدام هوك أو دالة جلب بيانات):
  // const restaurant = await getRestaurantById(id); 

  // مؤقتاً للتجربة، سنرسل كائن المطعم:
  const dummyRestaurant = {
    id: id,
    name: "مطعم رزان للمأكولات",
    category: "بيتزا وإيطالي",
    city: "نابلس",
    country: "فلسطين",
    description: "أشهى المأكولات الإيطالية والبيتزا المميزة في قلب نابلس."
  };

  return (
    <RestaurantDetailPage restaurantId={id} />
  );
}

export default page;