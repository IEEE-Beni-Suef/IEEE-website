import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";
import CommitteeCard from "./CommitteeCard";
import type { Committee } from "~/types";

interface IProps {
  data: Committee[];
}

const CommitteesSwipper = ({ data }: IProps) => {
  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-2 md:px-10 py-8 overflow-hidden bg-white">
      <style>{`
        .committees-swiper {
          overflow: visible !important;
          width: 100% !important;
        }
        .committees-swiper .swiper-wrapper {
          align-items: stretch;
        }
        .committees-swiper .swiper-slide {
          height: auto;
          display: flex;
        }
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
      `}</style>

      <Swiper
        key={data.map((c) => c.id).join("-")}
        modules={[Navigation, Autoplay]}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        spaceBetween={24}
        className="committees-swiper w-full py-4"
        breakpoints={{
          1: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {data.map((committe, index) => (
          <SwiperSlide
            key={committe.id ?? index}
            className="!flex !justify-center !items-stretch min-w-0"
          >
            <CommitteeCard committee={committe} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CommitteesSwipper;
