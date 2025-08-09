export interface User {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone?: string;
  year?: string;
  sex?: 'male' | 'female';
  faculty?: string;
  goverment?: string;
  roleId: number;
  isActive: boolean;
  committeeIds?: number[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Committee {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface LoginResponse {
  token: string;
  userId: number;
}

export interface RegisterData {
  firstName: string;
  middleName: string;
  lastName: string;
  password: string;
  email: string;
  year: string;
  sex: 'male' | 'female';
  faculty: string;
  phone: string;
  goverment: string;
  CommitteeIds?: number[];
  roleId: string;
}

export interface LoginData {
  email: string;
  password: string;
}