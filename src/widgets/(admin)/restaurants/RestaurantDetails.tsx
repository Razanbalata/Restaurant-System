// "use client";

// import {
//   Box,
//   Typography,
//   Container,
//   Stack,
//   Chip,
//   Divider,
//   Rating,
//   Grid,
//   Paper,
//   IconButton,
//   Button,
//   CircularProgress,
//   Card,
//   CardContent,
//   Skeleton,
// } from "@mui/material";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import { useRouter } from "next/navigation";
// import { useRestaurant } from "../../../features/(customer)/get-restaurants/api/useRestaurantById";
// import Image from "next/image";
// import { AddShoppingCart, AutoAwesomeMosaicOutlined } from "@mui/icons-material";
// import { useGenerateAndSaveMenu } from "@/features/(admin)/menu/getMenu/api/useGenerateMenu";
// import { useState } from "react";
// import { useMenu } from "@/features/(customer)/menu/get-menu/useMenu";
// import { DeleteIcon, EditIcon } from "lucide-react";
// import { useMe } from "@/features/user/api/use-me";
// import { useAddToCart } from "@/features/cart/api/useAddToCart";
// import { useCartStore } from "../../../features/(customer)/cart/model/useCartStore";

// export default function RestaurantDetailPage({ restaurantId }) {
//   const router = useRouter();
//   const [forceShow, setForceShow] = useState(false);
//   const {data:user} = useMe();

//   // 1. جلب بيانات المطعم
//   const { data: restaurant, isLoading: isRestaurantLoading } =
//     useRestaurant(restaurantId);

//   // 2. جلب المنيو (إذا كان موجوداً في الداتابيز)
//   const { data: menuData, isLoading: isMenuFetching } = useMenu(restaurantId);

//   // 3. هوك توليد المنيو (Mutation)
//   const { mutate, isPending: isGenerating } =
//     useGenerateAndSaveMenu(restaurantId);
//     const {addItem} = useCartStore()

//   // منطق العرض
//   const hasMenu = menuData && menuData.length > 0;
//   const shouldDisplayMenu = hasMenu || forceShow;
//   const isOwner = user && restaurant?.owner_id === user.id;

//   const restaurantImage = `https://picsum.photos/seed/${restaurantId}/800/600`;

//   // دالة توليد المنيو
//   function handleGenerateMenu() {
//     mutate(
//       { name: restaurant.name, category: restaurant.category },
//       {
//         onSuccess: () => {
//           setForceShow(true);
//         },
//       }
//     );
//   }

//   function handleAddToCart(item) {
//     if (!user?.id) {
//     alert("يرجى تسجيل الدخول");
//     return;
//   }
//   addItem(item,restaurantId)
//   }

//   // حالة تحميل المطعم الأساسية
//   if (isRestaurantLoading) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 10, textAlign: "center" }}>
//         <CircularProgress />
//         <Typography sx={{ mt: 2 }}>جاري تحميل بيانات المطعم...</Typography>
//       </Container>
//     );
//   }

//   if (!restaurant) return <Typography>المطعم غير موجود</Typography>;

//   return (
//     <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
//       {/* هيدر الصورة */}
//       <Box sx={{ position: "relative", height: { xs: 250, md: 400 } }}>
//         <Box
//           sx={{
//             position: "relative",
//             width: "100%",
//             height: "100%",
//             borderRadius: "0 0 40px 40px",
//             overflow: "hidden",
//           }}
//         >
//           <Image
//             src={restaurantImage}
//             alt={restaurant.name}
//             fill
//             priority
//             style={{ objectFit: "cover" }}
//           />
//         </Box>
//         <IconButton
//           onClick={() => router.back()}
//           sx={{
//             position: "absolute",
//             top: 20,
//             right: 20,
//             bgcolor: "white",
//             "&:hover": { bgcolor: "#f5f5f5" },
//           }}
//         >
//           <ArrowForwardIosIcon fontSize="small" />
//         </IconButton>
//       </Box>

