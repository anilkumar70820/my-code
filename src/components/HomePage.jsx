import React from "react";
import { Link } from "react-router-dom";
import CommonButton from "./CommonButton";

const HomePage = () => {
  return (
    <>
      <div className="d-flex flex-wrap gap-4 container my-5">
        <Link to="/accordian">
          <CommonButton linkButton={"Accordian"} />
        </Link>
        <Link className="cursor_block" to="/audioplayer">
          <CommonButton linkButton={"Audio Player"} />
        </Link>
        <Link to="/countdown">
        <CommonButton linkButton={"Countdown Timer"}/>
        </Link>
        <Link to="/darkmode">
        <CommonButton linkButton={"Dark Mode"}/>
        </Link>
        <Link to="/emailjs">
        <CommonButton linkButton={"Email Js"}/>
        </Link>
        <Link to="/formvalidation">
        <CommonButton linkButton={"Form Validation"}/>
        </Link>
        <Link to="/realtimedatabase">
        <CommonButton linkButton={"Realtime Database"}/>
        </Link>
        <Link to="/firestoredatabase">
        <CommonButton linkButton={"Firestore Database"}/>
        </Link>
        <Link to="/firebaseauthentication">
        <CommonButton linkButton={"Firebase Authentication"}/>
        </Link>
        <Link to="/googlemap">
        <CommonButton linkButton={"Google Map"}/>
        </Link>
        <Link to="/gsap">
        <CommonButton linkButton={"Gsap"}/>
        </Link>
        <Link to="/inputfile">
        <CommonButton linkButton={"Input Type"}/>
        </Link>
        <Link to="/map">
        <CommonButton linkButton={"Map Function"}/>
        </Link>
        <Link to="/navbar">
         <CommonButton linkButton={"Nav Bar"}/>
        </Link>
        <Link to="/nestedmap">
        <CommonButton linkButton={"Nested Map"}/>
        </Link>
        <Link to="/parallaxeffect">
        <CommonButton linkButton={"Parallax Effect"}/>
        </Link>
        <Link to="/slickslider">
        <CommonButton linkButton={"Slick Slider"}/>
        </Link>
        <Link to="/swiperslider">
        <CommonButton linkButton={"Swiper Slider"}/>
        </Link>
        <Link to="/tickerslider">
        <CommonButton linkButton={"Ticker Slider"}/>
        </Link>
        <Link to="/todolist">
        <CommonButton linkButton={"To Do List"}/>
        </Link>
        <Link to="/typewriter">
        <CommonButton linkButton={"Type Writer Effect"}/>
        </Link>
        <Link to="/videoplayer">
        <CommonButton linkButton={"Video Player"}/>
        </Link>
        <Link to="/practiceform">
        <CommonButton linkButton={"Practice Form Validation"}/>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
