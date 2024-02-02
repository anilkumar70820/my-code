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
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FireStore = () => {
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

  // ========= firestore database data ==========
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

    fetchData();
  }, []);

  const handleInputChange = (field, value) => {
    setFormdata({ ...formdata, [field]: value });

    // Validate in real-time
    switch (field) {
      case "firstName":
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
      default:
        break;
    }
  };

  const handleFileChange = (e) => {
    // Set image file to state
    setFormdata({ ...formdata, image: e.target.files[0] });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (formdata.firstName.trim() === "" || formdata.email.trim() === "") {
      setError({
        firstName: formdata.firstName.trim() === "",
        email: formdata.email.trim() === "",
      });
      return;
    }

    // Continue with form submission logic
    console.log(formdata);

    if (editMode) {
      // If in edit mode, update user data
      await updateUserData(editUserId, formdata);
    } else {
      // If not in edit mode, add new user data
      await addUserData(formdata);
    }

    // Clear form data after successful submission
    clearFormData();
  };

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

  const updateUserData = async (userId, userData) => {
    // Upload image to Firebase Storage if new image selected
    const defaultImgRef = ref(
      storage,
      "gs://practice-page-1cbb4.appspot.com/default.jpg"
    );
    const imageUrl = userData.image
      ? await uploadImageToStorage(userData.image)
      : await getDownloadURL(defaultImgRef);
    // Update form data in Firestore database
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      imageUrl: imageUrl,
    });
  };

  const uploadImageToStorage = async (image) => {
    if (!image) {
      // If no image is selected, return the URL of the default image from Firebase Storage
      const defaultImgRef = ref(
        storage,
        "gs://practice-page-1cbb4.appspot.com/default.jpg"
      ); // Change 'default.jpg' to the actual path of your default image
      const defaultImgUrl = await getDownloadURL(defaultImgRef);
      return defaultImgUrl; // Return the URL of the default image
    }

    const storageRef = ref(storage, `user_images/${image.name}`);
    await uploadBytes(storageRef, image);
    return await getDownloadURL(storageRef);
  };

  const handleEdit = (id) => {
    // Set form data to the user being edited
    const userToEdit = userData.find((user) => user.id === id);
    setFormdata(userToEdit);

    // Set edit mode and edit user ID
    setEditMode(true);
    setEditUserId(id);
  };

  const handleDelete = async (id) => {
    // Implement delete functionality
    await deleteDoc(doc(db, "users", id));
    setUserData(userData.filter((user) => user.id !== id));
  };

  const clearFormData = () => {
    // Clear form data after submission or cancellation of edit mode
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
          <button className="common_btns mb-4">Back</button>
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
          {/* Input field for image upload */}
          <input type="file" onChange={handleFileChange} />
          <button type="submit">
            {editMode ? "Update" : "Submit"}{" "}
            {/* Conditional rendering for button text */}
          </button>
        </form>
      </div>

      {/* Table to display user data */}
      <div className="container">
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
