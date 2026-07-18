import { useState, type MouseEvent } from "react";
import CommitteesSwipper from "./CommitteeSwipper";
import CommitteeToggleButton from "./CommitteeToggleButton";
import type { Committee } from "~/types";
import { Swiper, SwiperSlide } from "swiper/react";
import CommitteeCardSkeleton from "./CommitteeCardSkeleton";

interface IProps {
  committees: Committee[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

const CommitteesSection = ({
  committees,
  isLoading,
  isError,
  error,
}: IProps) => {
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
    "data analysis",
  ];

  const technical = committees.filter((c) =>
    technicalNames.some((name) => c.name.toLowerCase().includes(name)),
  );

  const operational = committees.filter(
    (c) => !technicalNames.some((name) => c.name.toLowerCase().includes(name)),
  );
  if (isLoading) {
    return (
      <div className="flex gap-6">
        {Array.from({ length: 8 }, (_, idx) => (
          <SwiperSlide
            key={idx}
            className="flex! justify-center! items-center!"
          >
            <CommitteeCardSkeleton />
          </SwiperSlide>
        ))}
      </div>
    );
  }
  if (isError) {
    console.log(error);

    return (
      <div className="flex justify-center items-center text-red-500">
        {error?.message || "Failed to load committees."}
      </div>
    );
  }
  console.log(committees);
  
  return (
    <div>
      {/* BUTTONS========================================= */}
      <CommitteeToggleButton
        commmitteList={commmitteList}
        handleChange={handleChange}
      />
      {/* BUTTONS========================================= */}

      {/* COMMITTEES========================================= */}
      {commmitteList === "technicalcommittees" && technical.length === 0 ? (
        <div className="flex justify-center items-center py-12 text-gray-500">
          No technical committees found.
        </div>
      ) : commmitteList === "operationalcommittees" &&
        operational.length === 0 ? (
        <div className="flex justify-center items-center py-12 text-gray-500">
          No operational committees found.
        </div>
      ) : (
        <CommitteesSwipper
          data={
            commmitteList === "technicalcommittees" ? technical : operational
          }
        />
      )}

      {/* COMMITTEES========================================= */}
    </div>
  );
};

export default CommitteesSection;
