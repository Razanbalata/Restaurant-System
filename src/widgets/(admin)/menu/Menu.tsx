// import { useState } from 'react';
// import { Sidebar } from './SideBar';
// import { TopNav } from './TopNav';
// import { CategoryFilter } from './CategoriesFilter';
// import { FoodCard, FoodItem } from './FoodCard';
// import { toast, Toaster } from 'sonner';

// const foodItems: FoodItem[] = [
//   {
//     id: '1',
//     name: 'Margherita Pizza',
//     description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil',
//     price: 12.99,
//     image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emF8ZW58MXx8fHwxNzY3NTk5MDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
//     category: 'pizza',
//   },
//   {
//     id: '2',
//     name: 'Gourmet Burger',
//     description: 'Juicy beef patty with premium toppings, cheese, and special sauce',
//     price: 14.99,
//     image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyfGVufDF8fHx8MTc2NzU5OTg2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
//     category: 'burger',
//   },
//   {
//     id: '3',
//     name: 'Pasta Carbonara',
//     description: 'Creamy Italian pasta with bacon, parmesan, and egg yolk',
//     price: 13.99,
//     image: 'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGNhcmJvbmFyYXxlbnwxfHx8fDE3Njc1NzQ1NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
//     category: 'pizza',
//   },
//   {
//     id: '4',
//     name: 'Sushi Platter',
//     description: 'Fresh assorted sushi rolls with wasabi and pickled ginger',
//     price: 18.99,
//     image: 'https://images.unsplash.com/photo-1625937751876-4515cd8e78bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHBsYXR0ZXJ8ZW58MXx8fHwxNzY3NTM3MzU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
//     category: 'pizza',
//   },
//   {
//     id: '5',
//     name: 'Caesar Salad',
//     description: 'Fresh romaine lettuce with croutons, parmesan, and Caesar dressing',
//     price: 9.99,
//     image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWVzYXIlMjBzYWxhZHxlbnwxfHx8fDE3Njc1Nzk5Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
//     category: 'burger',
//   },
//   {
//     id: '6',
//     name: 'Chocolate Cake',
//     description: 'Rich, moist chocolate cake with creamy frosting',
//     price: 6.99,
//     image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlfGVufDF8fHx8MTc2NzU2NDYyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
//     category: 'desserts',
//   },
//   {
//     id: '7',
//     name: 'Fresh Lemonade',
//     description: 'Refreshing homemade lemonade with fresh lemon slices',
//     price: 3.99,
//     image: 'https://images.unsplash.com/photo-1665582295782-eecc2e25b74f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGxlbW9uYWRlfGVufDF8fHx8MTc2NzYwNDg2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
//     category: 'drinks',
//   },
//   {
//     id: '8',
//     name: 'Chicken Tacos',
//     description: 'Spicy grilled chicken tacos with fresh salsa and guacamole',
//     price: 11.99,
//     image: 'https://images.unsplash.com/photo-1570461226513-e08b58a52c53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwdGFjb3N8ZW58MXx8fHwxNzY3NTczNjI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
//     category: 'burger',
//   },
// ];

// export default function Menu() {
//   const [activeMenuItem, setActiveMenuItem] = useState('home');
//   const [activeCategory, setActiveCategory] = useState('all');

//   const handleAddToCart = (item: FoodItem) => {
//     toast.success(`${item.name} added to cart!`);
//   };

//   const filteredItems = activeCategory === 'all' 
//     ? foodItems 
//     : foodItems.filter(item => item.category === activeCategory);

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Sidebar activeItem={activeMenuItem} onItemClick={setActiveMenuItem} />
//       <TopNav />
      
//       {/* Main Content */}
//       <main className="ml-64 pt-16">
//         <div className="p-6">
//           <div className="mb-6">
//             <h2 className="text-gray-900 mb-1">Discover Delicious Food</h2>
//             <p className="text-gray-500">Order your favorite meals from our menu</p>
//           </div>

//           <CategoryFilter 
//             activeCategory={activeCategory} 
//             onCategoryChange={setActiveCategory}
//           />

//           {/* Food Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredItems.map((item) => (
//               <FoodCard 
//                 key={item.id} 
//                 item={item} 
//                 onAddToCart={handleAddToCart}
//               />
//             ))}
//           </div>

//           {filteredItems.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-gray-500">No items found in this category.</p>
//             </div>
//           )}
//         </div>
//       </main>

//       <Toaster position="top-right" />
//     </div>
//   );
// }
