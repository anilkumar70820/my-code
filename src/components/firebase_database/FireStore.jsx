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
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: null,
  });

  const [showImage, setShowImage] = useState(null);
  // ======== ERROR STATE ============
  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    image: false,
  });

  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const [userData, setUserData] = useState([]);
  // ============== GET DATA FROM FIREBASE AND PRINT IN TABLE ================
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserData(fetchedData);
    };
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserData(updatedData);
    });
    fetchData();
    return () => unsubscribe();
  }, []);

  // =============== GET VALUE FROM INPUTS ===================
  const handleInputChange = (field, value) => {
    setFormdata({ ...formdata, [field]: value });
  };

  // =============== GET IMAGE FILE FROM INPUT ================
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormdata({ ...formdata, image: e.target.files[0] });
      setShowImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setShowImage(formdata.image);
    }
  };

  // ================== FORM SUBMITTION FUNCTION =================
  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ============== CHECK FOR EMPTY FIELDS ==============
    if (formdata.firstName.trim() === "" || formdata.email.trim() === "") {
      setError({
        firstName: formdata.firstName.trim() === "",
        email: formdata.email.trim() === "",
      });
      setLoading(false);
      return;
    }

    // ================ REGEX PATTERNS =================
    const regexFirstName = /^[a-zA-Z0-9]+([._][a-zA-Z0-9]+)*$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    //  =============== CHECK FOR REGEX PATTERN ================
    const isValidFirstName = regexFirstName.test(formdata.firstName);
    const isValidEmail = regexEmail.test(formdata.email);

    if (!isValidFirstName || !isValidEmail) {
      setError({
        firstName: !isValidFirstName,
        email: !isValidEmail,
      });
      setLoading(false);
      return;
    }

    // ============= EDIT MODE SUBMIT CONDITION ===========
    try {
      if (editMode) {
        await updateUserData(editUserId, formdata);
      } else {
        await addUserData(formdata);
      }
      clearFormData();
      document.getElementById("fileinput").value = "";
      setShowImage(false);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  // ======== ADD USER DATA IN FIREBASE AFTER EDIT DATA =================
  const addUserData = async (userData) => {
    const imageUrl = await uploadImageToStorage(userData.image);
    const newUser = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      imageUrl: imageUrl,
    };
    await addDoc(collection(db, "users"), newUser);
  };

  // ============= UPDATE USER DATA IN FIREBASE ====================
  const updateUserData = async (userId, userData) => {
    let imageUrl = userData.image;
    if (userData.image && typeof userData.image !== "string") {
      imageUrl = await uploadImageToStorage(userData.image);
    }
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      imageUrl: imageUrl,
    });
  };

  // ============== UPLOAD IMAGE TO FIREBASE STORAGE ===============
  const uploadImageToStorage = async (image) => {
    if (!image) {
      const defaultImgRef = ref(
        storage,
        "gs://practice-page-1cbb4.appspot.com/default_user.jpg"
      );
      const defaultImgUrl = await getDownloadURL(defaultImgRef);
      return defaultImgUrl;
    }
    const storageRef = ref(storage, `user_images/${image.name}`);
    await uploadBytes(storageRef, image);
    return await getDownloadURL(storageRef);
  };

  // ============ EDIT USER DATA FUNCTION ================
  const handleEdit = async (id) => {
    const userToEdit = userData.find((user) => user.id === id);
    setFormdata({
      firstName: userToEdit.firstName,
      lastName: userToEdit.lastName,
      email: userToEdit.email,
      image: userToEdit.imageUrl || "",
    });
    if (userToEdit.imageUrl) {
      setShowImage(userToEdit.imageUrl);
    }
    // Set edit mode and edit user ID
    setEditMode(true);
    setEditUserId(id);
  };

  // ============= DELETE USER DATA FROM FIREBASE FUNCTION =============
  const handleDelete = async (id) => {
    const userToDelete = userData.find((user) => user.id === id);
    if (
      userToDelete.imageUrl &&
      !userToDelete.imageUrl.includes("default_user.jpg")
    ) {
      const imageRef = ref(storage, userToDelete.imageUrl);
      try {
        // Attempt to delete the image from Firebase Storage
        await deleteObject(imageRef);
      } catch (error) {
        if (error.code === "storage/object-not-found") {
          // If the image is not found, log a message (optional)
          console.log(
            `Image '${userToDelete.imageUrl}' not found in Firebase Storage.`
          );
        } else {
          // Log other errors for debugging purposes
          console.error("Error deleting image:", error);
        }
      }
    }

    // Delete the user data from Firestore
    await deleteDoc(doc(db, "users", id));

    // Update the local state to remove the deleted user
    setUserData(userData.filter((user) => user.id !== id));
  };

  // =============== CLEAR FORM FIELDS AFTER SUBMIT FORM ============
  const clearFormData = () => {
    setFormdata({
      firstName: "",
      lastName: "",
      email: "",
      image: null,
    });
    setEditMode(false);
    setEditUserId(null);
  };

  return (
    <section className="py-5 min-vh-100" id="form_validation">
      <div className="container">
        <Link to="/">
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
          <div className="border_yellogreen">
            <label htmlFor="fileinput" className="common_btns me-4">
              Choose File
              <input
                type="file"
                id="fileinput"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </label>
            {showImage && (
              <img
                src={showImage}
                alt="user_image"
                className={`${showImage ? "user_img" : ""}`}
              />
            )}
          </div>
          <button className="common_btns" type="submit">
            {loading ? "submiting..." : editMode ? "Update" : "Submit"}{" "}
          </button>
        </form>
      </div>

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