//       {/* كرت المعلومات العائم */}
//       <Container maxWidth="lg" sx={{ mt: -8, position: "relative", zIndex: 2 }}>
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 3, md: 5 },
//             borderRadius: "24px",
//             border: "1px solid #eee",
//             boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
//           }}
//         >
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={8}>
//               <Stack spacing={1}>
//                 <Typography
//                   variant="h3"
//                   fontWeight="900"
//                   sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
//                 >
//                   {restaurant.name}
//                 </Typography>
//                 <Stack direction="row" spacing={1} alignItems="center">
//                   <Rating value={4.8} readOnly size="small" />
//                   <Typography variant="body2" fontWeight="700">
//                     (120 تقييم)
//                   </Typography>
//                   <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
//                   <Chip
//                     label={restaurant.category}
//                     color="primary"
//                     sx={{ fontWeight: "bold" }}
//                   />
//                 </Stack>
//                 <Stack
//                   direction="row"
//                   spacing={3}
//                   sx={{ mt: 2, color: "text.secondary" }}
//                 >
//                   <Box display="flex" alignItems="center" gap={0.5}>
//                     <LocationOnIcon fontSize="small" color="primary" />
//                     <Typography variant="body2">
//                       {restaurant.city}, {restaurant.country}
//                     </Typography>
//                   </Box>
//                   <Box display="flex" alignItems="center" gap={0.5}>
//                     <AccessTimeIcon fontSize="small" color="primary" />
//                     <Typography variant="body2">30-45 دقيقة</Typography>
//                   </Box>
//                 </Stack>
//               </Stack>
//             </Grid>
//           </Grid>
//           <Divider sx={{ my: 4 }} />
//           <Typography
//             variant="body1"
//             color="text.secondary"
//             sx={{ lineHeight: 1.8 }}
//           >
//             {restaurant.description || "لا يوجد وصف متوفر لهذا المطعم حالياً."}
//           </Typography>
//         </Paper>

//         {/* قسم المنيو الديناميكي */}
//         <Box sx={{ mt: 6, pb: 10 }}>
//           <Typography variant="h4" fontWeight="900" mb={4}>
//             قائمة الطعام
//           </Typography>

//           {isGenerating ? (
//             /* حالة التوليد بالذكاء الاصطناعي */
//             <Box sx={{ textAlign: "center", py: 8 }}>
//               <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
//               <Typography variant="h5" fontWeight="bold" color="primary">
//                 جاري ابتكار المنيو بواسطة AI... ✨
//               </Typography>
//               <Typography color="text.secondary">
//                 هذه العملية قد تستغرق بضع ثوانٍ
//               </Typography>
//             </Box>
//           ) : !shouldDisplayMenu ? (
//             /* حالة الزر قبل التوليد */
//             <Paper
//               sx={{
//                 p: 6,
//                 textAlign: "center",
//                 borderRadius: "24px",
//                 background: "linear-gradient(135deg, #ffffff 0%, #f1f8ff 100%)",
//                 border: "1px dashed #2196f3",
//               }}
//             >
//               <RestaurantMenuIcon
//                 sx={{ fontSize: 60, color: "#2196f3", mb: 2, opacity: 0.5 }}
//               />
//               <Typography variant="h6" gutterBottom fontWeight="700">
//                 قائمة الطعام غير متوفرة بعد
//               </Typography>
//               <Typography color="text.secondary" mb={3}>
//                 هل تريد من الذكاء الاصطناعي إنشاء قائمة طعام مقترحة لهذا المطعم؟
//               </Typography>
//               <Button
//                 variant="contained"
//                 size="large"
//                 onClick={handleGenerateMenu}
//                 startIcon={<AutoAwesomeMosaicOutlined />}
//                 sx={{
//                   borderRadius: "12px",
//                   px: 4,
//                   py: 1.5,
//                   fontWeight: "bold",
//                 }}
//               >
//                 توليد المنيو الآن
//               </Button>
//             </Paper>
//           ) : (
//             /* عرض المنيو الحقيقي أو المولد */
//             <Grid container spacing={3}>
//               {menuData?.map((item, index) => (
//                 <Grid item xs={12} md={6} key={item.id || index}>
//                   <Card
//                     elevation={0}
//                     sx={{
//                       display: "flex",
//                       borderRadius: "24px",
//                       overflow: "hidden",
//                       height: { xs: 120, md: 150 },
//                       bgcolor: "white",
//                       border: "1px solid #f0f0f0",
//                       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                       position: "relative",
//                       "&:hover": {
//                         transform: "translateY(-4px)",
//                         boxShadow: "0 12px 24px rgba(0,0,0,0.06)",
//                         borderColor: "primary.light",
//                       },
//                     }}
//                   >
//                     {/* قسم الصورة مع تأثير Gradient خفيف */}
//                     <Box
//                       sx={{
//                         width: { xs: 120, md: 150 },
//                         position: "relative",
//                         flexShrink: 0,
//                       }}
//                     >
//                       <Image
//                         // استخدمنا البحث بالاسم لجلب صورة مطابقة للوجبة فعلاً
//                         src={restaurantImage}
//                         fill
//                         style={{ objectFit: "cover" }}
//                         alt={item.name}
//                         loading="lazy"
//                       />
//                       <Box
//                         sx={{
//                           position: "absolute",
//                           inset: 0,
//                           background:
//                             "linear-gradient(90deg, rgba(0,0,0,0.05) 0%, transparent 20%)",
//                         }}
//                       />
//                     </Box>

