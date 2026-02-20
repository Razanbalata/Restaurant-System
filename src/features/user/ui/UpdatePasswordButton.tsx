"use client";
import { Button } from "@mui/material";
import { useUpdatePassword } from "../api/use-UpdatePassword"; 
import { toast } from "sonner";

interface UpdatePasswordButtonProps {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  onSuccess?: () => void;
}

export default function UpdatePasswordButton({
  oldPassword,
  newPassword,
  confirmPassword,
  onSuccess,
}: UpdatePasswordButtonProps) {
  const { mutateAsync, isPending:isLoading } = useUpdatePassword();

  const handleClick = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) return;
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      await mutateAsync({ oldPassword, newPassword });
      if (onSuccess) onSuccess();
    } catch {
    }
  };

  return (
    <Button
      variant="outlined"
      fullWidth
      onClick={handleClick}
      disabled={isLoading}
      sx={{
        textTransform: "none",
        borderRadius: 2,
        borderColor: "#e2e8f0",
        color: "text.primary",
        fontWeight: 600,
        "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
      }}
    >
      {isLoading ? "Updating..." : "Update Password"}
    </Button>
  );
}
