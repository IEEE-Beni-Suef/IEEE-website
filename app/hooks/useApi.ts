import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ActiveUserByIdApi,
  deleteUserByIdApi,
  getAllUsersApi,
  getCommitteesApi,
} from "~/lib/api";

export const useCommittees = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["committees"],
    queryFn: getCommitteesApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return { data, ...rest };
};

export const useAllUsers = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsersApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return { data, ...rest };
};

export const useDeleteUser = (id: number) => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["deleteUser", id],
    mutationFn: () => deleteUserByIdApi(id),
  });

  return { mutate, ...rest };
};

export const useActiveUser = (id: number) => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["activeUser", id],
    mutationFn: () => ActiveUserByIdApi(id),
  });

  return { mutate, ...rest };
};
// Assuming you have an API endpoint to activate a user