//                     {/* محتوى الوجبة المنظم */}
//                     <CardContent
//                       sx={{
//                         flex: 1,
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "space-between",
//                         p: { xs: 1.5, md: 2 },
//                         "&:last-child": { pb: { xs: 1.5, md: 2 } }, // تصحيح padding تلقائي في MUI
//                       }}
//                     >
//                       <Box>
//                         <Stack
//                           direction="row"
//                           justifyContent="space-between"
//                           alignItems="flex-start"
//                         >
//                           <Typography
//                             fontWeight="800"
//                             variant="h6"
//                             sx={{
//                               fontSize: { xs: "1rem", md: "1.15rem" },
//                               color: "#1a1a1a",
//                               lineHeight: 1.2,
//                             }}
//                           >
//                             {item.name}
//                           </Typography>

//                           {/* وسم اختياري إذا كانت الوجبة مميزة (Popular) */}
//                           {index < 2 && (
//                             <Chip
//                               label="⭐ الأكثر طلباً"
//                               size="small"
//                               sx={{
//                                 height: 20,
//                                 fontSize: "0.65rem",
//                                 bgcolor: "#fff9c4",
//                                 color: "#fbc02d",
//                                 fontWeight: "bold",
//                                 border: "1px solid #fdd835",
//                               }}
//                             />
//                           )}
//                         </Stack>

//                         <Typography
//                           variant="caption"
//                           sx={{
//                             display: "-webkit-box",
//                             WebkitLineClamp: 2,
//                             WebkitBoxOrient: "vertical",
//                             overflow: "hidden",
//                             color: "text.secondary",
//                             mt: 0.5,
//                             lineHeight: 1.4,
//                             fontSize: { xs: "0.75rem", md: "0.85rem" },
//                           }}
//                         >
//                           {item.description}
//                         </Typography>
//                       </Box>

//                       <Box
//                         sx={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "center",
//                         }}
//                       >
//                         <Typography
//                           variant="h6"
//                           color="primary"
//                           fontWeight="900"
//                         >
//                           {item.price} ₪
//                         </Typography>

//                         {isOwner ? (
//                           // واجهة صاحب المطعم: أزرار تحكم
//                           <Stack direction="row" spacing={1}>
//                             <IconButton size="small" color="info">
//                               {" "}
//                               <EditIcon fontSize="small" />{" "}
//                             </IconButton>
//                             <IconButton size="small" color="error">
//                               {" "}
//                               <DeleteIcon fontSize="small" />{" "}
//                             </IconButton>
//                           </Stack>
//                         ) : (
//                           // واجهة الزبون: زر إضافة للسلة
//                           <Button
//                             variant="contained"
//                             size="small"
//                             startIcon={<AddShoppingCart/>}
//                             sx={{ borderRadius: "10px", textTransform: "none" }}
//                             onClick={() => handleAddToCart(item)}
//                           >
//                             أضف
//                           </Button>
//                         )}
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </Box>
//       </Container>
//     </Box>
//   );
// }

