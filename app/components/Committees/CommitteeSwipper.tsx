import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "./customSwipper.css"
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import CommitteeCard from "./CommitteeCard";
import type { Committee } from "~/types";


interface IProps {
  data: Committee[];
}

const CommitteesSwipper = ({ data }: IProps) => {
  // ** Renders

  const listToRender = data;

  return (
    <div className="relative w-full px-2 md:px-10 py-8">
      <style>{`
        .swiper-button-next, .swiper-button-prev {
          background-color: #F1F5F9;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          color: #1E1E2F;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 18px;
          font-weight: 800;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background-color: #E2E8F0;
        }
        /* Hide default swiper arrows if we want custom ones, but here we style the default */
      `}</style>
      <Swiper
        modules={[Navigation]}
        navigation={true}
        spaceBetween={24}
        className="w-full py-4 px-2"
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
            className="flex justify-center items-center h-auto"
          >
            <CommitteeCard committee={committe} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CommitteesSwipper;
