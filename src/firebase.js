 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAB8MiLbx2RJJdsqhEJ1oir7d_ZF06thSo",
  authDomain: "protfolio-6934a.firebaseapp.com",
  projectId: "protfolio-6934a",
  storageBucket: "protfolio-6934a.firebasestorage.app",
  messagingSenderId: "1043635726936",
  appId: "1:1043635726936:web:51cc229791decfeca0f82d",
  measurementId: "G-RW5WTR1SND",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
