import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import { useContext } from "react";
// import { UseContextData } from "./components/UseContextData";
import ToDoList from "./components/ToDoList";
import ParalexEffect from "./components/ParalexEffect";
import FormValidation from "./components/FormValidation";
import NestedMap from "./components/NestedMap";
import AudioPlayer from "./components/AudioPlayer";
import SwiperSlider from "./components/SwiperSlider";
import CSSTicker from "./components/CSSTicker";
import TypeWriter from "./components/TypeWriter";
import HomePage from "./components/HomePage";
import GsapPage from "./components/GsapPage";
import DarkMode from "./components/DarkMode";
import VideoPlayer from "./components/VideoPlayer";
import EmailJs from "./components/EmailJs";
import GoogleMap from "./components/GoogleMap";
import UseStateNav from "./components/UseStateNav";
import CardMapUse from "./components/CardMapUse";
import CountDown from "./components/CountDown";
import Preloader from "./components/Preloader";
import CustomAccordian from "./components/CustomAccordian";
import InputFile from "./components/InputFile";
import NewForm from "./components/NewForm";
import MySlider from "./components/MySlider";
import FireStore from "./components/firebase_database/FireStore";
import RealtimeDatabase from "./components/firebase_database/RealtimeDatabase";
import FirebaseAuthentication from "./components/firebase_database/FirebaseAuthentication";
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
      </Routes>
    </div>
  );
}

export default App;
