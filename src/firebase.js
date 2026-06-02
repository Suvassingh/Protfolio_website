// src/firebase.js
// ─────────────────────────────────────────────────────────────────────────────
//  SETUP STEPS (do this once):
//
//  1. Go to https://console.firebase.google.com
//  2. Click "Add project" → give it a name → Continue
//  3. In the project dashboard, click the </> (Web) icon → Register app
//  4. Copy the firebaseConfig values below from what Firebase shows you
//
//  5. In Firebase console → Build → Firestore Database → Create database
//     → Start in "test mode" (you can lock it down later) → Done
//
//  6. In Firebase console → Build → Authentication → Get started
//     → Sign-in method → Email/Password → Enable → Save
//
//  7. In Firebase console → Build → Storage → Get started
//     → Start in test mode → Done
//
//  8. Run in your project terminal:
//     npm install firebase
//
//  9. Replace the placeholder values below with your real config
// ─────────────────────────────────────────────────────────────────────────────

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
