// import { Plus } from 'lucide-react';
// import { Card, CardContent } from './ui/card';
// import { Button } from './ui/button';
// import { ImageWithFallback } from './figma/ImageWithFallback';

// export interface FoodItem {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
// }

// interface FoodCardProps {
//   item: FoodItem;
//   onAddToCart: (item: FoodItem) => void;
// }

// export function FoodCard({ item, onAddToCart }: FoodCardProps) {
//   return (
//     <Card className="overflow-hidden hover:shadow-lg transition-shadow">
//       <div className="relative h-48 overflow-hidden">
//         <ImageWithFallback
//           src={item.image}
//           alt={item.name}
//           className="w-full h-full object-cover"
//         />
//       </div>
      
//       <CardContent className="p-4">
//         <h3 className="text-gray-900 mb-1">{item.name}</h3>
//         <p className="text-gray-500 text-sm mb-3 line-clamp-2">{item.description}</p>
        
//         <div className="flex items-center justify-between">
//           <span className="text-orange-600">${item.price.toFixed(2)}</span>
//           <Button
//             onClick={() => onAddToCart(item)}
//             size="sm"
//             className="bg-orange-600 hover:bg-orange-700 text-white"
//           >
//             <Plus className="w-4 h-4 mr-1" />
//             Add to Cart
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
