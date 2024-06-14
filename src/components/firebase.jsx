
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCavxPnGWuARkIHid-iy5rIyclKA15EMq4",
  authDomain: "todolist-fbfce.firebaseapp.com",
  projectId: "todolist-fbfce",
  storageBucket: "todolist-fbfce.appspot.com",
  messagingSenderId: "857418699406",
  appId: "1:857418699406:web:e1c3a0b789d03d0b78efdf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth() // for authentication
const provider = new GoogleAuthProvider() //for provider

const db = getFirestore(app)

export {auth , provider, db }