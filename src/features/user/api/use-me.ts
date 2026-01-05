import { useQuery } from "@tanstack/react-query";
import { User } from "../model/type";

type MeResponse = {
  user: User | null;
};

export function useMe() {
  return useQuery<User | null>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const res = await fetch("/api/auth/me");

      if (!res.ok) {
        return null;
      }

      const data: MeResponse = await res.json();
      return data.user;
    },
    retry: false,
  });
}
