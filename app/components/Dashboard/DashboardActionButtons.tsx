import React from "react";
import { UserPlus, CalendarPlus, FilePlus, Sparkles } from "lucide-react";

interface DashboardActionButtonsProps {
  onAddUser: () => void;
  onCreateMeeting: () => void;
  onCreateArticle: () => void;
  onCreateEvent: () => void;
}

export const DashboardActionButtons: React.FC<DashboardActionButtonsProps> = ({
  onAddUser,
  onCreateMeeting,
  onCreateArticle,
  onCreateEvent,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={onAddUser}
        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <UserPlus className="w-4 h-4" />
        <span>Add User</span>
      </button>

      <button
        onClick={onCreateMeeting}
        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <CalendarPlus className="w-4 h-4" />
        <span>Create Meeting</span>
      </button>

      <button
        onClick={onCreateArticle}
        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-purple-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <FilePlus className="w-4 h-4" />
        <span>Create Article</span>
      </button>

      <button
        onClick={onCreateEvent}
        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <Sparkles className="w-4 h-4" />
        <span>Create Event</span>
      </button>
    </div>
  );
};

export default DashboardActionButtons;
