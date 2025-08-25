import axios from "axios";
import apiClient from "~/config/apiClient";
import type { loginSchema, registerSchema } from "~/utils/scemas";
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
    const response = await apiClient.post("/Committees", data);
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
    const response = await apiClient.put(`/Committees/${id}`, data);
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
    const response = await apiClient.delete(`/Users/DeleteUser/${id}`);
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

// meetings Api

export type CreateMeetingPayload = {
  title: string;
  description: string;
  recap: string;
  type: string;
  dateTime: string; // ISO string expected by backend
  committeeId: number|null;
  headId: number|null;
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