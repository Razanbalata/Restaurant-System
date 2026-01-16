// import { Pizza, Utensils, Coffee, IceCreamBowl } from 'lucide-react';

// interface CategoryFilterProps {
//   activeCategory: string;
//   onCategoryChange: (category: string) => void;
// }

// export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
//   const categories = [
//     { id: 'all', label: 'All Items', icon: Utensils },
//     { id: 'pizza', label: 'Pizza', icon: Pizza },
//     { id: 'burger', label: 'Burgers', icon: Utensils },
//     { id: 'drinks', label: 'Drinks', icon: Coffee },
//     { id: 'desserts', label: 'Desserts', icon: IceCreamBowl },
//   ];

//   return (
//     <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
//       {categories.map((category) => {
//         const Icon = category.icon;
//         const isActive = activeCategory === category.id;
        
//         return (
//           <button
//             key={category.id}
//             onClick={() => onCategoryChange(category.id)}
//             className={`
//               flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap
//               transition-all
//               ${isActive 
//                 ? 'bg-orange-600 text-white shadow-md' 
//                 : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300'
//               }
//             `}
//           >
//             <Icon className="w-4 h-4" />
//             <span>{category.label}</span>
//           </button>
//         );
//       })}
//     </div>
//   );
// }
