import React from "react";

export function CategoryUsage() {
  const usageItems = [
    { name: "Workshop", events: 12, max: 12, color: "#5A10A5" },
    { name: "Bootcamp", events: 10, max: 12, color: "#059669" },
    { name: "Competition", events: 8, max: 12, color: "#4460EF" },
    { name: "Networking", events: 6, max: 12, color: "#EC4899" },
    { name: "Seminar", events: 5, max: 12, color: "#D97706" },
    { name: "Hackathon", events: 4, max: 12, color: "#EF4444" },
    { name: "Conference", events: 2, max: 12, color: "#06B6D4" },
    { name: "Webinar", events: 1, max: 12, color: "#8B5CF6" },
  ];

  return (
    <div className="w-full bg-white border border-purple-100/80 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6 mt-8">
      <div>
        <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-gray-900">
          Category Usage
        </h3>
        <p className="text-xs sm:text-sm font-medium text-gray-400 mt-0.5">
          Distribution of events across categories
        </p>
      </div>

      <div className="space-y-4">
        {usageItems.map((item) => {
          const percentage = Math.round((item.events / item.max) * 100);
          return (
            <div key={item.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                <span className="flex items-center gap-2 text-gray-900">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.name}
                </span>
                <span style={{ color: item.color }}>
                  {item.events} Events
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryUsage;
