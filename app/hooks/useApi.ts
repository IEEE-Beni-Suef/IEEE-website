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
  UpdateUserById,
  getAllArticlesApi,
  getArticleByIdApi,
  createArticle,
  updateArticleApi,
  deleteArticleApi,
  getArticleSubsectionByIdApi,
  getAllCategoryApi,
  createCategory,
  deleteCategoryApi,
  updateCategoryApi,
  getAllSubsectionsApi,
  createSubsections,
  deleteSubsectionsApi,
  updateSubsectionsApi,
  createUser,
  getAllMeetingsApi,
  getMeetingByIdApi,
  getMeetingAttendanceApi,
  apiCreateMeeting,
  apiSubmitAttendance,
  sendChatMessage,
  resetChat
} from "~/lib/api";
import type { Chat_history_Array } from "~/types";

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

export const useCreateUser = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: (userData) => createUser(userData as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
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

export const useUpdateUser = (id: number) => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["updateUser", id],
    mutationFn: (userData: any) => UpdateUserById(id, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "user"] });
    },
  });

  return { mutate, ...rest };
};

// Articles hooks

export const useAllArticles = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["articles"],
    queryFn: getAllArticlesApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return { data, ...rest };
};

export const useGetArticle = (id: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleByIdApi(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!id,
  });

  return { data, ...rest };
};

export const useCreateArticle = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["createArticle"],
    mutationFn: (articleData: any) => createArticle(articleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  return { mutate, ...rest };
};

export const useUpdateArticle = (id: number) => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["updateArticle", id],
    mutationFn: (articleData: any) => updateArticleApi(id, articleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  return { mutate, ...rest };
};

export const useDeleteArticle = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["deleteArticle"],
    mutationFn: (id: number) => deleteArticleApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  return { mutate, ...rest };
};

export const useGetArticleSubsection = (id: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ["articleSubsection", id],
    queryFn: () => getArticleSubsectionByIdApi(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!id,
  });

  return { data, ...rest };
};

// Categories hooks

export const useAllCategories = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategoryApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return { data, ...rest };
};

export const useCreateCategory = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["createCategory"],
    mutationFn: (categoryData: any) => createCategory(categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { mutate, ...rest };
};

export const useUpdateCategory = (id: number) => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["updateCategory", id],
    mutationFn: (categoryData: any) => updateCategoryApi(id, categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { mutate, ...rest };
};

export const useDeleteCategory = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: (id: number) => deleteCategoryApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { mutate, ...rest };
};

// Subsections hooks

export const useCreateSubsection = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["createSubsection"],
    mutationFn: (subsectionData: any) => createSubsections(subsectionData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articleSubsection"],
      });
    },
  });

  return { mutate, ...rest };
};

export const useUpdateSubsection = (id: number) => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["updateSubsection", id],
    mutationFn: (subsectionData: any) =>
      updateSubsectionsApi(id, subsectionData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articleSubsection"],
      });
    },
  });

  return { mutate, ...rest };
};

export const useDeleteSubsection = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["deleteSubsection"],
    mutationFn: (id: number) => deleteSubsectionsApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articleSubsection"],
      });
    },
  });

  return { mutate, ...rest };
};

// Meetings hooks

export const useAllMeetings = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["meetings"],
    queryFn: getAllMeetingsApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return { data, ...rest };
};

export const useGetMeeting = (id: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ["meeting", id],
    queryFn: () => getMeetingByIdApi(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!id,
  });

  return { data, ...rest };
};

export const useGetMeetingAttendance = (meetingId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ["meetingAttendance", meetingId],
    queryFn: () => getMeetingAttendanceApi(meetingId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!meetingId,
  });

  return { data, ...rest };
};

export const useCreateMeeting = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["createMeeting"],
    mutationFn: (meetingData: any) => apiCreateMeeting(meetingData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
    },
  });

  return { mutate, ...rest };
};

export const useSubmitAttendance = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["submitAttendance"],
    mutationFn: (attendanceData: any) => apiSubmitAttendance(attendanceData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetingAttendance"] });
    },
  });

  return { mutate, ...rest };
};

// Chatbot hook
export const useChatbot = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["chatbot"],
    mutationFn: (user_message: string, chatHistory: Chat_history_Array) => sendChatMessage(user_message, chatHistory),
  });

  return { mutate, ...rest };
};

export const useResetChat = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ["resetChat"],
    mutationFn: () => {
      return resetChat();
    },
  });

  return { mutate, ...rest };
}