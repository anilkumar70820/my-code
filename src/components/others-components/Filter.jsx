import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommonButton from "../common/CommonButton";

const Filter = () => {
  const myFilter = [
    {
      name: "Fruit",
      fruit: "Apple",
      type: "fruit",
    },
    {
      name: "Colour",
      fruit: "Blue",
      type: "Colours",
    },
    {
      name: "Fruit",
      fruit: "Mango",
      type: "fruit",
    },
    {
      name: "Colour",
      fruit: "Black",
      type: "Colours",
    },
    {
      name: "Colour",
      fruit: "Orange",
      type: "Colours",
    },
    {
      name: "Fruit",
      fruit: "Orange",
      type: "fruit",
    },
    {
      name: "Fruit",
      fruit: "Grapes",
      type: "fruit",
    },
    {
      name: "Colour",
      fruit: "Red",
      type: "Colours",
    },
    {
      name: "Fruit",
      fruit: "Banana",
      type: "fruit",
    },
  ];

  const [allThings, setAllThings] = useState("");
  const [getFilter, setGetFilter] = useState(myFilter);
  useEffect(() => {
    if (allThings !== "") {
      const newArray = myFilter.filter((value) => value.type === allThings);
      setGetFilter(newArray);
    } else {
      setGetFilter(myFilter);
    }
  });
  return (
    <div className="container py-5">
      <Link to="/homepage">
        <CommonButton linkButton={"Back"} className={"mb-4"} />
      </Link>
      <h1 className="fs_xl text-center ff-Montserrat fw-medium mb-5">Filter</h1>
      <div>
        <button
          onClick={() => setAllThings("")}
          className={`${
            allThings === "" ? "bg-primary" : "bg-black"
          } px-4 py-1 rounded-4 text-white fw-medium mx-3`}
        >
          All
        </button>
        <button
          onClick={() => setAllThings("fruit")}
          className={`${
            allThings === "fruit" ? "bg-primary" : "bg-black"
          } px-4 py-1 rounded-4 text-white fw-medium mx-3`}
        >
          Fruits
        </button>
        <button
          onClick={() => setAllThings("Colours")}
          className={`${
            allThings === "Colours" ? "bg-primary" : "bg-black"
          } px-4 py-1 rounded-4 text-white fw-medium mx-3`}
        >
          Colours
        </button>
      </div>

      <div className="d-flex gap-4 mx-3 flex-wrap">
        {getFilter.map((obj) => (
          <div className="bg-black px-5 py-3 rounded-4 mt-4">
            <p className="text-white fw-medium mb-0">{obj.name}</p>
            <p className="text-white fw-medium mb-0">{obj.fruit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
