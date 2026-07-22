import { type ReactNode } from "react";

interface IProps {
  icon: ReactNode;
  iconBackground: string;
  title: string;
  number: number | ReactNode;
  subText: string;
  subTextColor: string;
  extraButtonText?: string;
  extraButtonBackground?: string;
  extraButtonColor?: string;
  onExtraButtonClick?: () => void;
}

const UserStatsCard = ({
  number,
  icon,
  iconBackground,
  subText,
  subTextColor,
  title,
  extraButtonBackground,
  extraButtonText,
  extraButtonColor,
  onExtraButtonClick,
}: IProps) => {
  return (
    <div className="h-43 flex flex-col space-y-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex-shrink-0">
        {extraButtonText ? (
          <div className="w-full flex justify-between items-center h-8">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center`}
              style={{ background: iconBackground }}
            >
              {icon}
            </div>
            <button
              style={{ background: extraButtonBackground }}
              className={`flex justify-center items-center h-5 capitalize  px-2 py-2 font-bold text-[16px] rounded-2xl text-[#B45309] `}
              onClick={onExtraButtonClick}
            >
              {extraButtonText}
            </button>
          </div>
        ) : (
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center`}
            style={{ background: iconBackground }}
          >
            {icon}
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-[#000640]">{number}</p>
      <p className="text-sm font-medium text-[#000640]">{title}</p>
      <p className={`text-[12px] font-medium text-[${subTextColor}]`}>
        {subText}
      </p>
    </div>
  );
};

export default UserStatsCard;
