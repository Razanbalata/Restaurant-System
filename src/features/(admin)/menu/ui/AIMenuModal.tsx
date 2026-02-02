// "use client";

// import React, { useState, useEffect, useReducer, useCallback, useRef } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Stack,
//   TextField,
//   Typography,
//   CircularProgress,
//   Box,
//   Card,
//   CardContent,
//   IconButton,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useGenerateAndSaveMenu } from "../generate-menu/api/useGenerateMenu";

// type MenuItem = {
//   name: string;
//   price: number;
//   description?: string;
//   image_url?: string;
// };

// type Props = {
//   open: boolean;
//   onClose: () => void;
//   restaurantId: string;
//   restaurantName: string;
//   category?: string;
// };

// type Action =
//   | { type: "UPDATE_ITEM"; index: number; field: keyof MenuItem; value: any }
//   | { type: "SET_ITEMS"; items: MenuItem[] }
//   | { type: "REMOVE_ITEM"; index: number };

// function menuReducer(state: MenuItem[], action: Action): MenuItem[] {
//   switch (action.type) {
//     case "UPDATE_ITEM":
//       return state.map((item, i) =>
//         i === action.index ? { ...item, [action.field]: action.value } : item
//       );
//     case "SET_ITEMS":
//       return action.items;
//     case "REMOVE_ITEM":
//       return state.filter((_, i) => i !== action.index);
//     default:
//       return state;
//   }
// }

// export default function AIMenuModal({
//   open,
//   onClose,
//   restaurantId,
//   restaurantName,
//   category,
// }: Props) {
//   const [prompt, setPrompt] = useState(
//     `Generate a menu for a Palestinian restaurant named "${restaurantName}" specializing in "${category || "General"}". I want 8 meals at realistic prices in Shekel (ILS) with random image links.`
//   );
//   const [menuItems, dispatch] = useReducer(menuReducer, []);
//   const [loading, setLoading] = useState(false);

//   const generateMenu = useGenerateAndSaveMenu(restaurantId);
//   const addMenuItem = useAddMenuItem(restaurantId);
//   const scrollRef = useRef<HTMLDivElement | null>(null);

//   // Scroll to last item whenever menuItems change
//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [menuItems]);

//   const handleGenerateMenu = async () => {
//     if (!prompt.trim()) return;
//     setLoading(true);
//     generateMenu.mutate(
//       { name: restaurantName, category: prompt },
//       {
//         onSuccess: (data: any) => {
//           dispatch({ type: "SET_ITEMS", items: data.menu || [] });
//           setLoading(false);
//         },
//         onError: (err: any) => {
//           alert(err.message);
//           setLoading(false);
//         },
//       }
//     );
//   };

//   const handleSaveMenu = async () => {
//     // Validate before saving
//     for (const item of menuItems) {
//       if (!item.name || item.price < 0) {
//         alert("Please check all menu items for valid name and price.");
//         return;
//       }
//     }
//     for (const item of menuItems) {
//       await addMenuItem.mutateAsync(item);
//     }
//     onClose();
//   };

//   const handleChange = useCallback(
//     (index: number, field: keyof MenuItem, value: any) => {
//       dispatch({ type: "UPDATE_ITEM", index, field, value });
//     },
//     []
//   );

//   const handleRemove = useCallback((index: number) => {
//     dispatch({ type: "REMOVE_ITEM", index });
//   }, []);

//   const handleClose = () => {
//     if (menuItems.length > 0 && !window.confirm("You have unsaved changes. Are you sure you want to close?")) {
//       return;
//     }
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//       <DialogTitle>AI Menu Generator</DialogTitle>
//       <DialogContent dividers>
//         <Stack spacing={2}>
//           {/* 🌟 Input Prompt */}
//           {menuItems.length === 0 && (
//             <>
//               <Typography fontWeight="bold">Prompt:</Typography>
//               <TextField
//                 multiline
//                 minRows={3}
//                 fullWidth
//                 value={prompt}
//                 onChange={(e) => setPrompt(e.target.value)}
//               />
//               <Button
//                 variant="contained"
//                 fullWidth
//                 onClick={handleGenerateMenu}
//                 disabled={loading}
//                 startIcon={loading && <CircularProgress size={18} color="inherit" />}
//               >
//                 {loading ? "Generating..." : "Generate Menu"}
//               </Button>
//             </>
//           )}

//           {/* 🌟 Generated Menu */}
//           {menuItems.length > 0 && (
//             <Stack spacing={2}>
//               <Typography fontWeight="bold">Generated Menu:</Typography>
//               {menuItems.map((item, idx) => (
//                 <Card key={idx} variant="outlined">
//                   <CardContent>
//                     <Stack spacing={1} ref={idx === menuItems.length - 1 ? scrollRef : null}>
//                       <Box display="flex" justifyContent="space-between" alignItems="center">
//                         <Typography fontWeight="bold">Meal {idx + 1}</Typography>
//                         <IconButton color="error" onClick={() => handleRemove(idx)}>
//                           <DeleteIcon />
//                         </IconButton>
//                       </Box>
//                       <TextField
//                         label="Meal Name"
//                         value={item.name}
//                         onChange={(e) => handleChange(idx, "name", e.target.value)}
//                       />
//                       <TextField
//                         label="Price (₪)"
//                         type="number"
//                         value={item.price}
//                         onChange={(e) => handleChange(idx, "price", Number(e.target.value))}
//                       />
//                       <TextField
//                         label="Description"
//                         multiline
//                         rows={2}
//                         value={item.description || ""}
//                         onChange={(e) => handleChange(idx, "description", e.target.value)}
//                       />
//                       <TextField
//                         label="Image URL"
//                         value={item.image_url || ""}
//                         onChange={(e) => handleChange(idx, "image_url", e.target.value)}
//                       />
//                     </Stack>
//                   </CardContent>
//                 </Card>
//               ))}
//             </Stack>
//           )}

//           {loading && menuItems.length > 0 && (
//             <Box textAlign="center" mt={2}>
//               <CircularProgress />
//               <Typography>Generating menu...</Typography>
//             </Box>
//           )}
//         </Stack>
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={handleClose}>Cancel</Button>
//         {menuItems.length > 0 && (
//           <Button variant="contained" onClick={handleSaveMenu}>
//             Save Menu
//           </Button>
//         )}
//       </DialogActions>
//     </Dialog>
//   );
// }
