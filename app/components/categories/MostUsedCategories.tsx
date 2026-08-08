import React from "react";

export function MostUsedCategories() {
  const items = [
    {
      rank: "🥇",
      name: "Workshop",
      events: "12 events",
      color: "#5A10A5",
    },
    {
      rank: "🥈",
      name: "Bootcamp",
      events: "10 events",
      color: "#059669",
    },
    {
      rank: "🥉",
      name: "Competition",
      events: "8 events",
      color: "#4460EF",
    },
  ];

  return (
    <div className="bg-white border border-purple-100/80 rounded-2xl p-5 shadow-2xs space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-base">🎗</span>
        <h3 className="font-extrabold text-sm text-gray-900">
          Most Used Categories
        </h3>
      </div>

      <div className="space-y-3.5">
        {items.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-base shrink-0">{item.rank}</span>
              <div>
                <p className="font-bold text-xs text-gray-900 leading-tight">
                  {item.name}
                </p>
                <p className="text-[11px] text-gray-400 font-medium">
                  {item.events}
                </p>
              </div>
            </div>

            <div className="w-12 h-1.5 rounded-full bg-gray-100 overflow-hidden shrink-0">
              <div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color, width: "100%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MostUsedCategories;
