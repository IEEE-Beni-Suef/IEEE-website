import React from "react";

export const EmailAnalyticsCard: React.FC = () => {
  const metrics = [
    {
      label: "Delivery Rate",
      value: "98%",
      percentage: 98,
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
    },
    {
      label: "Open Rate",
      value: "82%",
      percentage: 82,
      color: "bg-blue-600",
      textColor: "text-blue-600",
    },
    {
      label: "Click Rate",
      value: "61%",
      percentage: 61,
      color: "bg-[#5A10A5]",
      textColor: "text-[#5A10A5]",
    },
    {
      label: "Bounce Rate",
      value: "1%",
      percentage: 1,
      color: "bg-red-500",
      textColor: "text-red-500",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
      <div>
        <h3 className="text-base font-bold text-[#000640]">Analytics</h3>
        <p className="text-xs text-[#6C757D]">Last 30 days</p>
      </div>

      <div className="space-y-4 pt-1">
        {metrics.map((item) => (
          <div key={item.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-gray-700">{item.label}</span>
              <span className={`font-bold ${item.textColor}`}>{item.value}</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
