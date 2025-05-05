// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBN7i7hqyt7Qercgn4KWVH8-5dVUU9VpQc",
//   authDomain: "frmarcketforbko.firebaseapp.com",
//   databaseURL: "https://frmarcketforbko.firebaseio.com",
//   projectId: "frmarcketforbko",
//   storageBucket: "frmarcketforbko.firebasestorage.app",
//   messagingSenderId: "680551767004",
//   appId: "1:680551767004:web:7c7b0b3eac083e50"
// };


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