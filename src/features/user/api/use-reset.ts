// hooks/useResetPasswordMutation.ts
import { useMutation } from "@tanstack/react-query";
import { ResetPasswordValues } from "../model/type"; 


type ResetPasswordOptions = {
  onSuccess?: (data: any, variables: ResetPasswordValues) => void;
  onError?: (error: any, variables: ResetPasswordValues) => void;
};

export const useResetPasswordMutation = ({
  onSuccess,
  onError,
}: ResetPasswordOptions = {}) => {
  return useMutation({
    mutationFn: async (values: ResetPasswordValues) => {
      const response = await fetch("/api/auth/reset-password",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log("Reset password response:", response); // للتأكد من الاستجابة
      return response;
    },
    onSuccess: (data, variables) => {
      onSuccess?.(data, variables); // التوجيه أو الرسائل تظهر في الكومبوننت
    },
    onError: (error, variables) => {
      onError?.(error, variables);
    },
  });
};
