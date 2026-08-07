import React, { useState } from "react";
import { X, Calendar } from "lucide-react";
import type { TaskItem } from "./TaskCard";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: Partial<TaskItem>) => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [committee, setCommittee] = useState("UI/UX Design");
  const [assignee, setAssignee] = useState("Mohammed Sharaf");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [status, setStatus] = useState<"To Do" | "In Progress" | "Review" | "Completed">("To Do");
  const [deadline, setDeadline] = useState("30/1/2026");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title,
      description,
      committee,
      priority,
      status,
      deadline,
      progress: 0,
      assignees: [
        {
          name: assignee,
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        },
      ],
      attachmentsCount: 0,
      commentsCount: 0,
    });

    // Reset form
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl border border-purple-100 bg-white text-gray-900 p-6 sm:p-8 shadow-2xl relative space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-purple-50">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Create New Task</h2>
            <p className="text-xs text-gray-500 mt-1">
              Add a task to your committee workflow
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Redesign member portal"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional task description..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                Committee
              </label>
              <select
                value={committee}
                onChange={(e) => setCommittee(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Web Team">Web Team</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="PR Team">PR Team</option>
                <option value="Robotics">Robotics</option>
                <option value="HR">HR</option>
                <option value="CS">CS</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                Assignee
              </label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Mohammed Sharaf">Mohammed Sharaf</option>
                <option value="Sara Mohamed">Sara Mohamed</option>
                <option value="Omar Khaled">Omar Khaled</option>
                <option value="Mostafa Ali">Mostafa Ali</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Review">Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
              Deadline
            </label>
            <div className="relative">
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="30/1/2026"
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Live Preview Strip */}
          <div className="p-3 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">Preview:</span>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-100 text-[#5A10A5]">
              {committee}
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-100 text-blue-700">
              {priority}
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-gray-200 text-gray-700">
              {status}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-purple-50">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#5A10A5] text-white hover:bg-purple-700 shadow-md shadow-purple-500/20 transition-all cursor-pointer"
            >
              + Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
