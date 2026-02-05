import { Button } from "@mui/material";
import React from "react";
import { useCartStore } from "../model/useCartStore";
import { toast } from "sonner";

function AddToCartBtn({
  item,
  restaurantId,
}: {
  item: any;
  restaurantId?: string;
}) {
  
  const addItem = useCartStore((state) => state.addItem);

  function handleAdd() {
   
        const parsedRestaurantId = Number(restaurantId);
   console.log("Parsed Restaurant ID:", parsedRestaurantId);
    // 🚨 حماية قوية
    if (!parsedRestaurantId || Number.isNaN(parsedRestaurantId)) {
      console.error("❌ Invalid restaurantId in AddToCartBtn:", restaurantId);
      toast.error("Restaurant not loaded yet");
      return;
    }


    addItem(
      {
        menuItemId: item.id.toString(), // ✅ المهم
        name: item.name,
        price: item.price,
        quantity: 1,
      },
      parsedRestaurantId
    );
  }

  return (
    <Button
      fullWidth
      variant="contained"
      sx={{
        borderRadius: "12px",
        py: 1.2,
        backgroundColor: "#000",
        "&:hover": { backgroundColor: "#333" },
      }}
      onClick={handleAdd}
    >
      Add to Cart
    </Button>
  );
}

export default AddToCartBtn;
