// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3KDLb7tNgxyudTHdgxzC-Pk0dsWNK6yQ",
  authDomain: "admin-dashboard-1e2ed.firebaseapp.com",
  databaseURL: "https://admin-dashboard-1e2ed-default-rtdb.firebaseio.com",
  projectId: "admin-dashboard-1e2ed",
  storageBucket: "admin-dashboard-1e2ed.appspot.com",
  messagingSenderId: "1059586277528",
  appId: "1:1059586277528:web:7df44ac7fa8a22e84510ed"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase()