import React from "react";
import type { TaskItem } from "./TaskCard";
import { Plus, MoreHorizontal, MessageSquare, Paperclip } from "lucide-react";

interface TaskKanbanViewProps {
  tasks: TaskItem[];
  onTaskClick?: (task: TaskItem) => void;
  onAddTask?: (status: TaskItem["status"]) => void;
}

export const TaskKanbanView: React.FC<TaskKanbanViewProps> = ({
  tasks,
  onTaskClick,
  onAddTask,
}) => {
  const columns: { title: TaskItem["status"]; color: string; bg: string }[] = [
    { title: "To Do", color: "#4B5563", bg: "#F3F4F6" },
    { title: "In Progress", color: "#5A10A5", bg: "#EEE3FA" },
    { title: "Review", color: "#4460EF", bg: "#E8ECFD" },
    { title: "Completed", color: "#059669", bg: "#D1FAE5" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
      {columns.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col.title);

        return (
          <div
            key={col.title}
            className="bg-gray-50/70 border border-purple-100/60 rounded-2xl p-4 space-y-4 min-h-[500px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: col.color }}
                />
                <h4 className="font-extrabold text-sm text-gray-900">
                  {col.title}
                </h4>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-extrabold"
                  style={{ backgroundColor: col.bg, color: col.color }}
                >
                  {colTasks.length}
                </span>
              </div>

              <div className="flex items-center gap-1">
                {onAddTask && (
                  <button
                    type="button"
                    onClick={() => onAddTask(col.title)}
                    className="p-1 rounded-lg hover:bg-white text-gray-400 hover:text-gray-700 transition-colors cursor-pointer border-0"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Column Task Cards */}
            <div className="space-y-3">
              {colTasks.length === 0 ? (
                <div className="p-6 text-center border border-dashed border-gray-200 rounded-xl">
                  <p className="text-xs font-semibold text-gray-400">No tasks</p>
                </div>
              ) : (
                colTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => onTaskClick && onTaskClick(t)}
                    className="bg-white border border-purple-100/80 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-all space-y-3 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-50 text-[#5A10A5]">
                        {t.committee}
                      </span>
                      <MoreHorizontal className="w-3.5 h-3.5 text-gray-300" />
                    </div>

                    <h5 className="font-bold text-xs text-gray-900 line-clamp-2 leading-snug">
                      {t.title}
                    </h5>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-extrabold text-gray-400">
                        <span>Progress</span>
                        <span>{t.progress}%</span>
                      </div>
                      <div className="w-full h-1 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${t.progress}%`,
                            backgroundColor: col.color,
                          }}
                        />
                      </div>
                    </div>

                    {/* Footer Avatar & Comments */}
                    <div className="pt-2 border-t border-purple-50 flex items-center justify-between">
                      <div className="flex items-center -space-x-1.5 overflow-hidden">
                        {t.assignees.slice(0, 2).map((a, idx) => (
                          <img
                            key={idx}
                            src={a.avatar}
                            alt={a.name}
                            className="inline-block h-6 w-6 rounded-full ring-1 ring-white object-cover"
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-gray-400 font-semibold">
                        {(t.commentsCount ?? 0) > 0 && (
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {t.commentsCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskKanbanView;
