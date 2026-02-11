"use client";

import DeleteRestaurantBtn from "@/features/(admin)/restaurant/delete-restaurant/ui/DeleteRestaurantBtn";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Divider,
  Stack,
} from "@mui/material";
import { Shield } from "lucide-react";
import { useState } from "react";
import UpdatePasswordButton from "@/features/user/ui/UpdatePasswordButton"; // الزر المستقل

export function SecuritySection({ restaurantId }: any) {
  const [formData, setFormData] = useState({
    oldPass: "",
    newPass: "",
    confirmPass: "",
  });

  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}
    >
      {/* Header */}
      <Box sx={{ p: 3, pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <Shield size={20} color="#16a34a" />
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem" }}>
            Security
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Manage your account security settings
        </Typography>
      </Box>

      <CardContent>
        <Stack spacing={2.5}>
          {/* Change Password Fields */}
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Current Password
            </Typography>
            <TextField
              value={formData.oldPass}
              onChange={(e) =>
                setFormData({ ...formData, oldPass: e.target.value })
              }
              fullWidth
              size="small"
              type="password"
              placeholder="Current password"
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                New Password
              </Typography>
              <TextField
                value={formData.newPass}
                onChange={(e) =>
                  setFormData({ ...formData, newPass: e.target.value })
                }
                fullWidth
                size="small"
                type="password"
                placeholder="New password"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Confirm Password
              </Typography>
              <TextField
                value={formData.confirmPass}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPass: e.target.value })
                }
                fullWidth
                size="small"
                type="password"
                placeholder="Confirm password"
              />
            </Box>
          </Box>

          {/* زر تحديث الباسورد المستقل */}
          <UpdatePasswordButton
            oldPassword={formData.oldPass}
            newPassword={formData.newPass}
            confirmPassword={formData.confirmPass}
            onSuccess={() =>
              setFormData({ oldPass: "", newPass: "", confirmPass: "" })
            }
          />

          <Divider sx={{ my: 1 }} />

          {/* Danger Zone */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "rgba(239, 68, 68, 0.05)",
              border: "1px solid rgba(239, 68, 68, 0.1)",
            }}
          >
            <Typography
              sx={{ fontWeight: 600, color: "#ef4444", fontSize: "0.9rem" }}
            >
              Danger Zone
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mb: 1.5 }}
            >
              Once you delete your account, there is no going back.
            </Typography>
            <DeleteRestaurantBtn r={restaurantId} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
