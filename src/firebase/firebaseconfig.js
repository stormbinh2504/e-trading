// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoxhVRe4ngOwdmnlp8nxTMJRZ0m9jHIeM",
  authDomain: "e-trading-6143e.firebaseapp.com",
  projectId: "e-trading-6143e",
  storageBucket: "e-trading-6143e.appspot.com",
  messagingSenderId: "1079031420244",
  appId: "1:1079031420244:web:ec84c172c3f3e6b2aba4c1",
  measurementId: "G-CY2JE18K1G"
};

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'redirect',
  // signInSuccessUrl: "/",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    // signInSuccessWithAuthResult: () => false,
  },
};
// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);
const storage = getStorage(appFirebase);
const auth = getAuth(appFirebase);
const dbFirestore = getFirestore(appFirebase)
export { dbFirestore, uiConfig, storage, appFirebase, auth };