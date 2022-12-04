// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/auth/";
import "firebase/firestore";
// import initfirebase from './index';
// import app from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/database";
// import "firebase/compat/storage";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "@env";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
const initfirebase = initializeApp(firebaseConfig);
export default initfirebase;

// const auth = await initfirebase.auth();
// const db = await initfirebase.firestore();

// export { auth, db };
// const initfirebase = app.initializeApp(firebaseConfig);
// export default initfirebase;
