// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXf_rHyJq1vNU_rYymg-rWeS44uoj4ZEk",
  authDomain: "assumimi-e34f3.firebaseapp.com",
  projectId: "assumimi-e34f3",
  storageBucket: "assumimi-e34f3.firebasestorage.app",
  messagingSenderId: "1003666981399",
  appId: "1:1003666981399:web:a6dd9ebd789411d44ad252",
  measurementId: "G-NT3BLVZNCL"
};

// Initialize Firebase
const app = !getApps.length ?  initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app)
export const db = getFirestore(app)
// const analytics = getAnalytics(app);