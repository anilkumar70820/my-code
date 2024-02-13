import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CommonButton from "../CommonButton";
import { auth, db } from "./FirebaseData";
import { addDoc, collection } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const FirebaseAuthentication = () => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // ===== regex PATTERNS ==========
  const regexFirstName = /^[a-zA-Z0-9]+([._][a-zA-Z0-9]+)*$/;
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#])[A-Za-z\d@#]{8,}$/;
  // ============ ERROR STATE ==============
  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState();
  // =========== GET INPUTS VALUE =============
  const handleInputChange = (field, value) => {
    setFormdata({ ...formdata, [field]: value });
    // ================ VALIDATE IN REAL TIME ===========
    switch (field) {
      case "firstName":
        setError({
          ...error,
          [field]: value.trim() === "",
        });
        break;
      case "email":
        setError({
          ...error,
          email: value.trim() === "",
        });
        break;
      case "password":
        setError({
          ...error,
          password: value.trim() === "",
        });
        break;
      case "confirmPassword":
        setError({
          ...error,
          confirmPassword: value !== formdata.password,
        });
        break;
      default:
        break;
    }
  };
  // ======== PASSWORD SHOW AND HIDDEN FUNCTION ===============
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // ========== FORM SUBMITION FUNCTION ===============
  const formSubmit = async (e) => {
    // =========== AFTER FORM SUBMIT STOP TO PAGE RELOAD ================
    e.preventDefault();
    // ==== CONDITION FOR CHECK EMPTY FIELDS ==============
    if (
      (isSignUp &&
        (formdata.firstName.trim() === "" ||
          formdata.lastName.trim() === "" ||
          formdata.confirmPassword.trim() === "")) ||
      formdata.email.trim() === "" ||
      formdata.password.trim() === ""
    ) {
      setError({
        firstName: isSignUp && formdata.firstName.trim() === "",
        lastName: isSignUp && formdata.lastName.trim() === "",
        email: formdata.email.trim() === "",
        password: formdata.password.trim() === "",
        confirmPassword: isSignUp && formdata.confirmPassword.trim() === "",
      });
      return;
    }
    // ============= CHECK REGEX PATTERN ============
    if (isSignUp && !regexFirstName.test(formdata.firstName)) {
      setError({ ...error, firstName: true });
      return;
    }
    if (!regexEmail.test(formdata.email)) {
      setError({ ...error, email: true });
      return;
    }
    if (!regexPassword.test(formdata.password)) {
      setError({ ...error, password: true });
      return;
    }
    if (isSignUp && formdata.confirmPassword !== formdata.password) {
      setError({ ...error, confirmPassword: true });
      return;
    }
    // ======= FIREBASE AUTHENTICATION JS ==================
    try {
      if (isSignUp) {
        // Create a new user in Firebase Authentication for sign up
        const { user } = await createUserWithEmailAndPassword(
          auth,
          formdata.email,
          formdata.password
        );
        // Add user data to Firestore for sign up
        // const userData = { ...formdata, uid: user.uid };
        // await addDoc(collection(db, "users"), userData);

        // ====== OPEN POPUP OF SUCCESSFULLY SIGN UP =============
        Swal.fire({
          title: "Sign up Successfully!",
          icon: "success",
        });
        setIsSignUp(false)
      } else {
        // Sign in with existing user for sign in
        await signInWithEmailAndPassword(
          auth,
          formdata.email,
          formdata.password
        );
        // ===== AFTER SIGN IN GO TO HOMEPAGE ===============
        navigate("/homepage");
        // ====== OPEN POPUP OF SUCCESSFULLY SIGN IN=============
        Swal.fire({
          title: "Sign In Successfully!",
          icon: "success",
        });
      }
      // Clear form data after successful submission
      setFormdata({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      if (isSignUp && error.code === "auth/email-already-in-use") {
        alert("This email is already in use.");
      } else {
        alert("Invalid email or password. Please try again.");
      }
    }
  };
  return (
    <section className="py-5 min-vh-100" id="form_validation">
      {/* <div className="container">
        <Link to="/">
        <CommonButton
            linkButton={"Back"}
          />
        </Link>
      </div> */}
      <h1 className="mb-5 text-center">
        {isSignUp ? "Create A New Account" : "Sign In"}
      </h1>
      <div className="container d-flex align-items-center justify-content-center">
        <form
          className="d-flex flex-column gap-4 justify-content-center form_width"
          onSubmit={formSubmit}
        >
          <div
            className={`position-relative ${isSignUp ? "d-block" : "d-none"}`}
          >
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
          <div
            className={`position-relative ${isSignUp ? "d-block" : "d-none"}`}
          >
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
            <div className={`${isSignUp ? "d-block" : "d-none"}`}>
              {error.password && (
                <p className="text-danger fw-semibold error_message">
                  {formdata.password.trim() === ""
                    ? "Please enter a password!"
                    : "Password must be strong."}
                </p>
              )}
            </div>
            <div className={`${isSignUp ? "d-none" : "d-block"}`}>
              {error.password && (
                <p className="text-danger fw-semibold error_message">
                  {formdata.password.trim() === ""
                    ? "Please enter a password!"
                    : "Incorrect Password."}
                </p>
              )}
            </div>
          </div>
          <div
            className={`position-relative ${isSignUp ? "d-block" : "d-none"}`}
          >
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
                {formdata.confirmPassword.trim() === ""
                  ? "Please enter Confirm password!"
                  : "Password does not match"}
              </p>
            )}
          </div>
          {/* Conditionally render Register/Login button based on the mode */}
          <input type="submit" value={isSignUp ? "Sign Up" : "Sign In"} />

          {/* Toggle between Sign Up and Sign In mode */}
          <button
            className="fw-semibold ff_open_sans border-2 rounded-3"
            type="button"
            onClick={() => setIsSignUp((prev) => !prev)}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default FirebaseAuthentication;
