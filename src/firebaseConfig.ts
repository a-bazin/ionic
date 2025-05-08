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

/******************************
 * 
 * NB: A changer avec votre Firebase
 * 
 ***************************/
const firebaseConfig = {
  apiKey: "AIzaSyBWf2bUqHSll0KqbDwCGeoHo_1DZuYLpTQ",
  authDomain: "ionicprojectbackend.firebaseapp.com",
  projectId: "ionicprojectbackend",
  storageBucket: "ionicprojectbackend.appspot.com", 
  messagingSenderId: "967384798863",
  appId: "1:967384798863:web:140f73e8206dfde5ae82fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Pour gérer l'authentification
export const auth = getAuth(app);

//Pour gérer la BDD
export const db = getFirestore(app);