import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBPikOv-MrLYhmAD7rXaG3t9yH8-7TuNyc",
  authDomain: "bloodlink-acd9c.firebaseapp.com",
  projectId: "bloodlink-acd9c",
  storageBucket: "bloodlink-acd9c.firebasestorage.app",
  messagingSenderId: "114152434104",
  appId: "1:114152434104:web:322d9ac49eac91d4a4074d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
