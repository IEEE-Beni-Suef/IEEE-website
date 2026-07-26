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
    <div className="relative w-full px-2 md:px-12 py-8 bg-transparent">
      <style>{`
        .committees-swiper {
          overflow: hidden !important;
          width: 100% !important;
          padding: 12px 4px !important;
        }
        .committees-swiper .swiper-wrapper {
          align-items: stretch;
        }
        .committees-swiper .swiper-slide {
          height: auto;
          display: flex;
        }
        .swiper-button-next, .swiper-button-prev {
          background-color: #FFFFFF;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          color: #1E1E2F;
          border: 1px solid #E2E8F0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transition: all 0.2s ease-in-out;
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 16px;
          font-weight: 800;
          color: #1E1E2F;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background-color: #F8F9FF;
          border-color: #5A10A5;
          color: #5A10A5;
          transform: scale(1.05);
        }
        .swiper-button-prev {
          left: 0px !important;
        }
        .swiper-button-next {
          right: 0px !important;
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
