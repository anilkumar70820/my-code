import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import CommonButton from "./CommonButton";

const MySlider = () => {
  var center = {
    centerMode: true,
    centerPadding: "60px",
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    pauseOnHover: false,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="py-5">
      <div className="container">
        <Link to="/homepage">
        <CommonButton
            linkButton={"Back"}
            className={"mb-4"}
          />
        </Link>
        <h2 className="text-center fs-1 mb-5">SLICK SLIDER</h2>
        <Slider {...center}>
          <div className="'d-flex justify-content-center align-items-center">
            <div className="swiper_box d-flex justify-content-center align-items-center bg-black text-white rounded">
              {" "}
              slide 1
            </div>
          </div>
          <div className="'d-flex justify-content-center align-items-center">
            <div className="swiper_box d-flex justify-content-center align-items-center bg-secondary text-white rounded">
              {" "}
              slide 1
            </div>
          </div>
          <div className="'d-flex justify-content-center align-items-center">
            <div className="swiper_box d-flex justify-content-center align-items-center bg-bla text-white rounded">
              {" "}
              slide 1
            </div>
          </div>
          <div className="'d-flex justify-content-center align-items-center">
            <div className="swiper_box d-flex justify-content-center align-items-center bg-black text-white rounded">
              {" "}
              slide 1
            </div>
          </div>
          <div className="'d-flex justify-content-center align-items-center">
            <div className="swiper_box d-flex justify-content-center align-items-center bg-black text-white rounded">
              {" "}
              slide 1
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default MySlider;
