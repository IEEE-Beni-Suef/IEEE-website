import React from "react";
import { Sparkles } from "lucide-react";

export function NewestCategory() {
  return (
    <div className="bg-gradient-to-r from-[#5A10A5] to-[#4460EF] rounded-2xl p-5 text-white shadow-md space-y-3 relative overflow-hidden">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-purple-200" />
        <h3 className="font-extrabold text-sm text-white">Newest Category</h3>
      </div>

      <p className="text-xs text-purple-100/90 leading-relaxed">
        Online live sessions and virtual events accessible to remote members.
      </p>

      <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs font-semibold text-white/90">
        <span>Created: May 5, 2026</span>
        <span>Events: 1</span>
      </div>
    </div>
  );
}

export default NewestCategory;
