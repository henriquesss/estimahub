// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_API_KEY_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_API_KEY_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_API_KEY_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_API_KEY_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_API_KEY_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_API_KEY_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
