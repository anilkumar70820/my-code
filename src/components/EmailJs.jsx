// import React, { useRef } from "react";
// import emailjs from "@emailjs/browser";
// import Swal from "sweetalert2";
// import { Link } from "react-router-dom";

// const EmailJs = () => {
//   const form = useRef();
//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs
//       .sendForm(
//         "service_dajapid",
//         "template_pwccitg",
//         form.current,
//         "2Y4CO6Jgm5GkMWGEg"
//       )
//       .then(
//         (result) => {
//           Swal.fire({
//             title: "Good job!",
//             text: "You submited this form.",
//             icon: "success",
//           });
//          if (form.current) {
//           form.current.reset();
//         }
//         },
//         (error) => {
//           Swal.fire({
//             title: "Bad job!",
//             text: "something went wrong.Please try again later.",
//             icon: "error",
//           });
//         }
//         );
//   };
//   return (
//     <>
//       <div className="container">
//         <Link to="/">
//           <button className="common_btns my-4">Back</button>
//         </Link>
//       </div>
//       <div className="mt-5 d-flex align-items-center justify-content-center" id="emailjs">
//         <form
//           ref={form}
//           onSubmit={sendEmail}
//           className="d-flex flex-column"
//         >
//           <div className="d-flex flex-column mb-3">
//             <label className="text-black fs-5 me-2 mb-0 ">Name</label>
//             <input placeholder="enter your name" required type="text" name="user_name" />
//           </div>
//           <div className="d-flex flex-column mb-3">
//             <label className="text-black fs-5 me-2 mb-0">Email</label>
//             <input placeholder="enter your email"
//               type="text"
//               name="user_email"
//               pattern="^[a-zA-Z0-9]+@gmail\.com$"
//               required
//             />
//           </div>
//           <div className="d-flex flex-column mb-3">
//             <label className="text-black fs-5 me-2 mb-0">Password</label>
//             <input placeholder="enter your password"
//               type="password"
//               name="user_password"
//               required
//             />
//           </div>
//           <div className="d-flex flex-column mb-3">
//             <label className="text-black fs-5 me-2 mb-0">Message</label>
//             <input type="text" placeholder="your message" required name="message" />
//           </div>
//           <div className="">
//             <button
//               className=" bg-transparent px-4 py-1 rounded-4 fs-4 send_hover"
//               type="submit"
//             >Send</button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default EmailJs;

import emailJs from "@emailjs/browser";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";
import CommonButton from "./CommonButton";
import { Link } from "react-router-dom";

const EmailJs = () => {
  const form = useRef();
  // =============== COLLECT FORM DATA STATE ==========
  const [myEmail, setMyEmail] = useState({
    firstName: "",
    email: "",
    password: "",
    message: "",
  });

  // ======== ERROR STATE ============
  const [error, setError] = useState({
    firstName: false,
    email: false,
    password: false,
    message: false,
  });

  // ======== REGEXS PATTERNS ============
  // ===== EMAIL REGEX ============
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // ===== PASSWORD REGEX ============
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // ======== GET INPUTS VALUE FROM INPUTS ===========
  const handleChange = (field, value) => {
    setMyEmail({ ...myEmail, [field]: value });
    setError({ ...error, [field]: false });
  };

  // ============== FORM SUBMITTION FUNCTION =============
  const sendEmail = (e) => {
    e.preventDefault();

    if (
      myEmail.firstName.trim() === "" ||
      myEmail.email.trim() === "" ||
      myEmail.password.trim() === ""
    ) {
      setError({
        firstName: myEmail.firstName.trim() === "",
        email: myEmail.email.trim() === "",
        password: myEmail.password.trim() === "",
      });
      return;
    }

    if (!regexEmail.test(myEmail.email)) {
      setError({
        email: { ...myEmail, email: true },
      });
      return;
    }
    if (!regexPassword.test(myEmail.password)) {
      setError({
        password: { ...myEmail, password: true },
      });
      return;
    }
    emailJs
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
            text: "Email sent !",
            icon: "success",
          });
          setMyEmail({
            firstName: "",
            email: "",
            password: "",
            message: "",
          });
          console.log(myEmail);
        },
        (error) => {
          Swal.fire({
            title: "Oops...!",
            text: "Something went wrong",
            icon: "error",
          });
        }
      );
  };
  return (
    <div className="py-5">
      <div className="container" id="form_validation">
        <Link to="/homepage">
          <CommonButton linkButton={"Back"} />
        </Link>
        <form
          ref={form}
          onSubmit={sendEmail}
          className="d-flex flex-column gap-4 justify-content-center form_width mx-auto"
        >
          <div className="position-relative d-flex flex-column gap-1">
            <label>Name</label>
            <input
              type="text"
              name="user_name"
              value={myEmail.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
            {error.firstName && (
              <p className="error_message text-danger">
                {myEmail.firstName.trim() === ""
                  ? "please enter your first name"
                  : ""}
              </p>
            )}
          </div>
          <div className="position-relative d-flex flex-column gap-1">
            <label>Email</label>
            <input
              type="email"
              name="user_email"
              value={myEmail.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {error.email && (
              <p className="error_message text-danger">
                {myEmail.email.trim() === ""
                  ? "please enter your email"
                  : "invalid email  "}
              </p>
            )}
          </div>
          <div className="position-relative d-flex flex-column gap-1">
            <label>password</label>
            <input
              type="password"
              name="user_password"
              value={myEmail.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {error.password && (
              <p className="error_message text-danger">
                {myEmail.password.trim() === ""
                  ? "please enter your password"
                  : "invalid password"}
              </p>
            )}
          </div>
          <div className="d-flex  flex-column gap-1">
            <label>Message</label>
            <textarea
              name="message"
              value={myEmail.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
          </div>
          <CommonButton linkButton={"Send"} />
        </form>
      </div>
    </div>
  );
};

export default EmailJs;
