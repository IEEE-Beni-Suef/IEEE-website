import { ProtectedRoute } from "~/components/ProtectedRoute";
import { Button } from "~/components/ui/Button";
import { useCommittees, useDeleteCommittee } from "~/hooks/useApi";

const CommitteesManagement = () => {
  const { data, isLoading, isError, error } = useCommittees();
  const { mutate: deleteCommittee } = useDeleteCommittee();
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this committee?")) return;
    try {
      await deleteCommittee(id);
    } catch (e) {
      alert((e as Error).message);
    }
  };

  return (
    <ProtectedRoute allowedRoles={[1]}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold ">Committees Management</h1>
        </div>
        <Button variant="primary">Create Committee</Button>
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium">All Committees</h2>
          </div>
          <div className="p-6">
            {isLoading && (
              <div className="text-sm text-gray-500">Loading committees...</div>
            )}
            {isError && (
              <div className="text-sm text-red-600">
                {(error as Error)?.message || "Failed to load committees"}
              </div>
            )}
            {!isLoading && !isError && (
              <ul className="space-y-4">
                {data.map((committee) => (
                  <li
                    key={committee.id}
                    className="flex justify-between items-center"
                  >
                    <span>{committee.name}</span>
                    <span>{committee.headId}</span>
                    <span>{committee.memberCount}</span>
                    <Button variant="secondary">Edit</Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(committee.id)}
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CommitteesManagement;
