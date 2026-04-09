import axios from "axios";
import apiClient from "~/config/apiClient";
import type {
  loginSchema,
  registerSchema,
  createUserSchema,
  committeeSchema,
  articleSchema,
  submitAttendanceSchema,
  createMeetingSchema,
  sendEmailSchema,
} from "~/utils/schemas";
import type z from "zod";
import type { Chat_history_Array, Committee, User, Article, Category, Subsection, Meeting, MeetingAttendance } from "~/types";


//! That is repeated in all methods

//? export const someApi = async (...) => {
//?   try {
//?     const response = await apiClient.METHOD("/endpoint", data?);
//?     return response.data;
//?   } catch (error) {
//?     if (axios.isAxiosError(error)) {
//?       throw new Error(error.response?.data.message || "Fallback message");
//?     }
//?     throw new Error("An unexpected error occurred");
//?   }
//? };






export const registerApi = async <T = any>(data: z.infer<typeof registerSchema>): Promise<T> => {
  try {
    const response = await apiClient.post("/Account/Register", data);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Registration failed");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const loginApi = async (data: z.infer<typeof loginSchema>) => {
  try {
    const response = await apiClient.post("/Account/Login", data);
    return response.data as {
      accessToken: string;
      refreshToken: string;
      user: { id: number };
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Login failed");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const refreshTokenApi = async (token: string) => {
  try {
    // Use a separate axios instance for refresh token to avoid interceptor loops
    const refreshClient = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "/api",
      withCredentials: true,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await refreshClient.post("/Account/refresh", token);
    return response.data as { accessToken: string; refreshToken: string };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to refresh token"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createUser = async <T = any>(data: z.infer<typeof createUserSchema>): Promise<T> => {
  try {
    const response = await apiClient.post("/Users", data);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "failed to create user");
    }
    throw new Error("An unexpected error occurred");
  }
};

// committees Api

export const getCommitteesApi = async (): Promise<Committee[]> => {
  try {
    const response = await apiClient.get("/Committees");
    return response.data as Committee[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to fetch committees"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};



export const createCommitteeApi = async <T = any>(data: z.infer<typeof committeeSchema>): Promise<T> => {
  try {
    const config =
      data instanceof FormData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : {};

    const response = await apiClient.post("/Committees", data, config);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to create committee"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const deleteCommitteeApi = async <T = any>(id: number): Promise<T> => {
  try {
    const response = await apiClient.delete(`/Committees/${id}`);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to delete committee"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// will add a request generics letter
export const updateCommitteeApi = async <T = any>(id: number, data: z.infer<typeof committeeSchema>): Promise<T> => {
  try {
    const config =
      data instanceof FormData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : {};

    const response = await apiClient.put(`/Committees/${id}`, data, config);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to update committee"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getCommitteeByIdApi = async (id: number): Promise<Committee> => {
  try {
    const response = await apiClient.get(`/Committees/${id}`);
    return response.data as Committee;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to fetch committee by ID"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// user Api
export const getUser = async (id: number): Promise<User> => {
  try {
    const response = await apiClient.get(`/Users/${id}`);
    return response.data as User;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to fetch user");
    }
    throw new Error("An unexpected error occurred");
  }
};

// getAllUsers Api
export const getAllUsersApi = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get("/Users");
    return response.data as User[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to fetch all users"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// delete user By Id

export const deleteUserByIdApi = async <T = any>(id: number): Promise<T> => {
  try {
    const response = await apiClient.delete(`/Users/${id}`);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to delete user");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const activateUserByIdApi = async <T = any>(id: number): Promise<T> => {
  try {
    const response = await apiClient.put(`/Admin/ActivateUser/${id}`);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to activate user"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateUserById = async <T = any>(id: number, data: z.infer<typeof createUserSchema>): Promise<T> => {
  try {
    const response = await apiClient.put(`/Users/${id}`, data);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to update user");
    }
    throw new Error("An unexpected error occurred");
  }
};

//Article Apis
export const getAllArticlesApi = async (): Promise<Article[]> => {
  try {
    const response = await apiClient.get("/Articles");
    return response.data as Article[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to get Articles");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getArticleByIdApi = async (id: number): Promise<Article> => {
  try {
    const response = await apiClient.get(`/Articles/${id}`);
    return response.data as Article;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to get Article data"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createArticle = async <T = any>(data: FormData | z.infer<typeof articleSchema>): Promise<T> => {
  try {
    const config =
      data instanceof FormData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : {};

    const response = await apiClient.post("/Articles", data, config);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to create Article"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const deleteArticleApi = async <T = any>(id: number): Promise<T> => {
  try {
    const response = await apiClient.delete(`/Articles/${id}`);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to delete Article"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateArticleApi = async <T = any>(id: number, data: FormData | z.infer<typeof articleSchema>): Promise<T> => {
  try {
    const config =
      data instanceof FormData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : {};

    const response = await apiClient.put(`/Articles/${id}`, data, config);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to update Article"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getArticleSubsectionByIdApi = async (id: number): Promise<Article> => {
  try {
    const response = await apiClient.get(`/Articles/${id}/show`);
    return response.data as Article;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to show Articles"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// category APIs

export const getAllCategoryApi = async (): Promise<Category[]> => {
  try {
    const response = await apiClient.get("/Category");
    return response.data as Category[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to get Category");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createCategory = async <T = any>(data: any): Promise<T> => {
  try {
    const response = await apiClient.post("/Category", data);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to create Category"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const deleteCategoryApi = async <T = any>(id: number): Promise<T> => {
  try {
    const response = await apiClient.delete(`/Category/${id}`);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to delete Category"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateCategoryApi = async <T = any>(id: number, data: any): Promise<T> => {
  try {
    const response = await apiClient.put(`/Category/${id}`, data);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to update Category"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// subsecton Apis

export const getAllSubsectionsApi = async (): Promise<Subsection[]> => {
  try {
    const response = await apiClient.get("/Subsections");
    return response.data as Subsection[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to get Subsections"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createSubsections = async <T = any>(data: any): Promise<T> => {
  try {
    const config =
      data instanceof FormData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : {};

    const response = await apiClient.post("/Subsections", data, config);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to create Subsections"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const deleteSubsectionsApi = async <T = any>(id: number): Promise<T> => {
  try {
    const response = await apiClient.delete(`/Subsections/${id}`);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to delete Subsections"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateSubsectionsApi = async <T = any>(id: number, data: any): Promise<T> => {
  try {
    const config =
      data instanceof FormData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : {};

    const response = await apiClient.put(`/Subsections/${id}`, data, config);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to update Subsections"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export type CreateMeetingPayload = z.infer<typeof createMeetingSchema>;

export const apiCreateMeeting = async <T = any>(data: CreateMeetingPayload): Promise<T> => {
  try {
    const response = await apiClient.post("/Meetings", data);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to create meeting"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// Get all meetings
export const getAllMeetingsApi = async (): Promise<Meeting[]> => {
  try {
    const response = await apiClient.get("/Meetings");
    return response.data as Meeting[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to fetch meetings"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// Get meeting by ID
export const getMeetingByIdApi = async (id: number): Promise<Meeting> => {
  try {
    const response = await apiClient.get(`/Meetings/${id}`);
    return response.data as Meeting;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to fetch meeting"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// Get meeting attendance
export const getMeetingAttendanceApi = async (meetingId: number): Promise<MeetingAttendance[]> => {
  try {
    const response = await apiClient.get(`/Meetings/attendents/${meetingId}`);
    return response.data as MeetingAttendance[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to fetch meeting attendance"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export type SubmitAttendancePayload = z.infer<typeof submitAttendanceSchema>;

export const apiSubmitAttendance = async <T = any>(data: SubmitAttendancePayload): Promise<T> => {
  try {
    const response = await apiClient.post("/Meetings/attendent", data);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to submit attendance"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// Chatbot API
export const sendChatMessage = async (
  user_message: string,
  chatHistory: Chat_history_Array
): Promise<string> => {
  try {
    const { Client } = await import("@gradio/client");
    const client = await Client.connect("amrhassank/IEEE_AI_ChatBot");
    const result = await client.predict("/chatbot_fn", {
      user_message: user_message,
      chat_history: chatHistory,
    });

    return (result.data as string[])[0] || "No response received";
  } catch (error) {
    console.error("Chatbot API error:", error);
    throw new Error("Failed to send message to chatbot");
  }
};

export const resetChat = async () => {
  try {
    const { Client } = await import("@gradio/client");
    const client = await Client.connect("amrhassank/IEEE_AI_ChatBot");
    const result = await client.predict("/reset_chat", {});

    return result;
  } catch (error) {
    console.error("Reset chat API error:", error);
    throw new Error("Failed to reset chat");
  }
};

// Email API
export const sendEmailApi = async <T = any>(data: z.infer<typeof sendEmailSchema>): Promise<T> => {
  try {
    const response = await apiClient.post("/Emails/send", data);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to send email");
    }
    throw new Error("An unexpected error occurred");
  }
};
