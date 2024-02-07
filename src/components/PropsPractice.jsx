import React from "react";

const PropsPractice = (props) => {
  const { message } = props;
  return (
    <div>
      <h1 className="text-black">{message}</h1>
    </div>
  );
};

export default PropsPractice;
