import React, { useState, useEffect } from "react";
import { X, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import { createEventSchema } from "~/utils/schemas";
import type { CreateEventFormData } from "~/utils/schemas";
import type { ApiCategory } from "~/types/api.types";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateEventFormData) => void;
  categories: ApiCategory[];
  isLoading?: boolean;
}

const EMPTY_FORM: CreateEventFormData & {
  description?: string;
  location?: string;
  speaker?: string;
  capacity?: number;
} = {
  name: "",
  keyWords: ["AI", "Workshop"],
  startDate: "",
  endDate: "",
  isCommingSoon: false,
  categoryId: "",
  description: "",
  location: "Faculty of Computers",
  speaker: "Dr. Ahmed Hassan",
  capacity: 250,
};

const toIso = (value: string): string | null =>
  value ? new Date(value).toISOString() : null;

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  categories,
  isLoading = false,
}) => {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState(EMPTY_FORM);
  const [kwInput, setKwInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setForm(EMPTY_FORM);
      setKwInput("");
      setErrors({});
      setShowSuccessOverlay(false);
    }
  }, [isOpen]);

  const set = <K extends keyof typeof EMPTY_FORM>(
    field: K,
    value: (typeof EMPTY_FORM)[K]
  ) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const addKeyword = () => {
    const kw = kwInput.trim();
    if (!kw || form.keyWords.includes(kw) || form.keyWords.length >= 10) return;
    set("keyWords", [...form.keyWords, kw]);
    setKwInput("");
  };

  const removeKeyword = (kw: string) =>
    set(
      "keyWords",
      form.keyWords.filter((k) => k !== kw)
    );

  const handleNextStep = () => {
    if (step === 1) {
      if (!form.name.trim()) {
        setErrors((e) => ({ ...e, name: "Event name is required" }));
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const pendingKw = kwInput.trim();
    const finalKeywords =
      pendingKw && !form.keyWords.includes(pendingKw)
        ? [...form.keyWords, pendingKw]
        : form.keyWords;

    const payload = {
      name: form.name,
      keyWords: finalKeywords,
      startDate: toIso(form.startDate as string),
      endDate: toIso(form.endDate as string),
      isCommingSoon: form.isCommingSoon,
      categoryId: form.categoryId || (categories[0]?.id ?? ""),
    };

    const result = createEventSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      setStep(1);
      return;
    }

    onSubmit(result.data);
    setShowSuccessOverlay(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-3xl border border-purple-100 bg-white text-gray-900 p-6 sm:p-8 shadow-2xl transition-all relative">
        {/* Success Confirmation Overlay */}
        {showSuccessOverlay ? (
          <div className="py-10 px-4 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-500/30 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 max-w-xs leading-snug mb-8">
              You Have Successfully Created New Event
            </h3>
            <button
              type="button"
              onClick={() => {
                setShowSuccessOverlay(false);
                onClose();
              }}
              className="w-44 py-3 rounded-xl font-bold text-sm bg-[#5A10A5] text-white hover:bg-purple-700 shadow-md shadow-purple-500/20 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-start justify-between pb-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900">Create New Event</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Step {step} of 3 —{" "}
                  {step === 1
                    ? "Basic Info"
                    : step === 2
                    ? "Schedule & Location"
                    : "Review"}
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

            {/* Step Progress Bar */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step >= 1 ? "bg-[#5A10A5]" : "bg-gray-200"
                }`}
              />
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step >= 2 ? "bg-[#5A10A5]" : "bg-gray-200"
                }`}
              />
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step >= 3 ? "bg-[#5A10A5]" : "bg-gray-200"
                }`}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Event Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="e.g. AI Workshop 2025"
                      className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Committee <span className="text-red-500">*</span>
                      </label>
                      <select className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="">Select committee</option>
                        <option value="CS">Computer Society (CS)</option>
                        <option value="RAS">Robotics & Automation (RAS)</option>
                        <option value="WIE">Women in Engineering (WIE)</option>
                        <option value="PES">Power & Energy (PES)</option>
                        <option value="General">General</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.categoryId}
                        onChange={(e) => set("categoryId", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={form.description}
                      onChange={(e) => set("description", e.target.value)}
                      placeholder="Brief description of the event..."
                      className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Details */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Start Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={form.startDate as string}
                        onChange={(e) => set("startDate", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                        End Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={form.endDate as string}
                        onChange={(e) => set("endDate", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Location
                      </label>
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) => set("location", e.target.value)}
                        placeholder="e.g. Faculty of Computers"
                        className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Capacity
                      </label>
                      <input
                        type="number"
                        value={form.capacity}
                        onChange={(e) => set("capacity", Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Keywords
                    </label>
                    <div className="flex flex-wrap gap-2 p-2 rounded-xl border min-h-[42px] bg-purple-50/30 border-purple-100">
                      {form.keyWords.map((kw) => (
                        <span
                          key={kw}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700"
                        >
                          {kw}
                          <button
                            type="button"
                            onClick={() => removeKeyword(kw)}
                            className="hover:opacity-75"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        value={kwInput}
                        onChange={(e) => setKwInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addKeyword();
                          }
                        }}
                        placeholder="Add keyword + Enter"
                        className="flex-1 min-w-[120px] text-sm bg-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                    <h4 className="font-bold text-base text-gray-900 mb-3">
                      {form.name || "Untitled Event"}
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between border-b border-gray-100 pb-1.5">
                        <span className="text-gray-500">Committee</span>
                        <span className="font-semibold text-gray-900">CS</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-1.5">
                        <span className="text-gray-500">Category</span>
                        <span className="font-semibold text-gray-900">Workshop</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-1.5">
                        <span className="text-gray-500">Date</span>
                        <span className="font-semibold text-gray-900">Aug 1, 2025</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-1.5">
                        <span className="text-gray-500">Time</span>
                        <span className="font-semibold text-gray-900">6:00 PM</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-1.5">
                        <span className="text-gray-500">Location</span>
                        <span className="font-semibold text-gray-900">
                          {form.location || "Faculty of Computers"}
                        </span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-gray-500">Capacity</span>
                        <span className="font-semibold text-gray-900">
                          {form.capacity || 250} seats
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    Ready to publish — all required fields are filled.
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Cancel
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-xs bg-[#5A10A5] text-white hover:bg-purple-700 shadow-md shadow-purple-500/20 transition-all cursor-pointer"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-xs bg-[#5A10A5] text-white hover:bg-purple-700 shadow-md shadow-purple-500/20 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? "Publishing..." : "Continue ›"}
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateEventModal;
