import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import { useContext } from "react";
// import { UseContextData } from "./components/UseContextData";
import ToDoList from "./components/js-components/ToDoList";
import ParalexEffect from "./components/effects/ParalexEffect";
import FormValidation from "./components/forms/FormValidation";
import NestedMap from "./components/others-components/NestedMap";
import AudioPlayer from "./components/media/AudioPlayer";
import SwiperSlider from "./components/sliders/SwiperSlider";
import CSSTicker from "./components/sliders/CSSTicker";
import TypeWriter from "./components/effects/TypeWriter";
import HomePage from "./components/HomePage";
import GsapPage from "./components/effects/GsapPage";
import DarkMode from "./components/effects/DarkMode";
import VideoPlayer from "./components/media/VideoPlayer";
import EmailJs from "./components/forms/EmailJs";
import GoogleMap from "./components/others-components/GoogleMap";
import UseStateNav from "./components/nav-bar/UseStateNav";
import CardMapUse from "./components/others-components/CardMapUse";
import CountDown from "./components/js-components/CountDown";
// import Preloader from "./components/common/Preloader";
import CustomAccordian from "./components/faqs/CustomAccordian";
import InputFile from "./components/forms/InputFile";
import NewForm from "./components/forms/NewForm";
import MySlider from "./components/sliders/MySlider";
import FireStore from "./components/firebase_database/FireStore";
import RealtimeDatabase from "./components/firebase_database/RealtimeDatabase";
import FirebaseAuthentication from "./components/firebase_database/FirebaseAuthentication";
import Filter from "./components/others-components/Filter";
import ApiFetch from "./components/others-components/ApiFetch";
import CssSlider from "./components/sliders/CssSlider";
import CommonPoints from "./components/common/CommonPoints";
function App() {
  // const { arr, newObj, show, setShow } = useContext(UseContextData);
  // console.log(arr, newObj)
  // const [preloader, setPreloader] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setPreloader(false);
  //     document.body.classList.remove("overflow-hidden");
  //   }, 3000);
  //   document.body.classList.add("overflow-hidden");
  // }, []);
  return (
    <div>
      {/* {preloader && <Preloader />} */}
      {/* {show ? <h2 className='ms-5 mt-5 mb-4'>THIS IS DEFAULT</h2>
        :
        <h2 className='ms-5 mt-5 mb-4'>THIS IS ONCLICK</h2>}
      <button className='z-3 py-3 px-4 bg-black ms-5 text-white fw-bold fs-2 rounded-4 border-0' onClick={() => setShow(false)}>click</button>
      <button className='mb-5 py-3 px-4 bg-black ms-5 text-white fw-bold fs-2 rounded-4 border-0' onClick={() => setShow(true)}>click again</button> */}
      <Routes>
        <Route path="/" element={<FirebaseAuthentication />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/typewriter" element={<TypeWriter />} />
        <Route path="/tickerslider" element={<CSSTicker />} />
        <Route path="/swiperslider" element={<SwiperSlider />} />
        <Route path="/formvalidation" element={<FormValidation />} />
        <Route path="/nestedmap" element={<NestedMap />} />
        <Route path="/todolist" element={<ToDoList />} />
        <Route path="/parallaxeffect" element={<ParalexEffect />} />
        <Route path="/gsap" element={<GsapPage />} />
        <Route path="/darkmode" element={<DarkMode />} />
        <Route path="/videoplayer" element={<VideoPlayer />} />
        <Route path="/audioplayer" element={<AudioPlayer />} />
        <Route path="/emailjs" element={<EmailJs />} />
        <Route path="/googlemap" element={<GoogleMap />} />
        <Route path="/navbar" element={<UseStateNav />} />
        <Route path="/map" element={<CardMapUse />} />
        <Route path="/countdown" element={<CountDown />} />
        <Route path="/accordian" element={<CustomAccordian />} />
        <Route path="/inputfile" element={<InputFile />} />
        <Route path="/firestoredatabase" element={<FireStore />} />
        <Route path="/realtimedatabase" element={<RealtimeDatabase />} />
        <Route path="slickslider" element={<MySlider />} />
        <Route
          path="/firebaseauthentication"
          element={<FirebaseAuthentication />}
        />
        <Route path="/practiceform" element={<NewForm />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/apifetch" element={<ApiFetch />} />
        <Route path="/cssslider" element={<CssSlider />} />
        <Route path="/commonpoints" element={<CommonPoints />} />
      </Routes>
    </div>
  );
}

export default App;
