import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CommitteeCard from "./CommitteeCard";
import type { Committee } from "~/types";

interface IProps {
  data: Committee[];
}

const CommitteesSwipper = ({ data }: IProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative w-full px-4 md:px-10 py-8 bg-transparent">
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
      `}</style>

      {/* Side navigation arrows matching Ambassadors section */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous Committee"
        className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-purple-200 text-[#5A10A5] flex items-center justify-center shadow-md hover:bg-[#5A10A5] hover:text-white hover:border-[#5A10A5] active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next Committee"
        className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-purple-200 text-[#5A10A5] flex items-center justify-center shadow-md hover:bg-[#5A10A5] hover:text-white hover:border-[#5A10A5] active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        key={data.map((c) => c.id).join("-")}
        modules={[Autoplay]}
        loop={true}
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
