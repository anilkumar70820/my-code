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
import CommonButton from "../common/CommonButton";

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

  // ================ REGEX PATTERNS =================
  const regexFirstName = /^[a-zA-Z0-9]+([._][a-zA-Z0-9]+)*$/;
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // ============== GET DATA FROM FIREBASE AND PRINT IN TABLE ================
  useEffect(() => {
    // =========== FETCH DATA FROM FIREBASE FIRESTORE =========
    const fetchData = async () => {
      // Fetch data from the "users" collection in Firestore
      const querySnapshot = await getDocs(collection(db, "users"));

      // Map over the documents returned from the query and format the data
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Assign the document ID to the 'id' property
        ...doc.data(), // Spread the document data into the object
      }));

      // Set the fetched data into the state variable 'userData'
      setUserData(fetchedData);
    };

    // =========== UPDATE DATA IMMEDIATELY AFTER SUBMIT ============
    // Subscribe to changes in the "users" collection in Firestore
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      // Map over the documents in the snapshot and format the data
      const updatedData = snapshot.docs.map((doc) => ({
        id: doc.id, // Assign the document ID to the 'id' property
        ...doc.data(), // Spread the document data into the object
      }));

      // Set the updated data into the state variable 'userData'
      setUserData(updatedData);
    });

    // Fetch initial data from the "users" collection
    fetchData();

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // =============== GET VALUE FROM INPUTS ===================
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
      default:
        break;
    }
  };

  // =============== GET IMAGE FILE FROM INPUT ================
  const handleFileChange = (e) => {
    // Check if files are selected and if the first file exists
    if (e.target.files && e.target.files[0]) {
      // If a file is selected, update the formdata with the selected file
      // and set the showImage state to display the selected image
      setFormdata({ ...formdata, image: e.target.files[0] });
      setShowImage(URL.createObjectURL(e.target.files[0]));
    } else {
      // If no file is selected or the selected file doesn't exist,
      // keep the current image in the showImage state
      setShowImage(formdata.image);
    }
  };
  // ================== FORM SUBMITTION FUNCTION =================
  const formSubmit = async (e) => {
    // ========= AFTER FORM SUBMIT PAGE DID NOT REFRESH ========
    e.preventDefault();
    // ======= SHOW LOADING THAT PAGE ARE SUBMITTING ======
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

    //  =============== CHECK FOR REGEX PATTERN ================
    if (!regexFirstName.test(formdata.firstName)) {
      setError({ ...error, firstName: true });
      setLoading(false);
      return;
    }
    if (!regexEmail.test(formdata.email)) {
      setError({ ...error, email: true });
      setLoading(false);
      return;
    }

    // ============= EDIT MODE SUBMIT CONDITION ===========
    try {
      if (editMode) {
        // ========= IF EDIT MODE IS ACTIVE THEN UPDATE EXITING DATA ==========
        await updateUserData(editUserId, formdata);
      } else {
        // ============= ELSE ADD NEW USER IN FIRESTORE =======
        await addUserData(formdata);
      }

      // ======= CLEAR FORMDATA AFTER SUCCESSFULL SUBMITTION ===========
      clearFormData();

      // ======= CLEAR FILE INPUT AFTER SUCCESSFULL SUBMITTION ============
      document.getElementById("fileinput").value = "";

      // ==== IMAGE PREVIEW FALSE ==========
      setShowImage(false);
      // ========= SUBMITTING LOADING FALSE =========
      setLoading(false);
      // ========= ERROR FALSE =======
      setError(false);

      // ======= SHOW ERROR IF FORM NOT SUBMOT OR DATA NOT ADD IN FIREBASE  ========
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
    // ========== PRINT FORMDATA DATA IN CONSOLE =========
    console.log("Form data submitted successfully:", formdata);
  };
  // ======== ADD NEW USER DATA IN FIREBASE FIRESTORE =================
  const addUserData = async () => {
    // ======== UPLOAD IMAGE IN FIREBASE STORAGE ========
    const imageUrl = await uploadImageToStorage(formdata.image);
    // ========== CREATE A NEW USER ================
    const newUser = {
      firstName: formdata.firstName,
      lastName: formdata.lastName,
      email: formdata.email,
      imageUrl: imageUrl,
    };
    // ======= ADD NEW USER IN FIREBASE FIRESTORE ===========
    await addDoc(collection(db, "users"), newUser);
  };
  // ============= UPDATE USER DATA IN FIREBASE AFTER EDIT DATA ====================
  const updateUserData = async (userId, userData) => {
    let imageUrl = userData.image;
    // ====== THIS CONDITION CHECK FOR THAT IMAGE TYPE SHOULD NOT STRING =========
    if (userData.image && typeof userData.image !== "string") {
      imageUrl = await uploadImageToStorage(userData.image);
    }
    //========== FIND USER WITH THEIR ID =========
    const userRef = doc(db, "users", userId);
    // ========== UPDATE USER DATA ========
    await updateDoc(userRef, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      imageUrl: imageUrl,
    });
  };
  // ============== UPLOAD IMAGE TO FIREBASE STORAGE ===============
  const uploadImageToStorage = async (image) => {
    // ========= IF IMAGE NOT FOUND THEN ADD DEFAULT IMAGE FOR USER ============
    if (!image) {
      // ========= FIREBAE STORAGE PATH ============
      const defaultImgRef = ref(
        storage,
        "gs://practice-page-1cbb4.appspot.com/default_user.jpg"
      );
      // ======== DOWNLOAD URL FOR DEFAULT IMAGE =========
      const defaultImgUrl = await getDownloadURL(defaultImgRef);
      return defaultImgUrl;
    }
    // Generate a unique filename for each upload
    const filename = `${Date.now()}_${image.name}`;

    // ====== GET PATH FOR UPLOAD IMAGE using the generated filename ===========
    const storageRef = ref(storage, `user_images/${filename}`);

    // ======= UPLOAD IMAGE TO FIREBASE STORAGE =======
    await uploadBytes(storageRef, image);

    // ======== DOWNLOAD IMAGE URL ==========
    return await getDownloadURL(storageRef);
  };
  // ============ EDIT USER DATA FUNCTION ================
  const handleEdit = async (id) => {
    // =========== FIND USER FOR EDIT THEIR DATA ==========
    const userToEdit = userData.find((user) => user.id === id);
    // ======== FILL INPUTS WITH USER DATA ===========
    setFormdata({
      firstName: userToEdit.firstName,
      lastName: userToEdit.lastName,
      email: userToEdit.email,
      image: userToEdit.imageUrl || "",
    });

    // ======== SHOW USER IMAGE =========
    if (userToEdit.imageUrl) {
      setShowImage(userToEdit.imageUrl);
    }
    // Set edit mode and edit user ID
    setEditMode(true);
    // ====== EDIT USER DATA IN SAME ID NOT CREATE NEW ID ===============
    setEditUserId(id);
  };
  // ============= DELETE USER DATA FROM FIREBASE FUNCTION =============
  const handleDelete = async (id) => {
    // ======== FIND USER TO DELETE DATA ==========
    const userToDelete = userData.find((user) => user.id === id);
    // ========= CHECK IF USER HAVE NOT DEFAULT IMAGE THEN DELETE USER IMAGE =======
    if (
      userToDelete.imageUrl &&
      !userToDelete.imageUrl.includes("default_user.jpg")
    ) {
      const imageRef = ref(storage, userToDelete.imageUrl);
      try {
        // ====== DELETE USER IMAGE =====
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
        <Link to="/homepage">
          <CommonButton linkButton={"Back"} className={"mb-4"} />
        </Link>
      </div>
      <div className="container d-flex align-items-center justify-content-center">
        <form
          className="d-flex flex-column gap-4 justify-content-center form_width form_box"
          onSubmit={formSubmit}
        >
          <div className="position-relative">
            <p className="text-capitalize fs-5 mb-1">
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
                  : "invalid First Name"}
              </p>
            )}
          </div>
          <div className="position-relative">
            <p className="text-capitalize fs-5 mb-1">last name</p>
            <input
              type="text"
              placeholder="Last Name"
              value={formdata.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
          </div>
          <div className="position-relative">
            <p className="text-capitalize fs-5 mb-1">
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
                  : "invalid Email"}
              </p>
            )}
          </div>
          {/* Input field for image upload */}
          <div className="mb-0">
            <p className="text-capitalize fs-5 mb-1">profile image</p>
            <div className="border_yellogreen">
              <label htmlFor="fileinput" className="common_btns me-4 py-1 px-3">
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
                <img src={showImage} alt="user_image" className="user_img" />
              )}
            </div>
          </div>
          <button className="common_btns" type="submit">
            {loading ? (
              <span>
                {editMode ? "Updating" : "Submitting"}
                <span className="submitting_dot1">.</span>
                <span className="submitting_dot2">.</span>
                <span className="submitting_dot3">.</span>
              </span>
            ) : editMode ? (
              "Update"
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
      <div className={` ${userData.length === 0 ? "d-none" : "mt-5"}`}>
        <h2 className="text-center mb-3">User Data</h2>
        <div className="w-100 d-flex">
          <table className="overflow-x-scroll mx-auto px-3">
            <thead>
              <tr>
                <th className="fw-semibold fs-5 text-nowrap">Profile Image</th>
                <th className="fw-semibold fs-5">Name</th>
                <th className="fw-semibold fs-5">Email</th>
                <th className="fw-semibold fs-5 text-nowrap">Edit Details</th>
                <th className="fw-semibold fs-5 text-nowrap">Delete Details</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id}>
                  <td>
                    <img className="user_img" src={user.imageUrl} alt="User" />
                  </td>
                  <td className="text-capitalize fw-medium">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="fw-medium">{user.email}</td>
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
      </div>
    </section>
  );
};

export default FireStore;
