import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { Link } from "react-router-dom";
import CommonButton from "../common/CommonButton";

const FormValidation = () => {
  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const regexFirstName = /^[a-zA-Z0-9]+([._][a-zA-Z0-9]+)*$/;
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#])[A-Za-z\d@#]{8,}$/;

  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setFormdata({ ...formdata, [field]: value });

    // Validate in real-time
    switch (field) {
      case "firstName":
      case "lastName":
        setError((prevError) => ({
          ...prevError,
          [field]: value.trim() === "" || !regexFirstName.test(value),
        }));
        break;
      case "email":
        setError((prevError) => ({
          ...prevError,
          email: value.trim() === "" || !regexEmail.test(value),
        }));
        break;
      case "password":
        setError((prevError) => ({
          ...prevError,
          password: value.trim() === "" || !regexPassword.test(value),
        }));
        break;
      case "confirmPassword":
        setError((prevError) => ({
          ...prevError,
          confirmPassword: value !== formdata.password,
        }));
        break;
      default:
        break;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (
      formdata.firstName.trim() === "" ||
      formdata.lastName.trim() === "" ||
      formdata.email.trim() === "" ||
      formdata.password.trim() === "" ||
      formdata.confirmPassword.trim() === ""
    ) {
      setError({
        firstName: formdata.firstName.trim() === "",
        lastName: formdata.lastName.trim() === "",
        email: formdata.email.trim() === "",
        password: formdata.password.trim() === "",
        confirmPassword: formdata.confirmPassword.trim() === "",
      });
      return;
    }

    // Check regex patterns
    if (!regexFirstName.test(formdata.firstName)) {
      setError((prevError) => ({ ...prevError, firstName: true }));
      return;
    }

    if (!regexFirstName.test(formdata.lastName)) {
      setError((prevError) => ({ ...prevError, lastName: true }));
      return;
    }

    if (!regexEmail.test(formdata.email)) {
      setError((prevError) => ({ ...prevError, email: true }));
      return;
    }

    if (!regexPassword.test(formdata.password)) {
      setError((prevError) => ({ ...prevError, password: true }));
      return;
    }

    if (formdata.confirmPassword !== formdata.password) {
      setError((prevError) => ({ ...prevError, confirmPassword: true }));
      return;
    }

    // Continue with form submission logic
    console.log(formdata);

    // Clear form data after successful submission
    setFormdata({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <section className="py-5 min-vh-100" id="form_validation">
      <div className="container">
        <Link to="/homepage">
          {" "}
          <CommonButton linkButton={"Back"} className={"mb-4"} />
        </Link>
      </div>
      <div className="container d-flex align-items-center justify-content-center">
        <form
          className="d-flex flex-column gap-4 justify-content-center form_width"
          onSubmit={formSubmit}
        >
          <div className="position-relative">
            <input
              type="text"
              placeholder="First Name"
              value={formdata.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
            {error.firstName && (
              <p className="text-danger fw-semibold error_message">
                {formdata.firstName.trim() === ""
                  ? "Please enter your First Name!"
                  : "Invalid First Name!"}
              </p>
            )}
          </div>
          <div className="position-relative">
            <input
              type="text"
              placeholder="Last Name"
              value={formdata.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
            {error.lastName && (
              <p className="text-danger fw-semibold error_message">
                {formdata.lastName.trim() === ""
                  ? "Please enter your Last Name!"
                  : "Invalid Last Name!"}
              </p>
            )}
          </div>
          <div className="position-relative">
            <input
              type="email"
              placeholder="Your Email"
              value={formdata.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            {error.email && (
              <p className="text-danger fw-semibold error_message">
                {formdata.email.trim() === ""
                  ? "Please enter your Email!"
                  : "Invalid Email!"}
              </p>
            )}
          </div>
          <div className="position-relative">
            <input
              className="pe-5"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formdata.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            <span
              className="password_toggle_icon"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash className="text-danger" />
              ) : (
                <FaEye className="text-success" />
              )}
            </span>
            {error.password && (
              <p className="text-danger fw-semibold error_message">
                {formdata.password.trim() === ""
                  ? "Please enter a password!"
                  : "Password must be strong."}
              </p>
            )}
          </div>
          <div className="position-relative">
            <input
              type="password"
              placeholder="Confirm Password"
              value={formdata.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
            />
            {error.confirmPassword && (
              <p className="text-danger fw-semibold error_message">
                Passwords do not match!
              </p>
            )}
          </div>
          <input type="submit" />
        </form>
      </div>
    </section>
  );
};

export default FormValidation;
