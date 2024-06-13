import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonButton from "./common/CommonButton";
import Swal from "sweetalert2";
import { FaSignOutAlt } from "react-icons/fa";
import { homepageButtons } from "./common/Helper";

const HomePage = () => {
  const [search,setSearch] = useState("")
  // ============ LOGOUT popup ===========
  const logOut = () => {
    Swal.fire({
      title: "Log Out Successfully!",
      icon: "success",
    });
  };
 // Filter buttons based on the search input
 const filteredButtons = homepageButtons.filter((button) =>
  button.buttonName.toLowerCase().includes(search.toLowerCase())
);
  return (
    <div className="py-5" id="form_validation">
      <div className="d-flex justify-content-between container">
<div>
  <form className="d-flex gap-3 align-items-center">
  <input
              type="search"
              placeholder="Search...."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
  </form>
</div>
        <Link to="/" onClick={logOut}>
          <CommonButton
            linkButton={"Log Out"}
            className={"text-danger"}
            icon={<FaSignOutAlt />}
          />
        </Link>
      </div>
      <div className="d-flex flex-wrap gap-4 container my-5">
        {filteredButtons.map((obj,index)=>{
          return(
        <Link key={index} to={obj.link} target={obj.target}>
          <CommonButton linkButton={obj.buttonName} />
        </Link>
          )
        })}
      </div>
    </div>
  );
};

export default HomePage;
