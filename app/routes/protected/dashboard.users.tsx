import { useAllUsers } from "~/hooks/useApi";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { getRoleName } from "~/utils/utile";
import { ActiveUserByIdApi, deleteUserByIdApi } from "~/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function UsersManagement() {
  const { data, isLoading, isError, error } = useAllUsers();
  const queryClient = useQueryClient();
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold ">Users Management</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Add New User
          </button>
        </div>
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium">All Users</h2>
          </div>
          <div className="p-6">
            {isLoading && (
              <div className="text-sm text-gray-500">Loading users...</div>
            )}
            {isError && (
              <div className="text-sm text-red-600">
                {(error as Error)?.message || "Failed to load users"}
              </div>
            )}
            {!isLoading && !isError && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Committee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(data || []).map((u: any) => {
                      const email = u.email || u.eamil; // handle possible typo from backend
                      return (
                        <tr
                          key={u.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm ">
                            {u.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {u.committeeId ?? "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {getRoleName(u.roleId)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {u.isActive ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-800">
                                Inactive
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                            {!u.isActive && (
                              <button
                                onClick={() => handleActivate(u.id)}
                                disabled={actionLoadingId === u.id}
                                className="px-3 py-1 text-xs rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                              >
                                {actionLoadingId === u.id ? "..." : "Activate"}
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(u.id)}
                              disabled={actionLoadingId === u.id}
                              className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                            >
                              {actionLoadingId === u.id ? "..." : "Delete"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {data?.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-4 text-sm text-center text-gray-500"
                        >
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
