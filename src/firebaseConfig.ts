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


const firebaseConfig = {
  apiKey: "AIzaSyApu5AX40MvcaLr2-8Pyu2qf7LnDfPeX4U",
  authDomain: "fir-2ecba.firebaseapp.com",
  projectId: "fir-2ecba",
  storageBucket: "fir-2ecba.firebasestorage.app",
  messagingSenderId: "671580705959",
  appId: "1:671580705959:web:86997da15b621df6c53782",
  measurementId: "G-EH8ZTZVR3S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Pour gérer l'authentification
export const auth = getAuth(app);

//Pour gérer la BDD
export const db = getFirestore(app);