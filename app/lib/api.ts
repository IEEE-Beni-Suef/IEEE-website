import axios from "axios";
import apiClient from "~/config/apiClient";
import type { loginSchema, registerSchema, createUserSchema } from "~/utils/scemas";
import type z from "zod";

export const registerApi = async (data: z.infer<typeof registerSchema>) => {
  try {
    const response = await apiClient.post("/Account/Register", data);
    return response.data;
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
    return response.data as { token: string; user: { id: number } };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Login failed");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createUser = async (data: z.infer<typeof createUserSchema>) => {
  try {
    const response = await apiClient.post("/Users", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "failed to create user");
    }
    throw new Error("An unexpected error occurred");
  }
};

// committees Api

export const getCommitteesApi = async () => {
  try {
    const response = await apiClient.get("/Committees");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to fetch committees"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createCommitteeApi = async (data: any) => {
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
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to create committee"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const deleteCommitteeApi = async (id: number) => {
  try {
    const response = await apiClient.delete(`/Committees/${id}`);
    return response.data;
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
export const updateCommitteeApi = async (id: number, data: any) => {
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
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to update committee"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getCommitteeByIdApi = async (id: number) => {
  try {
    const response = await apiClient.get(`/Committees/${id}`);
    return response.data;
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
export const getUser = async (id: number) => {
  try {
    const response = await apiClient.get(`/Users/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to fetch user");
    }
    throw new Error("An unexpected error occurred");
  }
};

// getAllUsers Api
export const getAllUsersApi = async () => {
  try {
    const response = await apiClient.get("/Users");
    return response.data;
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

export const deleteUserByIdApi = async (id: number) => {
  try {
    const response = await apiClient.delete(`/Users/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to delete user");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const ActiveUserByIdApi = async (id: number) => {
  try {
    const response = await apiClient.put(`Admin/ActivateUser/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to activate user"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const UpdateUserById = async (id: number, data: any) => {
  try {
    const response = await apiClient.put(`/Users/${id}`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to update user");
    }
    throw new Error("An unexpected error occurred");
  }
};

//Article Apis
export const getAllArticlesApi = async () => {
  try {
    const response = await apiClient.get("/Articles");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to get Articles");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getArticleByIdApi = async (id: number) => {
  try {
    const response = await apiClient.get(`/Articles/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to get Article data"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createArticle = async (data: any) => {
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
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to create Article"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const deleteArticleApi = async (id: number) => {
  try {
    const response = await apiClient.delete(`/Articles/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to delete Article"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateArticleApi = async (id: number, data: any) => {
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
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to update Article"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getArticleSubsectionByIdApi = async (id: number) => {
  try {
    const response = await apiClient.get(`/Articles/${id}/show`);
    return response.data;
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

export const getAllCategoryApi = async () => {
  try {
    const response = await apiClient.get("/Category");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to get Category");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createCategory = async (data: any) => {
  try {
    const response = await apiClient.post("/Category", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to create Category"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const deleteCategoryApi = async (id: number) => {
  try {
    const response = await apiClient.delete(`/Category/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to delete Category"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateCategoryApi = async (id: number, data: any) => {
  try {
    const response = await apiClient.put(`/Category/${id}`, data);
    return response.data;
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

export const getAllSubsectionsApi = async () => {
  try {
    const response = await apiClient.get("/Subsections");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to get Subsections"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createSubsections = async (data: any) => {
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
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to create Subsections"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const deleteSubsectionsApi = async (id: number) => {
  try {
    const response = await apiClient.delete(`/Subsections/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to delete Subsections"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateSubsectionsApi = async (id: number, data: any) => {
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
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to update Subsections"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export type CreateMeetingPayload = {
  title: string;
  type: string;
  description: string;
  recap: string;
  committeeId: number;
  headId: number;
  users: Array<{
    userId: number;
    attended: boolean;
    mark: number;
  }>;
};

export const apiCreateMeeting = async (data: CreateMeetingPayload) => {
  try {
    const response = await apiClient.post("/Meetings", data);
    return response.data;
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
export const getAllMeetingsApi = async () => {
  try {
    const response = await apiClient.get("/Meetings");
    return response.data;
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
export const getMeetingByIdApi = async (id: number) => {
  try {
    const response = await apiClient.get(`/Meetings/${id}`);
    return response.data;
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
export const getMeetingAttendanceApi = async (meetingId: number) => {
  try {
    const response = await apiClient.get(`/Meetings/attendents/${meetingId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to fetch meeting attendance"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export type AttendanceItem = {
  userId: number;
  isAttend: boolean;
  score: number;
};

export type SubmitAttendancePayload = {
  usersAttendents: AttendanceItem[];
  meetingId: number;
};

export const apiSubmitAttendance = async (data: SubmitAttendancePayload) => {
  try {
    const response = await apiClient.post("/Meetings/attendent", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to submit attendance"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};