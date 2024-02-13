import React from "react";
import { Link } from "react-router-dom";
import CommonButton from "./CommonButton";

const NestedMap = () => {
  // Example data with nested arrays
  const data = [
    {
      id: 1,
      category: "Category 1",
      items: ["Item 1.1", "Item 1.2", "Item 1.3", "Item 1.4"],
    },
    {
      id: 2,
      category: "Category 2",
      items: ["Item 2.1", "Item 2.2", "Item 2.3",'items 2.4'],
    },
    {
      id: 3,
      category: "Category 3",
      items: ["Item 3.1", "Item 3.2", "Item 3.3",'items 3.4'],
    },
    {
      id: 4,
      category: "Category 4",
      items: ["Item 4.1", "Item 4.2", "Item 4.3","items 4.4"],
    },
    {
      id: 5,
      category: "Category 5",
      items: ["Item 5.1", "Item 5.2", "Item 5.3","items 5.4"],
    },
  ];

  return (
    <div className="container">
      <Link to='/homepage'> <CommonButton
            linkButton={"Back"}
            className={"mb-4"}
          /></Link>
      <div className="d-flex gap-5 flex-wrap">
        {/* Outer map for categories */}
        {data.map((categoryData) => (
          <div key={categoryData.id}>
            <h2>{categoryData.category}</h2>

            {/* Inner map for items within each category */}
            <ul className="d-flex flex-column gap-3 list-desimal ps-4">
              {categoryData.items.map((list, index) => (
                <li key={index}>{list}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NestedMap;
