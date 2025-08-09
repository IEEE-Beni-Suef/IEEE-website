import axios from "axios";
import apiClient from "config/apiClient";
import type { loginSchema, registerSchema } from "utils/scemas";
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
    return response.data as { token: string; userId: number };
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

// user Api
export const getUser = async (id: number) => {
  try {
    const response = await apiClient.get(`/Users/GetUser/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to fetch user");
    }
    throw new Error("An unexpected error occurred");
  }
};
