import { useQuery } from "@tanstack/react-query";
import { User } from "../model/type";
import { queryKeys } from "@/shared/keys/query-keys";

type MeResponse = {
  user: User | null;
};

export function useMe() {
  return useQuery<User | null>({
    queryKey: queryKeys.user.me(),
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
