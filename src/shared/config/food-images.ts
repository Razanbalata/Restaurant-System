const FOOD_MAPPING = [
  { keywords: ['burger', 'برجر', 'برغير', 'zinger', 'زنجر'], url: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500" },
  { keywords: ['pizza', 'بيتزا', 'معجنات'], url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
  { keywords: ['pasta', 'باستا', 'معكرونة', 'مكرونة'], url: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500" },
  { keywords: ['salad', 'سلطة', 'سلطه', 'فتوش', 'تبولة'], url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
  { keywords: ['coffee', 'قهوة', 'قهوه', 'نسكافيه', 'tea', 'شاي', 'juice', 'عصير'], url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500" },
  { keywords: ['steak', 'ستيك', 'لحم', 'meat'], url: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500" },
  { keywords: ['chicken', 'دجاج', 'ججاج', 'شاورما', 'shawarma'], url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500" },
  { keywords: ['dessert', 'حلو', 'حلويات', 'كيك', 'cake', 'وافل'], url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500" },
];

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500";

export const getSmartImage = (name: string, currentUrl?: string) => {
  // 1. إذا فيه صورة أصلية ارجع بها فوراً
  if (currentUrl && currentUrl.startsWith('http')) return currentUrl;
  
  const lowerName = name.toLowerCase();

  // 2. ابحث عن أول عنصر بيحتوي على كلمة مفتاحية موجودة في الاسم
  const match = FOOD_MAPPING.find(item => 
    item.keywords.some(keyword => lowerName.includes(keyword))
  );

  // 3. ارجع بصورة المطابقة أو الصورة الافتراضية
  return match ? match.url : DEFAULT_IMAGE;
};
