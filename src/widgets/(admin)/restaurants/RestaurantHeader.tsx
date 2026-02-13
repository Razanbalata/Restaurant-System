

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
