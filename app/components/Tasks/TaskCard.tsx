import React from "react";
import { Calendar, Paperclip, MessageSquare, Code, Layers, Megaphone, CheckCircle2, MoreVertical, Pencil, Trash2 } from "lucide-react";

export interface TaskItem {
  id: string | number;
  title: string;
  description?: string;
  committee: string;
  priority: "High" | "Medium" | "Low";
  status: "To Do" | "In Progress" | "Review" | "Completed";
  deadline: string;
  progress: number;
  assignees: { name: string; avatar: string }[];
  attachmentsCount?: number;
  commentsCount?: number;
  iconName?: string;
}

interface TaskCardProps {
  task: TaskItem;
  onEdit?: (task: TaskItem) => void;
  onDelete?: (task: TaskItem) => void;
  onStatusChange?: (task: TaskItem, newStatus: TaskItem["status"]) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  // Determine border and badge colors based on priority
  const getPriorityStyles = () => {
    switch (task.priority) {
      case "High":
        return {
          leftBorder: "#DC2626",
          badgeBg: "#FEE2E2",
          badgeColor: "#DC2626",
          label: "HIGH PRIORITY",
        };
      case "Medium":
        return {
          leftBorder: "#4460EF",
          badgeBg: "#E8ECFD",
          badgeColor: "#4460EF",
          label: "MEDIUM",
        };
      case "Low":
      default:
        return {
          leftBorder: "#059669",
          badgeBg: "#D1FAE5",
          badgeColor: "#059669",
          label: "LOW PRIORITY",
        };
    }
  };

  // Determine status badge style
  const getStatusStyles = () => {
    switch (task.status) {
      case "Completed":
        return { bg: "#D1FAE5", color: "#059669" };
      case "Review":
        return { bg: "#E8ECFD", color: "#4460EF" };
      case "In Progress":
        return { bg: "#FEF3C7", color: "#D97706" };
      case "To Do":
      default:
        return { bg: "#F3F4F6", color: "#4B5563" };
    }
  };

  const priorityStyle = getPriorityStyles();
  const statusStyle = getStatusStyles();

  // Icon component helper
  const getIcon = () => {
    if (task.committee.toLowerCase().includes("web")) return <Code className="w-5 h-5" />;
    if (task.committee.toLowerCase().includes("pr")) return <Megaphone className="w-5 h-5" />;
    return <Layers className="w-5 h-5" />;
  };

  return (
    <div
      className="rounded-2xl p-5 border border-purple-100/80 bg-white transition-all duration-300 shadow-2xs hover:shadow-md relative overflow-hidden flex flex-col justify-between space-y-4"
      style={{ borderLeft: `5px solid ${priorityStyle.leftBorder}` }}
    >
      {/* Top Header Row */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 text-[#5A10A5] flex items-center justify-center shrink-0">
              {getIcon()}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider"
                style={{
                  backgroundColor: priorityStyle.badgeBg,
                  color: priorityStyle.badgeColor,
                }}
              >
                {priorityStyle.label}
              </span>

              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-50 text-[#5A10A5]">
                {task.committee}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold shrink-0">
            <Calendar className="w-3.5 h-3.5" />
            <span>{task.deadline}</span>
          </div>
        </div>

        {/* Task Title */}
        <h3 className="font-extrabold text-base tracking-tight text-gray-900 leading-snug">
          {task.title}
        </h3>
      </div>

      {/* Bottom Action / Metrics Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-purple-50">
        <div className="flex items-center gap-4">
          {/* Stacked Assignees */}
          <div className="flex items-center -space-x-2 overflow-hidden">
            {task.assignees.slice(0, 3).map((a, i) => (
              <img
                key={i}
                src={a.avatar}
                alt={a.name}
                className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                title={a.name}
              />
            ))}
            {task.assignees.length > 3 && (
              <span className="flex items-center justify-center h-7 w-7 rounded-full bg-purple-100 text-[#5A10A5] font-extrabold text-[10px] ring-2 ring-white">
                +{task.assignees.length - 3}
              </span>
            )}
          </div>

          {/* Attachments & Comments */}
          <div className="flex items-center gap-3 text-xs text-gray-400 font-semibold">
            {(task.attachmentsCount ?? 0) > 0 && (
              <span className="flex items-center gap-1">
                <Paperclip className="w-3.5 h-3.5" />
                {task.attachmentsCount}
              </span>
            )}
            {(task.commentsCount ?? 0) > 0 && (
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                {task.commentsCount}
              </span>
            )}
          </div>
        </div>

        {/* Progress Bar & Status Badge */}
        <div className="flex items-center gap-4 flex-1 max-w-xs justify-end">
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-extrabold text-gray-400 uppercase">
              <span>PROGRESS</span>
              <span className="text-gray-700">{task.progress}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${task.progress}%`,
                  backgroundColor:
                    task.progress === 100
                      ? "#059669"
                      : task.progress > 50
                      ? "#5A10A5"
                      : "#4460EF",
                }}
              />
            </div>
          </div>

          {/* Status Badge */}
          <span
            className="px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 cursor-pointer shadow-2xs transition-transform hover:scale-105"
            style={{
              backgroundColor: statusStyle.bg,
              color: statusStyle.color,
            }}
            onClick={() => {
              if (onStatusChange) {
                const nextStatus: TaskItem["status"] =
                  task.status === "To Do"
                    ? "In Progress"
                    : task.status === "In Progress"
                    ? "Review"
                    : task.status === "Review"
                    ? "Completed"
                    : "To Do";
                onStatusChange(task, nextStatus);
              }
            }}
          >
            {task.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
