import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CommonButton from "../common/CommonButton";

const CountDown = () => {
  // COUNTDOWN TIMER ==============
  const days = useRef();
  const hours = useRef();
  const minutes = useRef();
  const seconds = useRef();

  useEffect(() => {
    // Set the target date and time (adjust it according to your needs)
    const targetDate = new Date("2023-12-31T23:59:59").getTime();

    // Update the countdown timer every second
    const intervalId = setInterval(() => {
      // Get the current date and time
      const currentDate = new Date().getTime();

      // Calculate the time remaining
      const timeRemaining = targetDate - currentDate;

      // Calculate and update the days, hours, minutes, and seconds
      let daysValue = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      let hoursValue = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutesValue = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      let secondsValue = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      daysValue = String(daysValue).padStart(2, "0");
      hoursValue = String(hoursValue).padStart(2, "0");
      minutesValue = String(minutesValue).padStart(2, "0");
      secondsValue = String(secondsValue).padStart(2, "0");

      // Update the HTML elements with the calculated values
      if (days.current) days.current.textContent = daysValue;
      if (hours.current) hours.current.textContent = hoursValue;
      if (minutes.current) minutes.current.textContent = minutesValue;
      if (seconds.current) seconds.current.textContent = secondsValue;
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  // COUNTER ===============
  const [count, setCount] = useState(0);

  const decrease = () => {
    setCount(count - 1);
    if (count === 0) {
      setCount(count - 0);
    }
  };

  //   STOPWATCH =====================
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const handleToggle = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };
  // Function to format time as "HH:MM:SS"
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    //   STARTING POINT
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
  return (
    <div className="bg_black min-vh-100 py-5">
      <div className="container">
        <Link to="/homepage">
          <CommonButton
            linkButton={"Back"}
            className={"mb-4 text-black bg-white "}
          />
        </Link>
      </div>
      {/* ======== COUNTDOWN TIMER ========== */}
      <div className="mb-5">
        <h1 className="fs_xl text-center fw-bold mb-5 text_ffffff">
          NEW YEAR 2024 STARTS IN
        </h1>
        <div className="container d-flex align-items-center gap-sm-3 gap-2 justify-content-center">
          <div className="text-center">
            <h2 className="fs_lg fw-bold ff_jost text_ffffff" ref={days}>
              00
            </h2>
            <p className="fs_md ff_jost fw-medium text_ffffff">Days</p>
          </div>
          <p className="ff-Montserrat fw-normal fs-1 text_ffffff line-height-174 mb-5 pb-4">
            :
          </p>
          <div className="text-center">
            <h2 className="fs_lg fw-bold ff_jost text_ffffff" ref={hours}>
              00
            </h2>
            <p className="fs_md ff_jost fw-medium text_ffffff">Hours</p>
          </div>
          <p className="ff-Montserrat fw-normal fs-1 text_ffffff line-height-174 mb-5 pb-4">
            :
          </p>
          <div className="text-center">
            <h2 className="fs_lg fw-bold ff_jost text_ffffff" ref={minutes}>
              00
            </h2>
            <p className="fs_md ff_jost fw-medium text_ffffff">Minute</p>
          </div>
          <p className="ff-Montserrat fw-normal fs-1 text_ffffff line-height-174 mb-5 pb-4">
            :
          </p>
          <div className="text-center">
            <h2 className="fs_lg fw-bold ff_jost text_ffffff" ref={seconds}>
              00
            </h2>
            <p className="fs_md ff_jost fw-medium text_ffffff">Second</p>
          </div>
        </div>
      </div>
      {/* ========= COUNTER ========= */}
      <div className="d-flex gap-5 justify-content-center container align-items-center">
        <div className="mb-5 me-5">
          <h1 className="text-center text_ffffff fs_lg mb-4">COUNTER</h1>
          <div className="d-flex justify-content-center align-items-center gap-5">
            <h2
              className="text-black mb-0 fs-1 cursor_pointer bg-white common_btns"
              onClick={() => setCount(count + 1)}
            >
              +
            </h2>
            <p className="text_ffffff mb-0 fs_lg fw-semibold">
              <span>{count < 10 ? "0" : ""}</span>
              {count}
            </p>
            <h2
              className="mb-0 cursor_pointer common_btns text-black bg-white fs-1"
              onClick={decrease}
            >
              -
            </h2>
          </div>
        </div>
        {/* ========== STOPWATCH =============== */}
        <div className="pb-5 ms-5">
          <h1 className="text_ffffff text-center mb-4">STOPWATCH</h1>
          <div className="d-flex flex-column align-items-center">
            <h1 className="text_ffffff">{formatTime(time)}</h1>
            <div className="d-flex gap-3">
              <button
                className="common_btns bg-white text-black"
                onClick={handleToggle}
              >
                {isRunning ? "Pause" : "Play"}
              </button>
              <button
                className="common_btns bg-white text-black"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
