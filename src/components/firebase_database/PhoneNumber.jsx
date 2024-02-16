import React, { useState } from "react";
import { auth } from "./FirebaseData"; // Import auth from FirebaseData
import Swal from "sweetalert2";

const PhoneNumber = () => {
  const [formdata, setFormdata] = useState({
    phoneNumber: "",
    verificationCode: "",
  });
  const [verificationId, setVerificationId] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState({
    phoneNumber: false,
    verificationCode: false,
  });

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormdata({ ...formdata, [field]: value });
    setError({ ...error, [field]: false }); // Reset error when input changes
  };

  // Send verification code to the provided phone number
  const handlePhoneNumberVerification = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(formdata.phoneNumber);
      setVerificationId(confirmation.verificationId);
      // Prompt the user to enter the verification code
      Swal.fire({
        title: "Verification Code Sent",
        text: "Please enter the verification code you received.",
        input: "text",
        inputPlaceholder: "Verification Code",
        showCancelButton: true,
        confirmButtonText: "Verify",
        preConfirm: (verificationCode) => {
          setFormdata({ ...formdata, verificationCode });
          handleVerificationCodeConfirmation(verificationCode);
        },
      });
    } catch (error) {
      console.error("Error verifying phone number:", error);
      setError({ ...error, phoneNumber: true });
    }
  };

  // Confirm the verification code entered by the user
  const handleVerificationCodeConfirmation = async (verificationCode) => {
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, verificationCode);
      await auth().signInWithCredential(credential);
      // Display success message upon successful sign in
      Swal.fire({
        title: "Phone Number Sign In Successful!",
        icon: "success",
      });
      // Redirect the user to the homepage
      // You may need to adjust the redirection logic based on your application
    } catch (error) {
      console.error("Error confirming verification code:", error);
      setError({ ...error, verificationCode: true });
    }
  };

  return (
    <section className="py-5 min-vh-100" id="form_validation">
      <h1 className="mb-5 text-center">
        {isSignUp ? "Create A New Account" : "Sign In"}
      </h1>
      <div className="container d-flex align-items-center justify-content-center">
        <form
          className="d-flex flex-column gap-4 justify-content-center form_width form_box"
          onSubmit={(e) => e.preventDefault()} // Prevent default form submission
        >
          <div className="position-relative">
            <p className="text-capitalize fs-5 mb-1">
              phone number <sub className="text-danger fs-3">*</sub>
            </p>
            <input
              type="text"
              placeholder="Phone Number"
              value={formdata.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
            {error.phoneNumber && (
              <p className="text-danger fw-semibold error_message">
                Please enter a valid phone number.
              </p>
            )}
          </div>
          <div className="position-relative">
            <p className="text-capitalize fs-5 mb-1">
              verification code <sub className="text-danger fs-3">*</sub>
            </p>
            <input
              type="text"
              placeholder="Verification Code"
              value={formdata.verificationCode}
              onChange={(e) => handleInputChange("verificationCode", e.target.value)}
            />
            {error.verificationCode && (
              <p className="text-danger fw-semibold error_message">
                Please enter a valid verification code.
              </p>
            )}
          </div>
          <input
            type="button"
            value="Send Verification Code"
            onClick={handlePhoneNumberVerification}
          />
          
        </form>
      </div>
    </section>
  );
};

export default PhoneNumber;
