import React, { useState } from "react";
import toast from "react-hot-toast";
import { Plus, Tag, CalendarDays, Pencil, Trash2, KeyRound } from "lucide-react";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { Button } from "~/components/ui/Button";
import { CategoryModal } from "~/components/CategoryModal";
import { CreateEventModal } from "~/components/events/CreateEventModal";
import { RenameEventModal } from "~/components/events/RenameEventModal";
import { UpdateKeywordsModal } from "~/components/events/UpdateKeywordsModal";
import { UpdateDatesModal } from "~/components/events/UpdateDatesModal";
import {
  useApiCategories,
  useApiEvents,
  useCreateApiCategory,
  useRenameCategory,
  useUpdateCategoryDesc,
  useDeleteApiCategory,
  useCreateEvent,
  useRenameEvent,
  useUpdateEventKeywords,
  useUpdateEventDates,
  useDeleteEvent,
} from "~/hooks/useEventsAndCategories";
import type { ApiCategory, ApiEvent } from "~/types/api.types";
import type { CreateCategoryFormData } from "~/utils/schemas";

export function meta() {
  return [
    { title: "Events Management - IEEE BNS Dashboard" },
    { name: "description", content: "Manage IEEE BNS events and categories" },
  ];
}

// ── Small helper to format dates ────────────────────────────
const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";

