import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here

const firebaseConfig = {
  apiKey: "AIzaSyB295uHF7SMVBTtnRyIX9ryMBpWEjPL4KM",
  authDomain: "summative-2c29f.firebaseapp.com",
  projectId: "summative-2c29f",
  storageBucket: "summative-2c29f.firebasestorage.app",
  messagingSenderId: "1055133114073",
  appId: "1:1055133114073:web:5be8ee21510a24f646a8c8"
};
  
const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };