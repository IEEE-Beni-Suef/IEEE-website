import { useEffect, useState, type FormEvent } from "react";
import {
    useMeetings,
    useMeeting,
    useMeetingAttendents,
    useDeleteMeeting,
    useCommittees,
    useAllUsers,
} from "~/hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import { updateMeetingApi } from "~/lib/api";
import Modal from "~/components/ui/Modal";
import { set } from "zod";
import MeetingsAttendance from "./meetings-attendance";

function toLocalInputValue(iso?: string) {
    if (!iso) return "";
    try {
        const d = new Date(iso);
        const pad = (n: number) => String(n).padStart(2, "0");
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
            d.getDate()
        )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    } catch {
        return "";
    }
}

export default function ShowMettingsPage() {
    const { data: meetings, isLoading, isError, error } = useMeetings();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [attendance, setAttendance] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const activeId = selectedId || 0;
    const { data: selectedMeeting } = useMeeting(activeId);
    const { data: attendents } = useMeetingAttendents(activeId);
    const { data: committees } = useCommittees();
    const { data: users } = useAllUsers();
    const { mutate: deleteMeeting, isPending: isDeleting } = useDeleteMeeting();

    const [editForm, setEditForm] = useState({
        title: "",
        description: "",
        recap: "",
        dateTime: "",
        committeeId: 0,
        headId: 0,
    });

    const [editUsers, setEditUsers] = useState<
        { userId: number; attended: boolean; mark: number }[]
    >([]);

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // ✅ Populate form when editing
    useEffect(() => {
        if (selectedMeeting && isEditing) {
            setEditForm({
                title: selectedMeeting.title ?? "",
                description: selectedMeeting.description ?? "",
                recap: selectedMeeting.recap ?? "",
                dateTime: toLocalInputValue(selectedMeeting.dateTime),
                committeeId: selectedMeeting.committeeId ?? 0,
                headId: selectedMeeting.headId ?? 0,
            });
        }
    }, [selectedMeeting, isEditing]);

    // ✅ Populate attendance users
    useEffect(() => {
        if (attendents && isEditing) {
            setEditUsers(
                attendents.map((a) => ({
                    userId: a.userId,
                    attended: a.isAttend, // normalize
                    mark: a.score,
                }))
            );
        }
    }, [attendents, isEditing]);

    // Payload type
    type EditMeetingPayload = {
        title: string;
        description: string;
        recap: string;
        committeeId: number;
        headId: number;
        users: { userId: number; attended: boolean; mark: number }[];
    };

    // ✅ Mutation
    const { mutate: editMeeting, isPending: isSavingUsers } = useMutation({
        mutationFn: (payload: EditMeetingPayload) =>
            updateMeetingApi(activeId, payload),
        onSuccess: () => {
            setIsModalOpen(false); // close modal
            setErrorMsg(null);
        },
        onError: (err: any) => {
            setErrorMsg(err.message || "Failed to update meeting");
        },
    });

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        if (!selectedMeeting) return;

        const payload: EditMeetingPayload = {
            title: editForm.title,
            description: editForm.description,
            recap: editForm.recap,
            committeeId:
                editForm.committeeId || selectedMeeting.committeeId || 0,
            headId: editForm.headId || selectedMeeting.headId || 0,
            users: editUsers.map((u) => ({
                userId: u.userId,
                attended: u.attended,
                mark: u.mark,
            })),
        };
        console.log("Submitting edit with payload:", payload);
        editMeeting(payload);
    }

    const inputBase =
        "w-full border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-400 dark:text-white";
    console.log(selectedMeeting, selectedMeeting?.id);

    return (
        <section className="min-h-[calc(100vh-64px)] px-4 py-6 mt-10 mx-auto">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-center text-black my-2 text-3xl dark:text-white">
                    meetings
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading && <div>Loading meetings...</div>}
                    {isError && (
                        <div className="text-red-600 col-span-full">
                            {String(
                                (error as Error)?.message ||
                                    "Error loading meetings"
                            )}
                        </div>
                    )}

                    {meetings?.map((m) => (
                        <div
                            key={m.id}
                            className="rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl shadow-md hover:shadow-lg transition-shadow p-5 flex flex-col justify-between">
                            {/* Header */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">
                                    {m.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 truncate">
                                    {m.type} •{" "}
                                    {new Date(m.dateTime).toLocaleString()} •{" "}
                                    {m.committeeName}
                                </p>

                                {/* Description / Recap */}
                                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                                    {m.description || "No description provided"}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="mt-4 flex items-center gap-2">
                                <button
                                    className="cursor-pointer flex-1 px-3 py-1.5 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                                    onClick={() => {
                                        setSelectedId(m.id);
                                        setIsEditing(false);
                                        setAttendance(false); // ✅ reset attendance when viewing
                                        setIsModalOpen(true);
                                    }}>
                                    View
                                </button>
                                {/* <button
                  className="flex-1 px-3 py-1.5 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                  onClick={() => {
                    setSelectedId(m.id);
                    setIsEditing(true);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </button> */}

                                <button
                                    className="flex-1 cursor-pointer px-3 py-1.5 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white disabled:opacity-60 transition-colors"
                                    disabled={isDeleting}
                                    onClick={() => deleteMeeting(m.id)}>
                                    Delete
                                </button>
                            </div>
                            <button
                                className="my-3 cursor-pointer text-sm rounded-lg bg-transparent hover:bg-indigo-300 hover:text-indigo-900 text-dark transition-colors dark:text-white "
                                onClick={() => {
                                    setSelectedId(m.id);
                                    setIsEditing(false);
                                    setAttendance(true); // ✅ show attendance modal
                                    setIsModalOpen(true);
                                }}>
                                Add Attendance
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setIsEditing(false);
                    setAttendance(false); // ✅ reset on close
                }}
                title={
                    attendance
                        ? "Manage Attendance"
                        : isEditing
                          ? "Edit Meeting"
                          : "Meeting Details"
                }
                size="xl">
                {!selectedId && (
                    <div className="text-gray-600 dark:text-gray-400">
                        Select a meeting to view details.
                    </div>
                )}

                {/* VIEW MODE */}
                {selectedId && !isEditing && selectedMeeting && !attendance && (
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold dark:text-white">
                            Title: {selectedMeeting.title}
                        </h3>
                        <div className="text-sm text-gray-700 dark:text-gray-300 ">
                            Description: {selectedMeeting.description}
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                            Recap: {selectedMeeting.recap}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                            {selectedMeeting.type} •{" "}
                            {new Date(
                                selectedMeeting.dateTime
                            ).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                            Committee: {selectedMeeting.committeeName} • Head:{" "}
                            {selectedMeeting.headName}
                        </div>
                    </div>
                )}

                {/* EDIT MODE */}
                {selectedId && isEditing && (
                    <form className="grid gap-3" onSubmit={onSubmit}>
                        {errorMsg && (
                            <div className="p-2 rounded-md bg-red-100 text-red-700 text-sm">
                                {errorMsg}
                            </div>
                        )}

                        {/* Title */}
                        <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                Title
                            </label>
                            <input
                                className={inputBase}
                                value={editForm.title}
                                onChange={(e) =>
                                    setEditForm((p) => ({
                                        ...p,
                                        title: e.target.value,
                                    }))
                                }
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                Description
                            </label>
                            <textarea
                                className={`${inputBase} min-h-24`}
                                value={editForm.description}
                                onChange={(e) =>
                                    setEditForm((p) => ({
                                        ...p,
                                        description: e.target.value,
                                    }))
                                }
                            />
                        </div>

                        {/* Recap */}
                        <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                Recap
                            </label>
                            <input
                                className={inputBase}
                                value={editForm.recap}
                                onChange={(e) =>
                                    setEditForm((p) => ({
                                        ...p,
                                        recap: e.target.value,
                                    }))
                                }
                            />
                        </div>

                        {/* Committee Selector */}
                        <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                Committee
                            </label>
                            <select
                                className={inputBase}
                                value={editForm.committeeId || ""}
                                onChange={(e) => {
                                    const selectedId = e.target.value
                                        ? Number(e.target.value)
                                        : 0;
                                    const selectedCommittee = committees?.find(
                                        (c) => c.id === selectedId
                                    );
                                    setEditForm((p) => ({
                                        ...p,
                                        committeeId: selectedId,
                                        headId: selectedCommittee?.headId ?? 0,
                                    }));
                                }}>
                                <option value="">Select Committee</option>
                                {committees?.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            {/* Optional: Show Head name under dropdown */}
                            {/* {editForm.headId ? (
                <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                  Head: {committees?.find(c => c.id === editForm.committeeId)?.headName}
                </p>
              ) : null} */}
                        </div>

                        {/* Attendance */}
                        <div className="pt-2 dark:text-white">
                            <h4 className="font-medium mb-2">Attendance</h4>
                            {editUsers.length === 0 && (
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    No attendance available.
                                </div>
                            )}
                            {editUsers.length > 0 && (
                                <ul className="text-sm space-y-2">
                                    {editUsers.map((u, idx) => (
                                        <li
                                            key={u.userId}
                                            className="flex items-center justify-between gap-3">
                                            <div className="min-w-0">
                                                <span className="font-medium">
                                                    User {u.userId}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <label className="flex items-center gap-1 text-xs">
                                                    <input
                                                        type="checkbox"
                                                        checked={u.attended}
                                                        onChange={(ev) => {
                                                            const next = [
                                                                ...editUsers,
                                                            ];
                                                            next[idx] = {
                                                                ...next[idx],
                                                                attended:
                                                                    ev.target
                                                                        .checked,
                                                            };
                                                            setEditUsers(next);
                                                        }}
                                                    />
                                                    Present
                                                </label>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    className="w-20 border border-gray-300 dark:border-gray-700 rounded-md p-1 text-xs bg-white/70 dark:bg-gray-900/60"
                                                    value={u.mark}
                                                    onChange={(ev) => {
                                                        const next = [
                                                            ...editUsers,
                                                        ];
                                                        next[idx] = {
                                                            ...next[idx],
                                                            mark: Number(
                                                                ev.target
                                                                    .value || 0
                                                            ),
                                                        };
                                                        setEditUsers(next);
                                                    }}
                                                />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-2">
                            <button
                                type="submit"
                                disabled={isSavingUsers}
                                className="px-4 py-2 rounded-md bg-indigo-600 text-white disabled:opacity-60">
                                {isSavingUsers ? "Saving..." : "Save"}
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-300"
                                onClick={() => setIsModalOpen(false)}>
                                Close
                            </button>
                        </div>
                    </form>
                )}
                {selectedId && !isEditing && attendance && (
                    <MeetingsAttendance
                        meetingId={selectedMeeting?.id}
                        
                    />
                )}
            </Modal>
        </section>
    );
}
