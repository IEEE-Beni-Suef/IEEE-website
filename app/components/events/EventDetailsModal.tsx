import React from "react";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Building,
  Tag,
  UserCheck,
  Pencil,
  Users,
} from "lucide-react";
import type { ApiEvent } from "~/types/api.types";

interface EventDetailsModalProps {
  isOpen: boolean;
  event: ApiEvent | null;
  onClose: () => void;
  onEdit: () => void;
  onManageRegistrations: () => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  isOpen,
  event,
  onClose,
  onEdit,
  onManageRegistrations,
}) => {
  if (!isOpen || !event) return null;

  const eventInitials = event.name
    ? event.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "EV";

  const dateStr = event.startDate
    ? new Date(event.startDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Aug 1, 2025";

  const timeStr = event.startDate
    ? new Date(event.startDate).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "6:00 PM";

  const registeredCount = 230;
  const capacityCount = 250;
  const fillPercentage = Math.round((registeredCount / capacityCount) * 100);

  const agenda = [
    { step: 1, title: "Introduction to ML" },
    { step: 2, title: "Hands-on TensorFlow" },
    { step: 3, title: "Model Deployment" },
    { step: 4, title: "Q&A Session" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer panel */}
      <div className="relative z-10 w-full max-w-md h-full overflow-y-auto flex flex-col shadow-2xl transition-all duration-300 transform animate-in slide-in-from-right bg-white text-gray-900">
        {/* Top Purple Banner Header */}
        <div className="bg-[#5A10A5] text-white p-6 relative flex flex-col justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center font-bold text-lg text-white">
              {eventInitials}
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">{event.name}</h2>
              <p className="text-xs text-purple-200 mt-0.5">
                Hands-on machine learning fundamentals
              </p>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-400/20 border border-emerald-300/30 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Registration Open
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 border border-white/20 text-purple-100">
              <span className="w-2 h-2 rounded-full bg-purple-300" />
              On Track
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Key Info Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl border border-purple-100 bg-purple-50/40">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#5A10A5]" />
                Date
              </div>
              <p className="font-semibold text-sm text-gray-900">{dateStr}</p>
            </div>

            <div className="p-3.5 rounded-2xl border border-purple-100 bg-purple-50/40">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                <Clock className="w-3.5 h-3.5 text-[#5A10A5]" />
                Time
              </div>
              <p className="font-semibold text-sm text-gray-900">{timeStr}</p>
            </div>

            <div className="p-3.5 rounded-2xl border border-purple-100 bg-purple-50/40">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#5A10A5]" />
                Location
              </div>
              <p className="font-semibold text-sm text-gray-900 truncate">Faculty of Computers</p>
            </div>

            <div className="p-3.5 rounded-2xl border border-purple-100 bg-purple-50/40">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                <Building className="w-3.5 h-3.5 text-[#5A10A5]" />
                Committee
              </div>
              <p className="font-semibold text-sm text-gray-900">CS</p>
            </div>

            <div className="p-3.5 rounded-2xl border border-purple-100 bg-purple-50/40">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                <Tag className="w-3.5 h-3.5 text-[#5A10A5]" />
                Category
              </div>
              <p className="font-semibold text-sm text-gray-900">Workshop</p>
            </div>

            <div className="p-3.5 rounded-2xl border border-purple-100 bg-purple-50/40">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                <UserCheck className="w-3.5 h-3.5 text-[#5A10A5]" />
                Speaker
              </div>
              <p className="font-semibold text-sm text-gray-900 truncate">Dr. Ahmed Hassan</p>
            </div>
          </div>

          {/* Registration Progress Box */}
          <div className="p-4 rounded-2xl border border-purple-100 bg-purple-50/40 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#5A10A5]" />
                Registration Progress
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-gray-900">
                {registeredCount}
              </span>
              <span className="text-xs font-medium text-gray-500">
                / {capacityCount} seats
              </span>
            </div>

            <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-400 transition-all duration-500"
                style={{ width: `${fillPercentage}%` }}
              />
            </div>

            <p className="text-xs text-gray-500 font-medium">
              {fillPercentage}% capacity filled
            </p>
          </div>

          {/* Agenda Section */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm tracking-tight text-gray-900">
              Agenda
            </h4>
            <div className="space-y-2">
              {agenda.map((item) => (
                <div
                  key={item.step}
                  className="p-3 rounded-xl border border-purple-100 bg-purple-50/30 flex items-center gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-[#5A10A5] font-bold text-xs flex items-center justify-center shrink-0">
                    {item.step}
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="p-5 border-t border-gray-100 bg-white flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-[#5A10A5] text-white hover:bg-purple-700 shadow-md shadow-purple-500/20 transition-all cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
            Edit Event
          </button>
          <button
            type="button"
            onClick={onManageRegistrations}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm border border-gray-300 text-gray-800 hover:bg-gray-50 transition-all cursor-pointer"
          >
            <Users className="w-4 h-4 text-[#5A10A5]" />
            Manage Registrations
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
