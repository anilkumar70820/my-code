import React from "react";

const CommonButton = (props) => {
  const { linkButton, className, icon } = props;
  return (
    <>
       <button className={`common_btns ${className}`}>
      {linkButton} {icon}
    </button>
    </>
  );
};

export default CommonButton;
