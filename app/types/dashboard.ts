export interface DashboardStats {
  totalMembers: number;
  totalMembersChange: string; // e.g. "+12% from last month"
  pendingApprovals: number;
  pendingSubtitle: string; // e.g. "Requires Action"
  upcomingMeetings: number;
  meetingsSubtitle: string; // e.g. "Next: Today 4 PM"
  upcomingEvents: number;
  eventsSubtitle: string; // e.g. "Next: 15 Jul"
  membersChartData: number[];
  pendingChartData: number[];
  meetingsChartData: number[];
  eventsChartData: number[];
}

export interface RecentActivityItem {
  id: string | number;
  title: string;
  time: string;
  type: "article" | "approval" | "event" | "meeting" | "user" | "system";
  user?: string;
  avatarUrl?: string;
}

export interface DashboardMember {
  id: number;
  name: string;
  email: string;
  phone?: string;
  committee: string;
  role: string;
  academicYear: string;
  joinedDate: string;
  status: "Approved" | "Pending" | "Rejected";
  avatar?: string;
}

export interface DashboardMeeting {
  id: number;
  title: string;
  committee: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  attendanceCount: number;
  totalCount: number;
  bannerUrl?: string;
  attendees: Array<{ id: number; name: string; avatar?: string }>;
  agenda?: string[];
}

export interface DashboardEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  description: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  phone: string;
  committee: string;
  role: string;
  academicYear: string;
}

export interface CreateMeetingData {
  title: string;
  committee: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export interface CreateArticleData {
  title: string;
  committee: string;
  tags: string;
  content: string;
  isDraft?: boolean;
}

export interface CreateEventData {
  title: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  description: string;
}

export interface UpdateMemberData {
  id: number;
  name: string;
  email: string;
  committee: string;
  role: string;
  status: "Approved" | "Pending" | "Rejected";
}

export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  onButtonClick: () => void;
}
