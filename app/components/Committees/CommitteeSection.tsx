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
    c.name && technicalNames.some((name) => c.name.toLowerCase().includes(name)),
  );

  const operational = committees.filter(
    (c) => c.name && !technicalNames.some((name) => c.name.toLowerCase().includes(name)),
  );

  // Fallback: if filtering produces nothing, show all committees
  const currentList =
    commmitteList === "technicalcommittees"
      ? technical.length > 0 ? technical : committees
      : operational.length > 0 ? operational : committees;

  if (isLoading) {
    return (
      <Swiper
        className="w-full"
        breakpoints={{
          1: {
            slidesPerView: 1.1,
          },
          480: {
            slidesPerView: 1.5,
          },
          670: {
            slidesPerView: 2.2,
          },
          900: {
            slidesPerView: 3.2,
          },
          1200: {
            slidesPerView: 4.2,
          },
        }}
      >
        {Array.from({ length: 8 }, (_, idx) => (
          <SwiperSlide
            key={idx}
            className="flex! justify-center! items-center!"
          >
            <CommitteeCardSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
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

  if (!committees || committees.length === 0) {
    return (
      <div className="flex justify-center items-center text-gray-400 py-16">
        No committees available.
      </div>
    );
  }

  return (
    <div>
      {/* BUTTONS========================================= */}
      <CommitteeToggleButton
        commmitteList={commmitteList}
        handleChange={handleChange}
      />
      {/* BUTTONS========================================= */}

      {/* COMMITTEES========================================= */}
      <CommitteesSwipper data={currentList} />
      {/* COMMITTEES========================================= */}
    </div>
  );
};

export default CommitteesSection;

