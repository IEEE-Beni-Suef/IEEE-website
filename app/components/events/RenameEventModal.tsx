import React, { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { Button } from "../ui/Button";
import { renameEventSchema } from "~/utils/schemas";
import type { RenameEventFormData } from "~/utils/schemas";

interface RenameEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onSubmit: (data: RenameEventFormData) => void;
  isLoading?: boolean;
}

export function RenameEventModal({
  isOpen,
  onClose,
  currentName,
  onSubmit,
  isLoading = false,
}: RenameEventModalProps) {
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setNewName(currentName);
      setError("");
    }
  }, [isOpen, currentName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = renameEventSchema.safeParse({ newName });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid name");
      return;
    }
    onSubmit(result.data);
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Rename Event">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            New Event Name <span className="text-red-500">*</span>
          </label>
          <input
            id="rename-event-name"
            type="text"
            value={newName}
            onChange={(e) => { setNewName(e.target.value); setError(""); }}
            placeholder="Enter new event name"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Saving…" : "Rename"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
