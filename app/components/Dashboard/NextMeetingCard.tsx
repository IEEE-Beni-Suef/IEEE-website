import React from "react";
import { Calendar as CalendarIcon, Clock, ArrowRight } from "lucide-react";

interface MeetingAttendee {
  id: number;
  name: string;
  avatar?: string;
}

interface NextMeetingCardProps {
  title: string;
  badge: string;
  date: string;
  time: string;
  location: string;
  attendanceCount: number;
  totalCount: number;
  attendees: MeetingAttendee[];
  bannerLabel?: string;
  onViewDetails?: () => void;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const NextMeetingCard: React.FC<NextMeetingCardProps> = ({
  title,
  badge,
  date,
  time,
  location,
  attendanceCount,
  totalCount,
  attendees,
  bannerLabel = "BACKEND",
  onViewDetails,
}) => {
  const progressPercent = Math.round((attendanceCount / totalCount) * 100);

  return (
    <div className="bg-white dark:bg-[#101726] border border-gray-100 dark:border-[#232D42] rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="relative h-44 w-full bg-gradient-to-tr from-purple-950 via-indigo-900 to-black p-4 flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.3)_0,transparent_70%)]" />
          <div className="z-10 border-2 border-indigo-400/40 px-6 py-2 rounded-2xl backdrop-blur-md bg-black/40">
            <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 tracking-widest uppercase">
              {bannerLabel}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#000640] dark:text-white">
              {title}
            </h3>
            <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-extrabold rounded-full uppercase">
              {badge}
            </span>
          </div>

          <div className="mt-3 space-y-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-3.5 h-3.5 text-indigo-500" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 text-indigo-500 font-bold flex justify-center">
                📍
              </span>
              <span>{location}</span>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex justify-between items-center text-xs font-bold mb-1">
              <span className="text-gray-700 dark:text-gray-300">
                Attendance
              </span>
              <span className="text-blue-600 font-extrabold">
                {attendanceCount} / {totalCount}
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex -space-x-2">
              {attendees.slice(0, 5).map((attendee) => (
                <div
                  key={attendee.id}
                  className="w-7 h-7 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-[#101726]"
                >
                  {attendee.avatar ?? getInitials(attendee.name)}
                </div>
              ))}
            </div>
            {attendees.length > 5 ? (
              <span className="text-xs text-gray-400 font-semibold">
                +{attendees.length - 5} more
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="p-5 pt-0">
        <button
          onClick={onViewDetails}
          className="w-full py-3 bg-[#4C1D95] hover:bg-[#3B0764] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md shadow-purple-900/20 transition-all hover:scale-[1.01]"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default NextMeetingCard;
