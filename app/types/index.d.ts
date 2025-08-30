export interface User {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone?: string;
  year?: string;
  sex?: "male" | "female";
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
  headId: number;
  imageUrl: string;
  memberCount: number;
  name: string;
  description?: string;
  vicesId: Array;
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
  sex: "male" | "female";
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

export interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export interface Article {
  id?: number;
  title: string;
  description: string;
  keywords: Array<string>;
  photo: string;
  categoryId?: number;
  categoryName?: string;
  createdAt?: string;
  updatedAt?: string;
  subsections?: Subsection[];
}

export interface Category {
  id: number;
  name: string;
}

export interface Subsection {
  id: number;
  subtitle: string;
  paragraph: string;
  photo: string;
  articleId: number;
  createdAt?: string;
  updatedAt?: string;
}
