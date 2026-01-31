import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordValues } from "../model/type"; 

type ForgotPasswordOptions = {
  onSuccess?: (data: any, variables: ForgotPasswordValues) => void;
  onError?: (error: any, variables: ForgotPasswordValues) => void;
};

export const useForgotPasswordMutation = ({
  onSuccess,
  onError,
}: ForgotPasswordOptions = {}) => {
  return useMutation({
    mutationFn: async (values: ForgotPasswordValues) => {
      const response = await fetch("/api/auth/forget-password",
        {
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(values)
        }
      );
      console.log("Forgot password response:", response); // للتأكد من الاستجابة
      return response;
    },
    onSuccess: (data, variables) => {
      onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      onError?.(error, variables);
    },
  });
};
