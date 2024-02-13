import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonButton from "./common/CommonButton";

const InputFile = () => {
  const [file, setFile] = useState();

  const fileHandler = (e) => {
    const file = e.target.files[0];
    const imgUrl = URL.createObjectURL(file);
    setFile(imgUrl);
    console.log(file);
  };
  return (
    <>
      <div className="container d-flex flex-column py-5">
        <Link to="/homepage">
          <CommonButton linkButton={"Back"} className={"mb-4"} />
        </Link>
        <div className="d-flex justify-content-center">
          <div className="input_file_box flex-column d-flex align-items-center">
            <label
              htmlFor="file"
              className="d-flex justify-content-center cursor_pointer"
            >
              <span className=" fs_md fw-medium ff-Montserrat px-4 py-2 common_btns">
                Upload a file...
              </span>
              <input type="file" hidden id="file" onChange={fileHandler} />
            </label>
            {file ? (
              <img
                className="input_img_size mt-4 cursor_pointer"
                src={file}
                alt="image"
              />
            ) : (
              <p className=" fs_2xmd fw-normal ff-Montserrat text-center mt-4">
                no file chossen
              </p>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-center"></div>
      </div>
    </>
  );
};

export default InputFile;
