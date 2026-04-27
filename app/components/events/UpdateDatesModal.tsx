import React, { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { Button } from "../ui/Button";
import { updateEventDatesSchema } from "~/utils/schemas";
import type { UpdateEventDatesFormData } from "~/utils/schemas";
import type { ApiEvent } from "~/types/api.types";

interface UpdateDatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Pick<ApiEvent, "startDate" | "endDate" | "isCommingSoon">;
  onSubmit: (data: UpdateEventDatesFormData) => void;
  isLoading?: boolean;
}

/** Converts an ISO string or null to the value expected by <input type="datetime-local"> */
const toInputValue = (iso: string | null): string => {
  if (!iso) return "";
  // datetime-local expects "YYYY-MM-DDTHH:MM"
  return iso.slice(0, 16);
};

/** Converts datetime-local value to ISO string or null */
const toIso = (value: string): string | null => {
  if (!value) return null;
  return new Date(value).toISOString();
};

export function UpdateDatesModal({
  isOpen,
  onClose,
  event,
  onSubmit,
  isLoading = false,
}: UpdateDatesModalProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate]     = useState("");
  const [isCommingSoon, setIsCommingSoon] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setStartDate(toInputValue(event.startDate));
      setEndDate(toInputValue(event.endDate));
      setIsCommingSoon(event.isCommingSoon);
      setErrors({});
    }
  }, [isOpen, event]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      startDate: isCommingSoon ? null : toIso(startDate),
      endDate:   isCommingSoon ? null : toIso(endDate),
      isCommingSoon,
    };

    const result = updateEventDatesSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    onSubmit(result.data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Event Dates">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Coming Soon toggle */}
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div className="relative">
            <input
              id="is-coming-soon"
              type="checkbox"
              checked={isCommingSoon}
              onChange={(e) => {
                setIsCommingSoon(e.target.checked);
                setErrors({});
              }}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-blue-600 transition-colors" />
            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Coming Soon (no dates needed)
          </span>
        </label>

        {/* Date inputs (hidden when coming soon) */}
        {!isCommingSoon && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                id="start-date"
                type="datetime-local"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setErrors((p) => ({ ...p, startDate: "" })); }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.startDate && <p className="text-xs text-red-500">{errors.startDate}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                id="end-date"
                type="datetime-local"
                value={endDate}
                min={startDate}
                onChange={(e) => { setEndDate(e.target.value); setErrors((p) => ({ ...p, endDate: "" })); }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.endDate && <p className="text-xs text-red-500">{errors.endDate}</p>}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Saving…" : "Update Dates"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
