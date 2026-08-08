import React from "react";
import {
  CheckCircle2,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Paperclip,
  Smile,
  Minus,
} from "lucide-react";
import toast from "react-hot-toast";

interface EmailComposeCardProps {
  subject: string;
  onSubjectChange: (val: string) => void;
  body: string;
  onBodyChange: (val: string) => void;
}

export const EmailComposeCard: React.FC<EmailComposeCardProps> = ({
  subject,
  onSubjectChange,
  body,
  onBodyChange,
}) => {
  const handleFormatText = (prefix: string, suffix: string = "") => {
    onBodyChange(`${body} ${prefix}Text${suffix} `);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-6">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-[#000640]">Compose Email</h2>
          <p className="text-xs text-[#6C757D]">Draft your broadcast message</p>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full flex items-center gap-1.5 text-xs text-[#4460EF] font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Auto-saved</span>
        </div>
      </div>

      {/* Subject Input */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
          SUBJECT
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          placeholder="Enter email subject..."
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#000640] outline-none focus:ring-2 focus:ring-[#5A10A5] transition-all"
        />
      </div>

      {/* Message Body Input */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
          MESSAGE BODY
        </label>
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
          {/* Rich Text Toolbar */}
          <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-100/70">
            <button
              type="button"
              onClick={() => handleFormatText("**", "**")}
              title="Bold"
              className="p-1.5 text-gray-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleFormatText("*", "*")}
              title="Italic"
              className="p-1.5 text-gray-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleFormatText("<u>", "</u>")}
              title="Underline"
              className="p-1.5 text-gray-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <Underline className="w-4 h-4" />
            </button>
            <span className="h-4 w-px bg-gray-300 mx-1" />
            <button
              type="button"
              onClick={() => handleFormatText("\n• ")}
              title="Bullet List"
              className="p-1.5 text-gray-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleFormatText("\n1. ")}
              title="Numbered List"
              className="p-1.5 text-gray-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <span className="h-4 w-px bg-gray-300 mx-1" />
            <button
              type="button"
              onClick={() => handleFormatText("[Link Text](https://example.com)")}
              title="Insert Link"
              className="p-1.5 text-gray-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleFormatText("![Image](url)")}
              title="Insert Image"
              className="p-1.5 text-gray-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => toast.success("Attachment picker opened")}
              title="Attachment"
              className="p-1.5 text-gray-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleFormatText("😊")}
              title="Emoji"
              className="p-1.5 text-gray-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <Smile className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleFormatText("\n---\n")}
              title="Divider"
              className="p-1.5 text-gray-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* Textarea */}
          <textarea
            value={body}
            onChange={(e) => onBodyChange(e.target.value)}
            rows={8}
            placeholder="Write your email here..."
            className="w-full p-4 bg-transparent text-sm text-[#000640] outline-none resize-y leading-relaxed font-sans"
          />
        </div>
      </div>
    </div>
  );
};
