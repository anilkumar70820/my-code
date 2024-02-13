import React from "react";
import { Link } from "react-router-dom";
import CommonButton from "./common/CommonButton";

const CSSTicker = () => {
  return (
    <>
      <div className="container pt-5">
        <Link to="/homepage">
          {" "}
          <CommonButton linkButton={"Back"} className={"mb-4"} />
        </Link>
      </div>
      <div className="marquee mt-5 bg-warning">
        <div className="marquee__content">
          <ul className="list-inline">
            <li>Lorem ipsum dolor sit amet. Lorem</li>
            <li>Lorem ipsum dolor sit amet. Lorem</li>
            <li>Lorem ipsum dolor sit amet. Lorem</li>
            <li>Lorem ipsum dolor sit amet. Lorem</li>
          </ul>
          <ul className="list-inline">
            <li>Lorem ipsum dolor sit amet. Lorem</li>
            <li>Lorem ipsum dolor sit amet. Lorem</li>
            <li>Lorem ipsum dolor sit amet. Lorem</li>
            <li>Lorem ipsum dolor sit amet. Lorem</li>
          </ul>
          <ul className="list-inline">
            <li>Lorem ipsum dolor sit amet. Lorem</li>
            <li>Lorem ipsum dolor sit amet. Lorem</li>
            <li>Lorem ipsum dolor sit amet. Lorem</li>
            <li>Lorem ipsum dolor sit amet. Lorem</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CSSTicker;
