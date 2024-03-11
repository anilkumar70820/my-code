// import React, { useState } from "react";

// const NewForm = () => {
//   const [myForm, setMyForm] = useState({
//     firstName: "",
//     lastName: "",
//   });

//   const [error, setError] = useState({
//     firstName: false,
//   });

//   const handleChangeInput = (field, value) => {
//     setMyForm({ ...myForm, [field]: value });
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();

//     if (myForm.firstName.trim() === "") {
//       setError({
//         firstName: myForm.firstName.trim() === "",
//       });
//       return;
//     }
//     setError({
//       firstName: false,
//     });
//     setMyForm({
//       firstName: "",
//       lastName: "",
//     });

//     console.log(myForm);
//   };

//   return (
//     <div className="py-5" id="form_validation">
//       <div className="container">
//         <form
//           onSubmit={submitHandler}
//           className="form_width d-flex justify-content-center align-items-center gap-4 flex-column mx-auto"
//         >
//           <div className="position-relative w-100">
//             <input
//               type="text"
//               value={myForm.firstName}
//               placeholder="First Name"
//               onChange={(e) => handleChangeInput("firstName", e.target.value)}
//             />
//             {error.firstName && (
//               <p className="error_message text-danger">
//                 {myForm.firstName.trim() === ""
//                   ? " please enter your first name"
//                   : ""}
//               </p>
//             )}
//           </div>
//           <div className="position-relative w-100">
//             <input
//               type="text"
//               value={myForm.lastName}
//               placeholder="Last Name"
//               onChange={(e) => handleChangeInput("lastName", e.target.value)}
//             />
//           </div>
//           <button className="common_btns" type="submit">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NewForm;

// const errors = {};

// if (form.firstName.trim() === "") {
//   errors.firstName = "Please enter your first name";
// } else if (!regexFirstName.test(form.firstName)) {
//   errors.firstName = "Invalid first name";
// }

// if (form.lastName.trim() === "") {
//   errors.lastName = "Please enter your last name";
// }

// if (form.phoneNumber.trim() === "") {
//   errors.phoneNumber = "Please enter your phone number";
// } else if (!regexPhone.test(form.phoneNumber)) {
//   errors.phoneNumber = "Invalid phone number";
// }

// if (form.email.trim() === "") {
//   errors.email = "Please enter your email";
// } else if (!regexEmail.test(form.email)) {
//   errors.email = "Invalid email";
// }

// if (form.password.trim() === "") {
//   errors.password = "Please enter your password";
// } else if (!regexPassword.test(form.password)) {
//   errors.password = "Invalid password";
// }

// if (form.confirmPassword.trim() === "") {
//   errors.confirmPassword = "Please enter your confirm password";
// } else if (form.confirmPassword !== form.password) {
//   errors.confirmPassword = "Passwords does not match";
// }

// if (form.fruit.trim() === "") {
//   errors.fruit = "Please select a fruit";
// }

// setError(errors);

// if (Object.keys(errors).length > 0) {
//   return;
// }

import React, { useState } from "react";
import CommonButton from "../common/CommonButton";

const NewForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    fruit: "",
  });
  // ========= ERROR STATE ===============
  const [error, setError] = useState({
    firstName: false,
    phoneNumber: false,
    email: false,
    password: false,
    confirmPassword: false,
    fruit: false,
  });

  // =========== REGEX PATTERNS ==============
  const regexFirstName = /^[a-zA-Z0-9]+([._][a-zA-Z0-9]+)*$/;
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#])[A-Za-z\d@#]{8,}$/;
  const regexPhone = /^\+?\d{10}$/;

  // ============= GET VALUES FROM INPUTS ============
  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
    // Reset error when user starts typing
    // setError({ ...error, [field]: false });

    // =========== REALTIME VALIDATION ==============
    switch (field) {
      case "firstName":
        setError({
          ...error,
          [field]: value.trim() === "" || !regexFirstName.test(value),
        });
        break;
      case "phoneNumber":
        setError({
          ...error,
          [field]: value.trim() === "" || !regexPhone.test(value),
        });
        break;
      case "email":
        setError({
          ...error,
          email: value.trim() === "" || !regexEmail.test(value),
        });
        break;
      case "password":
        setError({
          ...error,
          password: value.trim() === "" || !regexPassword.test(value),
        });
        break;
      case "confirmPassword":
        setError({
          ...error,
          confirmPassword: value !== form.password,
        });
        break;
      default:
        break;
    }
  };

  // =========== SUBMIT FUNCTION ===========
  const submitHandler = (e) => {
    e.preventDefault();

    // ============= CHECK ERRORS FOR EMPTY FIELDS ===========
    if (
      form.firstName.trim() === "" ||
      form.phoneNumber.trim() === "" ||
      form.email.trim() === "" ||
      form.password.trim() === "" ||
      form.confirmPassword.trim() === "" ||
      form.fruit.trim() === ""
    ) {
      setError({
        firstName: form.firstName.trim() === "",
        phoneNumber: form.phoneNumber.trim() === "",
        email: form.email.trim() === "",
        password: form.password.trim() === "",
        confirmPassword: form.confirmPassword.trim() === "",
        fruit: form.fruit.trim() === "",
      });
      return;
    }

    // ========= CHECK REGEXS PATERNS ==============
    if (!regexFirstName.test(form.firstName)) {
      setError({
        ...error,
        firstName: true,
      });
      return;
    }
    if (!regexPhone.test(form.phoneNumber)) {
      setError({
        ...error,
        phoneNumber: true,
      });
      return;
    }
    if (!regexEmail.test(form.email)) {
      setError({
        ...error,
        email: true,
      });
      return;
    }
    if (!regexPassword.test(form.password)) {
      setError({
        ...error,
        password: true,
      });
      return;
    }
    if (form.confirmPassword !== form.password) {
      setError({
        ...error,
        confirmPassword: true,
      });
      return;
    }

    // ============ CLEAR FORM DATA AFTER SUCCESSFULL SUBMITION ===============
    setForm({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      fruit: "",
    });
    console.log(form);
  };

  return (
    <div className="py-5" id="form_validation">
      <div className="container">
        <form
          onSubmit={submitHandler}
          className="form_width d-flex flex-column align-items-center justify-content-center mx-auto gap-4"
        >
          {/* ========== FIRST NAME INPUT ============== */}
          <div className="position-relative w-100">
            <input
              type="text"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
            {error.firstName && (
              <p className="error_message text-danger">
                {" "}
                {form.firstName.trim() === ""
                  ? "Please enter your First Name!"
                  : "Invalid First Name!"}
              </p>
            )}
          </div>
          {/* ========== LAST NAME INPUT =============== */}
          <div className="w-100">
            <input
              type="text"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
          </div>
          {/* =========== PHONE NUMBER INPUT ============ */}
          <div className="position-relative w-100">
            <input
              type="number"
              placeholder="Phone No."
              min="0"
              maxLength="10"
              value={form.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
            {error.phoneNumber && (
              <p className="error_message text-danger">
                {" "}
                {form.phoneNumber.trim() === ""
                  ? "Please enter your Phone number!"
                  : "Invalid phone number!"}
              </p>
            )}
          </div>
          {/* =========== EMAIL INPUT ============= */}
          <div className="position-relative w-100">
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            {error.email && (
              <p className="error_message text-danger">
                {" "}
                {form.email.trim() === ""
                  ? "Please enter your email!"
                  : "Invalid Email!"}
              </p>
            )}
          </div>
          {/* ============ PASSWORD INPUT ============== */}
          <div className="position-relative w-100">
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            {error.password && (
              <p className="error_message text-danger">
                {" "}
                {form.password.trim() === ""
                  ? "Please enter your Password!"
                  : "password must be strong!"}
              </p>
            )}
          </div>
          {/* ============= CONFIRM PASSWORD ============== */}
          <div className="position-relative w-100">
            <input
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
            />
            {error.confirmPassword && (
              <p className="error_message text-danger">
                {" "}
                {form.confirmPassword.trim() === ""
                  ? "Please enter your confirm Password"
                  : "password does not match"}
              </p>
            )}
          </div>
          {/* ============== SELECT OPTION ================= */}
          <div className="position-relative w-100">
            <select
              className="border_yellogreen fw-medium w-100"
              value={form.fruit}
              onChange={(e) => handleInputChange("fruit", e.target.value)}
            >
              <option value="">Select Fruit</option>
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
              <option value="orange">Orange</option>
              <option value="grape">Grape</option>
            </select>
            {error.fruit && (
              <p className="error_message text-danger">
                {" "}
                {form.fruit.trim() === "" ? "Please select a fruit" : ""}
              </p>
            )}
          </div>
          <CommonButton linkButton={"Submit"} />
        </form>
      </div>
    </div>
  );
};

export default NewForm;
