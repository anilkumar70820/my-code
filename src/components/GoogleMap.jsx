import React from "react";
import { Link } from "react-router-dom";
import CommonButton from "./CommonButton";

const GoogleMap = () => {
  return (
    <>

    <div className="py-5 min-vh-100">
     <div className="container"><Link to='/homepage'> <CommonButton
            linkButton={"Back"}
            className={"mb-4"}
          /></Link></div>
      <div className="container d-flex  align-items-center justify-content-center">
        <iframe className="map_size"
          src="https://maps.google.com/maps?q=radial%20code&amp;t=k&amp;z=10&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
        ></iframe>
      </div>
      </div>
    </>
  );
};

export default GoogleMap;
