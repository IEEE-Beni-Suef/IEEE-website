import { useState, type MouseEvent } from "react";
import CommitteesSwipper from "./CommitteeSwipper";
import CommitteeToggleButton from "./CommitteeToggleButton";
import type { Committee } from "~/types";

interface IProps {
  committees: Committee[];
}

const CommitteesSection = ({ committees }: IProps) => {
  const [commmitteList, setCommmitteList] = useState<
    "technicalcommittees" | "operationalcommittees"
  >("technicalcommittees");

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newCommmitteList: "technicalcommittees" | "operationalcommittees",
  ) => {
    if (newCommmitteList !== null) {
      setCommmitteList(newCommmitteList);
    }
  };

  // Categorize committees into technical and operational based on their names
  const technicalNames = [
    "backend", 
    "frontend", 
    "astronomy", 
    "power", 
    "embedded systems", 
    "gnc", 
    "ai", 
    "cybersecurity", 
    "data analysis"
  ];
  
  const technical = committees.filter(c => 
    technicalNames.some(name => c.name.toLowerCase().includes(name))
  );
  
  const operational = committees.filter(c => 
    !technicalNames.some(name => c.name.toLowerCase().includes(name))
  );

  return (
    <div className="w-screen md:px-10 my-25 " id="committees">
      <div className=" flex flex-col items-center justify-center space-y-5">
        {/* HEADER========================================= */}
        <div className="w-36.75 h-8.25 flex justify-center items-center bg-[#CCB5E3] text-[#5A10A5] rounded-[20px] text-[11px] font-semibold">
          The Heart Of IEEE
        </div>
        {/* HEADER========================================= */}

        {/* TITLE========================================= */}
        <h1 className="font-bold text-5xl text-[#0E2C5E] text-center">
          Explore Our <span className="text-[#5A10A5]">Committees</span>
        </h1>
        {/* TITLE========================================= */}

        {/* DESCROPTION========================================= */}
        <p className="w-full md:w-154.5 font-medium text-[18px] text-[#4460EF] text-center">
          Join a specialized community where students push the boundaries of
          technology and leadership. Chooese your path and start building the
          future today.
        </p>
        {/* DESCROPTION========================================= */}

        {/* BUTTONS========================================= */}
        <CommitteeToggleButton commmitteList={commmitteList} handleChange={handleChange}/>
        {/* BUTTONS========================================= */}

        {/* COMMITTEES========================================= */}
        <CommitteesSwipper 
          data={commmitteList === "technicalcommittees" ? technical : operational}
        />
        {/* COMMITTEES========================================= */}
      </div>
    </div>
  );
};

export default CommitteesSection;
