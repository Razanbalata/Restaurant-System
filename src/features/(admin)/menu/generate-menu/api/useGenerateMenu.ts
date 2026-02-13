
import { useMutation } from "@tanstack/react-query";
import {
  GenerateMenuPayload,
  GenerateMenuResponse,
} from "../libs/types";

export const useGenerateMenu = () => {
  return useMutation<GenerateMenuResponse, Error, GenerateMenuPayload>({
    mutationFn: async (payload) => {
      const res = await fetch("/api/admin/menu/generate-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || "AI generation failed");
      }

      return res.json(); // { menu: [...] }
    },
  });
};







