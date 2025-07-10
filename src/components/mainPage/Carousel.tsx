import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import ThisWeekSlider from "./ThisWeekSlider";

const Carousel = () => {
    return (
        <>
        <Swiper
        className="w-[335px] h-[178px] rounded-[10px] overflow-hidden mt-[26px]"
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        >
            <SwiperSlide> <ThisWeekSlider /></SwiperSlide>
            <SwiperSlide> <ThisWeekSlider /></SwiperSlide>
            <SwiperSlide> <ThisWeekSlider /></SwiperSlide>
        </Swiper>
 
        </>
    )
};

export default Carousel;