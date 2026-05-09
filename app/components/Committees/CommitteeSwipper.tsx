import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "./customSwipper.css"
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { opCommittees, teCommittees } from "~/data";
import CommitteeCard from "./CommitteeCard";


interface IProps {
  committeeList: "technicalcommittees" | "operationalcommittees";
}

const CommitteesSwipper = ({ committeeList }: IProps) => {
  // ** Renders

  const listToRender =
    committeeList === "technicalcommittees" ? teCommittees : opCommittees;

  return (
    <Swiper
      modules={[Navigation]}
      navigation={true}
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
      {listToRender.map((committe) => (
        <SwiperSlide
          key={committe.id}
          className="flex! justify-center! items-center!"
        >
          <CommitteeCard committee={committe}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CommitteesSwipper;
