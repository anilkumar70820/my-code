import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, storage } from "./FirebaseData";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import CommonButton from "../CommonButton";

const FireStore = () => {
  const [loading, setLoading] = useState();
  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: null,
  });

  const regexFirstName = /^[a-zA-Z0-9]+([._][a-zA-Z0-9]+)*$/;
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    image: false,
  });

  const [editMode, setEditMode] = useState(false); // State to track edit mode
  const [editUserId, setEditUserId] = useState(null); // State to store ID of user being edited

  // ========= firestore database datafatch  ==========
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    // Fetch data from Firestore
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserData(fetchedData);
    };
    // Set up a real-time listener for changes to the "users" collection
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserData(updatedData);
    });
    fetchData();
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  // ======== GET VALUES FROM INPUTS ===========
  const handleInputChange = (field, value) => {
    setFormdata({ ...formdata, [field]: value });
  };
  // ============= GET FILE FROM INPUT TYPE FILE ============
  const handleFileChange = (e) => {
    // Set image file to state
    setFormdata({ ...formdata, image: e.target.files[0] });
  };
  // ========= FORM SUBMIT FUNCTION =========
  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Check for empty fields
    if (formdata.firstName.trim() === "" || formdata.email.trim() === "") {
      setError({
        firstName: formdata.firstName.trim() === "",
        email: formdata.email.trim() === "",
      });
      setLoading(false);
      return;
    }
    // Validate fields using regular expressions
    const isValidFirstName = regexFirstName.test(formdata.firstName);
    const isValidEmail = regexEmail.test(formdata.email);
    // If any field is invalid, set error state and prevent form submission
    if (!isValidFirstName || !isValidEmail) {
      setError({
        firstName: !isValidFirstName,
        email: !isValidEmail,
      });
      setLoading(false);
      return;
    }
    try {
      if (editMode) {
        // If in edit mode, update user data
        await updateUserData(editUserId, formdata);
      } else {
        // If not in edit mode, add new user data
        await addUserData(formdata);
      }
      // Clear form data after successful submission
      clearFormData();
      // Clear input type file after form submission
      document.getElementById("fileinput").value = "";
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };
  // ========== SAVE DATA TO FIREBASE STORAGE ===========
  const addUserData = async (userData) => {
    // Upload image to Firebase Storage
    const imageUrl = await uploadImageToStorage(userData.image);
    // Save form data to Firestore database including image URL
    const newUser = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      imageUrl: imageUrl, // Save the URL of the uploaded image
    };
    await addDoc(collection(db, "users"), newUser);
  };
  // =========== UPDATE USER DATA ==================
  const updateUserData = async (userId, userData) => {
    // Upload image to Firebase Storage if a new image is selected
    let imageUrl = userData.image;
    if (userData.image && typeof userData.image !== "string") {
      imageUrl = await uploadImageToStorage(userData.image);
    }
    // Update form data in Firestore database
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      imageUrl: imageUrl,
    });
  };
  // =============== UPLOAD IMAGE TO FIREBASE STORAGE ===========
  const uploadImageToStorage = async (image) => {
    if (!image) {
      // If no image is selected, return the URL of the default image from Firebase Storage
      const defaultImgRef = ref(
        storage,
        "gs://practice-page-1cbb4.appspot.com/default_user.jpg"
      ); // Change 'default.jpg' to the actual path of your default image
      const defaultImgUrl = await getDownloadURL(defaultImgRef);
      return defaultImgUrl; // Return the URL of the default image
    }
    const storageRef = ref(storage, `user_images/${image.name}`);
    await uploadBytes(storageRef, image);
    return await getDownloadURL(storageRef);
  };
  // ============== EDIT USER DATA =============
  const handleEdit = async (id) => {
    // Find the user to be edited
    const userToEdit = userData.find((user) => user.id === id);
    // Log the image URL to check if it's correct
    console.log("Image URL:", userToEdit.imageUrl);
    // Set form data to the user being edited, including the image URL
    setFormdata({
      firstName: userToEdit.firstName,
      lastName: userToEdit.lastName,
      email: userToEdit.email,
      image: userToEdit.imageUrl || "", // Set the image URL from user data or empty string if not available
    });
    // Set edit mode and edit user ID
    setEditMode(true);
    setEditUserId(id);
  };
  // ============== DELETE USER DATA =============
  const handleDelete = async (id) => {
    // Find the user to be deleted
    const userToDelete = userData.find((user) => user.id === id);
    // Delete the user's image from Firebase Storage if it's not the default image
    if (
      userToDelete.imageUrl &&
      !userToDelete.imageUrl.includes("default_user.jpg")
    ) {
      const imageRef = ref(storage, userToDelete.imageUrl);
      await deleteObject(imageRef);
    }
    // Delete the user data from Firestore
    await deleteDoc(doc(db, "users", id));
    // Update the local state to reflect the deletion
    setUserData(userData.filter((user) => user.id !== id));
  };
  // ============== CLEAR FORM DATA ===============
  const clearFormData = () => {
    setFormdata({
      firstName: "",
      lastName: "",
      email: "",
      image: null,
    });

    // Reset edit mode and edit user ID
    setEditMode(false);
    setEditUserId(null);
  };

  return (
    <section className="py-5 min-vh-100" id="form_validation">
      <div className="container">
        <Link to="/">
          <CommonButton linkButton={"Back"} className={"mb-4"}/>
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
                  : ""}
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
                {formdata.email.trim() === "" ? "Please enter your Email!" : ""}
              </p>
            )}
          </div>
          {/* Input field for image upload */}
          <input
            type="file"
            id="fileinput"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button className="common_btns" type="submit">
            {loading ? "submiting..." : editMode ? "Update" : "Submit"}{" "}
            {/* Conditional rendering for button text */}
          </button>
        </form>
      </div>

      {/* Table to display user data */}
      <div className={`container ${userData.length === 0 ? "d-none" : ""}`}>
        <h2>User Data</h2>
        <table className="table_max_w mx-auto overflow-x-scroll">
          <thead>
            <tr>
              <th>Profile Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Edit Details</th>
              <th>Delete Details</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id}>
                <td>
                  <img className="user_img" src={user.imageUrl} alt="User" />
                </td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="common_btns px-3 py-1"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="common_btns px-3 py-1"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default FireStore;