"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";

// الاستيرادات المحلية للكومبوننتس الجديدة
import { RestaurantInfoCard } from "./RestaurantCard";

// Hooks
import { useRestaurantById } from "@/features/(admin)/restaurant/get-restaurants/api/useRestaurantById";
import { useMenu } from "@/features/(customer)/menu/get-menu/useMenu";
import { useMe } from "@/features/user/api/use-me";
import { useRestaurant } from "@/app/providers/RestaurantContext";
import { useParams } from "next/navigation";

export default function RestaurantDetailPage() {
  const params = useParams();
  const restaurantId = params.id as string;
 console.log("resid",restaurantId)
  const { data: user } = useMe();

  const { data: restaurant, isLoading: isRestaurantLoading } =
    useRestaurantById(restaurantId);
    console.log("restaurant in RestaurantDetails",restaurant);

  const { data: menuData = [], isLoading: isMenuLoading } =
    useMenu(restaurantId);

  const isOwner =
    user?.role === "restaurant_owner" && restaurant?.owner_id === user.id;
console.log("isOwner in RestaurantDetails",isOwner,user?.role);
  const { selectedRestaurant } = useRestaurant();



  if (isRestaurantLoading) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <CircularProgress />
        <Typography>جاري تحميل بيانات المطعم...</Typography>
      </Box>
    );
  }

  if (!restaurant) {
    return <Typography>المطعم غير موجود</Typography>;
  }

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      {/* <RestaurantHeader
        imageUrl={`https://picsum.photos/seed/${selectedRestaurant.id}/800/600`}
        name={restaurant.name}
      /> */}

      <Container maxWidth="lg" sx={{ mt: -8, position: "relative", zIndex: 2 }}>
        <RestaurantInfoCard restaurant={selectedRestaurant} isOwner={isOwner} />

        {/* <Box sx={{ mt: 6, pb: 10 }}>
          <Typography variant="h4" fontWeight="900" mb={4}>
            قائمة الطعام
          </Typography>

          {isGenerating ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <CircularProgress size={60} sx={{ mb: 3 }} />
              <Typography variant="h5" fontWeight="bold" color="primary">
                جاري ابتكار المنيو بواسطة AI... ✨
              </Typography>
            </Box>
          ) : !shouldDisplayMenu ? (
            <Paper
              sx={{
                p: 6,
                textAlign: "center",
                borderRadius: "24px",
                border: "1px dashed #2196f3",
              }}
            >
              <RestaurantMenuIcon
                sx={{ fontSize: 60, color: "#2196f3", mb: 2, opacity: 0.5 }}
              />
              <Typography variant="h6" fontWeight="700">
                قائمة الطعام غير متوفرة بعد
              </Typography>
              <Button
                variant="contained"
                onClick={() =>
                  mutate(
                    { name: restaurant.name, category: restaurant.category },
                    { onSuccess: () => setForceShow(true) },
                  )
                }
                startIcon={<AutoAwesomeMosaicOutlined />}
                sx={{ mt: 3, borderRadius: "12px" }}
              >
                توليد المنيو الآن
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {menuData?.map((item: any, index: number) => (
                <Grid item xs={12} md={6} key={item.id || index}>
                  {/* <MealCard 
                    item={item} 
                    isOwner={isOwner} 
                    isPopular={index < 2} 
                    onAdd={(i: any) => user ? addItem(i, restaurantId) : alert("يرجى تسجيل الدخول")} 
                  /> 
                </Grid>
              ))}
            </Grid>
          )}
        </Box> */}
      </Container>
    </Box>
  );
}
