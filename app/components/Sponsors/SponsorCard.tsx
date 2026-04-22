import type { ReactNode } from "react";
import { txtSlicer } from "~/utils/utile";

interface IProps {
  id: number;
  img: string;
  title: string;
  description: string;
  isActionLoading?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  children?: ReactNode
}

const SponsorCard = ({
  description,
  img,
  title,
  isActionLoading,
  onEdit,
  onDelete,
}: IProps) => {
  return (
    <div className="w-3xs h-60  bg-white rounded-4xl  flex flex-col justify-evenly items-center bt-0.5 shadow-[0px_2px_0px_#ABBED166]">
      <div className="h-24 w-48 rounded-lg truncate">
        <img className="w-full h-full" src={img} alt="" />
      </div>
      <div className="w-fit flex flex-col space-y-0.5">
        <h2 className="text-center font-bold text-xl">{txtSlicer(title, 15)}</h2>
        <p className="text-center p-0 text-[#364DBF]">
          {txtSlicer(description, 25)}
        </p>
      </div>
    </div>
  );
};

export default SponsorCard;
