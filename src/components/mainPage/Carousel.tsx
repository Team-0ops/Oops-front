import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import ThisWeekSlider from "./ThisWeekSlider";
import LeftArrow from "../../assets/icons/CarouselLeftArrow.svg?react";
import RightArrow from "../../assets/icons/CarouselRightArrow.svg?react";

const Carousel = () => {
  return (
    <div className="w-full mt-[26px] flex flex-col items-center">
      {/* ✅ Swiper를 감싸는 상대 위치 div */}
      <div className="relative w-[335px]">
        <Swiper
          className="rounded-[10px] h-[178px]"
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={10}
          navigation={{
            nextEl: ".main-swiper-button-next",
            prevEl: ".main-swiper-button-prev",
          }}
          pagination={{
            el: ".main-swiper-pagination",
            clickable: true,
            bulletClass: "main-swiper-pagination-bullet",
            bulletActiveClass: "main-swiper-pagination-bullet-active",
          }}
        >
          <SwiperSlide>
            <ThisWeekSlider />
          </SwiperSlide>
          <SwiperSlide>
            <ThisWeekSlider />
          </SwiperSlide>
          <SwiperSlide>
            <ThisWeekSlider />
          </SwiperSlide>
        </Swiper>

        {/* ✅ 화살표 버튼 */}
        <div className="main-swiper-button-prev absolute top-1/2 -translate-y-1/2 left-2 z-10 cursor-pointer">
          <LeftArrow />
        </div>
        <div className="main-swiper-button-next absolute top-1/2 -translate-y-1/2 right-2 z-10 cursor-pointer">
          <RightArrow />
        </div>
      </div>

      {/* ✅ pagination: 슬라이더 외부 아래 8px 간격 */}
      <div className="swiper-pagination mt-[8px] flex justify-center" />
    </div>
  );
};

export default Carousel;
