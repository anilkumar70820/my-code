import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import CommonButton from "../common/CommonButton";
import { auth, googleAuthProvider,db } from "./FirebaseData";
import { addDoc, collection } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const FirebaseAuthentication = () => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number:"",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState();
  const [loading, setLoading] = useState(false);
  // ===== regex PATTERNS ==========
  const regexFirstName = /^[a-zA-Z0-9]+([._][a-zA-Z0-9]+)*$/;
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#])[A-Za-z\d@#]{8,}$/;
  const regexNumber = /^\d{10}$/;

  // ============ ERROR STATE ==============
  const [error, setError] = useState({
    firstName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  //=========== RESET ERRORS AND EMPTY INPUTS WHEN SIGN IN , SIGN UP MODE CHANGE ========
  useEffect(() => {
    setError({
      firstName: false,
      lastName: false,
      email: false,
      number:false,
      password: false,
      confirmPassword: false,
    });
    setFormdata({
      firstName: "",
      lastName: "",
      email: "",
      number:"",
      password: "",
      confirmPassword: "",
    });
  }, [isSignUp]);

  // =========== GET VALUES FROM INPUTS =============
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
      case "email":
        setError({
          ...error,
          number: value.trim() === "",
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
    // =========== Prevent page reload after form submission ================
    e.preventDefault();
    // ==== CONDITION FOR CHECK EMPTY FIELDS ==============
    if (
      (isSignUp &&
        (formdata.firstName.trim() === "" ||
          formdata.confirmPassword.trim() === "")) ||
      formdata.email.trim() === "" ||
      formdata.password.trim() === ""
    ) {
      setError({
        firstName: isSignUp && formdata.firstName.trim() === "",
        email: formdata.email.trim() === "",
        number:formdata.number.trim() === "",
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
    if (!regexNumber.test(formdata.number)) {
      setError({ ...error, number: true });
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
    setLoading(true);
    // ======= FIREBASE AUTHENTICATION JS ==================
    try {
      if (isSignUp) {
        // Create a new user in Firebase Authentication for sign up
        const { user } = await createUserWithEmailAndPassword(
          auth,
          formdata.email,
          formdata.password
        );
        // Add user data to Firestore
        const userData = { ...formdata, uid: user.uid };
        await addDoc(collection(db, "auth users"), userData);

        // Send email verification
        await sendEmailVerification(user);

        // ====== OPEN POPUP OF SUCCESSFULLY SIGN UP =============
        Swal.fire({
          title: "Sign up Successfully!",
          text: "Please Verify Your Email Before SignIn",
          icon: "success",
        });

        // ==== SIGN UP MODE FALSE AND GO TO SIGN IN PAGE ========
        setIsSignUp(false);
      } else {
        // Sign in with existing user for sign in
        const { user } = await signInWithEmailAndPassword(
          auth,
          formdata.email,
          formdata.password
        );

        // Check if email is verified
        if (!user.emailVerified) {
          // Popup the user to verify their email
          Swal.fire({
            title: "Email Not Verified",
            text: "Please verify your email to sign in.",
            icon: "error",
          });
          return;
        }

        // ====== OPEN POPUP OF SUCCESSFULLY SIGN IN=============
        Swal.fire({
          title: "Sign In Successfully!",
          icon: "success",
        });
        // ===== AFTER SIGN IN GO TO HOMEPAGE ===============
        navigate("/homepage");
      }
      console.log(formdata)
      // Clear form data after successful submission
      setFormdata({
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        password: "",
        confirmPassword: "",
      });
      setLoading(false);
    } catch (error) {
      if (isSignUp && error.code === "auth/email-already-in-use") {
        alert("This email is already in use.");
      } else {
        alert("Invalid email or password. Please try again.");
      }
    }
    setLoading(false);
  };

  // ==========RESET PASSWORD FUNCTION =============
  const handlePasswordReset = async () => {
    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, formdata.email);

      // Show success message
      Swal.fire({
        title: "Password Reset Email Sent",
        text: "Check your email for instructions on how to reset your password.",
        icon: "success",
      });
    } catch (error) {
      // Show error message if there's an issue
      Swal.fire({
        title: "Error",
        text: "Failed to send password reset email. Please try again later.",
        icon: "error",
      });
    }
  };

  //============= SIGN IN WITH GOOGLE FUNCTION ============
  const signInWithGoogle = async () => {
    try {
      // ======== OPEN A POPUP FOR SIGN IN WITH GOOGLE ACCOUNT =========
      await signInWithPopup(auth, googleAuthProvider);
      //  ========== AGTER SIGN IN OPEN HOMEPAGE =============
      navigate("/homepage");
      // ========= SHOW POPUP THAT YOU ARE SUCCESSFULLY SIGN IN =========
      Swal.fire({
        title: "Sign In with Google Successfully!",
        icon: "success",
      });
      // ========= SHOW ERROR FOR FAILED TO SIGN IN ==========
    } catch (error) {
      console.log(error);
      alert("Failed to sign in with Google. Please try again.");
    }
  };
  return (
    <section className="py-5 min-vh-100" id="form_validation">
      <h1 className="mb-5 text-center text-white">
        {isSignUp ? "Create A New Account" : "Sign In"}
      </h1>
      <div className="container d-flex align-items-center justify-content-center">
        <form
          className="d-flex flex-column gap-4 justify-content-center form_width form_box"
          onSubmit={formSubmit}
        >
          <div
            className={`position-relative ${isSignUp ? "d-block" : "d-none"}`}
          >
            <p className="text-capitalize fs-5 mb-1 text-white">
              first name <sub className="text-danger fs-3">*</sub>
            </p>
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
            <p className="text-capitalize fs-5 mb-1 text-white">last name</p>
            <input
              type="text"
              placeholder="Last Name"
              value={formdata.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
          </div>
          <div className="position-relative">
            <p className="text-capitalize fs-5 mb-1 text-white">
              email <sub className="text-danger fs-3">*</sub>
            </p>
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
          <div className={`position-relative ${isSignUp ? "d-block" : "d-none"}`}>
            <p className="text-capitalize fs-5 mb-1 text-white">
              number <sub className="text-danger fs-3">*</sub>
            </p>
            <input
              type="number"
              placeholder="Your number"
              value={formdata.number}
              onChange={(e) => handleInputChange("number", e.target.value)}
            />
            {error.number && (
              <p className="text-danger fw-semibold error_message">
                {formdata.number.trim() === ""
                  ? "Please enter your number!"
                  : "Invalid number!"}
              </p>
            )}
          </div>
          <div className="position-relative">
            <p className="text-capitalize fs-5 mb-1 text-white">
              password <sub className="text-danger fs-3">*</sub>
            </p>
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
            <p className="text-capitalize fs-5 mb-1 text-white">
              confirm password <sub className="text-danger fs-3">*</sub>
            </p>
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
          <button className="common_btns" type="submit">
            {loading ? (
              <span>
                {isSignUp ? "Sign up" : "Sign in"}
                <span className="submitting_dot1">.</span>
                <span className="submitting_dot2">.</span>
                <span className="submitting_dot3">.</span>
              </span>
            ) : isSignUp ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
          </button>
          <Link
            className={`d-flex justify-content-end fw-medium ff_jost text-white ${
              isSignUp ? "d-none" : "d-block"
            }`}
            onClick={handlePasswordReset}
          >
            Forget Password ?
          </Link>

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
