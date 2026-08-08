import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "~/config/queryClient";
import {
  activateUserByIdApi,
  setUserActivationApi,
  createCommitteeApi,
  deleteCommitteeApi,
  deleteUserByIdApi,
  getAllUsersApi,
  getCommitteeByIdApi,
  getCommitteesApi,
  updateCommitteeApi,
  updateUserById,
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
  deleteMeetingApi,
  getMeetingAttendanceApi,
  apiCreateMeeting,
  apiSubmitAttendance,
  sendChatMessage,
  resetChat,
  sendEmailApi,
  getAllSponsorsApi,
  createSponsorApi,
  updateSponsorApi,
  deleteSponsorApi,
  eventsApi,
} from "~/lib/api";

import type {
  Chat_history_Array,
  Committee,
  User,
  Article,
  Category,
  Subsection,
  Meeting,
  MeetingAttendance,
  ISponsorCard,
} from "~/types";
import type { ApiEvent } from "~/types/api.types";

export const useCommittees = () => {
  const { data, ...rest } = useQuery<Committee[]>({
    queryKey: ["committees"],
    queryFn: getCommitteesApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return { data, ...rest };
};

export const useAllUsers = () => {
  const { data, ...rest } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getAllUsersApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return { data, ...rest };
};

export const useDeleteUser = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (id: number) => deleteUserByIdApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

export const useActiveUser = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["activeUser"],
    mutationFn: (id: number) => activateUserByIdApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

// Flexible: supports both activate (true) and deactivate (false)
export const useSetUserActivation = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["setUserActivation"],
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) =>
      setUserActivationApi(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

// All committees hooks

export const useCreateCommittee = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["createCommittee"],
    mutationFn: (committeeData) => createCommitteeApi(committeeData as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["committees"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

export const useCreateUser = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: (userData) => createUser(userData as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

export const useDeleteCommittee = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["deleteCommittee"],
    mutationFn: (id: number) => deleteCommitteeApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["committees"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

export const useUpdateCommittee = (id: number) => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["updateCommittee", id],
    mutationFn: (committeeData) => updateCommitteeApi(id, committeeData as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["committees"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

export const useGetCommittee = (id: number) => {
  const { data, ...rest } = useQuery<Committee>({
    queryKey: ["committee", id],
    queryFn: () => getCommitteeByIdApi(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return { data, ...rest };
};

export const useUpdateUser = (id: number) => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["updateUser", id],
    mutationFn: (userData: any) => updateUserById(id, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

// Articles hooks

export const useAllArticles = () => {
  const { data, ...rest } = useQuery<Article[]>({
    queryKey: ["articles"],
    queryFn: getAllArticlesApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return { data, ...rest };
};

export const useGetArticle = (id: number) => {
  const { data, ...rest } = useQuery<Article>({
    queryKey: ["article", id],
    queryFn: () => getArticleByIdApi(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!id,
  });

  return { data, ...rest };
};

export const useCreateArticle = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["createArticle"],
    mutationFn: (articleData: any) => createArticle(articleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

export const useUpdateArticle = (id: number) => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["updateArticle", id],
    mutationFn: (articleData: any) => updateArticleApi(id, articleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

export const useDeleteArticle = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["deleteArticle"],
    mutationFn: (id: number) => deleteArticleApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

export const useGetArticleSubsection = (id: number) => {
  const { data, ...rest } = useQuery<Article>({
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
  const { data, ...rest } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getAllCategoryApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return { data, ...rest };
};

export const useCreateCategory = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["createCategory"],
    mutationFn: (categoryData: any) => createCategory(categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

export const useUpdateCategory = (id: number) => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["updateCategory", id],
    mutationFn: (categoryData: any) => updateCategoryApi(id, categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

export const useDeleteCategory = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: (id: number) => deleteCategoryApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

// Subsections hooks

export const useCreateSubsection = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["createSubsection"],
    mutationFn: (subsectionData: any) => createSubsections(subsectionData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articleSubsection"],
      });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

export const useUpdateSubsection = (id: number) => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["updateSubsection", id],
    mutationFn: (subsectionData: any) =>
      updateSubsectionsApi(id, subsectionData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articleSubsection"],
      });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

export const useDeleteSubsection = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["deleteSubsection"],
    mutationFn: (id: number) => deleteSubsectionsApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articleSubsection"],
      });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

// Meetings hooks

export const useAllMeetings = () => {
  const { data, ...rest } = useQuery<Meeting[]>({
    queryKey: ["meetings"],
    queryFn: getAllMeetingsApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return { data, ...rest };
};

export const useGetMeeting = (id: number) => {
  const { data, ...rest } = useQuery<Meeting>({
    queryKey: ["meeting", id],
    queryFn: () => getMeetingByIdApi(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!id,
  });

  return { data, ...rest };
};

export const useGetMeetingAttendance = (meetingId: number) => {
  const { data, ...rest } = useQuery<MeetingAttendance[]>({
    queryKey: ["meetingAttendance", meetingId],
    queryFn: () => getMeetingAttendanceApi(meetingId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!meetingId,
  });

  return { data, ...rest };
};

export const useCreateMeeting = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["createMeeting"],
    mutationFn: (meetingData: any) => apiCreateMeeting(meetingData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

export const useDeleteMeeting = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["deleteMeeting"],
    mutationFn: (id: number) => deleteMeetingApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

export const useSubmitAttendance = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["submitAttendance"],
    mutationFn: (attendanceData: any) => apiSubmitAttendance(attendanceData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetingAttendance"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

// Chatbot hook
export const useChatbot = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["chatbot"],
    mutationFn: ({
      user_message,
      chatHistory,
    }: {
      user_message: string;
      chatHistory: Chat_history_Array;
    }) => sendChatMessage(user_message, chatHistory),
  });

  return { mutate, mutateAsync, ...rest };
};

export const useResetChat = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["resetChat"],
    mutationFn: () => {
      return resetChat();
    },
  });

  return { mutate, mutateAsync, ...rest };
};

export const useSendEmail = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["send"],
    mutationFn: (emailData: any) => sendEmailApi(emailData),
  });

  return { mutate, mutateAsync, ...rest };
};

// Sponsor s hooks

export const useAllSponsors = () => {
  const { data, ...rest } = useQuery<ISponsorCard[]>({
    queryKey: ["sponsors"],
    queryFn: getAllSponsorsApi,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return { data, ...rest };
};

export const useCreateSponsor = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["createSponsor"],
    mutationFn: (data: any) => createSponsorApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sponsors"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

export const useUpdateSponsor = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["updateSponsor"],
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      updateSponsorApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sponsors"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

export const useDeleteSponsor = () => {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationKey: ["deleteSponsor"],
    mutationFn: (id: number) => deleteSponsorApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sponsors"] });
    },
  });

  return { mutate, mutateAsync, ...rest };
};

// Events hook — fetches from /api/Events (dedicated endpoint)
export const useAllEvents = () => {
  const { data, ...rest } = useQuery<ApiEvent[]>({
    queryKey: ["events"],
    queryFn: () => eventsApi.getAll(),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return { data, ...rest };
};

// ============================================================
// Dashboard Hooks
// ============================================================

import {
  getDashboardStats,
  getRecentActivities,
  getMembers,
  addUser,
  createMeeting,
  createEvent,
  updateMember,
  approveMember,
  rejectMember,
  getUpcomingEvents,
} from "~/lib/api";
import type {
  CreateUserData,
  CreateMeetingData,
  CreateArticleData,
  CreateEventData,
  UpdateMemberData,
} from "~/types/dashboard";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
    staleTime: 5 * 60 * 1000,
  });
};

export const useRecentActivities = () => {
  return useQuery({
    queryKey: ["recentActivities"],
    queryFn: getRecentActivities,
    staleTime: 2 * 60 * 1000,
  });
};

export const useMembers = () => {
  return useQuery({
    queryKey: ["dashboardMembers"],
    queryFn: getMembers,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpcomingEvents = () => {
  return useQuery({
    queryKey: ["dashboardUpcomingEvents"],
    queryFn: getUpcomingEvents,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAddUserMutation = () => {
  return useMutation({
    mutationFn: (data: CreateUserData) => addUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardMembers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
};

export const useCreateMeetingMutation = () => {
  return useMutation({
    mutationFn: (data: CreateMeetingData) => createMeeting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      queryClient.invalidateQueries({ queryKey: ["recentActivities"] });
    },
  });
};

export const useCreateArticleMutation = () => {
  return useMutation({
    mutationFn: (data: CreateArticleData) => createArticle(data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recentActivities"] });
    },
  });
};

export const useCreateEventMutation = () => {
  return useMutation({
    mutationFn: (data: CreateEventData) => createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardUpcomingEvents"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
};

export const useUpdateMemberMutation = () => {
  return useMutation({
    mutationFn: (data: UpdateMemberData) => updateMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardMembers"] });
    },
  });
};

export const useApproveMemberMutation = () => {
  return useMutation({
    mutationFn: (id: number) => approveMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardMembers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
};

export const useRejectMemberMutation = () => {
  return useMutation({
    mutationFn: (id: number) => rejectMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardMembers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
};
