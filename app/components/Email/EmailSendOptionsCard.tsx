import React from "react";
import { Send, Clock } from "lucide-react";

interface EmailSendOptionsCardProps {
  sendOption: "now" | "schedule";
  onOptionChange: (option: "now" | "schedule") => void;
}

export const EmailSendOptionsCard: React.FC<EmailSendOptionsCardProps> = ({
  sendOption,
  onOptionChange,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
        SEND OPTIONS
      </h3>

      <div className="inline-flex p-1 bg-gray-100/80 rounded-2xl border border-gray-200">
        <button
          type="button"
          onClick={() => onOptionChange("now")}
          className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            sendOption === "now"
              ? "bg-[#5A10A5] text-white shadow-md"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send Now</span>
        </button>

        <button
          type="button"
          onClick={() => onOptionChange("schedule")}
          className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            sendOption === "schedule"
              ? "bg-[#5A10A5] text-white shadow-md"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Schedule</span>
        </button>
      </div>
    </div>
  );
};
