import { useMutation } from "@tanstack/react-query";
import { queryClient } from "~/config/queryClient";
import type { FormEvent } from "react";
import { useState } from "react";
import { apiCreateMeeting, type CreateMeetingPayload } from "../lib/api";
import { useCommittees } from "../hooks/useApi";

export default function MeetingsCreate() {
  const [form, setForm] = useState<CreateMeetingPayload>({
    title: "",
    description: "",
    recap: "",
    type: "",
    dateTime: new Date().toISOString().slice(0, 16), // local datetime string
    committeeId: null,
    headId: null,
  });

  const { mutate, isSuccess, isError, error, isPending } = useMutation({
    mutationFn: (payload: CreateMeetingPayload) => apiCreateMeeting(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["meetings"] });
    },
  });

  const committeeOptions = useCommittees();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const payload: CreateMeetingPayload = {
        ...form,
        dateTime: new Date(form.dateTime).toISOString(),
        committeeId: Number(form.committeeId) || 0,
        headId: Number(form.headId) || 0, // comes automatically from committee
      };
      mutate(payload);
      console.log("Creating meeting with data:", payload);
    } catch (err) {
      console.error("Error creating meeting:", err);
    }
  }

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const inputBase =
    "w-full border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-400 dark:text-white";

  return (
    <section className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 mt-10">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl shadow-xl p-6 sm:p-8">
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
            Create Meeting
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Fill in the details below to schedule a new IEEE meeting.
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4">
          {/* Title + Type */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                className={inputBase}
                placeholder="Enter meeting title"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Type
              </label>
              <input
                type="text"
                value={form.type}
                onChange={(e) => update("type", e.target.value)}
                className={inputBase}
                placeholder="e.g. General, Board"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className={`min-h-28 ${inputBase}`}
              placeholder="Enter meeting description"
            />
          </div>

          {/* Recap */}
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              Recap / Agenda
            </label>
            <input
              type="text"
              value={form.recap}
              onChange={(e) => update("recap", e.target.value)}
              className={inputBase}
              placeholder="Enter agenda/recap"
            />
          </div>

          {/* Date + Committee */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Meeting Date & Time
              </label>
              <input
                type="datetime-local"
                value={form.dateTime}
                min={new Date().toISOString().slice(0, 16)} // prevent past times
                onChange={(e) => update("dateTime", e.target.value)}
                className={inputBase}
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Committee
              </label>
              <select
                value={form.committeeId ?? ""}
                onChange={(e) => {
                  const selectedId = e.target.value ? Number(e.target.value) : null;
                  const selectedCommittee = committeeOptions.data?.find(
                    (c) => c.id === selectedId
                  );
                  update("committeeId", selectedId);
                  update("headId", selectedCommittee?.headId ?? null);
                }}
                className={inputBase}
              >
                <option value="">Select Committee</option>
                {committeeOptions.data?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex justify-center items-center gap-2 rounded-xl px-5 py-2.5 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 shadow-lg shadow-blue-600/20"
            >
              {isPending ? "Creating..." : "Create Meeting"}
            </button>
            {isSuccess && (
              <span className="text-green-600 text-sm">
                Meeting created successfully.
              </span>
            )}
            {isError && (
              <span className="text-red-600 text-sm">
                {error instanceof Error ? error.message : "Error creating meeting"}
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
