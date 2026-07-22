import { X, Check } from "lucide-react";
import { useState } from "react";

interface ApprovalMember {
  id: number;
  name: string;
  role: string;
  date: string;
  avatar: string;
}

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  members?: ApprovalMember[];
  isLoading?: boolean;
}

export const ApproveModal = ({
  isOpen,
  onClose,
  members = [],
  isLoading = false,
}: ApproveModalProps) => {
  const [approvalsState, setApprovalsState] = useState<Record<number, string>>(
    {},
  );
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // TODO: Replace with actual API call
  // const { mutateAsync: submitApprovalsAPI } = useSubmitAppprovals();
  // Example: await submitApprovalsAPI(approvalsState);

  const handleApprove = (id: number) => {
    setApprovalsState((prev) => ({
      ...prev,
      [id]: "approved",
    }));
  };

  const handleReject = (id: number) => {
    setApprovalsState((prev) => ({
      ...prev,
      [id]: "rejected",
    }));
  };

  const handleUndoDecision = (id: number) => {
    setApprovalsState((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  const handleSubmitDecisions = async () => {
    try {
      // TODO: REPLACE THIS with actual API call
      // DELETE: console.log("Submitting decisions:", approvalsState);
      // ADD: const response = await submitApprovalsAPI(approvalsState);
      // This should send approvalsState object to your backend endpoint
      console.log("Submitting decisions:", approvalsState);

      setReviewSubmitted(true);
    } catch (error) {
      console.error("Error submitting approvals:", error);
      // TODO: Add error toast/notification here
    }
  };

  const handleDoneReview = () => {
    setReviewSubmitted(false);
    setApprovalsState({});
    setSearchTerm("");
    onClose();
  };

  const approvedCount = Object.values(approvalsState).filter(
    (s) => s === "approved",
  ).length;
  const rejectedCount = Object.values(approvalsState).filter(
    (s) => s === "rejected",
  ).length;

  // TODO: Filter members based on search term when API data is fetched
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        {/* Backdrop - Match UsersModal styling */}
        <div
          className="fixed inset-0 bg-gray-200/70"
          onClick={handleDoneReview}
          style={{ zIndex: 40 }}
        ></div>

        {/* Modal Content - Higher z-index than backdrop */}
        <div className="relative z-50 w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
          {!reviewSubmitted ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#000640]">
                  Pending Approvals
                </h2>
                <button
                  onClick={handleDoneReview}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Submitted indicator line */}
              <div className="w-full h-1 bg-[#5A10A5] rounded-full mb-6"></div>

              {/* Search Input */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search by name or committee..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-4 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5A10A5] focus:border-transparent text-sm"
                />
              </div>

              {/* Loading State */}
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-4 h-4 border-2 border-[#5A10A5] border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading approvals...</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* List of pending approvals */}
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {filteredMembers.length > 0 ? (
                      filteredMembers.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-3 flex-1">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-medium text-white">
                                {member.avatar}
                              </span>
                            </div>
                            <div className="flex-1 text-left">
                              <p className="text-sm font-medium text-gray-900">
                                {member.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {member.role}
                              </p>
                              <p className="text-xs text-gray-400">
                                {member.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {approvalsState[member.id] === "approved" ? (
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                                  Approved
                                </span>
                                <button
                                  onClick={() => handleUndoDecision(member.id)}
                                  className="text-xs text-gray-500 hover:text-gray-700 underline"
                                >
                                  Undo
                                </button>
                              </div>
                            ) : approvalsState[member.id] === "rejected" ? (
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                                  Rejected
                                </span>
                                <button
                                  onClick={() => handleUndoDecision(member.id)}
                                  className="text-xs text-gray-500 hover:text-gray-700 underline"
                                >
                                  Undo
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleApprove(member.id)}
                                  className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
                                >
                                  <Check className="w-3 h-3" />
                                  <span>Approve</span>
                                </button>
                                <button
                                  onClick={() => handleReject(member.id)}
                                  className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1"
                                >
                                  <X className="w-3 h-3" />
                                  <span>Reject</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No approvals found</p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-6 border-t border-gray-200">
                    <button
                      onClick={() =>
                        setApprovalsState(
                          filteredMembers.reduce(
                            (acc, m) => {
                              acc[m.id] = "approved";
                              return acc;
                            },
                            {} as Record<number, string>,
                          ),
                        )
                      }
                      className="flex-1 px-4 py-2 border border-[#5A10A5] text-[#5A10A5] font-medium rounded-lg hover:bg-[#F5F0FF] transition-colors"
                    >
                      Approve All
                    </button>
                    <button
                      onClick={handleSubmitDecisions}
                      disabled={Object.keys(approvalsState).length === 0}
                      className="flex-1 px-4 py-2 bg-[#5A10A5] text-white font-medium rounded-lg hover:bg-[#4a0885] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Submit Decisions
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            /* Submitted State */
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-[#000640] mb-2">
                Review Submitted
              </h3>
              <p className="text-sm text-gray-600 text-center mb-6">
                <span className="font-semibold text-green-600">
                  {approvedCount} approved
                </span>{" "}
                •{" "}
                <span className="font-semibold text-red-600">
                  {rejectedCount} rejected
                </span>
                <br />
                Members have been notified of the decision.
              </p>
              <button
                onClick={handleDoneReview}
                className="px-6 py-2 bg-[#5A10A5] text-white font-medium rounded-lg hover:bg-[#4a0885] transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
