// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "meeting-sscheduler.firebaseapp.com",
  projectId: "meeting-sscheduler",
  storageBucket: "meeting-sscheduler.firebasestorage.app",
  messagingSenderId: "868887050781",
  appId: "1:868887050781:web:e5b33673216645327a64f4",
  measurementId: "G-JSMCQ9GKYM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
