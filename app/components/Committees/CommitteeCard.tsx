import { MoveRight } from "lucide-react";
import type { ICommittee } from "~/types";

interface IProps {
  committee: ICommittee;
}

const CommitteeCard = ({ committee }: IProps) => {
  const { title, description, img } = committee;
  return (
    <div className="h-133 w-xs flex flex-col justify-evenly bg-[#FEFEFF] rounded-2xl px-4 border border-[#CCB5E3] ">
      <div className="w-full h-64 rounded-2xl truncate">
        <img className="w-full h-full" src={img} alt="" />
      </div>
      <h2 className="font-semibold text-xl text-[#000640] capitalize">
        {title}
      </h2>
      <p className="text-[16px] text-[#6C757D] font-medium">{description}</p>
      <div className="flex space-x-2.5 items-center cursor-pointer">
        <p className="text-[#5A10A5] font-semibold text-[14px] ">Learn More</p>
        <MoveRight size={20} color="#5A10A5" />
      </div>
    </div>
  );
};

export default CommitteeCard;
