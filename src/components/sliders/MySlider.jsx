import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import CommonButton from "../common/CommonButton";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const MySlider = () => {
  const mySlider = useRef();
  var center = {
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    pauseOnHover: false,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="py-5">
      <div className="container">
        <Link to="/homepage">
          <CommonButton linkButton={"Back"} className={"mb-4"} />
        </Link>
        <h2 className="text-center fs-1 mb-5">SLICK SLIDER</h2>
        <div className="position-relative">
          <Slider {...center} ref={mySlider}>
            <div className="d-flex justify-content-center align-items-center">
              <div className="swiper_box d-flex justify-content-center align-items-center bg-black text-white rounded">
                {" "}
                slide 1
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <div className="swiper_box d-flex justify-content-center align-items-center bg-secondary text-white rounded">
                {" "}
                slide 2
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <div className="swiper_box d-flex justify-content-center align-items-center bg-danger text-white rounded">
                {" "}
                slide 3
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <div className="swiper_box d-flex justify-content-center align-items-center bg-warning text-white rounded">
                {" "}
                slide 4
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <div className="swiper_box d-flex justify-content-center align-items-center bg-success text-white rounded">
                {" "}
                slide 5
              </div>
            </div>
          </Slider>
          <button
            className="slick_prev_abs bg-transparent border-0"
            onClick={() => mySlider?.current?.slickPrev()}
          >
            <FaArrowCircleLeft className="fs-2" />
          </button>
          <button
            className="slick_next_abs bg-transparent border-0"
            onClick={() => mySlider?.current?.slickNext()}
          >
            <FaArrowCircleRight className="fs-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MySlider;
