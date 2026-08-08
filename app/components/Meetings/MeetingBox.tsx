import { CalendarDays, CalendarIcon, Clock, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import type { Meeting } from "~/types";

interface IProps {
  isDark: boolean;
  setDeletingMeetingId: (id: number) => void;
  getCommitteeName: (id: number) => ReactNode;
  isCompleted: boolean;
  isUpcoming: boolean;
  meeting: Meeting;
}

const MeetingBox = ({
  isDark,
  meeting,
  setDeletingMeetingId,
  getCommitteeName,
  isUpcoming,
  isCompleted,
}: IProps) => {
  return (
    <div
      key={meeting.id}
      className={`flex min-h-37.5 px-3.5  md:px-2  rounded-2xl border transition-all shadow-[0px_4px_16px_0px_#0006400F] ${
        isDark
          ? "bg-[#101726] border-[#232D42] text-white"
          : "bg-[#FFFFFF] border-[#EEF0FF] text-[#000640]"
      }`}
    >
      <div
        className="w-full flex flex-col lg:px-5 py-5 lg:flex-row gap-4  lg:border-l-4  rounded-2xl"
        style={{ borderColor: isCompleted ? "#4460EF" : "#5A10A5" }}
      >
        {/* Badge Icon */}
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
            isDark
              ? "bg-[#1A2238] text-[#A78BFA]"
              : "bg-[#F3E8FF] text-[#5A10A5]"
          }`}
        >
          <CalendarDays className="w-6 h-6" />
        </div>

        <div className="flex flex-col  space-y-1.5 w-[90%]">
          {/* HEADER */}
          <div className="flex justify-between space-y-2 items-center flex-wrap lg:pr-5">
            <div className="flex items-center gap-2">
              <h3 className="text-base md:text-lg font-bold">
                {meeting.title}
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  isDark
                    ? "bg-[#1E2738] text-purple-300"
                    : "bg-[#F3E8FF] text-[#5A10A5]"
                }`}
              >
                {getCommitteeName(meeting.committeeId)}
              </span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isUpcoming
                  ? "bg-[#DCFCE7] text-[#166534]"
                  : isCompleted
                    ? "bg-[#DBEAFE] text-[#1E40AF]"
                    : "bg-[#FEE2E2] text-[#991B1B]"
              }`}
            >
              {meeting.type || "Upcoming"}
            </span>
          </div>
          {/* ===HEADER=== */}
          {/* DESCRIIPTION */}
          <p
            className={`text-xs md:text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            {meeting.description}
          </p>
          {/* ===DESCRIIPTION=== */}
          {/* Meeting Details Footer */}
          <div className="border-t border-gray-200/10 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-gray-400" />
                <span>Jul 22, 2025</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>10:00 AM - 11:30 AM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 text-center leading-none text-gray-400">
                  📍
                </span>
                <span>Room A-204, Main Campus</span>
              </div>
            </div>
          </div>
          {/* Attendance Progress */}
          <div className="flex items-center gap-3 w-full ">
            <span
              className={`text-xs font-semibold shrink-0 ${isDark ? "text-gray-300" : "text-gray-600"}`}
            >
              👥 22 / 30
            </span>
            <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div
                className="h-full  rounded-full"
                style={{
                  width: "89%",
                  background: isCompleted ? "#4460EF" : "#5A10A5",
                }}
              />
            </div>
            <span className="text-xs font-bold text-[#5A10A5] dark:text-purple-400 shrink-0">
              89%
            </span>
          </div>
        </div>
        {/* Delete */}

        <button
          onClick={() => setDeletingMeetingId(meeting.id)}
          className="flex items-center mt-5 mx-auto md:mt-10 md:ml-3 w-24 h-9 gap-1.5 px-3.5 py-1.5 rounded-[22px] p-10 text-xs font-medium text-white bg-[#DC2626] hover:bg-[#B91C1C] transition-colors shadow-xs"
        >
          <Trash2 size={20} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default MeetingBox;
