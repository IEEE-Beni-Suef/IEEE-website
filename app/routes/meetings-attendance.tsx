import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput } from "../components/form";
import { submitAttendanceSchema } from "../utils/scemas";
import { apiSubmitAttendance, type SubmitAttendancePayload } from "../lib/api";
import { Users, CheckCircle, Plus, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useMeetingAttendents } from "~/hooks/useApi";
import { useEffect } from "react";

type SubmitAttendanceFormData = z.infer<typeof submitAttendanceSchema>;

export default function MeetingsAttendance({ meetingId }: { meetingId: number }) {
  const { data: attendents } = useMeetingAttendents(meetingId);

  const attendentsMember = {
    attendents:
      attendents?.map((a) => ({
        userId: a.userId, // keep as number
        isAttend: a.isAttend,
        score: a.score,
      })) ?? [],
  };

  const {
  register,
  handleSubmit,
  control,
  formState: { errors },
  reset,
} = useForm<SubmitAttendanceFormData>({
  resolver: zodResolver(submitAttendanceSchema),
  defaultValues: {
  meetingId,
  usersAttendents:
    attendentsMember.attendents.length > 0
      ? attendentsMember.attendents
      : [{ userId: 0, isAttend: true, score: 0 }],
}

});

useEffect(() => {
  if (attendentsMember.attendents.length > 0) {
    reset({
      meetingId,
      usersAttendents: attendentsMember.attendents,
    });
  }
}, [attendentsMember, meetingId, reset]);


  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "usersAttendents",
  });

  const { mutate, isSuccess, isError, error, isPending } = useMutation({
    mutationFn: (payload: SubmitAttendancePayload) => apiSubmitAttendance(payload),
  });

  const onSubmit = (data: SubmitAttendanceFormData) => {
    const payload: SubmitAttendancePayload = {
      meetingId: data.meetingId,
      usersAttendents: data.usersAttendents.map((item) => ({
        userId: Number(item.userId),
        isAttend: item.isAttend,
        score: Number(item.score),
      })),
    };

    mutate(payload);
    console.log("Submitted Data:", payload);
  };

  const addAttendee = () => {
    prepend({ userId: 0, isAttend: true, score: 0 });
  };

  const removeAttendee = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <section className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-8 mt-10">
      <div className="w-full max-w-4xl rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl shadow-xl p-6 sm:p-8 dark:text-white">
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
            Submit Attendance
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Add attendees for the meeting and submit their status.
          </p>
        </div>

        {isSuccess && (
          <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-green-700 dark:text-green-300">
              Attendance submitted successfully!
            </p>
          </div>
        )}

        {isError && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-700 dark:text-red-300">
              {error?.message || "Failed to submit attendance"}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Attendees */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Attendees
              </label>
              <button
                type="button"
                onClick={addAttendee}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Attendee
              </button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <FormInput
                  id={`usersAttendents.${index}.userId`}
                  label="User ID"
                  type="number"
                  placeholder="Enter user ID"
                  register={register}
                  error={errors.usersAttendents?.[index]?.userId}
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Attended
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register(`usersAttendents.${index}.isAttend`)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Present
                    </span>
                  </div>
                </div>

                <FormInput
                  id={`usersAttendents.${index}.score`}
                  label="Score"
                  type="number"
                  placeholder="Enter score"
                  register={register}
                  error={errors.usersAttendents?.[index]?.score}
                />

                <button
                  type="button"
                  onClick={() => removeAttendee(index)}
                  disabled={fields.length === 1}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              </div>
            ))}

            {errors.usersAttendents && (
              <p className="text-sm text-red-600">{errors.usersAttendents.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
          >
            {isPending ? "Submitting..." : "Submit Attendance"}
          </button>
        </form>
      </div>
    </section>
  );
}
