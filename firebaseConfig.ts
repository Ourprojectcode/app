import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHjtL4WSEGvKy798v7XZdmU7i-5ozRPk0",
  authDomain: "taxi-b05a7.firebaseapp.com",
  projectId: "taxi-b05a7",
  storageBucket: "taxi-b05a7.firebasestorage.app",
  messagingSenderId: "1001788304159",
  appId: "1:1001788304159:web:7afb5c9c3163467707de2a",
  measurementId: "G-81XLPREZG4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);