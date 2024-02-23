// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMer3z23PiJ0r21VkGSNzXRzohxGvPqGI",
  authDomain: "mogiproject-33024.firebaseapp.com",
  projectId: "mogiproject-33024",
  storageBucket: "mogiproject-33024.appspot.com",
  messagingSenderId: "724328829377",
  appId: "1:724328829377:web:fc29d099b535eeb99e5f40",
  measurementId: "G-LPQVSG1GSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);