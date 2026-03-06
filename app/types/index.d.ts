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

export interface Meeting {
  id: number;
  title: string;
  type: string;
  description: string;
  recap: string;
  committeeId: number;
  headId: number;
  users: MeetingUser[];
  createdAt?: string;
  updatedAt?: string;
}

export interface MeetingUser {
  userId: number;
  attended: boolean;
  mark: number;
}

export interface MeetingAttendance {
  userId: number;
  userName: string;
  isAttend: boolean;
  score: number;
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

export interface chat_history {
  role: string;
  metadata: any;
  content: string;
  options: any;
}

export type Chat_history_Array = Array<chat_history>;

export interface SendEmailPayload {
  subject: string;
  body: string;
  to: number[];
}