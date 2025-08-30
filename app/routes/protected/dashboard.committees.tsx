import { useState } from "react";
import toast from "react-hot-toast";
import { CommitteeModal } from "~/components/CommitteeModal";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { Button } from "~/components/ui/Button";
import {
  useCommittees,
  useDeleteCommittee,
  useCreateCommittee,
  useUpdateCommittee,
} from "~/hooks/useApi";

const CommitteesManagement = () => {
  const { data, isLoading, isError, error } = useCommittees();
  const { mutate: deleteCommittee } = useDeleteCommittee();
  const { mutate: createCommittee } = useCreateCommittee();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCommittee, setEditingCommittee] = useState<any>(null);
  const { mutate: updateCommittee } = useUpdateCommittee(
    editingCommittee?.id || 0
  );
  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this committee?")) return;
    deleteCommittee(id, {
      onSuccess: () => {
        toast.success("Committee deleted successfully!");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  };

  const handleCreateClick = () => {
    setEditingCommittee(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (committee: any) => {
    setEditingCommittee(committee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCommittee(null);
  };

  const handleSubmit = (data: any) => {
    if (editingCommittee) {
      updateCommittee(data, {
        onSuccess: () => {
          toast.success("Committee updated successfully!");
          handleCloseModal();
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      });
    } else {
      createCommittee(data, {
        onSuccess: () => {
          toast.success("Committee created successfully!");
          handleCloseModal();
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      });
    }
  };

  return (
    <ProtectedRoute allowedRoles={[1, 2]}>
      <div className="space-y-6 rounded-2xl ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Committees Management
          </h1>
        </div>
        <Button variant="primary" onClick={handleCreateClick}>
          Create Committee
        </Button>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              All Committees
            </h2>
          </div>
          <div className="p-6">
            {isLoading && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Loading committees...
              </div>
            )}
            {isError && (
              <div className="text-sm text-red-600 dark:text-red-400">
                {(error as Error)?.message || "Failed to load committees"}
              </div>
            )}
            {!isLoading && !isError && (
              <ul className="space-y-4">
                {data.map((committee: any) => (
                  <li
                    key={committee.id}
                    className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {committee.name}
                      </span>
                      {committee.description && (
                        <span className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {committee.description}
                        </span>
                      )}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Head ID: {committee.headId}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Members: {committee.memberCount}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => handleEditClick(committee)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(committee.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <CommitteeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        committee={editingCommittee}
      />
    </ProtectedRoute>
  );
};

export default CommitteesManagement;
