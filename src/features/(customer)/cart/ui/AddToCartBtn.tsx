import { Button } from "@mui/material";
import React from "react";
import { useCartStore } from "../model/useCartStore";

function AddToCartBtn({
  item,
  restaurantId,
}: {
  item: any;
  restaurantId: string;
}) {
  const addItem = useCartStore((state) => state.addItem);

  function handleAdd() {
    addItem(
      {
        menuItemId: item.id.toString(), // ✅ المهم
        name: item.name,
        price: item.price,
        quantity: 1,
      },
      Number(restaurantId)
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
