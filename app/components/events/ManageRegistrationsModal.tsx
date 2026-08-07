import React, { useState } from "react";
import {
  X,
  Search,
  Mail,
  XCircle,
  Download,
  Send,
  CheckCircle2,
} from "lucide-react";
import type { ApiEvent } from "~/types/api.types";

interface Registrant {
  id: string;
  name: string;
  email: string;
  facultyYear: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  registeredDate: string;
  initials: string;
}

interface ManageRegistrationsModalProps {
  isOpen: boolean;
  event: ApiEvent | null;
  onClose: () => void;
}

export const ManageRegistrationsModal: React.FC<
  ManageRegistrationsModalProps
> = ({ isOpen, event, onClose }) => {
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Confirmed" | "Pending" | "Cancelled"
  >("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [successMessage, setSuccessMessage] = useState("Changed Saved Successfully");

  const [registrants, setRegistrants] = useState<Registrant[]>([
    {
      id: "1",
      name: "Ahmed Khalil",
      email: "ahmed.k@ieee.org",
      facultyYear: "Faculty of Computers - 3rd Year",
      status: "Confirmed",
      registeredDate: "Jul 28, 2025",
      initials: "AK",
    },
    {
      id: "2",
      name: "Sara Mohamed",
      email: "sara.m@ieee.org",
      facultyYear: "Faculty of Engineering - 2nd Year",
      status: "Confirmed",
      registeredDate: "Jul 29, 2025",
      initials: "SM",
    },
    {
      id: "3",
      name: "Omar Hassan",
      email: "omar.h@ieee.org",
      facultyYear: "Faculty of Computers - 4th Year",
      status: "Pending",
      registeredDate: "Jul 30, 2025",
      initials: "OH",
    },
    {
      id: "4",
      name: "Nada Ali",
      email: "nada.a@ieee.org",
      facultyYear: "Faculty of Science - 1st Year",
      status: "Confirmed",
      registeredDate: "Jul 30, 2025",
      initials: "NA",
    },
    {
      id: "5",
      name: "Youssef Ibrahim",
      email: "youssef.i@ieee.org",
      facultyYear: "Faculty of Engineering - 3rd Year",
      status: "Cancelled",
      registeredDate: "Jul 25, 2025",
      initials: "YI",
    },
  ]);

  if (!isOpen || !event) return null;

  const confirmedCount = registrants.filter((r) => r.status === "Confirmed").length;
  const pendingCount = registrants.filter((r) => r.status === "Pending").length;
  const cancelledCount = registrants.filter((r) => r.status === "Cancelled").length;

  const filteredRegistrants = registrants.filter((r) => {
    const matchesFilter = activeFilter === "All" || r.status === activeFilter;
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredRegistrants.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredRegistrants.map((r) => r.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCancelStatus = (id: string) => {
    setRegistrants((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Cancelled" } : r))
    );
    setSuccessMessage("Status updated to Cancelled");
    setShowSuccessOverlay(true);
  };

  const handleExportCSV = () => {
    setSuccessMessage("Registrations Exported to CSV Successfully");
    setShowSuccessOverlay(true);
  };

  const handleEmailAll = () => {
    setSuccessMessage("Emails sent to all registrants successfully");
    setShowSuccessOverlay(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-3xl border border-purple-100 bg-white text-gray-900 p-6 sm:p-8 shadow-2xl relative transition-all">
        {/* Success Overlay Confirmation */}
        {showSuccessOverlay ? (
          <div className="py-12 px-4 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-500/30 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 max-w-sm leading-snug mb-8">
              {successMessage}
            </h3>
            <button
              type="button"
              onClick={() => setShowSuccessOverlay(false)}
              className="w-44 py-3 rounded-xl font-bold text-sm bg-[#5A10A5] text-white hover:bg-purple-700 shadow-md shadow-purple-500/20 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900">
                  Manage Registrations
                </h2>
                <p className="text-xs text-purple-600 font-medium mt-0.5">
                  {event.name} • 230 / 250 registered
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

            {/* Summary Stat Cards */}
            <div className="grid grid-cols-3 gap-3 my-4">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                <p className="text-xl font-bold text-emerald-700">
                  {confirmedCount}
                </p>
                <p className="text-xs font-semibold text-emerald-600">
                  Confirmed
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100">
                <p className="text-xl font-bold text-amber-700">
                  {pendingCount}
                </p>
                <p className="text-xs font-semibold text-amber-600">
                  Pending
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100">
                <p className="text-xl font-bold text-rose-700">
                  {cancelledCount}
                </p>
                <p className="text-xs font-semibold text-rose-600">
                  Cancelled
                </p>
              </div>
            </div>

            {/* Search & Filter bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-full sm:w-auto">
                {(["All", "Confirmed", "Pending", "Cancelled"] as const).map(
                  (tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveFilter(tab)}
                      className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        activeFilter === tab
                          ? "bg-[#5A10A5] text-white shadow-xs"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Registrants Table */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden mb-4">
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 z-10 font-bold uppercase tracking-wider bg-gray-50 text-gray-500 border-b border-gray-200">
                    <tr>
                      <th className="p-3 w-10">
                        <input
                          type="checkbox"
                          checked={
                            selectedIds.length === filteredRegistrants.length &&
                            filteredRegistrants.length > 0
                          }
                          onChange={toggleSelectAll}
                          className="rounded text-[#5A10A5] focus:ring-purple-500"
                        />
                      </th>
                      <th className="p-3">REGISTRANT</th>
                      <th className="p-3">STATUS</th>
                      <th className="p-3">REGISTERED</th>
                      <th className="p-3 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredRegistrants.map((reg) => (
                      <tr
                        key={reg.id}
                        className="hover:bg-purple-50/30 transition-colors"
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(reg.id)}
                            onChange={() => toggleSelect(reg.id)}
                            className="rounded text-[#5A10A5] focus:ring-purple-500"
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-purple-100 text-[#5A10A5] font-bold text-xs flex items-center justify-center shrink-0">
                              {reg.initials}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {reg.name}
                              </p>
                              <p className="text-[10px] text-gray-400">
                                {reg.email}
                              </p>
                              <p className="text-[10px] text-gray-400 italic">
                                {reg.facultyYear}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              reg.status === "Confirmed"
                                ? "bg-emerald-100 text-emerald-700"
                                : reg.status === "Pending"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-rose-100 text-rose-700"
                            }`}
                          >
                            {reg.status}
                          </span>
                        </td>
                        <td className="p-3 text-gray-500">
                          {reg.registeredDate}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                setSuccessMessage(`Email sent to ${reg.email}`);
                                setShowSuccessOverlay(true);
                              }}
                              className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                              title="Send Email"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCancelStatus(reg.id)}
                              className="p-1.5 rounded-lg border border-rose-200 text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Cancel Registration"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-medium">
                {registrants.length} registrants • {confirmedCount} confirmed
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold transition-all"
                >
                  <Download className="w-3.5 h-3.5" /> Export CSV
                </button>
                <button
                  type="button"
                  onClick={handleEmailAll}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#5A10A5] text-white hover:bg-purple-700 shadow-md shadow-purple-500/20 transition-all"
                >
                  <Send className="w-3.5 h-3.5" /> Email All
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageRegistrationsModal;
