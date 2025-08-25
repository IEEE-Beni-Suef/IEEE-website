import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "~/config/queryClient";
import {
  ActiveUserByIdApi,
  createCommitteeApi,
  deleteCommitteeApi,
  deleteUserByIdApi,
  getAllUsersApi,
  getCommitteeByIdApi,
  getCommitteesApi,
  updateCommitteeApi,
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

// All committees hooks

export const useCreateCommittee = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["createCommittee"],
    mutationFn: (committeeData) => createCommitteeApi(committeeData as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["committees"] });
    },
  });

  return { mutate, ...rest };
};

export const useDeleteCommittee = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["deleteCommittee"],
    mutationFn: (id: number) => deleteCommitteeApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["committees"] });
    },
  });

  return { mutate, ...rest };
};

export const useUpdateCommittee = (id: number) => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["updateCommittee", id],
    mutationFn: (committeeData) => updateCommitteeApi(id, committeeData as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["committees"] });
    },
  });

  return { mutate, ...rest };
};

export const useGetCommittee = (id: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ["committee", id],
    queryFn: () => getCommitteeByIdApi(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return { data, ...rest };
};

