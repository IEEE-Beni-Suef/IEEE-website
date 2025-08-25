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
    const response = await apiClient.post("/Articles", data);
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
    const response = await apiClient.put(`/Articles/${id}`, data);
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
