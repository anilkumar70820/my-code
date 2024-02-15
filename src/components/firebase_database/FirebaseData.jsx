// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS1QaVLF1rVBr3QDYT_4wJEUa65f_tkzY",
  authDomain: "practice-page-1cbb4.firebaseapp.com",
  projectId: "practice-page-1cbb4",
  storageBucket: "practice-page-1cbb4.appspot.com",
  messagingSenderId: "449384782274",
  appId: "1:449384782274:web:31ea01aac6f614b2021e5b",
  databaseURL:"https://practice-page-1cbb4-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const rd = getDatabase(app);
// Initialize Firestore Database and get a reference to the service
export const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);
// Initialize Google Authentication and get a reference to the service
export const googleAuthProvider = new GoogleAuthProvider(app)