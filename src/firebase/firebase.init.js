// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADhPsJ9F9huFGDVniHpXfm_LxjGzHJCE0",
  authDomain: "simple-sign-register.firebaseapp.com",
  projectId: "simple-sign-register",
  storageBucket: "simple-sign-register.firebasestorage.app",
  messagingSenderId: "81188610761",
  appId: "1:81188610761:web:d7449179fb77d703b56318",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