// ============================================================
// Main Component
// ============================================================
const EventsManagement = () => {
  const [activeTab, setActiveTab] = useState<"events" | "categories">("events");

  // ── API data ────────────────────────────────────────────
  const { data: categories = [], isLoading: catLoading } = useApiCategories();
  const { data: events = [], isLoading: eventsLoading } = useApiEvents();

  // ── Category mutations ──────────────────────────────────
  const { mutate: createCategory, isPending: creatingCat }     = useCreateApiCategory();
  const { mutate: renameCategory, isPending: renamingCat }     = useRenameCategory();
  const { mutate: updateCatDesc, isPending: updatingCatDesc }  = useUpdateCategoryDesc();
  const { mutate: deleteCategory, isPending: deletingCat }     = useDeleteApiCategory();

  // ── Event mutations ─────────────────────────────────────
  const { mutate: createEvent, isPending: creatingEvent }          = useCreateEvent();
  const { mutate: renameEvent, isPending: renamingEvent }          = useRenameEvent();
  const { mutate: updateKeywords, isPending: updatingKeywords }    = useUpdateEventKeywords();
  const { mutate: updateDates, isPending: updatingDates }          = useUpdateEventDates();
  const { mutate: deleteEvent, isPending: deletingEvent }          = useDeleteEvent();

  // ── Modal state ─────────────────────────────────────────
  const [catModalOpen, setCatModalOpen]   = useState(false);
  const [editingCat, setEditingCat]       = useState<ApiCategory | null>(null);

  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [renameEventOpen, setRenameEventOpen] = useState(false);
  const [kwModalOpen, setKwModalOpen]         = useState(false);
  const [datesModalOpen, setDatesModalOpen]   = useState(false);
  const [selectedEvent, setSelectedEvent]     = useState<ApiEvent | null>(null);

  // ── Category handlers ───────────────────────────────────
  const handleCategorySubmit = (data: CreateCategoryFormData) => {
    if (editingCat) {
      // When editing we always rename (description update has its own UX if needed)
      renameCategory(
        { id: editingCat.id, data: { newName: data.name } },
        {
          onSuccess: () => { toast.success("Category renamed!"); setCatModalOpen(false); setEditingCat(null); },
          onError: (e) => toast.error((e as Error).message),
        }
      );
      // Also update description if it changed
      if (data.description !== editingCat.description) {
        updateCatDesc(
          { id: editingCat.id, data: { newDescription: data.description ?? null } },
          { onError: (e) => toast.error((e as Error).message) }
        );
      }
    } else {
      createCategory(data, {
        onSuccess: () => { toast.success("Category created!"); setCatModalOpen(false); },
        onError: (e) => toast.error((e as Error).message),
      });
    }
  };

  const handleDeleteCategory = (cat: ApiCategory) => {
    if (!confirm(`Delete category "${cat.name}"? This cannot be undone.`)) return;
    deleteCategory(cat.id, {
      onSuccess: () => toast.success("Category deleted."),
      onError: (e) => toast.error((e as Error).message),
    });
  };

  // ── Event handlers ──────────────────────────────────────
  const handleCreateEvent = (data: any) => {
    createEvent(data, {
      onSuccess: () => { toast.success("Event created!"); setCreateEventOpen(false); },
      onError: (e) => toast.error((e as Error).message),
    });
  };

  const handleRenameEvent = (data: any) => {
    if (!selectedEvent) return;
    renameEvent(
      { id: selectedEvent.id, data },
      {
        onSuccess: () => { toast.success("Event renamed!"); setRenameEventOpen(false); setSelectedEvent(null); },
        onError: (e) => toast.error((e as Error).message),
      }
    );
  };

  const handleUpdateKeywords = (data: any) => {
    if (!selectedEvent) return;
    updateKeywords(
      { id: selectedEvent.id, data },
      {
        onSuccess: () => { toast.success("Keywords updated!"); setKwModalOpen(false); setSelectedEvent(null); },
        onError: (e) => toast.error((e as Error).message),
      }
    );
  };

  const handleUpdateDates = (data: any) => {
    if (!selectedEvent) return;
    updateDates(
      { id: selectedEvent.id, data },
      {
        onSuccess: () => { toast.success("Dates updated!"); setDatesModalOpen(false); setSelectedEvent(null); },
        onError: (e) => toast.error((e as Error).message),
      }
    );
  };

  const handleDeleteEvent = (ev: ApiEvent) => {
    if (!confirm(`Delete event "${ev.name}"? This cannot be undone.`)) return;
    deleteEvent(ev.id, {
      onSuccess: () => toast.success("Event deleted."),
      onError: (e) => toast.error((e as Error).message),
    });
  };

  // ── Helpers ─────────────────────────────────────────────
  const getCatName = (id: string) => categories.find((c) => c.id === id)?.name ?? "—";

  return (
    <ProtectedRoute allowedRoles={[1, 2]}>
      <div className="min-h-screen transition-colors duration-200">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Events Management
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Manage IEEE BNS events and their categories
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button
                variant="primary"
                onClick={() =>
                  activeTab === "events"
                    ? setCreateEventOpen(true)
                    : (setEditingCat(null), setCatModalOpen(true))
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                {activeTab === "events" ? "Create Event" : "Create Category"}
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-1 border-b border-gray-200 dark:border-gray-700">
            {(["events", "categories"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium capitalize rounded-t-lg transition-colors cursor-pointer ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Stats ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Events", value: events.length, icon: <CalendarDays className="w-5 h-5 text-blue-500" /> },
            { label: "Categories", value: categories.length, icon: <Tag className="w-5 h-5 text-purple-500" /> },
            { label: "Coming Soon", value: events.filter((e) => e.isCommingSoon).length, icon: <CalendarDays className="w-5 h-5 text-amber-500" /> },
            { label: "Scheduled",   value: events.filter((e) => !e.isCommingSoon && e.startDate).length, icon: <CalendarDays className="w-5 h-5 text-green-500" /> },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3">
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">{stat.icon}</div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Events Table ───────────────────────────────── */}
        {activeTab === "events" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {eventsLoading ? (
              <div className="p-12 text-center text-gray-500 dark:text-gray-400">Loading events…</div>
            ) : events.length === 0 ? (
              <div className="p-12 text-center">
                <CalendarDays className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No events yet. Create your first one!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                      {["Name", "Category", "Keywords", "Start", "End", "Status", "Actions"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {events.map((ev) => (
                      <tr key={ev.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-[180px] truncate">{ev.name}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{getCatName(ev.categoryId)}</td>
                        <td className="px-4 py-3 max-w-[200px]">
                          <div className="flex flex-wrap gap-1">
                            {ev.keyWords.slice(0, 3).map((kw) => (
                              <span key={kw} className="px-2 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">{kw}</span>
                            ))}
                            {ev.keyWords.length > 3 && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500">+{ev.keyWords.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">{formatDate(ev.startDate)}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">{formatDate(ev.endDate)}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            ev.isCommingSoon
                              ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                              : "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                          }`}>
                            {ev.isCommingSoon ? "Coming Soon" : "Scheduled"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              id={`rename-event-${ev.id}`}
                              onClick={() => { setSelectedEvent(ev); setRenameEventOpen(true); }}
                              title="Rename"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              id={`keywords-event-${ev.id}`}
                              onClick={() => { setSelectedEvent(ev); setKwModalOpen(true); }}
                              title="Update keywords"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
                            >
                              <KeyRound className="w-3.5 h-3.5" />
                            </button>
                            <button
                              id={`dates-event-${ev.id}`}
                              onClick={() => { setSelectedEvent(ev); setDatesModalOpen(true); }}
                              title="Update dates"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
                            >
                              <CalendarDays className="w-3.5 h-3.5" />
                            </button>
                            <button
                              id={`delete-event-${ev.id}`}
                              onClick={() => handleDeleteEvent(ev)}
                              disabled={deletingEvent}
                              title="Delete"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── Categories Grid ────────────────────────────── */}
        {activeTab === "categories" && (
          <div>
            {catLoading ? (
              <div className="p-12 text-center text-gray-500 dark:text-gray-400">Loading categories…</div>
            ) : categories.length === 0 ? (
              <div className="p-12 text-center">
                <Tag className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No categories yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg shrink-0">
                        <Tag className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex gap-1 ml-auto">
                        <button
                          id={`edit-cat-${cat.id}`}
                          onClick={() => { setEditingCat(cat); setCatModalOpen(true); }}
                          title="Edit"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          id={`delete-cat-${cat.id}`}
                          onClick={() => handleDeleteCategory(cat)}
                          disabled={deletingCat}
                          title="Delete"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{cat.name}</h3>
                      {cat.description ? (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{cat.description}</p>
                      ) : (
                        <p className="mt-1 text-sm text-gray-400 italic">No description</p>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-auto">
                      {events.filter((e) => e.categoryId === cat.id).length} event(s)
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Modals ─────────────────────────────────────── */}
        <CategoryModal
          isOpen={catModalOpen}
          onClose={() => { setCatModalOpen(false); setEditingCat(null); }}
          onSubmit={handleCategorySubmit}
          category={editingCat}
          isLoading={creatingCat || renamingCat || updatingCatDesc}
        />

        <CreateEventModal
          isOpen={createEventOpen}
          onClose={() => setCreateEventOpen(false)}
          onSubmit={handleCreateEvent}
          categories={categories}
          isLoading={creatingEvent}
        />

        {selectedEvent && (
          <>
            <RenameEventModal
              isOpen={renameEventOpen}
              onClose={() => { setRenameEventOpen(false); setSelectedEvent(null); }}
              currentName={selectedEvent.name}
              onSubmit={handleRenameEvent}
              isLoading={renamingEvent}
            />
            <UpdateKeywordsModal
              isOpen={kwModalOpen}
              onClose={() => { setKwModalOpen(false); setSelectedEvent(null); }}
              currentKeywords={selectedEvent.keyWords}
              onSubmit={handleUpdateKeywords}
              isLoading={updatingKeywords}
            />
            <UpdateDatesModal
              isOpen={datesModalOpen}
              onClose={() => { setDatesModalOpen(false); setSelectedEvent(null); }}
              event={selectedEvent}
              onSubmit={handleUpdateDates}
              isLoading={updatingDates}
            />
          </>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default EventsManagement;
