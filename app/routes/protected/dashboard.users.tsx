import { useAllUsers } from "~/hooks/useApi";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { getRoleName, getFullName, getInitials } from "~/utils/utile";
import { ActiveUserByIdApi, deleteUserByIdApi } from "~/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { facultyOptions, governorateOptions } from "~/utils/lists";

export default function UsersManagement() {
  const { data, isLoading, isError, error } = useAllUsers();
  const queryClient = useQueryClient();
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

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

  const handleActivate = async (id: number) => {
    try {
      setActionLoadingId(id);
      await ActiveUserByIdApi(id);
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <ProtectedRoute allowedRoles={[0, 1]}>
      <div className="min-h-screen  transition-colors duration-200">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Users Management
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Manage and oversee all IEEE members and their details
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-colors duration-200">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add New User
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Users
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {data?.length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Users
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {data?.filter((u: any) => u.isActive).length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-yellow-600 dark:text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Pending
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {data?.filter((u: any) => !u.isActive).length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Committees
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {new Set(
                    data
                      ?.flatMap((u: any) => u.committeesId || [])
                      .filter(Boolean)
                  ).size || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                All Users
              </h2>
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
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
                <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400">
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
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
                  <p className="text-red-600 dark:text-red-400 font-medium">
                    {(error as Error)?.message || "Failed to load users"}
                  </p>
                </div>
              </div>
            )}

            {!isLoading && !isError && (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Academic Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Role & Committee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {(data || []).map((user: any) => {
                    const email = user.email || user.eamil; // handle possible typo from backend
                    const fullName = getFullName(user);
                    const initials = getInitials(user);

                    return (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                                <span className="text-sm font-medium text-white">
                                  {initials}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {fullName}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                ID: {user.id}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {email}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.phoneNumber}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {getFacultyName(user.faculty || "")}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.year || "Unknown"} •{" "}
                            {getGovernorateName(user.goverment || "")}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {getRoleName(user.roleId)}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {getCommitteeNames(user.committeesId)}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.isActive ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5"></div>
                              Inactive
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowDetails(true);
                            }}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors duration-150"
                          >
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            View
                          </button>

                          {!user.isActive && (
                            <button
                              onClick={() => handleActivate(user.id)}
                              disabled={actionLoadingId === user.id}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                            >
                              {actionLoadingId === user.id ? (
                                <div className="w-3 h-3 mr-1 border border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <svg
                                  className="w-3 h-3 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              )}
                              Activate
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(user.id)}
                            disabled={actionLoadingId === user.id}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                          >
                            {actionLoadingId === user.id ? (
                              <div className="w-3 h-3 mr-1 border border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <svg
                                className="w-3 h-3 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            )}
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {data?.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <div className="text-gray-500 dark:text-gray-400">
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
          </div>
        </div>

        {/* User Details Modal */}
        {showDetails && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  User Details
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-xl font-medium text-white">
                      {getInitials(selectedUser)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {getFullName(selectedUser)}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      ID: {selectedUser.id}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Personal Information
                    </h5>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium text-gray-600 dark:text-gray-400">
                          First Name:
                        </span>{" "}
                        {selectedUser.fName || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600 dark:text-gray-400">
                          Middle Name:
                        </span>{" "}
                        {selectedUser.mName || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600 dark:text-gray-400">
                          Last Name:
                        </span>{" "}
                        {selectedUser.lName || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600 dark:text-gray-400">
                          Gender:
                        </span>{" "}
                        {selectedUser.sex || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Contact Information
                    </h5>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium text-gray-600 dark:text-gray-400">
                          Email:
                        </span>{" "}
                        {selectedUser.email || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600 dark:text-gray-400">
                          Phone:
                        </span>{" "}
                        {selectedUser.phoneNumber || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600 dark:text-gray-400">
                          Governorate:
                        </span>{" "}
                        {getGovernorateName(selectedUser.goverment || "")}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Academic Information
                    </h5>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium text-gray-600 dark:text-gray-400">
                          Faculty:
                        </span>{" "}
                        {getFacultyName(selectedUser.faculty || "")}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600 dark:text-gray-400">
                          Year:
                        </span>{" "}
                        {selectedUser.year || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      IEEE Information
                    </h5>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium text-gray-600 dark:text-gray-400">
                          Role:
                        </span>{" "}
                        {getRoleName(selectedUser.roleId)}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600 dark:text-gray-400">
                          Committees:
                        </span>{" "}
                        {getCommitteeNames(selectedUser.committeesId)}
                      </p>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-600 dark:text-gray-400 mr-2">
                          Status:
                        </span>
                        {selectedUser.isActive ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                            Inactive
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
