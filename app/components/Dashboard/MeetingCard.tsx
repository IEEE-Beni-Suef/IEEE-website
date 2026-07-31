import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

export interface MeetingCardProps {
  bannerImage?: string;
  bannerTitle?: string;
  title: string;
  committee: string;
  date: string;
  time: string;
  location: string;
  attendanceCount: number;
  totalCount: number;
  avatars?: (string | { initials: string; bg?: string })[];
  onViewDetails?: () => void;
  buttonText?: string;
  className?: string;
}

export const MeetingCard: React.FC<MeetingCardProps> = ({
  bannerImage,
  bannerTitle,
  title,
  committee,
  date,
  time,
  location,
  attendanceCount,
  totalCount,
  avatars = ["MA", "KN", "LI", "NH", "OY"],
  onViewDetails,
  buttonText = "View Details",
  className = "",
}) => {
  const percentage =
    totalCount > 0 ? Math.round((attendanceCount / totalCount) * 100) : 0;
  const remainingCount = Math.max(0, totalCount - avatars.length);

  return (
    <div
      className={`bg-white border border-[#00064012] rounded-3xl overflow-hidden shadow-[0px_1px_4px_0px_#0006400F] transition-all flex flex-col justify-between ${className}`.trim()}
    >
      <div>
        {/* Banner Header */}
        {bannerImage ? (
          <div className="relative h-44 w-full overflow-hidden">
            <img
              src={bannerImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <span className="absolute top-3 left-3 px-3 py-1 bg-[#4F46E5]/90 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wide">
              {committee}
            </span>
          </div>
        ) : (
          <div className="relative h-44 w-full bg-gradient-to-tr from-purple-950 via-indigo-900 to-black p-4 flex flex-col items-center justify-center text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.3)_0,transparent_70%)]" />
            <div className="z-10 border-2 border-indigo-400/40 px-6 py-2 rounded-2xl backdrop-blur-md bg-black/40">
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 tracking-widest uppercase">
                {bannerTitle || committee || "MEETING"}
              </span>
            </div>
          </div>
        )}

        {/* Meeting Details */}
        <div className="p-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-extrabold text-[#000640] leading-snug">
              {title}
            </h3>
            <span className="px-3 py-1 bg-[#4460EF] text-white text-[10px] font-extrabold rounded-full uppercase shrink-0">
              {committee}
            </span>
          </div>

          <div className="mt-3 space-y-1.5 text-xs text-[#6C757D] dark:text-gray-400 font-medium">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-3.5 h-3.5 text-[#6C757D] shrink-0" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#6C757D] shrink-0" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#6C757D] shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          </div>

          {/* Attendance Progress */}
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
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Avatars */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex -space-x-2 overflow-hidden">
              {avatars.map((item, idx) => {
                if (
                  typeof item === "string" &&
                  (item.startsWith("http") || item.startsWith("/"))
                ) {
                  return (
                    <img
                      key={idx}
                      src={item}
                      alt="Attendee"
                      className="inline-block h-7 w-7 rounded-full  object-cover"
                    />
                  );
                }
                const initials =
                  typeof item === "string" ? item : item.initials;
                return (
                  <div
                    key={idx}
                    className="w-7 h-7 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center"
                  >
                    {initials}
                  </div>
                );
              })}
            </div>
            {remainingCount > 0 && (
              <span className="text-xs text-gray-400 font-semibold">
                +{remainingCount} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Action Button */}
      <div className="p-5 pt-0">
        <button
          onClick={onViewDetails}
          className="w-full py-3 bg-[#5A10A5]  text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md shadow-purple-900/20 transition-all"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default MeetingCard;
