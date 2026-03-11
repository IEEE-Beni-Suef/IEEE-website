import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAllMeetings, useCreateMeeting, useSubmitAttendance, useGetMeetingAttendance, useAllUsers, useCommittees } from "~/hooks/useApi";
import { createMeetingSchema, submitAttendanceSchema } from "~/utils/schemas";
import { Calendar, Plus, Users, CheckCircle, Edit, Trash2, Eye } from "lucide-react";
import { FormInput } from "~/components/form";

type CreateMeetingFormData = z.infer<typeof createMeetingSchema>;
type SubmitAttendanceFormData = z.infer<typeof submitAttendanceSchema>;

export default function DashboardMeetings() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(null);
  const [selectedCommitteeId, setSelectedCommitteeId] = useState<number | null>(null);

  const { data: meetings, isLoading: meetingsLoading } = useAllMeetings();
  const { data: users } = useAllUsers();
  const { data: committees } = useCommittees();
  const { data: attendanceData } = useGetMeetingAttendance(selectedMeetingId || 0);

  const createMeetingForm = useForm<CreateMeetingFormData>({
    resolver: zodResolver(createMeetingSchema),
    defaultValues: {
      title: "",
      type: "",
      description: "",
      recap: "",
      committeeId: 0,
      headId: 0,
      users: [{ userId: 0, attended: false, mark: 0 }],
    },
  });

  const attendanceForm = useForm<SubmitAttendanceFormData>({
    resolver: zodResolver(submitAttendanceSchema),
    defaultValues: {
      meetingId: "",
      usersAttendents: [{ userId: "", isAttend: true, score: "" }],
    },
  });

  const { fields: meetingUsers, append: appendMeetingUser, remove: removeMeetingUser } = useFieldArray({
    control: createMeetingForm.control,
    name: "users",
  });

  const { fields: attendanceUsers, append: appendAttendanceUser, remove: removeAttendanceUser } = useFieldArray({
    control: attendanceForm.control,
    name: "usersAttendents",
  });

  const createMeetingMutation = useCreateMeeting();
  const submitAttendanceMutation = useSubmitAttendance();

  // Filter users by committee
  const committeeUsers = users?.filter(user => 
    user.committeeIds?.includes(selectedCommitteeId || 0)
  ) || [];

  const onCreateMeeting = (data: CreateMeetingFormData) => {
    createMeetingMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateModalOpen(false);
        createMeetingForm.reset();
      },
    });
  };

  const onSubmitAttendance = (data: SubmitAttendanceFormData) => {
    const payload = {
      meetingId: Number(data.meetingId),
      usersAttendents: data.usersAttendents.map((item) => ({
        userId: Number(item.userId),
        isAttend: item.isAttend,
        score: Number(item.score),
      })),
    };
    submitAttendanceMutation.mutate(payload, {
      onSuccess: () => {
        setIsAttendanceModalOpen(false);
        attendanceForm.reset();
      },
    });
  };

  const openAttendanceModal = (meetingId: number) => {
    setSelectedMeetingId(meetingId);
    attendanceForm.setValue("meetingId", meetingId.toString());
    setIsAttendanceModalOpen(true);
  };

  const openCreateModal = () => {
    setSelectedCommitteeId(null);
    createMeetingForm.reset();
    setIsCreateModalOpen(true);
  };

  const handleCommitteeChange = (committeeId: number) => {
    setSelectedCommitteeId(committeeId);
    createMeetingForm.setValue("committeeId", committeeId);
    // Reset users when committee changes
    createMeetingForm.setValue("users", [{ userId: 0, attended: false, mark: 0 }]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Meetings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage IEEE meetings and attendance</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Meeting
        </button>
      </div>

      {/* Meetings List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">All Meetings</h2>
          
          {meetingsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Loading meetings...</p>
            </div>
          ) : meetings && meetings.length > 0 ? (
            <div className="grid gap-4">
              {meetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {meeting.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {meeting.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {meeting.type}
                        </span>
                        <span>Committee ID: {meeting.committeeId}</span>
                        <span>Head ID: {meeting.headId}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openAttendanceModal(meeting.id)}
                        className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      >
                        <Users className="w-4 h-4" />
                        Attendance
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No meetings found</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                Create your first meeting to get started
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Meeting Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Meeting</h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={createMeetingForm.handleSubmit(onCreateMeeting)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    id="title"
                    label="Title"
                    placeholder="Meeting title"
                    register={createMeetingForm.register}
                    error={createMeetingForm.formState.errors.title}
                  />
                  <FormInput
                    id="type"
                    label="Type"
                    placeholder="Meeting type"
                    register={createMeetingForm.register}
                    error={createMeetingForm.formState.errors.type}
                  />
                </div>

                <FormInput
                  id="description"
                  label="Description"
                  placeholder="Meeting description"
                  register={createMeetingForm.register}
                  error={createMeetingForm.formState.errors.description}
                />

                <FormInput
                  id="recap"
                  label="Recap"
                  placeholder="Meeting recap/agenda"
                  register={createMeetingForm.register}
                  error={createMeetingForm.formState.errors.recap}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Committee
                    </label>
                    <select
                      {...createMeetingForm.register("committeeId", { valueAsNumber: true })}
                      onChange={(e) => handleCommitteeChange(Number(e.target.value))}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value={0}>Select Committee</option>
                      {committees?.map((committee) => (
                        <option key={committee.id} value={committee.id}>
                          {committee.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Head ID
                    </label>
                    <input
                      type="number"
                      {...createMeetingForm.register("headId", { valueAsNumber: true })}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter head ID"
                    />
                  </div>
                </div>

                {/* Users Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Meeting Participants
                    </label>
                    <button
                      type="button"
                      onClick={() => appendMeetingUser({ userId: 0, attended: false, mark: 0 })}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40"
                    >
                      <Plus className="w-4 h-4" />
                      Add User
                    </button>
                  </div>

                  {meetingUsers.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-3 gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          User
                        </label>
                        <select
                          {...createMeetingForm.register(`users.${index}.userId` as const, { valueAsNumber: true })}
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value={0}>Select User</option>
                          {committeeUsers.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.firstName} {user.lastName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Attended
                        </label>
                        <input
                          type="checkbox"
                          {...createMeetingForm.register(`users.${index}.attended` as const)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Mark
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          {...createMeetingForm.register(`users.${index}.mark` as const, { valueAsNumber: true })}
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="0-10"
                        />
                      </div>

                      {meetingUsers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMeetingUser(index)}
                          className="col-span-3 flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove User
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={createMeetingMutation.isPending}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {createMeetingMutation.isPending ? "Creating..." : "Create Meeting"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Modal */}
      {isAttendanceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Meeting Attendance</h2>
                <button
                  onClick={() => setIsAttendanceModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={attendanceForm.handleSubmit(onSubmitAttendance)} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Meeting ID: {selectedMeetingId}
                    </label>
                    <button
                      type="button"
                      onClick={() => appendAttendanceUser({ userId: "", isAttend: true, score: "" })}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40"
                    >
                      <Plus className="w-4 h-4" />
                      Add Attendee
                    </button>
                  </div>

                  {attendanceUsers.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-4 gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          User ID
                        </label>
                        <input
                          type="number"
                          {...attendanceForm.register(`usersAttendents.${index}.userId` as const)}
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter user ID"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Attended
                        </label>
                        <input
                          type="checkbox"
                          {...attendanceForm.register(`usersAttendents.${index}.isAttend` as const)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Score
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          {...attendanceForm.register(`usersAttendents.${index}.score` as const)}
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="0-10"
                        />
                      </div>

                      {attendanceUsers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAttendanceUser(index)}
                          className="col-span-4 flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove Attendee
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submitAttendanceMutation.isPending}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {submitAttendanceMutation.isPending ? "Submitting..." : "Submit Attendance"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAttendanceModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
