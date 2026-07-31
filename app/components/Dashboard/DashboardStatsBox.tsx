import React from "react";

interface DashboardStatsBoxProps {
  icon: React.ReactNode;
  iconBackground: string;
  iconColor: string;
  title: string;
  number: string | number;
  subText: string;
  chartColor: string;
  chartData: number[];
  onClick?: () => void;
}

export const DashboardStatsBox: React.FC<DashboardStatsBoxProps> = ({
  icon,
  iconBackground,
  iconColor,
  title,
  number,
  subText,
  chartColor,
  chartData,
  onClick,
}) => {
  // Generate SVG path for mini sparkline chart
  const max = Math.max(...chartData, 1);
  const min = Math.min(...chartData, 0);
  const range = max - min || 1;
  const width = 200;
  const height = 40;

  const points = chartData
    .map((val, idx) => {
      const x = (idx / (chartData.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(" ");

  const fillPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <div
      onClick={onClick}
      className="bg-white border border-[#00064012] rounded-2xl shadow-[0px_1px_4px_0px_#0006400F]
       p-5 cursor-pointer duration-200 flex flex-col  justify-between group"
    >
      <div
        className={`p-3 mb-2 rounded-2xl w-fit ${iconBackground} ${iconColor} transition-transform `}
      >
        {icon}
      </div>
      <div className="text-3xl font-extrabold text-[#000640]  mt-1 transition-colors">
        {number}
      </div>
      <p className="text-xs font-semibold text-[#000640]  capitalize tracking-wider">
        {title}
      </p>
      <p className="text-xs font-medium text-[#6C757D]  mt-1">{subText}</p>

      <div className="mt-4 pt-2">
        <svg
          className="w-full h-10 overflow-visible"
          viewBox={`0 0 ${width} ${height}`}
        >
          <defs>
            <linearGradient
              id={`grad-${title.replace(/\s+/g, "")}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor={chartColor} stopOpacity="0.25" />
              <stop offset="100%" stopColor={chartColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <polygon
            points={fillPoints}
            fill={`url(#grad-${title.replace(/\s+/g, "")})`}
          />
          <polyline
            fill="none"
            stroke={chartColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>
      </div>
    </div>
  );
};

export default DashboardStatsBox;
