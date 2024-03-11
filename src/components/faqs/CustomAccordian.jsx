import React from "react";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import CommonButton from "../common/CommonButton";

const CustomAccordian = () => {
  return (
    <>
      <div className="container pt-5 pb-4">
        <Link className="d-inline-block" to="/homepage">
          <CommonButton linkButton={"Back"} />
        </Link>
      </div>

      <div className="container">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0" className="mb-4">
            <Accordion.Header className=" text_ffffff fw-semibold ff-Montserrat">
              Accordion Item #1
            </Accordion.Header>
            <Accordion.Body className="text_ffffff fw-medium ff-Montserrat">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body className="text_ffffff fw-medium ff-Montserrat">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export default CustomAccordian;
