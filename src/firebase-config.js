import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb1t_KnzUVKhI_WYVKqH0x4KiEdBYW3g4",
  authDomain: "blog-project-bc376.firebaseapp.com",
  projectId: "blog-project-bc376",
  storageBucket: "blog-project-bc376.appspot.com",
  messagingSenderId: "75695282329",
  appId: "1:75695282329:web:88175b08896412e4428008",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
