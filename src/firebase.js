// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNV9p_P5T_-OgwuXJpa32-OXcN8xgrZGU",
  authDomain: "akcepted-bfc0b.firebaseapp.com",
  projectId: "akcepted-bfc0b",
  storageBucket: "akcepted-bfc0b.appspot.com",
  messagingSenderId: "239871866626",
  appId: "1:239871866626:web:d1b210f1ea4d6d3621741b",
  measurementId: "G-EBZH79R3VD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
