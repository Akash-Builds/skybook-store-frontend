import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Log the environment variables to ensure they are loaded
console.log("API Key:", import.meta.env.VITE_API_KEY);
console.log("Auth Domain:", import.meta.env.VITE_AUTH_DOMAIN);

// Your Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDERID,
  appId: import.meta.env.VITE_APPID
};

// Log the Firebase config to verify the values
console.log("Firebase Config:", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

