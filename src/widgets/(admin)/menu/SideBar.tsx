// import { House, Pizza, Package, ShoppingCart, Settings } from 'lucide-react';

// interface SidebarProps {
//   activeItem: string;
//   onItemClick: (item: string) => void;
// }

// export function Sidebar({ activeItem, onItemClick }: SidebarProps) {
//   const menuItems = [
//     { id: 'home', label: 'Home', icon: House },
//     { id: 'categories', label: 'Categories', icon: Pizza },
//     { id: 'orders', label: 'Orders', icon: Package },
//     { id: 'cart', label: 'Cart', icon: ShoppingCart },
//     { id: 'settings', label: 'Settings', icon: Settings },
//   ];

//   return (
//     <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0">
//       <div className="p-6">
//         <h1 className="text-orange-600">FoodHub</h1>
//       </div>
      
//       <nav className="px-3">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = activeItem === item.id;
          
//           return (
//             <button
//               key={item.id}
//               onClick={() => onItemClick(item.id)}
//               className={`
//                 w-full flex items-center gap-3 px-4 py-3 mb-1 rounded-lg
//                 transition-colors
//                 ${isActive 
//                   ? 'bg-orange-50 text-orange-600' 
//                   : 'text-gray-700 hover:bg-gray-50'
//                 }
//               `}
//             >
//               <Icon className="w-5 h-5" />
//               <span>{item.label}</span>
//             </button>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }
