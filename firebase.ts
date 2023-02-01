import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWDnuswI45kKC3c7de-fzdya6v2ffHuHI",
  authDomain: "netflix-clone-ce365.firebaseapp.com",
  projectId: "netflix-clone-ce365",
  storageBucket: "netflix-clone-ce365.appspot.com",
  messagingSenderId: "641316467937",
  appId: "1:641316467937:web:ecdd07e2418795286133a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
export default app;
