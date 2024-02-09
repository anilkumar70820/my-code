import React from "react";

const CommonButton = (props) => {
  const links = props.linkButton;
  const className = props.className
  return (
    <>
      <button className={`common_btns ${className}`}>{links}</button>
    </>
  );
};

export default CommonButton;
