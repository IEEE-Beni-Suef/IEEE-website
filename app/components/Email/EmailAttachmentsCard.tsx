import React, { useRef, useState } from "react";
import { Upload, FileText, X, Paperclip } from "lucide-react";
import toast from "react-hot-toast";

interface EmailAttachmentsCardProps {
  files?: File[];
  onFilesChange?: (files: File[]) => void;
}

export const EmailAttachmentsCard: React.FC<EmailAttachmentsCardProps> = ({
  files: externalFiles,
  onFilesChange,
}) => {
  const [internalFiles, setInternalFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const files = externalFiles || internalFiles;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = Array.from(e.target.files);
      const updated = [...files, ...selected];
      if (onFilesChange) onFilesChange(updated);
      else setInternalFiles(updated);
      toast.success(`Attached ${selected.length} file(s)`);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    if (onFilesChange) onFilesChange(updated);
    else setInternalFiles(updated);
    toast.success("File removed");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const dropped = Array.from(e.dataTransfer.files);
      const updated = [...files, ...dropped];
      if (onFilesChange) onFilesChange(updated);
      else setInternalFiles(updated);
      toast.success(`Attached ${dropped.length} file(s)`);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
        ATTACHMENTS
      </h3>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-indigo-100 hover:border-indigo-300 bg-indigo-50/40 rounded-2xl p-8 text-center transition-all duration-200 flex flex-col items-center justify-center space-y-3 cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept=".pdf,.docx,.png,.jpg,.jpeg"
        />

        <div className="w-12 h-12 rounded-2xl bg-indigo-100/70 text-[#4460EF] flex items-center justify-center shadow-2xs">
          <Upload className="w-6 h-6" />
        </div>

        <div>
          <p className="text-sm font-bold text-[#000640]">Drag & drop files here</p>
          <p className="text-xs text-gray-400 mt-0.5">PDF, DOCX, PNG, JPG</p>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="px-5 py-2 bg-[#4460EF] hover:bg-indigo-600 text-white font-semibold rounded-xl text-xs shadow-xs transition-all cursor-pointer"
        >
          Browse Files
        </button>
      </div>

      {/* Attached Files List */}
      {files.length > 0 && (
        <div className="space-y-2 pt-2">
          <p className="text-xs font-bold text-gray-400">Attached Files ({files.length}):</p>
          <div className="space-y-1.5">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs"
              >
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-4 h-4 text-[#5A10A5] flex-shrink-0" />
                  <span className="font-semibold text-[#000640] truncate">{file.name}</span>
                  <span className="text-gray-400 text-[10px]">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(idx)}
                  className="p-1 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
