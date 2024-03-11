import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import { Link } from "react-router-dom";
import CommonButton from "../common/CommonButton";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const SwiperSlider = () => {
  return (
    <>
      <div className="container py-5">
        <Link to="/homepage">
          {" "}
          <CommonButton linkButton={"Back"} className={"mb-4"} />
        </Link>
        <div className="position-relative">
          <div className="slick_next_abs image-swiper-button-next cursor_pointer z-3">
            <FaArrowAltCircleRight className="fs-4" />
          </div>
          <div className="slick_prev_abs image-swiper-button-prev cursor_pointer z-3">
            <FaArrowAltCircleLeft className="fs-4" />
          </div>
          <Swiper
            navigation={{
              nextEl: ".image-swiper-button-next",
              prevEl: ".image-swiper-button-prev",
              // disabledClass: "swiper-button-disabled",
            }} //for right left arrows
            pagination={{
              clickable: true,
            }} //for dots
            mousewheel={true} //mousescroll slider remove next and preview
            keyboard={true}
            // autoplay={{
            //   delay: 2500,
            //   disableOnInteraction: true,
            // }}
            loop={true} // for infinite scroll
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
            }} // for responsive layout
            modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="d-flex justify-content-center align-items-center">
                <div className="my-5 d-flex justify-content-center align-items-center rounded-3 border-black border swiper_box bg-black text-white">
                  Slide 1
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="d-flex justify-content-center align-items-center">
                <div className="my-5 d-flex justify-content-center align-items-center rounded-3 border-black border swiper_box bg-body-secondary">
                  Slide 2
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="d-flex justify-content-center align-items-center">
                <div className="my-5 d-flex justify-content-center align-items-center rounded-3 border-black border swiper_box bg-body-tertiary">
                  Slide 3
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="d-flex justify-content-center align-items-center">
                <div className="my-5 d-flex justify-content-center align-items-center rounded-3 border-black border swiper_box bg-danger">
                  Slide 4
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="d-flex justify-content-center align-items-center">
                <div className="my-5 d-flex justify-content-center align-items-center rounded-3 border-black border swiper_box bg-danger-subtle">
                  Slide 5
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="d-flex justify-content-center align-items-center">
                <div className="my-5 d-flex justify-content-center align-items-center rounded-3 border-black border swiper_box bg-dark text-danger">
                  Slide 6
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="d-flex justify-content-center align-items-center">
                <div className="my-5 d-flex justify-content-center align-items-center rounded-3 border-black border swiper_box bg-dark-subtle">
                  Slide 7
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="d-flex justify-content-center align-items-center">
                <div className="my-5 d-flex justify-content-center align-items-center rounded-3 border-black border swiper_box bg-gradient">
                  Slide 8
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="d-flex justify-content-center align-items-center">
                <div className="my-5 d-flex justify-content-center align-items-center rounded-3 border-black border swiper_box bg-info">
                  Slide 9
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};
export default SwiperSlider;
