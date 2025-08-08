import { useQuery } from "@tanstack/react-query";
import { getUser } from "lib/api";

export const useCommittees = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["committees"],
    queryFn: getUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return { data, ...rest };
};
