import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonButton from "./common/CommonButton";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-vh-100 bg_white ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="container py-5">
        <Link to="/homepage">
          <CommonButton linkButton={"Back"} />
        </Link>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <div className="container my-5">
          <h1 className="text-center text_black">This is Dark Mode Example</h1>
          <div className="row mt-5">
            <div className="col-lg-6 mb-lg-0 mb-4">
              <h2 className="text_black">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis, quasi?
              </h2>
              <p className="text_black">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae mollitia incidunt praesentium fuga corrupti aliquam
                vel ipsa saepe est harum?
              </p>
            </div>
            <div className="col-lg-6">
              <h2 className="text_black">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis, quasi?
              </h2>
              <p className="text_black">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae mollitia incidunt praesentium fuga corrupti aliquam
                vel ipsa saepe est harum?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkMode;
