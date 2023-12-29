import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const EmailJs = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_dajapid",
        "template_pwccitg",
        form.current,
        "2Y4CO6Jgm5GkMWGEg"
      )
      .then(
        (result) => {
          Swal.fire({
            title: "Good job!",
            text: "You submited this form.",
            icon: "success",
          });
         if (form.current) {
          form.current.reset();
        }
        },
        (error) => {
          Swal.fire({
            title: "Bad job!",
            text: "something went wrong.Please try again later.",
            icon: "error",
          });
        }
        );
  };
  return (
    <>
      <div className="container">
        <Link to="/">
          <button className="common_btns my-4">Back</button>
        </Link>
      </div>
      <div className="mt-5 d-flex align-items-center justify-content-center" id="emailjs">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="d-flex flex-column"
        >
          <div className="d-flex flex-column mb-3">
            <label className="text-black fs-5 me-2 mb-0 ">Name</label>
            <input placeholder="enter your name" required type="text" name="user_name" />
          </div>
          <div className="d-flex flex-column mb-3">
            <label className="text-black fs-5 me-2 mb-0">Email</label>
            <input placeholder="enter your email"
              type="text"
              name="user_email"
              pattern="^[a-zA-Z0-9]+@gmail\.com$"
              required
            />
          </div>
          <div className="d-flex flex-column mb-3">
            <label className="text-black fs-5 me-2 mb-0">Password</label>
            <input placeholder="enter your password"
              type="password"
              name="user_password"
              required
            />
          </div>
          <div className="d-flex flex-column mb-3">
            <label className="text-black fs-5 me-2 mb-0">Message</label>
            <input type="text" placeholder="your message" required name="message" />
          </div>
          <div className="">
            <button
              className=" bg-transparent px-4 py-1 rounded-4 fs-4 send_hover"
              type="submit"
            >Send</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmailJs;
