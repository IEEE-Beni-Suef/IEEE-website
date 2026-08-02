import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import {
  Boxes,
  Users,
  UserCheck,
  TrendingUp,
  Megaphone,
  Plus,
  AlertTriangle,
  FilePlusIcon,
  Layers,
} from "lucide-react";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { useTheme } from "~/hooks/useTheme";
import {
  useCommittees,
  useDeleteCommittee,
  useCreateCommittee,
  useUpdateCommittee,
  useAllUsers,
} from "~/hooks/useApi";
import type { Committee } from "~/types";

// Reusable Components
import CommitteesStatsBox from "~/components/Committees/CommitteesStatsBox";
import CommitteesFilterBar from "~/components/Committees/CommitteesFilterBar";
import DashboardCommitteeCard, {
  type CommitteeData,
} from "~/components/Committees/DashboardCommitteeCard";
import MembersDistributionWidget from "~/components/Committees/MembersDistributionWidget";
import TopCommitteesTasksWidget from "~/components/Committees/TopCommitteesTasksWidget";
import UpcomingMeetingsWidget from "~/components/Committees/UpcomingMeetingsWidget";

// Modals
import NewCommitteeModal from "~/components/Committees/Modals/NewCommitteeModal";
import EditCommitteeModal from "~/components/Committees/Modals/EditCommitteeModal";
import CommitteeDetailsModal from "~/components/Committees/Modals/CommitteeDetailsModal";
import CommitteeMembersModal from "~/components/Committees/Modals/CommitteeMembersModal";
import MembersReportModal from "~/components/Committees/Modals/MembersReportModal";
import TasksReportModal from "~/components/Committees/Modals/TasksReportModal";
import UpcomingMeetingsModal from "~/components/Committees/Modals/UpcomingMeetingsModal";
import CommitteeSuccessModal from "~/components/Committees/Modals/CommitteeSuccessModal";

export function meta() {
  return [
    { title: "Committees Management - IEEE BNS Dashboard" },
    {
      name: "description",
      content: "Manage IEEE committees, heads, and members",
    },
  ];
}

const DEFAULT_COMMITTEES: CommitteeData[] = [
  {
    id: 1,
    name: "Backend Committee",
    description:
      "Responsible for core server APIs, database schema design, and microservices architecture.",
    headId: 101,
    headName: "Omar Khalil",
    headEmail: "omar@ieee-sb.org",
    headPhone: "+20 100 123 4567",
    viceHeadName: "Ramy Ahmed",
    memberCount: 42,
    tasksCount: 24,
    meetingsCount: 8,
    healthScore: 94,
    healthStatus: "Excellent",
    status: "Active",
    recruitmentStatus: "Open",
    location: "Faculty of Engineering, Lab 2",
    foundedDate: "March 2019",
  },
  {
    id: 2,
    name: "UI/UX Committee",
    description:
      "Designing modern, accessible UI layouts, component libraries, and user experience flows.",
    headId: 102,
    headName: "Sara Ahmed",
    headEmail: "sara@ieee-sb.org",
    headPhone: "+20 101 234 5678",
    viceHeadName: "Menna Mohammad",
    memberCount: 42,
    tasksCount: 24,
    meetingsCount: 8,
    healthScore: 92,
    healthStatus: "Excellent",
    status: "Active",
    recruitmentStatus: "Open",
    location: "Design Studio, Room 4",
    foundedDate: "Jan 2020",
  },
  {
    id: 3,
    name: "Web Committee",
    description:
      "Responsible for building and maintaining all IEEE SB web platforms, member portal, and digital tools.",
    headId: 103,
    headName: "Omar Khalil",
    headEmail: "omar@ieee-sb.org",
    headPhone: "+20 100 123 4567",
    viceHeadName: "Ali Hassan",
    memberCount: 42,
    tasksCount: 24,
    meetingsCount: 8,
    healthScore: 95,
    healthStatus: "Excellent",
    status: "Active",
    recruitmentStatus: "Open",
    location: "Faculty of Engineering, Lab 3",
    foundedDate: "March 2019",
  },
  {
    id: 4,
    name: "Robotics Committee",
    description:
      "Building autonomous systems, microcontroller firmware, sensors, and robotics competitions.",
    headId: 104,
    headName: "Mohamed Sherif",
    headEmail: "sherif@ieee-sb.org",
    headPhone: "+20 102 345 6789",
    viceHeadName: "Khaled Samy",
    memberCount: 45,
    tasksCount: 18,
    meetingsCount: 6,
    healthScore: 88,
    healthStatus: "Good",
    status: "Active",
    recruitmentStatus: "Open",
    location: "Robotics Lab",
    foundedDate: "Sept 2018",
  },
];

