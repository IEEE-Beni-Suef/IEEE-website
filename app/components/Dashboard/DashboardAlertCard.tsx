import React from "react";

interface DashboardAlertCardProps {
  icon: React.ReactNode;
  text: string;
  cardBackground?: string;
  iconBackground?: string;
  iconColor?: string;
  textColor?: string;
  borderClassName?: string;
  className?: string;
  onClick?: () => void;
}

export const DashboardAlertCard: React.FC<DashboardAlertCardProps> = ({
  icon,
  text,
  cardBackground = "bg-white",
  iconBackground = "bg-white/10",
  iconColor = "text-gray-600",
  textColor = "text-gray-900",
  borderClassName = "border border-gray-100",
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${cardBackground} ${borderClassName}  ${className}`.trim()}
    >
      <div
        className={`p-2.5 rounded-xl shrink-0 ${iconBackground} ${iconColor}`}
      >
        {icon}
      </div>
      <p className={`text-xs font-bold ${textColor}`}>{text}</p>
    </div>
  );
};

export default DashboardAlertCard;
