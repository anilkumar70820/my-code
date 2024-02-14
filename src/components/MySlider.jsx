import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import CommonButton from "./common/CommonButton";

const MySlider = () => {
  var center = {
    // centerMode: true,
    // centerPadding: "60px",
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
        <Slider {...center}>
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
      </div>
    </div>
  );
};

export default MySlider;
