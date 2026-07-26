import { ProtectedRoute } from "../../components/ProtectedRoute";
import { getRoleName, getFullName, getInitials } from "~/utils/utile";
import { deleteUserByIdApi } from "~/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { facultyOptions, governorateOptions } from "~/utils/lists";
import UserNotFound from "../../../public/UsersNotFound.png";
import {
  useAllUsers,
  useCreateUser,
  useUpdateUser,
  useSetUserActivation,
} from "~/hooks/useApi";
import { UsersModal } from "~/components/UsersModal";
import { ApproveModal } from "~/components/ApproveModal";
import { NotificationModal } from "~/components/NotificationModal";
import {
  Download,
  GraduationCap,
  Plus,
  TriangleAlert,
  UserCheck,
  Users,
} from "lucide-react";
import DashboardUserHeader from "~/components/Users/DashboardUserHeader";
import UserStatsCard from "~/components/Users/UserStatsCard";
import TableSelect from "~/components/Users/TableSelect";

export default function UsersManagement() {
  const { data, isLoading, isError, error } = useAllUsers();
  const queryClient = useQueryClient();
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showPendingApprovals, setShowPendingApprovals] = useState(false);
  // TODO: Show notification modal after successful user creation
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  // TODO: Replace with API data for success notification
  const [successNotificationData, setSuccessNotificationData] =
    useState<any>(null);

  // TODO: DELETE the hardcoded data below and replace with API call
  // TODO: Create a hook: const { data: pendingApprovalsData, isLoading: approvalsLoading } = usePendingApprovalsAPI();
  // Example endpoint: GET /api/approvals/pending
  const [pendingApprovalsData] = useState<any[]>([
    {
      id: 1,
      name: "Karim Nasser",
      role: "Analytics - Committee Head",
      date: "Applied Jun 1, 2024",
      status: "pending",
      avatar: "KN",
    },
    {
      id: 2,
      name: "test test",
      role: "Navigation & Space Tech - Committee Head",
      date: "Applied May 15, 2024",
      status: "pending",
      avatar: "TT",
    },
    {
      id: 3,
      name: "Nour El-Din",
      role: "Power & Energy - Member",
      date: "Applied Jun 10, 2024",
      status: "pending",
      avatar: "NE",
    },
    {
      id: 4,
      name: "Dina Sameh",
      role: "Member",
      date: "Applied Jun 5, 2024",
      status: "pending",
      avatar: "DS",
    },
  ]);
  const { mutate: createUser } = useCreateUser();
  const { mutate: updateUser } = useUpdateUser(editingUser?.id || 0);
  const { mutateAsync: setActivation } = useSetUserActivation();

  const handleCreateClick = () => {
    setEditingUser(null);
    setShowAddModal(true);
  };

  const handleEditClick = (user: any) => {
    setEditingUser(user);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingUser(null);
  };

  const handleAddUser = async (userData: any) => {
    try {
      if (editingUser) {
        await updateUser(userData);
        alert("User updated successfully!");
        handleCloseModal();
      } else {
        // TODO: Replace with actual API response that includes user details
        const createdUser = await createUser(userData);

        // TODO: Construct success notification data from API response:
        // const successData = {
        //   name: createdUser.fullName,
        //   committee: createdUser.CommitteeIds[0]?.name || "IEEE",
        // };
        setSuccessNotificationData({
          name: userData.fullName,
          committee: "IEEE Committee", // TODO: Replace with actual committee name from API
        });

        handleCloseModal();

        // TODO: Replace setTimeout with actual success callback from API
        // Show notification modal after a brief delay
        setTimeout(() => {
          setShowNotificationModal(true);
        }, 500);
      }
    } catch (error) {
      console.error("Error handling user:", error);
      alert((error as Error).message);
    }
  };

  // Helper functions to get display names
  const getFacultyName = (faculty: string) => {
    const option = facultyOptions.find((f) => f.value === faculty);
    return option ? option.label : faculty;
  };

  const getGovernorateName = (governorate: string) => {
    const option = governorateOptions.find((g) => g.value === governorate);
    return option ? option.label : governorate;
  };

  const getCommitteeNames = (committeesId: number[]) => {
    if (!committeesId || committeesId.length === 0) return "No Committee";
    // For now, just show the IDs. In a real app, you'd map these to committee names
    return committeesId.join(", ");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      setActionLoadingId(id);
      await deleteUserByIdApi(id);
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleSetActivation = async (id: number, isActive: boolean) => {
    try {
      setActionLoadingId(id);
      await setActivation({ id, isActive });
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Pagination helpers
  const totalItems = data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data?.slice(startIndex, endIndex) || [];

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  // TODO: DELETE the old pending approvals handlers below - they are now in ApproveModal.tsx
  // Old handlers that were moved:
  // - handleOpenPendingApprovals
  // - handleApprove
  // - handleReject
  // - handleUndoDecision
  // - handleSubmitDecisions
  // - handleDoneReview
  // - approvedCount
  // - rejectedCount

  const handleOpenPendingApprovals = () => {
    setShowPendingApprovals(true);
  };

  console.log(data);

  return (
    <ProtectedRoute allowedRoles={[1, 2]}>
      <div className="min-h-screen   transition-colors duration-200 px-3">
        <DashboardUserHeader handleCreateClick={handleCreateClick} />
        {/* User Modal */}
        <UsersModal
          isOpen={showAddModal}
          onClose={handleCloseModal}
          onSubmit={handleAddUser}
          user={editingUser}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <UserStatsCard
            icon={<Users color="#5A10A5" size={20} />}
            iconBackground="#F3E8FF"
            subText="↑ 2 this week"
            subTextColor="#09800F"
            title="Total Members"
            number={44}
          />
          <UserStatsCard
            icon={<UserCheck color="#09800F" size={20} />}
            iconBackground="#09800F1A"
            subText="↑ 5 active now"
            subTextColor="#09800F"
            title="Active Members"
            number={12}
          />
          <UserStatsCard
            icon={<TriangleAlert color="#FFC107" size={20} />}
            iconBackground="#EEBF6E26"
            subText="Requires your approval"
            subTextColor="#6C757D"
            title="Pending Approvals"
            number={32}
            extraButtonText="review now"
            extraButtonBackground="#FEF3C7"
            extraButtonColor="#B45309"
            onExtraButtonClick={handleOpenPendingApprovals}
          />
          <UserStatsCard
            icon={<GraduationCap color="#5A10A5" size={20} />}
            iconBackground="#F3E8FF"
            subText="Alumni all members"
            subTextColor="#6C757D"
            title="Alumni"
            number={15}
          />
        </div>

        {/* Main Content */}
        {/* Search and Filters */}
        <div className="my-5 sm:mt-0 flex justify-between flex-wrap space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, email, etc."
              className="w-80 h-10 pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 space-x-1 space-y-1">
            <TableSelect
              mainText="All Statuses"
              options={["Active", "Inactive"]}
            />
            <TableSelect
              mainText="All Roles"
              options={["Active", "Inactive"]}
            />
            <TableSelect
              mainText="All Committees"
              options={["Active", "Inactive"]}
            />
            <TableSelect mainText="Sort" options={["Active", "Inactive"]} />
          </div>
        </div>
        {/* ===Search and Filters=== */}

        <div className=" rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-2 text-gray-600">
                  <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading users...</span>
                </div>
              </div>
            )}
            {isError && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 text-red-500">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-red-600 font-medium">
                    {(error as Error)?.message || "Failed to load users"}
                  </p>
                </div>
              </div>
            )}
            {!isLoading && !isError && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 cursor-pointer"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Committee
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(paginatedData || []).map((user: any) => {
                    const email = user.email || user.eamil;
                    const fullName = getFullName(user);
                    const initials = getInitials(user);

                    return (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 cursor-pointer"
                          />
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-medium text-white">
                                {initials}
                              </span>
                            </div>
                            <span className="ml-3 text-sm font-medium text-gray-900">
                              {fullName}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-700">{email}</span>
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-700">
                            {getCommitteeNames(user.committeesId)}
                          </span>
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {getRoleName(user.roleId)}
                          </span>
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-700">
                            {getFacultyName(user.faculty || "")}
                          </span>
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {data?.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <div className="text-gray-500">
                          <svg
                            className="w-12 h-12 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            />
                          </svg>
                          <p className="text-lg font-medium">No users found</p>
                          <p className="text-sm">
                            Get started by adding your first user.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {/* Pagination */}
            {!isLoading && !isError && data && data.length > 0 && (
              <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of{" "}
                  {totalItems} results
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className={`h-8 w-8 flex items-center justify-center rounded-lg font-medium transition-colors ${
                          currentPage === page
                            ? "bg-[#5A10A5] text-white"
                            : "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {data?.length === 0 && (
          <div className="h-full w-full flex flex-col justify-center items-center">
            <h1 className="text-[39px] font-semibold text-[#0E2C5E]">
              No Results Found !!
            </h1>
            <img
              src={UserNotFound}
              className="w-100 h-78"
              alt="users not found"
            />
          </div>
        )}
        {/* User Details Modal */}
        {showDetails && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  User Details
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-3">
                    Personal Information
                  </h5>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium text-gray-600">
                        First Name:
                      </span>{" "}
                      {selectedUser.fName || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Middle Name:
                      </span>{" "}
                      {selectedUser.mName || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Last Name:
                      </span>{" "}
                      {selectedUser.lName || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">Gender:</span>{" "}
                      {selectedUser.sex || "N/A"}
                    </p>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-3">
                    Contact Information
                  </h5>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium text-gray-600">Email:</span>{" "}
                      {selectedUser.email || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">Phone:</span>{" "}
                      {selectedUser.phoneNumber || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Governorate:
                      </span>{" "}
                      {getGovernorateName(selectedUser.goverment || "")}
                    </p>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-3">
                    Academic Information
                  </h5>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium text-gray-600">
                        Faculty:
                      </span>{" "}
                      {getFacultyName(selectedUser.faculty || "")}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">Year:</span>{" "}
                      {selectedUser.year || "N/A"}
                    </p>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-3">
                    IEEE Information
                  </h5>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium text-gray-600">Role:</span>{" "}
                      {getRoleName(selectedUser.roleId)}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Committees:
                      </span>{" "}
                      {getCommitteeNames(selectedUser.committeesId)}
                    </p>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-600 mr-2">
                        Status:
                      </span>
                      {selectedUser.isActive ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* TODO: DELETE the old modal code below and use the new ApproveModal component */}
        {/* Pending Approvals Modal - Now in separate component */}
        <ApproveModal
          isOpen={showPendingApprovals}
          onClose={() => setShowPendingApprovals(false)}
          members={pendingApprovalsData}
          isLoading={false} // TODO: Replace with actual loading state from API
        />

        {/* TODO: Success Notification Modal after user creation */}
        {/* FUTURE: Replace hardcoded notifications with API call */}
        {/* Modify NotificationModal to accept a success-specific prop for showing only the success message */}
        <NotificationModal
          isOpen={showNotificationModal}
          onClose={() => {
            setShowNotificationModal(false);
            setSuccessNotificationData(null);
          }}
          notifications={[
            {
              id: 1,
              type: "member_added",
              title: "Member Added",
              description: `${successNotificationData?.name || "User"} was successfully added to ${successNotificationData?.committee || "IEEE Committee"}`,
              timeAgo: "just now",
              read: false,
            },
          ]}
        />
      </div>
    </ProtectedRoute>
  );
}
