// import { Box, IconButton } from "@mui/material";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// export const RestaurantHeader = ({ imageUrl, name }: { imageUrl: string; name: string }) => {
//   const router = useRouter();
//   return (
//     <Box sx={{ position: "relative", height: { xs: 250, md: 400 } }}>
//       {/* <Box sx={{ position: "relative", width: "100%", height: "100%", borderRadius: "0 0 40px 40px", overflow: "hidden" }}>
//         <Image src={imageUrl} alt={name} fill priority style={{ objectFit: "cover" }} />
//       </Box> */}
//       <IconButton
//         onClick={() => router.back()}
//         sx={{ position: "absolute", top: 20, right: 20, bgcolor: "white", "&:hover": { bgcolor: "#f5f5f5" } }}
//       >
//         <ArrowForwardIosIcon fontSize="small" />
//       </IconButton>
//     </Box>
//   );
// };

import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const RestaurantHeader = ({ image }: { image: string }) => {
  const router = useRouter();

  return (
    <Box sx={{ position: "relative", height: 260 }}>
      <Image src={image} fill alt="restaurant" style={{ objectFit: "cover" }} />

      <IconButton
        onClick={() => router.back()}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          bgcolor: "white",
        }}
      >
        <ArrowBackIcon />
      </IconButton>
    </Box>
  );
};
