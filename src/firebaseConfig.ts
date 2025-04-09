// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAo3PLjqixmpQLs2jhA78yuvHyEle4E9Gk",
  authDomain: "dwwmmut.firebaseapp.com",
  projectId: "dwwmmut",
  storageBucket: "dwwmmut.firebasestorage.app",
  messagingSenderId: "796935752806",
  appId: "1:796935752806:web:97e7142671c6a85cd6b1a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Pour gérer l'authentification
export const auth = getAuth(app);

//Pour gérer la BDD
export const db = getFirestore(app);