const CommitteesManagement = () => {
  const { isDark } = useTheme();

  // API Hooks
  const { data: rawCommittees, isLoading, isError, error } = useCommittees();
  const { data: allUsers } = useAllUsers();
  const { mutate: deleteCommittee } = useDeleteCommittee();
  const { mutate: createCommittee, isPending: isCreating } =
    useCreateCommittee();

  // State for editing id to pass to update hook dynamically
  const [editingCommittee, setEditingCommittee] =
    useState<CommitteeData | null>(null);
  const { mutate: updateCommittee, isPending: isUpdating } = useUpdateCommittee(
    editingCommittee?.id || 0,
  );

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHead, setSelectedHead] = useState("All Heads");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  // Modal Visibility States
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDetailsCommittee, setSelectedDetailsCommittee] =
    useState<CommitteeData | null>(null);
  const [selectedMembersCommittee, setSelectedMembersCommittee] =
    useState<CommitteeData | null>(null);

  // Report & Meeting Modals
  const [showMembersReport, setShowMembersReport] = useState(false);
  const [showTasksReport, setShowTasksReport] = useState(false);
  const [showUpcomingMeetingsModal, setShowUpcomingMeetingsModal] =
    useState(false);

  // Success Modal State
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    buttonText?: string;
    variant?: "purple" | "blue" | "green";
  }>({
    isOpen: false,
    title: "",
    message: "",
  });

  // Map API committees to UI list with enriched defaults
  const committeesList: CommitteeData[] = useMemo(() => {
    if (Array.isArray(rawCommittees) && rawCommittees.length > 0) {
      return rawCommittees.map((item: any, idx: number) => {
        const fallback = DEFAULT_COMMITTEES[idx % DEFAULT_COMMITTEES.length];

        let headName = item.headName;
        if (!headName && allUsers && Array.isArray(allUsers)) {
          const userObj = allUsers.find((u: any) => u.id === item.headId);
          if (userObj) {
            headName = `${userObj.fName || ""} ${userObj.lName || ""}`.trim();
          }
        }

        return {
          id: item.id,
          name: item.name,
          description: item.description || fallback.description,
          headId: item.headId,
          headName: headName || fallback.headName,
          headEmail: fallback.headEmail,
          headPhone: fallback.headPhone,
          viceHeadName: fallback.viceHeadName,
          memberCount: item.memberCount ?? fallback.memberCount,
          tasksCount: fallback.tasksCount,
          meetingsCount: fallback.meetingsCount,
          healthScore: fallback.healthScore,
          healthStatus: fallback.healthStatus,
          status: "Active",
          recruitmentStatus: fallback.recruitmentStatus,
          location: fallback.location,
          foundedDate: fallback.foundedDate,
          imageUrl: item.imageUrl,
        };
      });
    }
    return DEFAULT_COMMITTEES;
  }, [rawCommittees, allUsers]);

  // Filtered list based on search and selects
  const filteredCommittees = useMemo(() => {
    return committeesList.filter((comm) => {
      const matchesSearch =
        comm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (comm.description &&
          comm.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesHead =
        selectedHead === "All Heads" || comm.headName === selectedHead;
      const matchesStatus =
        selectedStatus === "All Statuses" || comm.status === selectedStatus;

      return matchesSearch && matchesHead && matchesStatus;
    });
  }, [committeesList, searchQuery, selectedHead, selectedStatus]);

  // Delete Action
  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to archive this committee?")) return;
    deleteCommittee(id, {
      onSuccess: () => {
        toast.success("Committee archived successfully!");
      },
      onError: (err: Error) => {
        toast.error(err.message || "Failed to archive committee");
      },
    });
  };

  // Create Handler
  const handleCreateSubmit = (newComm: any) => {
    const formData = new FormData();
    formData.append("name", newComm.name);
    formData.append("description", newComm.description);
    formData.append("headId", "1");

    createCommittee(formData as any, {
      onSuccess: () => {
        setIsNewModalOpen(false);
        setSuccessModal({
          isOpen: true,
          title: "Committee Created!",
          message: `${newComm.name} has been successfully submitted for review.`,
          buttonText: "Add New Committee",
          variant: "purple",
        });
      },
      onError: (err: Error) => {
        toast.error(err.message || "Failed to create committee");
      },
    });
  };

  // Edit Handler
  const handleEditSubmit = (updated: CommitteeData) => {
    const formData = new FormData();
    formData.append("name", updated.name);
    formData.append("description", updated.description || "");

    updateCommittee(formData as any, {
      onSuccess: () => {
        setIsEditModalOpen(false);
        setSuccessModal({
          isOpen: true,
          title: "Changes Saved!",
          message: `${updated.name} has been updated successfully.`,
          buttonText: "Done",
          variant: "blue",
        });
      },
      onError: (err: Error) => {
        toast.error(err.message || "Failed to update committee");
      },
    });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedHead("All Heads");
    setSelectedStatus("All Statuses");
  };

  return (
    <ProtectedRoute allowedRoles={[1, 2]}>
      <div className="space-y-6 pb-12">
        {/* Sticky Header Section */}
        <div className="sticky top-0 z-20 backdrop-blur-md bg-white/90  pb-4 pt-1 transition-colors">
          {/* Page Header Title */}
          <div className="hidden md:flex items-center w-full h-10 border-1 border-[#CCB5E3] px-5 capitalize rounded-lg mt-3 mb-8 ">
            <span className="text-[#6C757D] text-sm">dashboard / </span>
            <span className="text-[#000640] font-semibold text-sm">
              &nbsp;Committees
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1
                className={`text-2xl font-extrabold tracking-tight ${
                  isDark ? "text-white" : "text-[#000640]"
                }`}
              >
                Committees Management
              </h1>
              <p
                className={`text-xs mt-1 ${
                  isDark ? "text-gray-400" : "text-[#667085]"
                }`}
              >
                Manage IEEE committees, heads, members and activities
                efficiently.
              </p>
            </div>

            <button
              onClick={() => setIsNewModalOpen(true)}
              className="flex px-3 lg:px-8 items-center justify-center gap-2  py-3 rounded-xl bg-[#5A10A5] hover:bg-[#4A0D88] text-[#FEFEFF] font-bold text-xs transition-colors shadow-[0px_1px_3px_0px_#0000001A] shrink-0"
            >
              <Plus className="w-4 h-4" />
              New Committee
            </button>
          </div>

          {/* 5 Stats Boxes Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <CommitteesStatsBox
              title="TOTAL COMMITTEES"
              value={committeesList.length || 12}
              subtext="IEEE Committees"
              icon={<Layers className="w-5 h-5" color="#1F063A" />}
              iconBgColor="bg-[#EDE5F8]"
            />
            <CommitteesStatsBox
              title="TOTAL MEMBERS"
              value="246"
              subtext="Total Members"
              icon={<Users className="w-5 h-5" color="#0E2C5E"/>}
              iconBgColor="bg-[#E7EAEF] "
            />
            <CommitteesStatsBox
              title="COMMITTEE HEADS"
              value="12"
              subtext="Active Leaders"
              icon={<UserCheck className="w-5 h-5" color="#4460EF"/>}
              iconBgColor="bg-[#E6EAFD] "
            />
            <CommitteesStatsBox
              title="ACTIVE COMMITTEES"
              value="11"
              subtext="Currently Active"
              icon={<TrendingUp className="w-5 h-5" color="#09800F"/>}
              iconBgColor="bg-[#E2F5E3] "
            />
            <CommitteesStatsBox
              title="RECRUITMENT OPEN"
              value="4"
              subtext="Open Committees"
              icon={<FilePlusIcon   className="w-5 h-5" color="#DC3545"/>}
              iconBgColor="bg-[#DC35451A] "
            />
          </div>
        </div>
        {/* Main Content Layout: Grid with Cards & Widgets Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left / Main 2 Columns: Search & Committees Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filter Bar Component */}
            <CommitteesFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedHead={selectedHead}
              onHeadChange={setSelectedHead}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              onReset={handleResetFilters}
            />

            {/* Loading & Error States */}
            {isLoading && (
              <div className="p-8 text-center text-sm text-gray-500">
                Loading committees...
              </div>
            )}

            {isError && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {(error as Error)?.message || "Failed to load committees data."}
              </div>
            )}

            {/* Committee Cards Grid */}
            {!isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCommittees.map((comm, index) => (
                  <DashboardCommitteeCard
                    key={comm.id}
                    index={index}
                    committee={comm}
                    onEdit={(c) => {
                      setEditingCommittee(c);
                      setIsEditModalOpen(true);
                    }}
                    onViewMembers={(c) => setSelectedMembersCommittee(c)}
                    onDelete={(id) => handleDelete(id)}
                    onViewDetails={(c) => setSelectedDetailsCommittee(c)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar: Reports & Upcoming Meetings Widgets */}
          <div className="space-y-6">
            {/* 1. Members Distribution Widget */}
            <MembersDistributionWidget
              onViewFullReport={() => setShowMembersReport(true)}
            />

            {/* 2. Top Committees by Tasks Widget (Second component directly under Members Distribution) */}
            <TopCommitteesTasksWidget
              onViewFullReport={() => setShowTasksReport(true)}
            />

            {/* 3. Upcoming Meetings Widget */}
            <UpcomingMeetingsWidget
              onViewAll={() => setShowUpcomingMeetingsModal(true)}
            />
          </div>
        </div>

        {/* ── MODALS ── */}
        <NewCommitteeModal
          isOpen={isNewModalOpen}
          onClose={() => setIsNewModalOpen(false)}
          onSubmit={handleCreateSubmit}
          isLoading={isCreating}
        />

        <EditCommitteeModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingCommittee(null);
          }}
          committee={editingCommittee}
          onSubmit={handleEditSubmit}
          isLoading={isUpdating}
        />

        <CommitteeDetailsModal
          isOpen={!!selectedDetailsCommittee}
          onClose={() => setSelectedDetailsCommittee(null)}
          committee={selectedDetailsCommittee}
          onViewMembers={(c) => setSelectedMembersCommittee(c)}
        />

        <CommitteeMembersModal
          isOpen={!!selectedMembersCommittee}
          onClose={() => setSelectedMembersCommittee(null)}
          committee={selectedMembersCommittee}
        />

        <MembersReportModal
          isOpen={showMembersReport}
          onClose={() => setShowMembersReport(false)}
        />

        <TasksReportModal
          isOpen={showTasksReport}
          onClose={() => setShowTasksReport(false)}
        />

        <UpcomingMeetingsModal
          isOpen={showUpcomingMeetingsModal}
          onClose={() => setShowUpcomingMeetingsModal(false)}
        />

        <CommitteeSuccessModal
          isOpen={successModal.isOpen}
          onClose={() => setSuccessModal({ ...successModal, isOpen: false })}
          title={successModal.title}
          message={successModal.message}
          buttonText={successModal.buttonText}
          variant={successModal.variant}
        />
      </div>
    </ProtectedRoute>
  );
};

export default CommitteesManagement;
